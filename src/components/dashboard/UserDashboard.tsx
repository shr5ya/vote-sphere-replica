
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Check, Clock, Vote } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { UserStats } from '@/types';

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [stats, setStats] = useState<UserStats>({
    recentActivity: []
  });
  
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        recentActivity: [
          { date: '2025-05-12', action: 'Voted in Presidential Election 2025' },
          { date: '2025-05-08', action: 'Registered for City Council Election' },
          { date: '2025-04-30', action: 'Account created' },
        ]
      });
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {currentUser?.name}</h1>
          <p className="text-muted-foreground">Your election dashboard</p>
        </div>
        <Button onClick={() => navigate('/elections')} className="bg-brand-blue hover:bg-brand-blue-light">
          <Vote className="mr-2 h-4 w-4" /> View Active Elections
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              <div className="flex items-center">
                <Vote className="mr-2 h-4 w-4" />
                <span>Active Elections</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Elections you can vote in</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              <div className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                <span>Completed Votes</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Elections you've participated in</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>Upcoming</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Elections starting soon</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Elections You Can Vote In</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2 animate-pulse">
                <div className="h-12 bg-muted rounded"></div>
                <div className="h-12 bg-muted rounded"></div>
                <div className="h-12 bg-muted rounded"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {[
                  { id: '1', title: 'Presidential Election 2025', endDate: '2025-11-03' },
                  { id: '2', title: 'City Council Election', endDate: '2025-06-15' },
                  { id: '3', title: 'School Board Election', endDate: '2025-09-10' },
                ].map(election => (
                  <div key={election.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors">
                    <div>
                      <div className="font-medium">{election.title}</div>
                      <div className="text-sm text-muted-foreground flex items-center mt-1">
                        <Calendar className="h-3 w-3 mr-1" /> Ends {election.endDate}
                      </div>
                    </div>
                    <Button size="sm" onClick={() => navigate(`/polls/${election.id}`)} className="bg-brand-blue hover:bg-brand-blue-light">
                      Vote Now
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2 animate-pulse">
                <div className="h-6 bg-muted rounded"></div>
                <div className="h-6 bg-muted rounded"></div>
                <div className="h-6 bg-muted rounded"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {stats.recentActivity.map((activity, index) => (
                  <div key={index} className="border-l-2 pl-3 border-brand-blue">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
