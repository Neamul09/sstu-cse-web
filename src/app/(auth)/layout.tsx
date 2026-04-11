"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0b]">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sst-teal/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Branding / Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block space-y-8"
          >
            <div>
              <Link href="/" className="inline-block">
                <span className="font-outfit text-4xl font-bold tracking-tight text-sst-teal">
                  SSTU<span className="text-white">CSE</span>
                </span>
              </Link>
              <h1 className="text-5xl font-outfit font-bold text-white mt-6 leading-tight">
                Your Academic Journey <br />
                <span className="text-sst-teal">Starts Here.</span>
              </h1>
              <p className="text-xl text-muted-foreground mt-4 max-w-lg">
                Access your personalized dashboard, manage courses, track attendance, and stay connected with the department.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="glass-card p-6 rounded-2xl border-white/5 bg-white/[0.02]">
                <h3 className="text-sst-teal font-bold text-2xl">Role-Based</h3>
                <p className="text-sm text-muted-foreground mt-1">Custom views for students, faculty & admins.</p>
              </div>
              <div className="glass-card p-6 rounded-2xl border-white/5 bg-white/[0.02]">
                <h3 className="text-sst-teal font-bold text-2xl">Integrated</h3>
                <p className="text-sm text-muted-foreground mt-1">All departmental resources in one place.</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Auth Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {children}
          </motion.div>
        </div>
      </div>

      {/* Footer link for mobile */}
      <div className="absolute bottom-8 left-0 w-full text-center lg:hidden">
         <Link href="/" className="text-sm text-muted-foreground hover:text-sst-teal transition-colors">
            ← Back to Home
         </Link>
      </div>
    </div>
  );
}
