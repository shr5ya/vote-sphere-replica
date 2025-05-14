
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
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-brand-navy dark:bg-brand-blue text-white dark:text-brand-navy p-1.5 rounded-lg">
              <Check className="h-5 w-5" />
            </div>
            <span className="text-2xl electra-title text-brand-navy dark:text-brand-blue">Electra</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-5">
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
                <div className="h-8 w-8 rounded-full bg-brand-navy dark:bg-brand-blue text-white dark:text-brand-navy flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{currentUser?.name}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => logout()}
                className="border hover:bg-brand-navy hover:text-white dark:hover:bg-brand-blue dark:hover:text-brand-navy"
              >
                <LogOut className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Sign Out</span>
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => navigate("/login")}
              className="bg-brand-navy hover:bg-opacity-80 text-white dark:bg-brand-blue dark:text-brand-navy dark:hover:bg-opacity-80"
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
