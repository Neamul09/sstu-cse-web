"use client";

import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Award, 
  PlusCircle, 
  Trash2, 
  Trophy,
  Loader2,
  X 
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

type Achievement = {
  id: string;
  title: string;
  description: string;
  category: string | null;
  date: string;
};

export default function AdminAchievementManagement() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    category: "UNIVERSITY",
  });

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const res = await fetch("/api/admin/achievements");
      const data = await res.json();
      if (res.ok) setAchievements(data);
    } catch (error) {
      toast.error("Failed to load achievements");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/achievements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Achievement recorded");
        setShowModal(false);
        setFormData({ title: "", description: "", date: "", category: "UNIVERSITY" });
        fetchAchievements();
      }
    } catch (error) {
      toast.error("Failed to record achievement");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/admin/achievements?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Record deleted");
        fetchAchievements();
      }
    } catch (error) {
      toast.error("Delete failed");
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
            <h1 className="text-3xl font-outfit font-bold text-sst-gold flex items-center gap-3">
              <Trophy className="w-8 h-8"/> Hall of Fame
            </h1>
            <p className="text-muted-foreground text-sm">Recognize and record milestones achieved by department members.</p>
          </div>
        </div>

        <div className="flex justify-end mb-8">
           <button 
             onClick={() => setShowModal(true)}
             className="px-6 py-2.5 bg-sst-gold text-black font-bold rounded-xl hover:bg-sst-gold/90 transition-all flex items-center gap-2"
           >
            <PlusCircle className="w-5 h-5" /> Add Milestone
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass-card w-full max-w-lg rounded-3xl p-8 border border-white/10 relative">
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-full"><X className="w-5 h-5"/></button>
              <h2 className="text-2xl font-outfit font-bold mb-6 text-sst-gold">New Achievement Record</h2>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground block mb-2">Achievement Title</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-sst-gold"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div>
                   <label className="text-xs font-bold uppercase text-muted-foreground block mb-2">Category</label>
                   <select 
                     className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none"
                     value={formData.category}
                     onChange={(e) => setFormData({...formData, category: e.target.value})}
                   >
                     <option value="UNIVERSITY">University Level</option>
                     <option value="NATIONAL">National Competition</option>
                     <option value="INTERNATIONAL">International Award</option>
                     <option value="RESEARCH">Research Publication</option>
                   </select>
                </div>
                <div>
                   <label className="text-xs font-bold uppercase text-muted-foreground block mb-2">Date Awarded</label>
                   <input 
                     required
                     type="date" 
                     className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none"
                     value={formData.date}
                     onChange={(e) => setFormData({...formData, date: e.target.value})}
                   />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground block mb-2">Description</label>
                  <textarea 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm h-32 resize-none focus:outline-none"
                    placeholder="Brief summary of the achievement..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
                <button type="submit" className="w-full py-3 bg-sst-gold text-black font-bold rounded-xl mt-4">Save Milestone</button>
              </form>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-sst-gold" /></div>
        ) : (
          <div className="grid gap-6">
            {achievements.map((a) => (
              <div key={a.id} className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-sst-gold/30 transition-all">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-sst-gold/10 flex items-center justify-center text-sst-gold shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                       <h3 className="font-bold text-lg text-white group-hover:text-sst-gold transition-colors">{a.title}</h3>
                       <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-muted-foreground uppercase tracking-widest">{a.category}</span>
                    </div>
                    <p className="text-sm text-muted-foreground max-w-2xl">{a.description}</p>
                    <p className="text-xs text-muted-foreground/50 mt-2">{new Date(a.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(a.id)}
                  className="p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            {achievements.length === 0 && <div className="text-center py-20 text-muted-foreground">No records in the Hall of Fame yet.</div>}
          </div>
        )}
      </div>
    </div>
  );
}
