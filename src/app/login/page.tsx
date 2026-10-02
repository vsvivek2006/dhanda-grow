"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DhandaLogo } from "@/components/ui/DhandaLogo";
import { Lock, Mail, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      setSuccessMsg("Authenticated! Redirecting to dashboard...");
      setTimeout(() => {
        window.location.href = redirectPath;
      }, 300);
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid credentials. Please check your admin email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <DhandaLogo size="lg" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-semibold mb-3">
          <Lock className="w-3 h-3 text-cyan-400" />
          <span>Internal Admin Portal</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white">
          Admin Sign In
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Authorized personnel only. Sign in with your registered admin credentials.
        </p>
      </div>

      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl bg-[#09091f]">
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-300 text-xs sm:text-sm">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 text-emerald-300 text-xs sm:text-sm">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-slate-300 text-xs font-semibold">Admin Email</Label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                type="email"
                placeholder="admin@dhandhagrow.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500 h-11 focus-visible:ring-purple-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300 text-xs font-semibold">Password</Label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500 h-11 focus-visible:ring-purple-500"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-brand text-white font-bold rounded-xl shadow-lg shadow-purple-600/30 hover:opacity-90 transition-all mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In to Admin Portal"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#04040f] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

      <Suspense
        fallback={
          <div className="flex items-center justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
