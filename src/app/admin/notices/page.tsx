"use client";

import { ArrowLeft, Bell, PlusCircle, Trash2, Calendar, Lock, Unlock } from "lucide-react";
import Link from "next/link";

export default function AdminNoticeManagement() {
  const mockNotices = [
    { id: 1, title: "Final Exam Routine Published", date: "2026-03-10", author: "Head Office", pinned: true },
    { id: 2, title: "Rescheduling of Thursday Classes", date: "2026-03-08", author: "Prof. Anisur", pinned: false },
    { id: 3, title: "Workshop on Blockchain & Web3", date: "2026-03-05", author: "CR Group", pinned: false },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-10">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-outfit font-bold">Notice Management</h1>
            <p className="text-muted-foreground text-sm">Create, pin, and manage announcements across the department.</p>
          </div>
        </div>

        <div className="flex justify-end mb-8">
           <button className="px-6 py-2.5 bg-sst-teal text-black font-bold rounded-xl hover:bg-sst-teal/90 transition-all flex items-center gap-2">
            <PlusCircle className="w-5 h-5" /> Issue Global Notice
          </button>
        </div>

        <div className="glass-card rounded-3xl overflow-hidden border border-white/10">
           <table className="w-full text-left">
              <thead className="bg-white/5 text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-white/10">
                 <tr>
                    <th className="p-6">Content</th>
                    <th className="p-6">Origin</th>
                    <th className="p-6">Date</th>
                    <th className="p-6 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                 {mockNotices.map((n) => (
                    <tr key={n.id} className="hover:bg-white/[0.02] transition-colors group">
                       <td className="p-6">
                          <div className="flex items-center gap-3">
                             {n.pinned ? <Lock className="w-4 h-4 text-sst-gold" /> : <Unlock className="w-4 h-4 text-muted-foreground/30" />}
                             <span className="font-bold text-white group-hover:text-sst-teal transition-colors">{n.title}</span>
                          </div>
                       </td>
                       <td className="p-6 text-sm text-white/70">{n.author}</td>
                       <td className="p-6">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                             <Calendar className="w-4 h-4" /> {n.date}
                          </div>
                       </td>
                       <td className="p-6 text-right space-x-2">
                          <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-colors">Pin</button>
                          <button className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors">
                             <Trash2 className="w-4 h-4" />
                          </button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}
