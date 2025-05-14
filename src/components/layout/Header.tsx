
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Check, User, LogOut, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Header = () => {
  const { currentUser, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur animate-slide-in">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          {isAdmin && (
            <SidebarTrigger className="md:hidden" />
          )}
          <Link to="/" className="flex items-center gap-2">
            <Check className="h-6 w-6 text-brand-blue" />
            <span className="text-xl font-bold bg-gradient-to-r from-brand-blue to-brand-blue-light bg-clip-text text-transparent">Electra</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-5">
          {isAuthenticated && !isAdmin && (
            <>
              <Link to="/elections" className="text-sm font-medium hover:text-brand-blue transition-colors">
                Elections
              </Link>
              <Link to="/dashboard" className="text-sm font-medium hover:text-brand-blue transition-colors">
                Dashboard
              </Link>
            </>
          )}
          {isAuthenticated && isAdmin && (
            <Link to="/admin/dashboard" className="text-sm font-medium hover:text-brand-blue transition-colors">
              Admin Dashboard
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">{currentUser?.name}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => logout()}
                className="border"
              >
                <LogOut className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Sign Out</span>
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => navigate("/login")}
              className="bg-brand-blue hover:bg-brand-blue-light"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
