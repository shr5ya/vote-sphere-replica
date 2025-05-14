
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Calendar, Edit, Search, Trash2, PlusCircle, Filter } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data
const mockElections = [
  { id: '1', title: 'Presidential Election 2025', status: 'active', voters: 542, endDate: '2025-11-03' },
  { id: '2', title: 'City Council Election', status: 'active', voters: 328, endDate: '2025-06-15' },
  { id: '3', title: 'School Board Election', status: 'completed', voters: 213, endDate: '2024-05-10' },
  { id: '4', title: 'Neighborhood Association', status: 'draft', voters: 0, endDate: '2025-08-22' },
  { id: '5', title: 'Community Budget Allocation', status: 'completed', voters: 187, endDate: '2024-04-30' },
  { id: '6', title: 'Student Union Election', status: 'active', voters: 423, endDate: '2025-09-15' },
  { id: '7', title: 'Board of Directors', status: 'draft', voters: 0, endDate: '2025-07-30' },
];

const ElectionManagement = () => {
  const { isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  const filteredElections = mockElections.filter(
    election => {
      const matchesSearch = election.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || election.status === statusFilter;
      return matchesSearch && matchesStatus;
    }
  );

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500 text-white dark:text-white">Active</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-muted text-muted-foreground">Completed</Badge>;
      case 'draft':
        return <Badge variant="outline" className="border-brand-navy/30 dark:border-brand-blue/30">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Election Management</h1>
        <Button 
          onClick={() => navigate('/create')} 
          className="bg-brand-blue hover:bg-brand-blue-light text-white dark:text-white"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Election
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="col-span-1 glass-morphism dark:glass-morphism-dark">
          <CardHeader className="pb-3">
            <CardTitle>Election Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Total Elections</div>
              <div className="text-3xl font-bold">{mockElections.length}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Active</div>
              <div className="text-2xl font-bold">{mockElections.filter(e => e.status === 'active').length}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Completed</div>
              <div className="text-2xl font-bold">{mockElections.filter(e => e.status === 'completed').length}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Drafts</div>
              <div className="text-2xl font-bold">{mockElections.filter(e => e.status === 'draft').length}</div>
            </div>
            <div className="pt-4">
              <Button 
                onClick={() => navigate('/create')} 
                variant="outline" 
                className="w-full border-brand-blue text-brand-navy dark:text-brand-blue hover:bg-brand-blue/10"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                New Election
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 md:col-span-3 glass-morphism dark:glass-morphism-dark">
          <CardHeader className="pb-3">
            <CardTitle>All Elections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search elections..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">End Date</TableHead>
                    <TableHead className="hidden md:table-cell">Voters</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredElections.length > 0 ? (
                    filteredElections.map((election) => (
                      <TableRow key={election.id}>
                        <TableCell className="font-medium">{election.title}</TableCell>
                        <TableCell>{getStatusBadge(election.status)}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            {election.endDate}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{election.voters}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-brand-navy hover:text-brand-navy/70 dark:text-brand-blue dark:hover:text-brand-blue/70"
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-destructive hover:text-destructive/70"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No elections found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ElectionManagement;
