
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import PollList from "@/components/polls/PollList";
import { Button } from "@/components/ui/button";
import { Tab, Tabs, TabList, TabPanel } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("active");

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Polls</h1>
          <p className="text-muted-foreground mt-1">
            Browse and vote on polls from the community
          </p>
        </div>
        {isAuthenticated && (
          <Button 
            onClick={() => navigate("/create")}
            className="bg-brand-blue hover:bg-brand-blue-light"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Poll
          </Button>
        )}
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabList className="grid w-full grid-cols-2">
          <Tab value="active">Active Polls</Tab>
          <Tab value="my">My Polls</Tab>
        </TabList>
        <TabPanel value="active" className="mt-6">
          <PollList />
        </TabPanel>
        <TabPanel value="my" className="mt-6">
          {isAuthenticated ? (
            <PollList />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Sign in to view and manage your polls
              </p>
              <Button 
                onClick={() => navigate("/login")} 
                className="mt-4 bg-brand-blue hover:bg-brand-blue-light"
              >
                Sign In
              </Button>
            </div>
          )}
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default HomePage;
