import { BookOpen, Video, Link as LinkIcon, Download, Search, PlayCircle, FileText } from "lucide-react";

export default function MaterialsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-outfit font-bold text-white mb-4">Study Materials & Video Courses</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Access course syllabus, lecture slides, recorded classes, and special reference links curated by our faculty.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-3xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by course code (e.g., CSE-301) or topic..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-sst-teal transition-colors"
          />
        </div>
        <select className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-sst-teal/50 appearance-none min-w-[150px]">
          <option value="">All Semesters</option>
          <option value="1">1st Semester</option>
          <option value="2">2nd Semester</option>
          <option value="3">3rd Semester</option>
          <option value="4">4th Semester</option>
          <option value="5">5th Semester</option>
          <option value="6">6th Semester</option>
          <option value="7">7th Semester</option>
          <option value="8">8th Semester</option>
        </select>
        <select className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-sst-teal/50 appearance-none min-w-[150px]">
          <option value="">All Types</option>
          <option value="video">Video Lectures</option>
          <option value="notes">PDF Notes</option>
          <option value="links">Web Links</option>
        </select>
      </div>

      {/* Featured Video Courses */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
          <Video className="w-5 h-5 text-sst-teal" />
          <h2 className="text-2xl font-outfit font-bold">Featured Video Lecture Series</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Object Oriented Programming (Java)", code: "CSE-201", instructor: "Dr. Ayesha", tags: ["Beginner", "Core"] },
            { title: "Data Structures & Algorithms", code: "CSE-203", instructor: "Prof. Rahman", tags: ["Important", "Lab"] },
            { title: "Machine Learning Foundations", code: "CSE-401", instructor: "Dr. Kabir", tags: ["Advanced", "AI"] }
          ].map((course, i) => (
            <div key={i} className="glass-card rounded-2xl overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
              <div className="h-40 bg-white/5 border-b border-white/10 relative flex items-center justify-center">
                <PlayCircle className="w-12 h-12 text-white/50 group-hover:text-sst-teal transition-colors group-hover:scale-110 duration-300" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-black/50 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase text-sst-teal border border-sst-teal/20">
                    {course.code}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-1 leading-tight group-hover:text-sst-teal transition-colors">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">By {course.instructor}</p>
                <div className="flex gap-2">
                  {course.tags.map(tag => (
                    <span key={tag} className="bg-white/5 text-xs px-2 py-1 rounded text-white/70">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* PDF Notes & Slides */}
        <div>
          <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-outfit font-bold">Lecture Notes & Slides</h2>
          </div>
          
          <div className="space-y-4">
            {[
              { title: "Chapter 1: Intro to Operating Systems", code: "CSE-305", size: "2.4 MB" },
              { title: "Entity-Relationship Diagrams Guide", code: "CSE-303", size: "1.8 MB" },
              { title: "Software Development Life Cycles", code: "CSE-301", size: "3.1 MB" },
              { title: "Computer Networks: Transport Layer", code: "CSE-307", size: "4.5 MB" }
            ].map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-4 glass-card rounded-xl hover:bg-white/[0.12] transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-blue-500/10 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors text-sm sm:text-base">{doc.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{doc.code} • {doc.size}</p>
                  </div>
                </div>
                <button className="w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-blue-500/30 transition-colors">
                  <Download className="w-4 h-4 text-white/70 group-hover:text-blue-400" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Important External Links */}
        <div>
          <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
            <LinkIcon className="w-5 h-5 text-sst-gold" />
            <h2 className="text-xl font-outfit font-bold">Important Reference Links</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "GitHub Education Pack", desc: "Free developer tools for students" },
              { title: "LeetCode Study Plans", desc: "Curated list of problems for interviews" },
              { title: "AWS Educate", desc: "Cloud computing resources and credits" },
              { title: "W3Schools Web Dev", desc: "HTML, CSS, and JS references" },
              { title: "IEEE Xplore", desc: "Digital library for journal articles" },
              { title: "GeeksforGeeks", desc: "Computer science portal for geeks" }
            ].map((link, i) => (
              <a key={i} href="#" className="glass-card rounded-xl p-4 hover:border-sst-gold/50 hover:bg-white/[0.12] transition-all group">
                <h4 className="font-semibold text-white group-hover:text-sst-gold text-sm mb-1">{link.title}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2">{link.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
