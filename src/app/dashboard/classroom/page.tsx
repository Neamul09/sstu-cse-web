"use client";
import { useState, useEffect } from "react";
import { FileUp, Link as LinkIcon, DownloadCloud, FileText } from "lucide-react";

export default function ClassroomSystem() {
  const [courses, setCourses] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);

  useEffect(() => {
    // Mock Fetch
    setCourses([{ id: "clx12", code: "CSE-301", name: "Software Engineering" }]);
    setAssignments([
      { id: "ass1", title: "SRS Document Draft", dueDate: "2026-03-01", course: "CSE-301" }
    ]);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-outfit font-bold text-white mb-2">Classroom & Submissions</h1>
          <p className="text-muted-foreground">Manage course materials, assignments, and grades.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-outfit font-bold mb-6">Create New Resource</h2>
          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white/80 mb-2 block">Upload Type</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-sst-teal">
                <option value="ASSIGNMENT">Assignment</option>
                <option value="NOTE">Lecture Note</option>
                <option value="VIDEO">Video Link</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-white/80 mb-2 block">Title</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-sst-teal" placeholder="e.g., Assignment 1: UI Design" />
            </div>

            <div>
              <label className="text-sm font-medium text-white/80 mb-2 block">Due Date (If Assignment)</label>
              <input type="date" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-sst-teal" />
            </div>

            <button type="button" className="w-full bg-sst-teal py-3 rounded-lg text-black font-semibold hover:bg-sst-teal/90 transition-colors flex justify-center items-center gap-2 mt-4">
              <FileUp className="w-4 h-4" /> Publish Resource
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-outfit font-bold">Active Assignments</h2>
          
          {assignments.map((ass: any) => (
            <div key={ass.id} className="glass-card rounded-xl p-5 border-l-4 border-l-blue-500 hover:bg-white/[0.02] transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded font-bold tracking-wider">{ass.course}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3"/> Due: {ass.dueDate}</span>
              </div>
              <h3 className="font-bold text-lg text-white mb-4">{ass.title}</h3>
              
              <div className="flex gap-3">
                <button className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded text-sm transition-colors border border-white/10 flex items-center justify-center gap-2">
                   <DownloadCloud className="w-4 h-4" /> Submissions (12)
                </button>
                <button className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded text-sm transition-colors border border-white/10 flex items-center justify-center gap-2 text-sst-teal">
                   <FileText className="w-4 h-4" /> Start Grading
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Re-declaring Clock inside this file so it works
function Clock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
