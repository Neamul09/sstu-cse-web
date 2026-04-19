"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Plus, 
  Pencil, 
  Trash2, 
  Search, 
  Loader2, 
  ArrowLeft,
  GraduationCap,
  Building2,
  Briefcase
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

type Alumnus = {
  id: string;
  name: string;
  batch: string;
  designation: string | null;
  company: string | null;
  story: string | null;
  photo: string | null;
};

export default function AdminAlumniManagement() {
  const [alumni, setAlumni] = useState<Alumnus[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAlumnus, setEditingAlumnus] = useState<Alumnus | null>(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    batch: "",
    designation: "",
    company: "",
    story: "",
    photo: ""
  });

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      const res = await fetch("/api/admin/alumni");
      const data = await res.json();
      if (res.ok) setAlumni(data);
    } catch (error) {
      toast.error("Failed to load alumni");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingAlumnus ? "PATCH" : "POST";
    const body = editingAlumnus ? { id: editingAlumnus.id, ...formData } : formData;

    try {
      const res = await fetch("/api/admin/alumni", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        toast.success(editingAlumnus ? "Alumni updated" : "Alumni added");
        setShowForm(false);
        setEditingAlumnus(null);
        setFormData({ name: "", batch: "", designation: "", company: "", story: "", photo: "" });
        fetchAlumni();
      } else {
        toast.error("Operation failed");
      }
    } catch (error) {
      toast.error("Error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;

    try {
      const res = await fetch(`/api/admin/alumni?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Alumni deleted");
        fetchAlumni();
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      toast.error("Error occurred");
    }
  };

  const startEdit = (alumnus: Alumnus) => {
    setEditingAlumnus(alumnus);
    setFormData({
      name: alumnus.name,
      batch: alumnus.batch,
      designation: alumnus.designation || "",
      company: alumnus.company || "",
      story: alumnus.story || "",
      photo: alumnus.photo || ""
    });
    setShowForm(true);
  };

  const filteredAlumni = alumni.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    (a.company?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-10">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-outfit font-bold">Alumni Management</h1>
            <p className="text-muted-foreground text-sm">Add, update, or remove department graduates.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by name or company..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-sst-teal"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button 
            onClick={() => { setShowForm(true); setEditingAlumnus(null); }}
            className="w-full md:w-auto px-6 py-2.5 bg-sst-teal text-black font-bold rounded-xl hover:bg-sst-teal/90 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" /> Add New Alumnus
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass-card w-full max-w-2xl rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-outfit font-bold mb-6">{editingAlumnus ? "Edit Alumnus" : "Add New Alumnus"}</h2>
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-2">Full Name</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-sst-teal"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-2">Batch / Year</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-sst-teal"
                      placeholder="e.g. 14th (Batch 21)"
                      value={formData.batch}
                      onChange={(e) => setFormData({...formData, batch: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-2">Designation</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-sst-teal"
                      placeholder="e.g. Senior Dev"
                      value={formData.designation}
                      onChange={(e) => setFormData({...formData, designation: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-2">Company</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-sst-teal"
                      placeholder="e.g. Google"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-2">Success Story / Bio</label>
                    <textarea 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-sst-teal h-24 resize-none"
                      placeholder="Share a short summary of their achievements..."
                      value={formData.story}
                      onChange={(e) => setFormData({...formData, story: e.target.value})}
                    />
                  </div>
                </div>
                <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                   <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-sm font-medium">Cancel</button>
                   <button type="submit" className="px-8 py-2 rounded-xl bg-sst-teal text-black font-bold hover:bg-sst-teal/90">Save Record</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-sst-teal" /></div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni.map((alum) => (
              <div key={alum.id} className="glass-card rounded-2xl p-6 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                   <button onClick={() => startEdit(alum)} className="p-2 rounded-lg bg-white/10 hover:bg-sst-teal/20 text-white hover:text-sst-teal"><Pencil className="w-4 h-4" /></button>
                   <button onClick={() => handleDelete(alum.id)} className="p-2 rounded-lg bg-white/10 hover:bg-red-500/20 text-white hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                </div>
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl font-bold text-muted-foreground">
                      {alum.name[0]}
                   </div>
                   <div>
                      <h3 className="font-bold text-lg">{alum.name}</h3>
                      <p className="text-xs text-sst-teal font-medium flex items-center gap-1"><GraduationCap className="w-3 h-3"/> {alum.batch}</p>
                   </div>
                </div>
                <div className="space-y-2 mt-4">
                  {alum.company && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                       <Building2 className="w-4 h-4" /> <span>{alum.company}</span>
                    </div>
                  )}
                  {alum.designation && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                       <Briefcase className="w-4 h-4" /> <span>{alum.designation}</span>
                    </div>
                  )}
                </div>
                {alum.story && (
                  <p className="text-xs text-muted-foreground mt-4 line-clamp-3 italic">"{alum.story}"</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
