
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { CheckCheck, User, LogOut } from "lucide-react";

const Header = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <CheckCheck className="h-6 w-6 text-brand-blue" />
            <span className="text-xl font-bold">VoteHub</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-5">
          <Link to="/" className="text-sm font-medium hover:text-brand-blue transition-colors">
            Home
          </Link>
          <Link to="/create" className="text-sm font-medium hover:text-brand-blue transition-colors">
            Create Poll
          </Link>
        </nav>
        <div className="flex items-center gap-4">
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
