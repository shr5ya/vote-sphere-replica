import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePolls } from "@/contexts/PollContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { PollOption } from "@/types";

const PollDetail = () => {
  const { pollId } = useParams<{ pollId: string }>();
  const navigate = useNavigate();
  const { getPollById, castVote, getUserVoteForPoll, deletePoll } = usePolls();
  const { currentUser, isAuthenticated } = useAuth();
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);
  const [isVoting, setIsVoting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const poll = getPollById(pollId || "");
  const userVote = getUserVoteForPoll(pollId || "");

  useEffect(() => {
    if (userVote) {
      setSelectedOption(userVote);
    }
  }, [userVote]);

  if (!poll) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold">Poll not found</h1>
          <p className="mt-2 text-muted-foreground">The poll you're looking for doesn't exist or has been removed</p>
          <Button onClick={() => navigate("/")} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Polls
          </Button>
        </div>
      </div>
    );
  }

  const totalVotes = poll.options.reduce((sum, option) => sum + option.voteCount, 0);
  const isCreator = currentUser?.id === poll.createdBy;

  const handleVote = async () => {
    if (!isAuthenticated || !selectedOption || isVoting) return;

    setIsVoting(true);
    try {
      await castVote(poll.id, selectedOption);
    } catch (error) {
      console.error("Error casting vote:", error);
    } finally {
      setIsVoting(false);
    }
  };

  const handleDelete = async () => {
    if (!isCreator || isDeleting) return;
    
    if (window.confirm("Are you sure you want to delete this poll? This action cannot be undone.")) {
      setIsDeleting(true);
      try {
        await deletePoll(poll.id);
        navigate("/");
      } catch (error) {
        console.error("Error deleting poll:", error);
        setIsDeleting(false);
      }
    }
  };

  const sortedOptions = [...poll.options].sort((a, b) => {
    // If user voted for an option, put it at the top
    if (a.id === userVote) return -1;
    if (b.id === userVote) return 1;
    // Otherwise sort by vote count (highest first)
    return b.voteCount - a.voteCount;
  });

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Polls
      </Button>

      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex justify-between items-start flex-wrap gap-2">
            <div>
              <CardTitle className="text-2xl font-semibold">{poll.title}</CardTitle>
              <CardDescription className="mt-1">
                {formatDistanceToNow(new Date(poll.createdAt), { addSuffix: true })} • {totalVotes} {totalVotes === 1 ? "vote" : "votes"}
              </CardDescription>
            </div>
            {userVote && (
              <Badge className="bg-brand-green">Voted</Badge>
            )}
          </div>
          {poll.description && (
            <p className="mt-2 text-sm text-foreground">{poll.description}</p>
          )}
        </CardHeader>

        <CardContent className="pt-0">
          <Separator className="my-4" />

          <div className="space-y-3">
            {sortedOptions.map((option: PollOption) => {
              const percentage = totalVotes ? Math.round((option.voteCount / totalVotes) * 100) : 0;
              const isSelected = selectedOption === option.id;
              const hasVoted = userVote !== undefined;
              
              return (
                <div
                  key={option.id}
                  onClick={() => isAuthenticated && !hasVoted && setSelectedOption(option.id)}
                  className={`relative border rounded-md p-3 ${
                    isSelected
                      ? "border-brand-blue bg-brand-blue bg-opacity-5"
                      : "hover:bg-gray-50 cursor-pointer"
                  } ${!isAuthenticated || hasVoted ? "cursor-default" : "cursor-pointer"}`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {isAuthenticated && !hasVoted && (
                        <div
                          className={`w-4 h-4 border rounded-full ${
                            isSelected ? "border-brand-blue" : "border-gray-300"
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 bg-brand-blue rounded-full absolute top-1/2 left-[0.35rem] -translate-y-1/2" />
                          )}
                        </div>
                      )}
                      <span className={isSelected ? "font-medium" : ""}>
                        {option.text}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{percentage}%</span>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isSelected || option.id === userVote
                          ? "bg-brand-green"
                          : "bg-brand-blue-light"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {option.voteCount} {option.voteCount === 1 ? "vote" : "votes"}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>

        <CardFooter className="flex flex-wrap justify-between gap-2">
          {isAuthenticated ? (
            <>
              {!userVote ? (
                <Button
                  onClick={handleVote}
                  disabled={!selectedOption || isVoting}
                  className="flex-1 bg-brand-blue hover:bg-brand-blue-light"
                >
                  {isVoting ? "Submitting..." : "Submit Vote"}
                </Button>
              ) : (
                <div className="text-sm text-muted-foreground">
                  You have already voted in this poll
                </div>
              )}

              {isCreator && (
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-none"
                >
                  {isDeleting ? "Deleting..." : "Delete Poll"}
                </Button>
              )}
            </>
          ) : (
            <Button onClick={() => navigate("/login")} className="flex-1">
              Sign In to Vote
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default PollDetail;
