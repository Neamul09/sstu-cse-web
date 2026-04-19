import { MapPin, Briefcase, Mail, Building } from "lucide-react";
import Link from "next/link";

export default function AlumniProfilePage({ params }: { params: { id: string } }) {
  // Mock fetching alumni by ID
  const mockAlumni = {
    id: params.id,
    name: "Sumaiya Khan",
    batch: "Batch 14",
    gradYear: 2023,
    role: "Software Engineer II",
    company: "Google Core",
    location: "London, UK",
    bio: "Passionate about distributed systems and building scalable backend architectures. During my time at SSTU CSE, I was the President of the Programming Club, which shaped my analytical skills.",
    skills: ["Go", "C++", "Kubernetes", "System Design"],
    email: "sumaiya.k@email.com"
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/alumni" className="text-sst-teal text-sm hover:underline mb-8 inline-block">
        ← Back to Alumni Directory
      </Link>
      
      <div className="glass-card rounded-3xl overflow-hidden relative">
        <div className="h-48 bg-gradient-to-r from-sst-teal/20 to-blue-500/20 absolute top-0 w-full"></div>
        
        <div className="pt-32 px-8 pb-8 relative">
           <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-32 h-32 rounded-2xl bg-[#0f1115] border-4 border-[#0f1115] shrink-0 flex items-center justify-center text-5xl font-bold bg-white/5 text-muted-foreground shadow-xl z-10">
                 {mockAlumni.name[0]}
              </div>
              
              <div className="flex-1 mt-2">
                 <h1 className="text-3xl font-outfit font-bold text-white mb-2">{mockAlumni.name}</h1>
                 <p className="text-lg font-medium text-sst-teal mb-4">{mockAlumni.role} at {mockAlumni.company}</p>
                 
                 <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4"/> {mockAlumni.location}</div>
                    <div className="flex items-center gap-1.5"><Building className="w-4 h-4"/> {mockAlumni.batch} (Class of {mockAlumni.gradYear})</div>
                 </div>
              </div>
              
              <button className="bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-lg text-white font-medium flex items-center gap-2 transition-colors">
                <Mail className="w-4 h-4" /> Contact
              </button>
           </div>

           <div className="grid md:grid-cols-3 gap-8 mt-12 border-t border-white/10 pt-8">
              <div className="md:col-span-2 space-y-8">
                 <section>
                    <h2 className="text-xl font-bold font-outfit mb-4 text-white">About</h2>
                    <p className="text-white/70 leading-relaxed text-sm">
                      {mockAlumni.bio}
                    </p>
                 </section>
                 
                 <section>
                    <h2 className="text-xl font-bold font-outfit mb-4 text-white">Core Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {mockAlumni.skills.map((skill, i) => (
                        <span key={i} className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-md text-sm text-white/80">
                          {skill}
                        </span>
                      ))}
                    </div>
                 </section>
              </div>
              
              <div className="space-y-6">
                 <div className="glass-card p-5 rounded-xl border border-white/5 bg-white/[0.02]">
                    <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Briefcase className="w-4 h-4 text-sst-gold"/> Experience</h3>
                    <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                      {/* Timeline Item 1 */}
                      <div className="relative pl-6">
                         <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-sst-gold"></div>
                         <h4 className="text-sm font-bold text-white">{mockAlumni.role}</h4>
                         <p className="text-xs text-muted-foreground">{mockAlumni.company} • 2023 - Present</p>
                      </div>
                      {/* Timeline Item 2 */}
                      <div className="relative pl-6">
                         <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-white/20 border border-white/10"></div>
                         <h4 className="text-sm font-bold text-white">Backend Intern</h4>
                         <p className="text-xs text-muted-foreground">Pathao • 2022</p>
                      </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
