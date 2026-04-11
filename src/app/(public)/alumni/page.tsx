import { Briefcase, Building2, MapPin } from "lucide-react";

export default function AlumniPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-outfit font-bold text-white mb-4">SSTU CSE Alumni</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our graduates are shaping the global tech industry, leading innovations at top companies worldwide.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-outfit font-bold mb-8 border-l-4 border-l-sst-teal pl-4">Alumni Spotlight</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass-card rounded-2xl p-8 flex flex-col md:flex-row gap-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sst-teal/5 rounded-bl-[100px] -z-10 group-hover:bg-sst-teal/10 transition-colors"></div>
            <div className="w-24 h-24 rounded-full bg-white/10 shrink-0 border border-white/20 flex items-center justify-center text-4xl font-bold text-muted-foreground">S</div>
            <div>
              <h3 className="text-xl font-bold font-outfit mb-1">Sumaiya Khan</h3>
              <p className="text-sst-teal font-medium text-sm mb-4">Batch 14 • Software Engineer II at Google Core</p>
              <p className="text-sm text-muted-foreground italic mb-4">
                "The rigorous data structures course and competitive programming culture at SSTU CSE built the exact foundation I needed to clear FAANG interviews."
              </p>
            </div>
          </div>
          
          <div className="glass-card rounded-2xl p-8 flex flex-col md:flex-row gap-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-[100px] -z-10 group-hover:bg-blue-500/10 transition-colors"></div>
            <div className="w-24 h-24 rounded-full bg-white/10 shrink-0 border border-white/20 flex items-center justify-center text-4xl font-bold text-muted-foreground">T</div>
            <div>
              <h3 className="text-xl font-bold font-outfit mb-1">Tanvir Ahmed</h3>
              <p className="text-blue-500 font-medium text-sm mb-4">Batch 11 • CTO at Pathao</p>
              <p className="text-sm text-muted-foreground italic mb-4">
                "The collaborative environment and challenging projects prepared me to build and scale real-world systems impacting millions of users."
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-outfit font-bold mb-8 border-l-4 border-l-sst-gold pl-4">Alumni Directory</h2>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input 
            type="text" 
            placeholder="Search alumni by name or company..." 
            className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-sst-gold"
          />
          <select className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none min-w-[150px]">
            <option>All Batches</option>
            <option>Batch 16 (2025)</option>
            <option>Batch 15 (2024)</option>
            <option>Batch 14 (2023)</option>
            <option>Older</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { tag: "F", name: "Faham Khan", company: "Microsoft", role: "SDE", loc: "Seattle, WA" },
            { tag: "N", name: "Nusrat Jahan", company: "Optimizely", role: "Frontend Dev", loc: "Dhaka, BD" },
            { tag: "H", name: "Hasan Mahmud", company: "Amazon", role: "Cloud Architect", loc: "Berlin, DE" },
            { tag: "R", name: "Rafida Islam", company: "Samsung R&D", role: "AI Researcher", loc: "Dhaka, BD" },
            { tag: "S", name: "Shakib Al", company: "TigerIT", role: "Backend Eng.", loc: "Dhaka, BD" },
            { tag: "M", name: "Mahfuz Rahman", company: "Agoda", role: "SDE II", loc: "Bangkok, TH" },
          ].map((alumnus, i) => (
            <div key={i} className="glass-card rounded-xl p-6 group hover:border-white/30 transition-all flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center font-bold text-xl text-white/50 border border-white/10 group-hover:border-sst-gold/50 group-hover:text-sst-gold transition-colors shrink-0">
                {alumnus.tag}
              </div>
              <div className="overflow-hidden">
                <h4 className="font-bold text-white truncate">{alumnus.name}</h4>
                <div className="flex items-center gap-1.5 text-xs text-sst-gold mt-1">
                  <Briefcase className="w-3 h-3" /> <span className="truncate">{alumnus.role} @ {alumnus.company}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                  <MapPin className="w-3 h-3" /> <span className="truncate">{alumnus.loc}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
