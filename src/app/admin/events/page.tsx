"use client";

import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  CalendarPlus, 
  Trash2, 
  MapPin, 
  Clock, 
  Edit3,
  Loader2,
  X 
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string | null;
  location: string | null;
  imageUrl: string | null;
};

export default function AdminEventManagement() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    imageUrl: "",
    category: "GENERAL",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/admin/events");
      const data = await res.json();
      if (res.ok) setEvents(data);
    } catch (error) {
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Event scheduled");
        setShowModal(false);
        setFormData({ title: "", description: "", date: "", time: "", location: "", imageUrl: "", category: "GENERAL" });
        fetchEvents();
      }
    } catch (error) {
      toast.error("Failed to schedule event");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this event?")) return;
    try {
      const res = await fetch(`/api/admin/events?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Event removed");
        fetchEvents();
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
            <h1 className="text-3xl font-outfit font-bold">Event Coordination</h1>
            <p className="text-muted-foreground text-sm">Schedule and promote upcoming departmental activities.</p>
          </div>
        </div>

        <div className="flex justify-end mb-8">
           <button 
             onClick={() => setShowModal(true)}
             className="px-6 py-2.5 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
           >
            <CalendarPlus className="w-5 h-5" /> Schedule Activity
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass-card w-full max-w-2xl rounded-3xl p-8 border border-white/10 relative">
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-full"><X className="w-5 h-5"/></button>
              <h2 className="text-2xl font-outfit font-bold mb-6">Schedule Department Event</h2>
              <form onSubmit={handleCreate} className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground block mb-2">Event Title</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground block mb-2">Date</label>
                    <input 
                      required
                      type="date" 
                      className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground block mb-2">Venue / Location</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none"
                      placeholder="e.g. Auditorium"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground block mb-2">Time</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none"
                      placeholder="e.g. 10:00 AM"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground block mb-2">Detailed Description</label>
                    <textarea 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm h-24 resize-none focus:outline-none"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                </div>
                <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                  <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2 rounded-xl bg-white/5 border border-white/10">Cancel</button>
                  <button type="submit" className="px-8 py-2 bg-blue-500 text-white font-bold rounded-xl">Save Event</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-sst-teal" /></div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {events.map((event) => (
                <div key={event.id} className="glass-card rounded-3xl p-8 border border-white/10 relative group overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all flex gap-3">
                    <button className="p-3 rounded-xl bg-white/10 hover:bg-blue-500/20 text-white hover:text-blue-400 transition-all">
                        <Edit3 className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(event.id)}
                      className="p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex flex-col gap-6">
                      <div>
                        <div className="w-fit px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-bold text-[10px] uppercase tracking-widest mb-4">
                            Upcoming Event
                        </div>
                        <h3 className="text-2xl font-outfit font-bold mb-2 group-hover:text-blue-400 transition-colors">{event.title}</h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/5 pt-6">
                        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                            <span className="text-[10px] font-bold uppercase text-white/30 tracking-wider">Date</span>
                            <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {new Date(event.date).toLocaleDateString()}</div>
                        </div>
                        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                            <span className="text-[10px] font-bold uppercase text-white/30 tracking-wider">Timing</span>
                            <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {event.time || "TBA"}</div>
                        </div>
                        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                            <span className="text-[10px] font-bold uppercase text-white/30 tracking-wider">Venue</span>
                            <div className="flex items-center gap-2 line-clamp-1"><MapPin className="w-3.5 h-3.5" /> {event.location || "Online"}</div>
                        </div>
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
