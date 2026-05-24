import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "./login";
import { API_BASE } from "@/lib/api";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
  beforeLoad: () => {
    const token = localStorage.getItem("finsense_token");
    if (token) throw redirect({ to: "/dashboard" });
  },
  head: () => ({ meta: [{ title: "Create account · FinSense" }] }),
});

function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, displayName: email.split("@")[0] }),
      });
      
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Registration failed" }));
        throw new Error(err.message || "Failed to create account");
      }
      
      toast.success("Account created! Please sign in.");
      navigate({ to: "/login" });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return <AuthShell title="Create an account" subtitle="Join FinSense to master your finances">
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Sign up
      </Button>
    </form>
    <p className="mt-6 text-center text-sm text-muted-foreground">
      Already have an account? <Link to="/login" className="text-foreground hover:underline">Sign in</Link>
    </p>
  </AuthShell>;
}
