
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Poll } from "@/types";
import { usePolls } from "@/contexts/PollContext";
import { useAuth } from "@/contexts/AuthContext";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

interface PollCardProps {
  poll: Poll;
}

const PollCard = ({ poll }: PollCardProps) => {
  const { getUserVoteForPoll } = usePolls();
  const { isAuthenticated } = useAuth();
  const userVote = getUserVoteForPoll(poll.id);
  const totalVotes = poll.options.reduce((sum, option) => sum + option.voteCount, 0);
  
  // Calculate which option has the most votes
  const maxVotes = Math.max(...poll.options.map(o => o.voteCount));
  const leadingOption = poll.options.find(o => o.voteCount === maxVotes);

  return (
    <Card className="w-full overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold">{poll.title}</CardTitle>
          <Badge variant={userVote ? "secondary" : "outline"} className="ml-2">
            {userVote ? "Voted" : "Not Voted"}
          </Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(poll.createdAt), { addSuffix: true })} • {totalVotes} {totalVotes === 1 ? "vote" : "votes"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <p className="mb-4 line-clamp-2 text-sm">{poll.description}</p>
        
        <div className="space-y-1.5">
          {poll.options.slice(0, 2).map((option) => (
            <div key={option.id} className="flex items-center">
              <div className="relative w-full bg-secondary rounded-full h-2 mr-2">
                <div 
                  className={`absolute top-0 left-0 h-2 rounded-full ${
                    userVote === option.id 
                      ? "bg-brand-green" 
                      : "bg-brand-blue-light"
                  }`}
                  style={{ 
                    width: `${totalVotes ? (option.voteCount / totalVotes) * 100 : 0}%` 
                  }}
                />
              </div>
              <span className="text-xs font-medium w-8 text-right">
                {totalVotes ? Math.round((option.voteCount / totalVotes) * 100) : 0}%
              </span>
            </div>
          ))}
          {poll.options.length > 2 && (
            <p className="text-xs text-muted-foreground">
              +{poll.options.length - 2} more options
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-1">
        <Button asChild className="w-full bg-brand-blue hover:bg-brand-blue-light">
          <Link to={`/polls/${poll.id}`}>
            {isAuthenticated ? (userVote ? "View Results" : "Vote Now") : "View Poll"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PollCard;
