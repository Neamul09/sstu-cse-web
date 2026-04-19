"use client";

import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Bell, 
  PlusCircle, 
  Trash2, 
  Calendar, 
  Lock, 
  Unlock,
  Loader2,
  X 
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

type Notice = {
  id: string;
  title: string;
  body: string;
  category: string;
  pinned: boolean;
  createdAt: string;
};

export default function AdminNoticeManagement() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    category: "GENERAL",
    pinned: false,
  });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await fetch("/api/admin/notices");
      const data = await res.json();
      if (res.ok) setNotices(data);
    } catch (error) {
      toast.error("Failed to load notices");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Notice published");
        setShowModal(false);
        setFormData({ title: "", body: "", category: "GENERAL", pinned: false });
        fetchNotices();
      }
    } catch (error) {
      toast.error("Failed to create notice");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/admin/notices?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Notice deleted");
        fetchNotices();
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
            <h1 className="text-3xl font-outfit font-bold">Notice Management</h1>
            <p className="text-muted-foreground text-sm">Create, pin, and manage announcements across the department.</p>
          </div>
        </div>

        <div className="flex justify-end mb-8">
           <button 
             onClick={() => setShowModal(true)}
             className="px-6 py-2.5 bg-sst-teal text-black font-bold rounded-xl hover:bg-sst-teal/90 transition-all flex items-center gap-2"
           >
            <PlusCircle className="w-5 h-5" /> Issue Global Notice
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass-card w-full max-w-lg rounded-3xl p-8 border border-white/10 relative">
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-full"><X className="w-5 h-5"/></button>
              <h2 className="text-2xl font-outfit font-bold mb-6">Issue New Notice</h2>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground block mb-2">Title</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-sst-teal"
                    placeholder="Notice Title"
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
                    <option value="GENERAL">General</option>
                    <option value="EXAM">Exam</option>
                    <option value="ADMISSION">Admission</option>
                    <option value="EVENT">Event</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground block mb-2">Message Body</label>
                  <textarea 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm h-32 resize-none focus:outline-none"
                    placeholder="Enter announcement details..."
                    value={formData.body}
                    onChange={(e) => setFormData({...formData, body: e.target.value})}
                  />
                </div>
                <div className="flex items-center gap-2">
                   <input 
                     type="checkbox" 
                     id="pinned" 
                     className="rounded border-white/10 bg-white/5" 
                     checked={formData.pinned}
                     onChange={(e) => setFormData({...formData, pinned: e.target.checked})}
                   />
                   <label htmlFor="pinned" className="text-sm font-medium">Pin this notice to top</label>
                </div>
                <button type="submit" className="w-full py-3 bg-sst-teal text-black font-bold rounded-xl mt-4">Publish Announcements</button>
              </form>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-sst-teal" /></div>
        ) : (
          <div className="glass-card rounded-3xl overflow-hidden border border-white/10">
            <table className="w-full text-left">
                <thead className="bg-white/5 text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-white/10">
                  <tr>
                      <th className="p-6">Content</th>
                      <th className="p-6">Category</th>
                      <th className="p-6">Date</th>
                      <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {notices.map((n) => (
                      <tr key={n.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="p-6">
                            <div className="flex items-center gap-3">
                              {n.pinned ? <Lock className="w-4 h-4 text-sst-gold" /> : <Unlock className="w-4 h-4 text-muted-foreground/30" />}
                              <span className="font-bold text-white group-hover:text-sst-teal transition-colors">{n.title}</span>
                            </div>
                        </td>
                        <td className="p-6">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 uppercase tracking-widest">{n.category}</span>
                        </td>
                        <td className="p-6">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="w-4 h-4" /> {new Date(n.createdAt).toLocaleDateString()}
                            </div>
                        </td>
                        <td className="p-6 text-right">
                            <button 
                              onClick={() => handleDelete(n.id)}
                              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                        </td>
                      </tr>
                  ))}
                </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
