
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search, UserCog, Trash2, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from "@/components/ui/badge";

// Mock data
const mockUsers = [
  { id: '1', name: 'John Smith', email: 'john@example.com', role: 'admin', status: 'active' },
  { id: '2', name: 'Alice Johnson', email: 'alice@example.com', role: 'user', status: 'active' },
  { id: '3', name: 'Bob Miller', email: 'bob@example.com', role: 'user', status: 'active' },
  { id: '4', name: 'Carol Davis', email: 'carol@example.com', role: 'user', status: 'inactive' },
  { id: '5', name: 'David Wilson', email: 'david@example.com', role: 'user', status: 'active' },
  { id: '6', name: 'Emma Thompson', email: 'emma@example.com', role: 'user', status: 'active' },
  { id: '7', name: 'Frank Roberts', email: 'frank@example.com', role: 'user', status: 'inactive' },
  { id: '8', name: 'Grace Lee', email: 'grace@example.com', role: 'user', status: 'active' },
];

const UserManagement = () => {
  const { isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

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
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button className="bg-brand-blue hover:bg-brand-blue-light text-white dark:text-white">
          <UserPlus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="col-span-1 glass-morphism dark:glass-morphism-dark">
          <CardHeader className="pb-3">
            <CardTitle>User Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Total Users</div>
              <div className="text-3xl font-bold">{mockUsers.length}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Active</div>
              <div className="text-2xl font-bold">{mockUsers.filter(u => u.status === 'active').length}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Inactive</div>
              <div className="text-2xl font-bold">{mockUsers.filter(u => u.status === 'inactive').length}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Admins</div>
              <div className="text-2xl font-bold">{mockUsers.filter(u => u.role === 'admin').length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 md:col-span-3 glass-morphism dark:glass-morphism-dark">
          <CardHeader className="pb-3">
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                        <TableCell>
                          {user.role === 'admin' ? (
                            <Badge className="bg-brand-blue text-white dark:text-white">Admin</Badge>
                          ) : (
                            <Badge variant="outline" className="border-brand-navy/30 dark:border-brand-blue/30">User</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {user.status === 'active' ? (
                            <Badge className="bg-green-500 text-white dark:text-white">Active</Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-muted text-muted-foreground">Inactive</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="text-brand-navy hover:text-brand-navy/70 dark:text-brand-blue dark:hover:text-brand-blue/70">
                              <UserCog className="h-4 w-4" />
                              <span className="sr-only">Edit User</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/70">
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
                        No users found
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

export default UserManagement;
