
import { NavLink } from "react-router-dom";
import { BarChart, Calendar, Settings, User, Users } from "lucide-react";
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
        ? "bg-brand-blue/10 text-brand-blue font-medium" 
        : "hover:bg-muted/50"
    );
  };

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/admin/dashboard" className={getLinkClass}>
                  <BarChart className="h-4 w-4" />
                  {!sidebar.state || sidebar.state === "expanded" && <span>Analytics</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/admin/elections" className={getLinkClass}>
                  <Calendar className="h-4 w-4" />
                  {!sidebar.state || sidebar.state === "expanded" && <span>Elections</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/admin/users" className={getLinkClass}>
                  <Users className="h-4 w-4" />
                  {!sidebar.state || sidebar.state === "expanded" && <span>Users</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/admin/settings" className={getLinkClass}>
                  <Settings className="h-4 w-4" />
                  {!sidebar.state || sidebar.state === "expanded" && <span>Settings</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      
      <SidebarGroup>
        <SidebarGroupLabel>User</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/elections" className={getLinkClass}>
                  <Calendar className="h-4 w-4" />
                  {!sidebar.state || sidebar.state === "expanded" && <span>Elections</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/profile" className={getLinkClass}>
                  <User className="h-4 w-4" />
                  {!sidebar.state || sidebar.state === "expanded" && <span>My Profile</span>}
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
