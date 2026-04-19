import { Microscope, FileText, ArrowRight, BookOpen } from "lucide-react";

export default function ResearchPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-outfit font-bold text-white mb-4">Research & Publications</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover the groundbreaking research and innovation happening at the SSTU CSE department.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Featured Projects Column */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-outfit font-bold border-l-4 border-l-sst-gold pl-4 text-white">Featured Projects</h2>
          
          {[
            {
              title: "AI-Driven Crop Disease Prediction in Bangladesh",
              investigators: "Dr. Anisur Rahman, Nusrat Jahan (Batch 13)",
              domain: "Machine Learning / Agriculture Tech",
              desc: "A deep learning model utilizing drone imagery to predict and classify early-stage crop diseases specific to the delta region.",
              status: "Ongoing",
            },
            {
              title: "Decentralized Voting System using Smart Contracts",
              investigators: "Prof. Hasan Mahmud, Team Genesis (Batch 14)",
              domain: "Blockchain / Security",
              desc: "Implementing a highly secure, Ethereum-based voting mechanism intended for future university and local scale elections.",
              status: "Published",
            }
          ].map((proj, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 group hover:border-white/30 transition-all flex flex-col md:flex-row gap-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-sst-gold/5 rounded-bl-[100px] -z-10 group-hover:bg-sst-gold/10 transition-colors"></div>
               <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-sst-gold/30">
                 <Microscope className="w-8 h-8 text-sst-gold/70 group-hover:text-sst-gold transition-colors" />
               </div>
               <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs bg-white/10 text-white/70 px-2.5 py-1 rounded-full font-medium tracking-wide">
                      {proj.domain}
                    </span>
                    <span className={`text-xs px-2.5 py-1 rounded font-bold ${proj.status === 'Ongoing' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                      {proj.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{proj.title}</h3>
                  <p className="text-sm text-sst-gold mb-3 font-medium">Investigators: {proj.investigators}</p>
                  <p className="text-sm text-muted-foreground mb-4">{proj.desc}</p>
                  <button className="text-sm text-white/50 hover:text-white flex items-center gap-1 transition-colors">
                    View Details <ArrowRight className="w-4 h-4" />
                  </button>
               </div>
            </div>
          ))}
        </div>

        {/* Recent Publications */}
        <div className="space-y-6">
           <h2 className="text-2xl font-outfit font-bold border-l-4 border-l-sst-teal pl-4 text-white">Recent Publications</h2>
           <div className="glass-card rounded-2xl p-6">
              <div className="space-y-6">
                {[
                  {
                    paper: "Optimizing Neural Networks for Edge Devices",
                    conf: "IEEE Conference on AI, 2025",
                    author: "Dr. Sabiha Khatun"
                  },
                  {
                    paper: "Data Privacy in Smart Healthcare Grids",
                    conf: "International Journal of Cyber Security",
                    author: "Dr. Rakib Hasan"
                  },
                  {
                    paper: "NLP for Bengali Language Sentiment Analysis",
                    conf: "ACL Findings 2025",
                    author: "Prof. Faruk Ahmed"
                  }
                ].map((pub, i) => (
                  <div key={i} className="group border-b border-white/10 pb-5 last:border-0 last:pb-0">
                    <h4 className="font-bold text-white mb-2 leading-snug group-hover:text-sst-teal transition-colors flex items-start gap-2">
                      <FileText className="w-4 h-4 shrink-0 mt-0.5" />
                      {pub.paper}
                    </h4>
                    <p className="text-xs text-sst-teal mb-1 font-medium">{pub.conf}</p>
                    <p className="text-xs text-muted-foreground italic flex items-center gap-1">
                      <BookOpen className="w-3 h-3" /> {pub.author}
                    </p>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
