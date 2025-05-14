
import AuthScreen from "@/components/auth/AuthScreen";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  }, [isAuthenticated, isAdmin, navigate]);

  return (
    <div className="min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-blue to-brand-blue-light bg-clip-text text-transparent">Welcome to Electra</h1>
        <p className="text-muted-foreground mt-1">
          Sign in to create and participate in elections
        </p>
      </div>
      <AuthScreen />
    </div>
  );
};

export default LoginPage;
