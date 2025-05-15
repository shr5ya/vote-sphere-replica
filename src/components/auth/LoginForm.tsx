
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, Loader2 } from "lucide-react";

interface LoginFormProps {
  onToggleForm: () => void;
}

const LoginForm = ({ onToggleForm }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    
    setError("");
    setIsSubmitting(true);
    
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-in border-0 shadow-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-brand-navy to-brand-blue bg-clip-text text-transparent dark:from-brand-blue dark:to-brand-blue-light">Sign In</CardTitle>
        <CardDescription className="text-muted-foreground">
          Sign in to your account to create and participate in polls
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert className="bg-destructive/10 border-destructive/20 text-destructive">
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gray-300 dark:border-gray-700 focus:ring-brand-blue dark:focus:ring-brand-blue-light"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-gray-300 dark:border-gray-700 focus:ring-brand-blue dark:focus:ring-brand-blue-light"
              required
            />
          </div>
          <Alert className="bg-muted/50 border-muted">
            <InfoIcon className="h-4 w-4" />
            <AlertDescription className="text-xs">
              For admin access, use <strong>admin@example.com</strong> (any password)<br />
              For regular user, use <strong>user@example.com</strong> (any password)
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-brand-navy to-brand-blue hover:opacity-90 text-white dark:bg-gradient-to-r dark:from-brand-blue dark:to-brand-blue-light dark:text-brand-navy transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
          <p className="text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <Button variant="link" onClick={onToggleForm} className="p-0 text-brand-navy dark:text-brand-blue">
              Sign up
            </Button>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
