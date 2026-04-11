import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Book, CheckCircle, FileText, Calendar } from "lucide-react";

export default async function StudentDashboard() {
  const session = await auth();

  if (!session || session.user?.role !== "STUDENT" && session.user?.role !== "CR") {
    redirect("/dashboard");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-outfit font-bold text-white mb-2">Student Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {session.user?.name || "Student"}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-card rounded-2xl p-6 border-l-4 border-l-sst-teal">
          <div className="flex items-center gap-3 mb-2">
            <Book className="text-sst-teal w-5 h-5" />
            <h3 className="font-semibold text-white">Current Semester</h3>
          </div>
          <p className="text-3xl font-bold mt-2">6th</p>
          <p className="text-sm text-muted-foreground mt-1">Spring 2026</p>
        </div>
        
        <div className="glass-card rounded-2xl p-6 border-l-4 border-l-blue-500">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="text-blue-500 w-5 h-5" />
            <h3 className="font-semibold text-white">Avg Attendance</h3>
          </div>
          <p className="text-3xl font-bold mt-2">85%</p>
          <p className="text-sm text-muted-foreground mt-1">Across 5 courses</p>
        </div>

        <div className="glass-card rounded-2xl p-6 border-l-4 border-l-sst-gold">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="text-sst-gold w-5 h-5" />
            <h3 className="font-semibold text-white">Assignments</h3>
          </div>
          <p className="text-3xl font-bold mt-2">2</p>
          <p className="text-sm text-muted-foreground mt-1">Pending this week</p>
        </div>

        <div className="glass-card rounded-2xl p-6 border-l-4 border-l-purple-500">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="text-purple-500 w-5 h-5" />
            <h3 className="font-semibold text-white">Next Exam</h3>
          </div>
          <p className="text-xl font-bold mt-2">Software Eng.</p>
          <p className="text-sm text-muted-foreground mt-1">In 12 days</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-outfit font-bold mb-4">My Enrolled Courses</h2>
          <div className="space-y-4">
            {/* Placeholder data, will fetch from DB later */}
            {['CSE-301: Software Engineering', 'CSE-303: Database Systems', 'CSE-305: Operating Systems'].map((course, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-sst-teal/50 transition-colors">
                <div>
                  <h4 className="font-semibold text-white">{course}</h4>
                  <p className="text-sm text-muted-foreground">3 Credits • Dr. Example</p>
                </div>
                <button className="text-sst-teal text-sm hover:underline">View Materials</button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-outfit font-bold mb-4">Recent Announcements (Batch 21)</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border-l-2 border-l-sst-teal">
              <h4 className="font-semibold text-white text-sm">Lab Final Rescheduled</h4>
              <p className="text-xs text-muted-foreground mt-1">The OS lab final has been moved to Thursday at 10 AM.</p>
              <p className="text-[10px] text-muted-foreground mt-2 opacity-50">Posted 2 hours ago by CR</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border-l-2 border-l-blue-500">
              <h4 className="font-semibold text-white text-sm">Assignment 3 Deadline</h4>
              <p className="text-xs text-muted-foreground mt-1">Don't forget to submit Assignment 3 on Google Classroom by tonight.</p>
              <p className="text-[10px] text-muted-foreground mt-2 opacity-50">Posted 1 day ago by Faculty</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
