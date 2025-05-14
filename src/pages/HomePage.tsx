
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import PollList from "@/components/polls/PollList";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
            className="bg-brand-navy hover:bg-opacity-80 text-white"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Election
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full h-64 rounded-lg overflow-hidden relative">
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
        
        <div className="w-full h-64 rounded-lg overflow-hidden relative">
          <img 
            src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=1500" 
            alt="People voting" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent flex items-end p-6">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              Every voice counts — Make yours heard
            </h2>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg overflow-hidden">
          <AspectRatio ratio={1/1}>
            <img 
              src="https://images.unsplash.com/photo-1618828172504-511c867e6c56?auto=format&fit=crop&q=80&w=800" 
              alt="Ballot box" 
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </div>
        
        <div className="rounded-lg overflow-hidden">
          <AspectRatio ratio={1/1}>
            <img 
              src="https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&q=80&w=800" 
              alt="Voting booth" 
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </div>
        
        <div className="rounded-lg overflow-hidden">
          <AspectRatio ratio={1/1}>
            <img 
              src="https://images.unsplash.com/photo-1545987796-200677ee1011?auto=format&fit=crop&q=80&w=800" 
              alt="Campaign button" 
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </div>
      </div>
      
      <div className="p-6 rounded-lg bg-brand-light/50 dark:bg-brand-navy/20 border">
        <h2 className="text-2xl font-bold mb-4">Why Choose Electra?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-brand-navy text-white rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Voting</h3>
            <p className="text-muted-foreground">Our platform ensures all votes are secure and tamper-proof</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-brand-navy text-white rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Fast Results</h3>
            <p className="text-muted-foreground">View election results in real-time as votes come in</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-brand-navy text-white rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy Setup</h3>
            <p className="text-muted-foreground">Create and manage elections with just a few clicks</p>
          </div>
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
                className="mt-4 bg-brand-navy hover:bg-opacity-80 text-white"
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
