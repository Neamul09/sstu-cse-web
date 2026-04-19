import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Users, BookOpen, Upload, BellRing } from "lucide-react";

export default async function TeacherDashboard() {
  const session = await auth();

  if (!session || session.user?.role !== "TEACHER" && session.user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-outfit font-bold text-white mb-2">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Prof. {session.user?.name}</p>
        </div>
        <button className="bg-sst-teal text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-sst-teal/90 transition-colors flex items-center gap-2">
          <Upload className="w-4 h-4" /> Upload Material
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="text-sst-teal w-5 h-5" />
            <h3 className="font-semibold text-white">Active Courses</h3>
          </div>
          <p className="text-3xl font-bold mt-2">3</p>
        </div>
        
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="text-blue-500 w-5 h-5" />
            <h3 className="font-semibold text-white">Total Students</h3>
          </div>
          <p className="text-3xl font-bold mt-2">145</p>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <BellRing className="text-sst-gold w-5 h-5" />
            <h3 className="font-semibold text-white">Assignments to Grade</h3>
          </div>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-outfit font-bold mb-4">Manage My Classes</h2>
          <div className="space-y-4">
            {['CSE-301: Software Engineering (Batch 21)', 'CSE-401: Artificial Intelligence (Batch 20)'].map((course, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 gap-4">
                <div>
                  <h4 className="font-semibold text-white">{course}</h4>
                  <p className="text-sm text-muted-foreground mt-1">Next class: Tomorrow, 10:00 AM</p>
                </div>
                <div className="flex gap-2">
                  <a href="/dashboard/classroom" className="text-xs bg-sst-teal/20 text-sst-teal hover:bg-sst-teal/30 px-3 py-1.5 rounded transition-colors flex items-center gap-1">Classroom</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-outfit font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-sst-teal text-left transition-all">
              <h4 className="font-semibold text-white mb-1">Post Notice</h4>
              <p className="text-xs text-muted-foreground">Announce to your classes</p>
            </button>
            <button className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500 text-left transition-all">
              <h4 className="font-semibold text-white mb-1">Create Assignment</h4>
              <p className="text-xs text-muted-foreground">Set new tasks</p>
            </button>
            <button className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-sst-gold text-left transition-all">
              <h4 className="font-semibold text-white mb-1">Update Profile</h4>
              <p className="text-xs text-muted-foreground">Edit bio & publications</p>
            </button>
            <button className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500 text-left transition-all">
              <h4 className="font-semibold text-white mb-1">View Schedule</h4>
              <p className="text-xs text-muted-foreground">Check weekly routine</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
