import { useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { toast } from "sonner@2.0.3";
import heybLogo from "figma:asset/e0e68f1c544810d61fdfca1264a2cb79408d1ee9.png";

interface BlogLoginProps {
  onLogin: () => void;
}

export function BlogLogin({ onLogin }: BlogLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple authentication - in production, use proper backend authentication
    if (email === "admin@heyb.com" && password === "heyb123") {
      toast.success("Login successful!");
      onLogin();
    } else {
      toast.error("Invalid credentials", {
        description: "Please check your email and password"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <img 
            src={heybLogo} 
            alt="HeyB Logo" 
            className="h-20 w-auto object-contain mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold font-['Poppins'] mb-2">Blog Admin Login</h1>
          <p className="text-muted-foreground">Sign in to manage blog posts</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@heyb.com"
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            <Lock className="w-4 h-4 mr-2" />
            Sign In
          </Button>
        </form>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            <strong>Demo Credentials:</strong><br />
            Email: admin@heyb.com<br />
            Password: heyb123
          </p>
        </div>
      </Card>
    </div>
  );
}
