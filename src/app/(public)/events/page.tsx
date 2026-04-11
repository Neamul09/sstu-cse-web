import { Calendar as CalendarIcon, MapPin, Clock } from "lucide-react";

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-outfit font-bold text-white mb-4">Department Events</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join our upcoming tech fests, seminars, and workshops. Experience the vibrant culture of SSTU CSE.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Upcoming Events */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
            </div>
            <h2 className="text-2xl font-outfit font-bold">Upcoming Events</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "National Hackathon 2026",
                date: "March 15-16, 2026",
                time: "9:00 AM - 6:00 PM (Next Day)",
                location: "CSE Building, SSTU Campus",
                desc: "36-hour coding marathon focused on Smart City solutions. Open to all universities.",
                tag: "Hackathon",
                color: "bg-sst-teal/20 text-sst-teal border-sst-teal/30"
              },
              {
                title: "AI in Healthcare Seminar",
                date: "April 05, 2026",
                time: "2:00 PM - 5:00 PM",
                location: "Virtual (Zoom)",
                desc: "Guest lecture by Dr. Anisur Rahman on the integration of Deep Learning in diagnostic imaging.",
                tag: "Seminar",
                color: "bg-blue-500/20 text-blue-400 border-blue-500/30"
              }
            ].map((event, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 relative overflow-hidden group hover:border-white/30 transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -z-10 group-hover:bg-white/10 transition-colors"></div>
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-2.5 py-1 text-xs font-bold rounded border ${event.color} uppercase tracking-wider`}>
                    {event.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sst-teal transition-colors">{event.title}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarIcon className="w-4 h-4 text-white/50" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-white/50" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-white/50" />
                    {event.location}
                  </div>
                </div>
                
                <p className="text-sm text-white/70">{event.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Past Events / Gallery Preview */}
        <div>
          <h2 className="text-2xl font-outfit font-bold mb-8">Past Highlights</h2>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass-card rounded-xl p-2 cursor-pointer group">
              <div className="h-40 bg-white/5 rounded-lg mb-3 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                  <span className="text-white font-medium border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm">View Gallery</span>
                </div>
                <span className="text-muted-foreground text-xs">Image Placeholder</span>
              </div>
              <h4 className="font-bold px-2 text-sm text-white">CSE Fest 2025</h4>
              <p className="text-xs text-muted-foreground px-2 pb-2 mt-1">December 2025</p>
            </div>
            
            <div className="glass-card rounded-xl p-2 cursor-pointer group">
              <div className="h-40 bg-white/5 rounded-lg mb-3 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                  <span className="text-white font-medium border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm">View Gallery</span>
                </div>
                <span className="text-muted-foreground text-xs">Image Placeholder</span>
              </div>
              <h4 className="font-bold px-2 text-sm text-white">Inter-Varsity Programming</h4>
              <p className="text-xs text-muted-foreground px-2 pb-2 mt-1">August 2025</p>
            </div>

            <div className="glass-card rounded-xl p-2 cursor-pointer group">
              <div className="h-40 bg-white/5 rounded-lg mb-3 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                  <span className="text-white font-medium border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm">View Gallery</span>
                </div>
                <span className="text-muted-foreground text-xs">Image Placeholder</span>
              </div>
              <h4 className="font-bold px-2 text-sm text-white">CyberSecurity Workshop</h4>
              <p className="text-xs text-muted-foreground px-2 pb-2 mt-1">May 2025</p>
            </div>
            
            <div className="glass-card rounded-xl p-2 cursor-pointer flex items-center justify-center flex-col text-center hover:bg-white/[0.12] transition-colors border-dashed border-2">
              <CalendarIcon className="w-8 h-8 text-muted-foreground mb-2" />
              <span className="text-sm font-medium text-white/70">View All<br/>Past Events</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
