"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const registered = searchParams.get("registered");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass-card rounded-3xl p-8 md:p-10 shadow-2xl border border-white/10 bg-white/5 backdrop-blur-xl relative overflow-hidden">
        {/* Subtle top light */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sst-teal/50 to-transparent" />
        
        <div className="mb-10">
          <div className="w-12 h-12 bg-sst-teal/10 rounded-2xl flex items-center justify-center mb-6 border border-sst-teal/20">
            <Lock className="w-6 h-6 text-sst-teal" />
          </div>
          <h2 className="text-3xl font-outfit font-bold text-white tracking-tight">Login</h2>
          <p className="text-muted-foreground mt-2">Enter your credentials to access the portal.</p>
        </div>

        <AnimatePresence mode="wait">
          {registered && !error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-3"
            >
              <ShieldCheck className="w-5 h-5 flex-shrink-0" />
              Registration successful! Please login.
            </motion.div>
          )}

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30 group-focus-within:text-sst-teal transition-colors" />
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-2xl border border-white/5 bg-white/[0.03] py-3.5 pl-12 pr-4 text-white placeholder:text-white/20 focus:border-sst-teal focus:bg-white/5 focus:outline-none focus:ring-4 focus:ring-sst-teal/10 transition-all"
                placeholder="name@sst.edu"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between ml-1">
              <label className="text-sm font-medium text-white/70">Password</label>
              <Link href="#" className="text-xs text-sst-teal/80 hover:text-sst-teal transition-colors">
                Forgot?
              </Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30 group-focus-within:text-sst-teal transition-colors" />
              <input
                type="password"
                name="password"
                required
                className="w-full rounded-2xl border border-white/5 bg-white/[0.03] py-3.5 pl-12 pr-4 text-white placeholder:text-white/20 focus:border-sst-teal focus:bg-white/5 focus:outline-none focus:ring-4 focus:ring-sst-teal/10 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full relative group overflow-hidden rounded-2xl bg-sst-teal py-4 text-sm font-bold text-black transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 mt-4"
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-white/40">
          New to the portal?{" "}
          <Link href="/register" className="font-bold text-sst-teal hover:text-sst-teal/80 transition-colors">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
