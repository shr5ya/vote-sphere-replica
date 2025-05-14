
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CreatePollForm from "@/components/polls/CreatePollForm";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const CreatePollPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleSuccess = () => {
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Polls
      </Button>
      
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Create a New Poll</h1>
        <p className="text-muted-foreground mt-1">
          Design your poll and share it with the community
        </p>
      </div>
      
      <CreatePollForm onSuccess={handleSuccess} />
    </div>
  );
};

export default CreatePollPage;
