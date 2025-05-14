
import { NavLink } from "react-router-dom";
import { BarChart, Calendar, Settings, User, Users, PlusCircle } from "lucide-react";
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
  
  if (!isAdmin) return null;
  
  // Link styling function
  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return cn(
      "w-full flex items-center gap-2 rounded-md",
      isActive 
        ? "bg-brand-navy/10 dark:bg-brand-blue/20 text-brand-navy dark:text-brand-blue font-medium" 
        : "hover:bg-muted/50"
    );
  };

  return (
    <SidebarContent className="glass-morphism dark:glass-morphism-dark bg-brand-light/50 dark:bg-brand-black/50">
      <div className="flex items-center gap-2 p-4 border-b">
        {(sidebar.state === "expanded" || !sidebar.state) && (
          <span className="text-lg font-semibold text-brand-navy dark:text-brand-blue">Admin Panel</span>
        )}
      </div>
      
      <SidebarGroup>
        <SidebarGroupLabel className="text-brand-navy/70 dark:text-brand-blue/70">
          Management
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/admin/dashboard" className={getLinkClass}>
                  <BarChart className="h-4 w-4 text-brand-navy dark:text-brand-blue" />
                  {(!sidebar.state || sidebar.state === "expanded") && <span>Analytics</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/admin/elections" className={getLinkClass}>
                  <Calendar className="h-4 w-4 text-brand-navy dark:text-brand-blue" />
                  {(!sidebar.state || sidebar.state === "expanded") && <span>Elections</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/create" className={getLinkClass}>
                  <PlusCircle className="h-4 w-4 text-brand-navy dark:text-brand-blue" />
                  {(!sidebar.state || sidebar.state === "expanded") && <span>Create Election</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/admin/users" className={getLinkClass}>
                  <Users className="h-4 w-4 text-brand-navy dark:text-brand-blue" />
                  {(!sidebar.state || sidebar.state === "expanded") && <span>Users</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/admin/settings" className={getLinkClass}>
                  <Settings className="h-4 w-4 text-brand-navy dark:text-brand-blue" />
                  {(!sidebar.state || sidebar.state === "expanded") && <span>Settings</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      
      <SidebarGroup>
        <SidebarGroupLabel className="text-brand-navy/70 dark:text-brand-blue/70">
          User
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/elections" className={getLinkClass}>
                  <Calendar className="h-4 w-4 text-brand-navy dark:text-brand-blue" />
                  {(!sidebar.state || sidebar.state === "expanded") && <span>Elections</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/profile" className={getLinkClass}>
                  <User className="h-4 w-4 text-brand-navy dark:text-brand-blue" />
                  {(!sidebar.state || sidebar.state === "expanded") && <span>My Profile</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default AdminSidebar;
