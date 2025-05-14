
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import PollList from "@/components/polls/PollList";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("active");
  const [mounted, setMounted] = useState(false);

  // Animation effect on page load
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`space-y-8 ${mounted ? 'animate-zoom-in' : 'opacity-0'}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Elections</h1>
          <p className="text-muted-foreground mt-1">
            Browse and vote on active elections from your community
          </p>
        </div>
        {isAuthenticated && (
          <Button 
            onClick={() => navigate("/create")}
            className="bg-brand-blue hover:bg-brand-blue-light"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Election
          </Button>
        )}
      </div>

      <div className="w-full h-48 md:h-64 rounded-lg overflow-hidden relative mb-8">
        <img 
          src="https://images.unsplash.com/photo-1593113598332-cd288bc58409?auto=format&fit=crop&q=80&w=1500" 
          alt="Election banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent flex items-end p-6">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            Democracy in action — Your vote matters
          </h2>
        </div>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Elections</TabsTrigger>
          <TabsTrigger value="my">My Elections</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-6 animate-fade-in">
          <PollList />
        </TabsContent>
        <TabsContent value="my" className="mt-6 animate-fade-in">
          {isAuthenticated ? (
            <PollList />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Sign in to view and manage your elections
              </p>
              <Button 
                onClick={() => navigate("/login")} 
                className="mt-4 bg-brand-blue hover:bg-brand-blue-light"
              >
                Sign In
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomePage;
