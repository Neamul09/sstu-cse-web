"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, Loader2, UserPlus, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/login?registered=true");
      } else {
        const err = await res.json();
        setError(err.message || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto py-12">
      <div className="glass-card rounded-3xl p-8 md:p-10 shadow-2xl border border-white/10 bg-white/5 backdrop-blur-xl relative overflow-hidden">
        {/* Subtle top light */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sst-teal/50 to-transparent" />
        
        <div className="mb-10">
          <div className="w-12 h-12 bg-sst-teal/10 rounded-2xl flex items-center justify-center mb-6 border border-sst-teal/20">
            <UserPlus className="w-6 h-6 text-sst-teal" />
          </div>
          <h2 className="text-3xl font-outfit font-bold text-white tracking-tight">Register</h2>
          <p className="text-muted-foreground mt-2">Join the SST CSE Department Portal.</p>
        </div>

        <AnimatePresence mode="wait">
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
            <label className="text-sm font-medium text-white/70 ml-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30 group-focus-within:text-sst-teal transition-colors" />
              <input
                type="text"
                name="name"
                required
                className="w-full rounded-2xl border border-white/5 bg-white/[0.03] py-3.5 pl-12 pr-4 text-white placeholder:text-white/20 focus:border-sst-teal focus:bg-white/5 focus:outline-none focus:ring-4 focus:ring-sst-teal/10 transition-all"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70 ml-1">SST Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30 group-focus-within:text-sst-teal transition-colors" />
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-2xl border border-white/5 bg-white/[0.03] py-3.5 pl-12 pr-4 text-white placeholder:text-white/20 focus:border-sst-teal focus:bg-white/5 focus:outline-none focus:ring-4 focus:ring-sst-teal/10 transition-all"
                placeholder="student@sst.edu"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70 ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30 group-focus-within:text-sst-teal transition-colors" />
              <input
                type="password"
                name="password"
                required
                minLength={6}
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
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-white/40">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-sst-teal hover:text-sst-teal/80 transition-colors">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
