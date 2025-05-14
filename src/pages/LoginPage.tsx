
import AuthScreen from "@/components/auth/AuthScreen";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Welcome to VoteHub</h1>
        <p className="text-muted-foreground mt-1">
          Sign in to create and participate in polls
        </p>
      </div>
      <AuthScreen />
    </div>
  );
};

export default LoginPage;
