
import { NavLink } from "react-router-dom";
import { BarChart, Calendar, Settings, User, Users, PlusCircle, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

const AdminSidebar = () => {
  const sidebar = useSidebar();
  const { isAdmin } = useAuth();
  const isCollapsed = sidebar.state === "collapsed";
  
  if (!isAdmin) return null;
  
  // Link styling function
  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return cn(
      "w-full flex items-center gap-3 rounded-md px-3 py-2 transition-all duration-200 ease-in-out",
      isActive 
        ? "bg-brand-navy/10 dark:bg-brand-blue/20 text-brand-navy dark:text-brand-blue font-medium" 
        : "text-gray-600 dark:text-gray-300 hover:bg-brand-light dark:hover:bg-gray-800"
    );
  };

  return (
    <SidebarContent className="glass-morphism dark:glass-morphism-dark bg-brand-light/50 dark:bg-brand-black/50">
      <div className="flex items-center gap-2 p-4 border-b">
        {(!isCollapsed || !sidebar.state) && (
          <span className="text-lg font-semibold text-brand-navy/90 dark:text-brand-blue/90">
            Admin Dashboard
          </span>
        )}
      </div>
      
      <div className="py-4">
        <SidebarGroup defaultOpen={true}>
          <SidebarGroupLabel className="text-sm font-medium text-brand-navy/70 dark:text-brand-blue/70 px-3 py-2">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/admin/dashboard" className={getLinkClass}>
                    <LayoutDashboard className="h-5 w-5 text-brand-navy dark:text-brand-blue" />
                    {(!isCollapsed || !sidebar.state) && <span>Dashboard</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/admin/elections" className={getLinkClass}>
                    <Calendar className="h-5 w-5 text-brand-navy dark:text-brand-blue" />
                    {(!isCollapsed || !sidebar.state) && <span>Elections</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/create" className={getLinkClass}>
                    <PlusCircle className="h-5 w-5 text-brand-navy dark:text-brand-blue" />
                    {(!isCollapsed || !sidebar.state) && <span>Create Election</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/admin/users" className={getLinkClass}>
                    <Users className="h-5 w-5 text-brand-navy dark:text-brand-blue" />
                    {(!isCollapsed || !sidebar.state) && <span>Users</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/admin/settings" className={getLinkClass}>
                    <Settings className="h-5 w-5 text-brand-navy dark:text-brand-blue" />
                    {(!isCollapsed || !sidebar.state) && <span>Settings</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup defaultOpen={true}>
          <SidebarGroupLabel className="text-sm font-medium text-brand-navy/70 dark:text-brand-blue/70 px-3 py-2 mt-4">
            Analytics
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/admin/analytics/votes" className={getLinkClass}>
                    <BarChart className="h-5 w-5 text-brand-navy dark:text-brand-blue" />
                    {(!isCollapsed || !sidebar.state) && <span>Vote Statistics</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-medium text-brand-navy/70 dark:text-brand-blue/70 px-3 py-2 mt-4">
            User
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/elections" className={getLinkClass}>
                    <Calendar className="h-5 w-5 text-brand-navy dark:text-brand-blue" />
                    {(!isCollapsed || !sidebar.state) && <span>Elections</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/profile" className={getLinkClass}>
                    <User className="h-5 w-5 text-brand-navy dark:text-brand-blue" />
                    {(!isCollapsed || !sidebar.state) && <span>My Profile</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </div>
    </SidebarContent>
  );
};

export default AdminSidebar;
