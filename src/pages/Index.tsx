
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex flex-1 flex-col items-center justify-center text-center px-4 py-16 md:py-24">
        <div className="flex items-center gap-2 mb-6">
          <CheckCheck className="h-10 w-10 text-brand-blue" />
          <h1 className="text-4xl font-extrabold">VoteHub</h1>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold max-w-3xl">
          Create, Share, and Analyze Polls in Minutes
        </h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
          The simple, powerful way to gather opinions and make decisions through online voting.
          Start creating your own polls today!
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Button 
            onClick={() => navigate("/login")}
            className="bg-brand-blue hover:bg-brand-blue-light text-lg px-8 py-6 h-auto"
          >
            Get Started
          </Button>
          <Button
            onClick={() => navigate("/")} 
            variant="outline"
            className="text-lg px-8 py-6 h-auto"
          >
            Browse Polls
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Create Your Poll</h3>
              <p className="text-muted-foreground">
                Design custom polls with multiple options, descriptions, and more in just a few clicks.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Share With Others</h3>
              <p className="text-muted-foreground">
                Share your poll with friends, colleagues, or the world to start collecting votes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Analyze Results</h3>
              <p className="text-muted-foreground">
                Watch votes come in real-time and analyze the results with beautiful visualizations.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              onClick={() => navigate("/")}
              className="bg-brand-blue hover:bg-brand-blue-light"
            >
              Explore Active Polls
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
