
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className={`flex flex-1 flex-col items-center justify-center text-center px-4 py-16 md:py-24 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="flex items-center gap-2 mb-6">
          <Check className="h-10 w-10 text-brand-blue" />
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-brand-blue to-brand-blue-light bg-clip-text text-transparent">Electra</h1>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold max-w-3xl">
          Secure, Transparent, Democratic Elections
        </h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
          The modern platform for conducting fair and accessible elections. 
          Create ballots, monitor results, and ensure every voice is heard.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Button 
            onClick={() => navigate("/login")}
            className="bg-brand-blue hover:bg-brand-blue-light text-lg px-8 py-6 h-auto"
          >
            Get Started
          </Button>
          <Button
            onClick={() => navigate("/elections")} 
            variant="outline"
            className="text-lg px-8 py-6 h-auto"
          >
            Browse Elections
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-secondary/30 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 animate-slide-in">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm animate-fade-in" style={{animationDelay: '0.1s'}}>
              <div className="w-12 h-12 bg-brand-blue text-primary-foreground rounded-full flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Create Your Ballot</h3>
              <p className="text-muted-foreground">
                Design ballots with candidates, propositions, or other voting options quickly and securely.
              </p>
              <div className="mt-4 h-40 rounded-md overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1555624435-d04204e640a4?auto=format&fit=crop&q=80&w=500" 
                  alt="Create ballot" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="w-12 h-12 bg-brand-blue text-primary-foreground rounded-full flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Voting</h3>
              <p className="text-muted-foreground">
                Allow voters to cast their ballots with multiple layers of verification and security.
              </p>
              <div className="mt-4 h-40 rounded-md overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=500" 
                  alt="Secure voting" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm animate-fade-in" style={{animationDelay: '0.5s'}}>
              <div className="w-12 h-12 bg-brand-blue text-primary-foreground rounded-full flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Analyze Results</h3>
              <p className="text-muted-foreground">
                View results in real-time with detailed breakdowns and visualizations of the voting data.
              </p>
              <div className="mt-4 h-40 rounded-md overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=500" 
                  alt="Analyze results" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              onClick={() => navigate("/elections")}
              className="bg-brand-blue hover:bg-brand-blue-light animate-fade-in"
              style={{animationDelay: '0.7s'}}
            >
              Explore Active Elections
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
