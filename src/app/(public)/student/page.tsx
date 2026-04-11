import { BookOpen, Calendar, Download, FileText, Trophy, MapPin, ExternalLink } from "lucide-react";

export default function StudentCornerPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-outfit font-bold text-white mb-4">Student Corner</h1>
        <p className="text-muted-foreground max-w-2xl border-l-4 border-sst-teal pl-4 ml-1">
          Everything our current and prospective students need to know — from admission procedures to academic routines and proud achievements.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Access Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-6 group cursor-pointer hover:bg-white/[0.12] transition-colors border-l-4 border-l-sst-teal">
              <Calendar className="w-8 h-8 text-sst-teal mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-lg mb-2">Class Routines</h3>
              <p className="text-sm text-muted-foreground">View or download the latest class schedules for all semesters.</p>
            </div>
            <div className="glass-card rounded-2xl p-6 group cursor-pointer hover:bg-white/[0.12] transition-colors border-l-4 border-l-blue-500">
              <FileText className="w-8 h-8 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-lg mb-2">Exam Schedules</h3>
              <p className="text-sm text-muted-foreground">Upcoming midterm and final examination timetables.</p>
            </div>
            <div className="glass-card rounded-2xl p-6 group cursor-pointer hover:bg-white/[0.12] transition-colors border-l-4 border-l-sst-gold">
              <BookOpen className="w-8 h-8 text-sst-gold mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-lg mb-2">Academic Curriculum</h3>
              <p className="text-sm text-muted-foreground">Explore the full 4-year B.Sc program structure and syllabuses.</p>
            </div>
            <div className="glass-card rounded-2xl p-6 group cursor-pointer hover:bg-white/[0.12] transition-colors border-l-4 border-l-purple-500">
              <Download className="w-8 h-8 text-purple-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-lg mb-2">Results & Resources</h3>
              <p className="text-sm text-muted-foreground">Access semester results and essential academic forms.</p>
            </div>
          </div>

          {/* Achievements Highlight */}
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-sst-gold/10 rounded-lg text-sst-gold">
                <Trophy className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-outfit font-bold">Student Achievements</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 group">
                <div className="w-full sm:w-32 h-24 rounded-lg bg-white/5 border border-white/10 shrink-0 flex items-center justify-center overflow-hidden">
                  <span className="text-muted-foreground text-xs">Image Placeholder</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white group-hover:text-sst-teal transition-colors">ICPC Dhaka Regional 2025</h4>
                  <p className="text-sm text-sst-teal mb-2">Ranked 5th Nationwide</p>
                  <p className="text-sm text-muted-foreground">SSTU CSE team "CodeCrafters" secured an outstanding position among 200+ universities.</p>
                </div>
              </div>
              <div className="w-full h-px bg-white/5"></div>
              <div className="flex flex-col sm:flex-row gap-4 group">
                <div className="w-full sm:w-32 h-24 rounded-lg bg-white/5 border border-white/10 shrink-0 flex items-center justify-center overflow-hidden">
                  <span className="text-muted-foreground text-xs">Image Placeholder</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white group-hover:text-sst-teal transition-colors">National Hackathon 2025</h4>
                  <p className="text-sm text-sst-teal mb-2">Champions — FinTech Track</p>
                  <p className="text-sm text-muted-foreground">Developed an innovative AI-driven financial inclusion app for rural areas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Prospective Students */}
          <div className="glass-card rounded-2xl p-6 bg-gradient-to-b from-sst-teal/10 to-transparent border-t-4 border-t-sst-teal">
            <h2 className="text-xl font-outfit font-bold mb-4">Prospective Students</h2>
            <p className="text-sm text-muted-foreground mb-6">Want to join SSTU CSE? Learn about our admission process, requirements, and deadlines.</p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-sm text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-sst-teal mt-1.5 shrink-0" />
                <span>Minimum GPA 4.0 in HSC (Science)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-sst-teal mt-1.5 shrink-0" />
                <span>Admissions open twice a year (Spring/Fall)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-sst-teal mt-1.5 shrink-0" />
                <span>Written test in Physics, Math & English</span>
              </li>
            </ul>
            <button className="w-full py-2.5 rounded bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2">
              Admission Details <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Links */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-xl font-outfit font-bold mb-4">Essential Links</h2>
            <div className="space-y-2">
              <a href="#" className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition-colors border border-transparent hover:border-white/10">
                🎓 University Central Library
              </a>
              <a href="#" className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition-colors border border-transparent hover:border-white/10">
                🏛️ Hall Management System
              </a>
              <a href="#" className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition-colors border border-transparent hover:border-white/10">
                💻 ACM Programming Club
              </a>
              <a href="#" className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition-colors border border-transparent hover:border-white/10">
                🤖 Robotics & IoT Society
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
