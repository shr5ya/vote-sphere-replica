
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, ResponsiveContainer, Cell, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts';
import { DashboardStats } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

const COLORS = ['#98D8EF', '#EAE2C6', '#BFBBA9', '#ADA991'];

const mockElectionData = [
  { name: 'Election A', votes: 400 },
  { name: 'Election B', votes: 300 },
  { name: 'Election C', votes: 200 },
  { name: 'Election D', votes: 100 },
];

const mockStatusData = [
  { name: 'Active', value: 5 },
  { name: 'Completed', value: 8 },
  { name: 'Draft', value: 3 },
];

const mockTimelineData = [
  { date: 'Jan', votes: 120 },
  { date: 'Feb', votes: 180 },
  { date: 'Mar', votes: 250 },
  { date: 'Apr', votes: 310 },
  { date: 'May', votes: 420 },
  { date: 'Jun', votes: 380 },
];

const DashboardAnalytics = () => {
  const { isAdmin } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalElections: 0,
    activeElections: 0,
    completedElections: 0,
    totalVotes: 0,
  });

  useEffect(() => {
    // Simulate loading stats
    const timer = setTimeout(() => {
      setStats({
        totalUsers: 256,
        totalElections: 16,
        activeElections: 5,
        completedElections: 8,
        totalVotes: 1842,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!isAdmin) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold">Access Denied</h2>
        <p className="text-muted-foreground mt-2">You don't have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: May 14, 2025
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-morphism dark:glass-morphism-dark">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">↑ 12% from last month</div>
          </CardContent>
        </Card>
        
        <Card className="glass-morphism dark:glass-morphism-dark">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Elections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalElections}</div>
            <div className="text-xs text-muted-foreground mt-1">↑ 4 new this month</div>
          </CardContent>
        </Card>
        
        <Card className="glass-morphism dark:glass-morphism-dark">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Elections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeElections}</div>
            <div className="text-xs text-muted-foreground mt-1">3 ending this week</div>
          </CardContent>
        </Card>
        
        <Card className="glass-morphism dark:glass-morphism-dark">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Votes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVotes.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">↑ 23% participation rate</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2 glass-morphism dark:glass-morphism-dark">
          <CardHeader>
            <CardTitle>Voting Activity Timeline</CardTitle>
            <CardDescription>Monthly participation trend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={mockTimelineData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="votes" stroke="#98D8EF" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-morphism dark:glass-morphism-dark">
          <CardHeader>
            <CardTitle>Election Status</CardTitle>
            <CardDescription>Current distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockStatusData}
                    cx="50%"
                    cy="45%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {mockStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="glass-morphism dark:glass-morphism-dark">
        <CardHeader>
          <CardTitle>Top Elections by Votes</CardTitle>
          <CardDescription>Elections with the most participation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={mockElectionData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="votes" fill="#98D8EF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardAnalytics;
