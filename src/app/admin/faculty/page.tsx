"use client";

import { ArrowLeft, UserPlus, Trash2, Pencil, Briefcase, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function AdminFacultyManagement() {
  const mockFaculty = [
    { id: 1, name: "Dr. Anisur Rahman", designation: "Professor & Head", email: "head.cse@sstu.edu", phone: "+880 1234 5678" },
    { id: 2, name: "Dr. Sabiha Khatun", designation: "Associate Professor", email: "sabiha@sstu.edu", phone: "+880 8765 4321" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-10">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-outfit font-bold">Faculty Management</h1>
            <p className="text-muted-foreground text-sm">Organize and update the department's academic staff records.</p>
          </div>
        </div>

        <div className="mb-8 p-4 bg-sst-gold/10 border border-sst-gold/20 rounded-xl text-sst-gold text-sm flex items-center gap-3">
           <div className="w-2 h-2 rounded-full bg-sst-gold animate-pulse" />
           Notice: This module is currently using dummy data for demonstration.
        </div>

        <div className="flex justify-end mb-8">
           <button className="px-6 py-2.5 bg-sst-gold border border-sst-gold/20 text-black font-bold rounded-xl hover:bg-sst-gold/90 transition-all flex items-center gap-2">
            <UserPlus className="w-5 h-5" /> Register New Faculty
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {mockFaculty.map((f) => (
            <div key={f.id} className="glass-card rounded-2xl p-6 relative group overflow-hidden border border-white/5 hover:border-sst-gold/30 transition-all">
               <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all flex gap-2">
                  <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20"><Pencil className="w-4 h-4" /></button>
                  <button className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"><Trash2 className="w-4 h-4" /></button>
               </div>
               <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center text-4xl font-bold text-muted-foreground">
                     {f.name[4]}
                  </div>
                  <div>
                     <h3 className="text-xl font-bold">{f.name}</h3>
                     <p className="text-sst-gold font-medium text-sm flex items-center gap-1.5 mt-1">
                        <Briefcase className="w-4 h-4" /> {f.designation}
                     </p>
                  </div>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                     <Mail className="w-4 h-4" /> {f.email}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                     <Phone className="w-4 h-4" /> {f.phone}
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
