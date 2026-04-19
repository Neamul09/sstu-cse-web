"use client";

import UserRoleManager from "../UserRoleManager";
import { ArrowLeft, Users, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AdminUserManagement() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-10">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-outfit font-bold">User Management</h1>
            <p className="text-muted-foreground text-sm">Oversee all registered users and assign specialized roles.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="glass-card rounded-3xl p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-8">
                 <Users className="w-6 h-6 text-sst-teal" />
                 <h2 className="text-xl font-bold">Global User Registry</h2>
              </div>
              <UserRoleManager />
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-white/10 bg-white/[0.02]">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sst-teal" /> 
                Role Hierarchy
              </h3>
              <div className="space-y-4 text-sm">
                <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                  <span className="font-bold text-red-400 block mb-1 uppercase tracking-widest text-[10px]">ADMIN</span>
                  <p className="text-muted-foreground text-xs">Complete system access, user management, and configuration control.</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                  <span className="font-bold text-blue-400 block mb-1 uppercase tracking-widest text-[10px]">TEACHER</span>
                  <p className="text-muted-foreground text-xs">Manage classroom materials, post official notices, and grade assignments.</p>
                </div>
                <div className="p-3 rounded-lg bg-sst-gold/5 border border-sst-gold/10">
                  <span className="font-bold text-sst-gold block mb-1 uppercase tracking-widest text-[10px]">CR</span>
                  <p className="text-muted-foreground text-xs">Post student notifications and coordinate section events.</p>
                </div>
                <div className="p-3 rounded-lg bg-sst-teal/5 border border-sst-teal/10">
                  <span className="font-bold text-sst-teal block mb-1 uppercase tracking-widest text-[10px]">STUDENT</span>
                  <p className="text-muted-foreground text-xs">Access classroom, submit assignments, and view curriculum.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
