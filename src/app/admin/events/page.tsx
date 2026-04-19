"use client";

import { ArrowLeft, CalendarPlus, Trash2, MapPin, Clock, Edit3 } from "lucide-react";
import Link from "next/link";

export default function AdminEventManagement() {
  const mockEvents = [
    { id: 1, title: "Annual Science Fair 2026", date: "April 15, 2026", time: "09:00 AM", location: "Central Campus Plaza" },
    { id: 2, title: "Alumni Homecoming Dinner", date: "May 20, 2026", time: "07:00 PM", location: "Auditorium Main Hall" },
    { id: 3, title: "Programming Contest: CodeRush", date: "March 22, 2026", time: "10:00 AM", location: "Lab 302 & 304" },
  ];

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
           <button className="px-6 py-2.5 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20">
            <CalendarPlus className="w-5 h-5" /> Schedule Activity
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
           {mockEvents.map((event) => (
              <div key={event.id} className="glass-card rounded-3xl p-8 border border-white/10 relative group overflow-hidden">
                 <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all flex gap-3">
                   <button className="p-3 rounded-xl bg-white/10 hover:bg-blue-500/20 text-white hover:text-blue-400 transition-all">
                      <Edit3 className="w-5 h-5" />
                   </button>
                   <button className="p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all">
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
                          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {event.date}</div>
                       </div>
                       <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                          <span className="text-[10px] font-bold uppercase text-white/30 tracking-wider">Timing</span>
                          <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {event.time}</div>
                       </div>
                       <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                          <span className="text-[10px] font-bold uppercase text-white/30 tracking-wider">Venue</span>
                          <div className="flex items-center gap-2 line-clamp-1"><MapPin className="w-3.5 h-3.5" /> {event.location}</div>
                       </div>
                    </div>
                 </div>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
}
