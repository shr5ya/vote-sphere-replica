
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Check, User, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Header = () => {
  const { currentUser, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b glass-morphism dark:glass-morphism-dark bg-brand-light/50 dark:bg-brand-black/50 backdrop-blur animate-slide-in">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          {isAdmin && (
            <SidebarTrigger className="md:hidden" />
          )}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-r from-brand-navy to-brand-blue dark:from-brand-blue dark:to-brand-blue-light text-white dark:text-brand-navy p-2 rounded-lg shadow-md group-hover:shadow-lg transition-all">
              <Check className="h-5 w-5" />
            </div>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-navy to-brand-blue dark:from-brand-blue dark:to-brand-blue-light transition-all group-hover:scale-105 transform">Electra</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {isAuthenticated && !isAdmin && (
            <>
              <Link to="/elections" className="text-sm font-medium hover:text-brand-navy dark:hover:text-brand-blue transition-colors">
                Elections
              </Link>
              <Link to="/dashboard" className="text-sm font-medium hover:text-brand-navy dark:hover:text-brand-blue transition-colors">
                Dashboard
              </Link>
            </>
          )}
          {isAuthenticated && isAdmin && (
            <Link to="/admin/dashboard" className="text-sm font-medium hover:text-brand-navy dark:hover:text-brand-blue transition-colors">
              Admin Dashboard
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-brand-navy to-brand-blue dark:from-brand-blue dark:to-brand-blue-light text-white dark:text-brand-navy flex items-center justify-center shadow-sm">
                  <User className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{currentUser?.name}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => logout()}
                className="border hover:bg-brand-navy hover:text-white dark:hover:bg-brand-blue dark:hover:text-brand-navy transition-all duration-300"
              >
                <LogOut className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Sign Out</span>
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => navigate("/login")}
              variant="brand"
              className="hover:shadow-md transition-all duration-300"
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
