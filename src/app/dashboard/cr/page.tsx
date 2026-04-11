import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PlusCircle, ClipboardCheck, Users, CalendarDays, Bell } from "lucide-react";

export default async function CRDashboard() {
  const session = await auth();

  if (!session || session.user?.role !== "CR") {
    redirect("/dashboard");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-outfit font-bold text-white mb-2">Class Representative Portal</h1>
          <p className="text-muted-foreground">Manage your section's attendance, events, and notices.</p>
        </div>
        <button className="bg-sst-teal text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-sst-teal/90 transition-colors flex items-center gap-2">
          <PlusCircle className="w-4 h-4" /> Post Notice
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-card rounded-2xl p-6 border-l-4 border-l-sst-teal">
          <div className="flex items-center gap-3 mb-2">
            <Users className="text-sst-teal w-5 h-5" />
            <h3 className="font-semibold text-white">My Section</h3>
          </div>
          <p className="text-3xl font-bold mt-2">B-21</p>
          <p className="text-sm text-muted-foreground mt-1">45 Students</p>
        </div>
        
        <div className="glass-card rounded-2xl p-6 border-l-4 border-l-blue-500">
          <div className="flex items-center gap-3 mb-2">
            <ClipboardCheck className="text-blue-500 w-5 h-5" />
            <h3 className="font-semibold text-white">Attendance</h3>
          </div>
          <p className="text-xl font-bold mt-2">Pending</p>
          <p className="text-sm text-blue-400 mt-1 cursor-pointer hover:underline">
            <a href="/dashboard/attendance">Mark for today's lab</a>
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 border-l-4 border-l-sst-gold">
          <div className="flex items-center gap-3 mb-2">
            <CalendarDays className="text-sst-gold w-5 h-5" />
            <h3 className="font-semibold text-white">Class Events</h3>
          </div>
          <p className="text-3xl font-bold mt-2">1</p>
          <p className="text-sm text-muted-foreground mt-1">Farewell party</p>
        </div>

        <div className="glass-card rounded-2xl p-6 border-l-4 border-l-purple-500">
          <div className="flex items-center gap-3 mb-2">
            <Bell className="text-purple-500 w-5 h-5" />
            <h3 className="font-semibold text-white">My Notices</h3>
          </div>
          <p className="text-3xl font-bold mt-2">4</p>
          <p className="text-sm text-muted-foreground mt-1">Active announcements</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-outfit font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href="/dashboard/attendance" className="flex flex-col items-center justify-center p-6 rounded-xl bg-white/5 border border-white/10 hover:border-sst-teal transition-all text-center group">
              <ClipboardCheck className="w-8 h-8 text-white/50 group-hover:text-sst-teal mb-3 transition-colors" />
              <span className="font-semibold text-sm">Mark Attendance</span>
            </a>
            <button className="flex flex-col items-center justify-center p-6 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500 transition-all text-center group">
              <CalendarDays className="w-8 h-8 text-white/50 group-hover:text-blue-500 mb-3 transition-colors" />
              <span className="font-semibold text-sm">Schedule Event</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 rounded-xl bg-white/5 border border-white/10 hover:border-sst-gold transition-all text-center group">
              <Bell className="w-8 h-8 text-white/50 group-hover:text-sst-gold mb-3 transition-colors" />
              <span className="font-semibold text-sm">Announce Reschedule</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500 transition-all text-center group">
              <Users className="w-8 h-8 text-white/50 group-hover:text-purple-500 mb-3 transition-colors" />
              <span className="font-semibold text-sm">Student List</span>
            </button>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-outfit font-bold">Recent Notices You Posted</h2>
            <button className="text-sm text-sst-teal hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h4 className="font-semibold text-white">OS Lab Exam Syllabus</h4>
              <p className="text-sm text-muted-foreground mt-1">Syllabus includes Chapter 3 and 4 (Scheduling, Deadlocks).</p>
              <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                <span>Posted: Yesterday</span>
                <button className="text-red-400 hover:text-red-300">Delete</button>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h4 className="font-semibold text-white">Thursday Class Cancelled</h4>
              <p className="text-sm text-muted-foreground mt-1">Sir will not be able to take the 10 AM class.</p>
              <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                <span>Posted: 3 days ago</span>
                <button className="text-red-400 hover:text-red-300">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
