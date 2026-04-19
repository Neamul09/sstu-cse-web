"use client";

import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  GraduationCap, 
  Search, 
  Loader2 
} from "lucide-react";
import Link from "next/link";

export default function AdminStudentManagement() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-10">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-outfit font-bold">Student Records</h1>
            <p className="text-muted-foreground text-sm">Browse and manage student enrollments and academic standing.</p>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-12 text-center border-dashed border-2 flex flex-col items-center gap-4">
           <Search className="w-12 h-12 text-muted-foreground/30" />
           <div>
              <h3 className="text-xl font-bold">Module Under Optimization</h3>
              <p className="text-sm text-muted-foreground mt-1">Direct student management via Admin will be linked to the Registration system in the next patch.</p>
           </div>
           <Link href="/admin" className="text-sst-teal font-medium hover:underline text-sm">Return to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
