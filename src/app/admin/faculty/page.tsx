"use client";

import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Trash2, 
  Pencil, 
  Briefcase, 
  Mail, 
  Phone,
  Loader2,
  X 
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

type Faculty = {
  id: string;
  name: string | null;
  email: string | null;
  teacherProfile?: {
    designation: string;
    officeHours: string | null;
    researchInterests: string | null;
  };
};

export default function AdminFacultyManagement() {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    designation: "",
    officeHours: "",
    researchInterests: ""
  });

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const res = await fetch("/api/admin/faculty");
      const data = await res.json();
      if (res.ok) setFaculty(data);
    } catch (error) {
      toast.error("Failed to load faculty");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (f: Faculty) => {
    setEditingFaculty(f);
    setFormData({
      name: f.name || "",
      email: f.email || "",
      designation: f.teacherProfile?.designation || "",
      officeHours: f.teacherProfile?.officeHours || "",
      researchInterests: f.teacherProfile?.researchInterests || ""
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaculty) return;

    try {
      const res = await fetch("/api/admin/faculty", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingFaculty.id, ...formData }),
      });

      if (res.ok) {
        toast.success("Profile updated");
        setEditingFaculty(null);
        fetchFaculty();
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

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

        {editingFaculty && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass-card w-full max-w-2xl rounded-3xl p-8 border border-white/10 relative">
              <button 
                onClick={() => setEditingFaculty(null)} 
                className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-full"
              >
                <X className="w-5 h-5"/>
              </button>
              <h2 className="text-2xl font-outfit font-bold mb-6">Edit Faculty Profile</h2>
              <form onSubmit={handleUpdate} className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground block mb-2">Display Name</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground block mb-2">Designation</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none"
                      value={formData.designation}
                      onChange={(e) => setFormData({...formData, designation: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground block mb-2">Office Hours</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none"
                      value={formData.officeHours}
                      onChange={(e) => setFormData({...formData, officeHours: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground block mb-2">Research Interests</label>
                    <textarea 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm h-24 resize-none focus:outline-none"
                      value={formData.researchInterests}
                      onChange={(e) => setFormData({...formData, researchInterests: e.target.value})}
                    />
                  </div>
                </div>
                <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                  <button type="button" onClick={() => setEditingFaculty(null)} className="px-6 py-2 rounded-xl bg-white/5">Cancel</button>
                  <button type="submit" className="px-8 py-2 bg-sst-gold text-black font-bold rounded-xl">Update Record</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-sst-teal" /></div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {faculty.map((f) => (
              <div key={f.id} className="glass-card rounded-2xl p-6 relative group overflow-hidden border border-white/5 hover:border-sst-gold/30 transition-all">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all flex gap-2">
                    <button 
                      onClick={() => startEdit(f)}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex items-center gap-5">
                    <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center text-4xl font-bold text-muted-foreground">
                      {f.name?.charAt(0) || "T"}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{f.name}</h3>
                      <p className="text-sst-gold font-medium text-sm flex items-center gap-1.5 mt-1">
                          <Briefcase className="w-4 h-4" /> {f.teacherProfile?.designation || "Faculty"}
                      </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" /> {f.email}
                    </div>
                    <div className="flex items-center gap-2">
                       {f.teacherProfile?.officeHours || "Hours TBA"}
                    </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
