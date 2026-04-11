import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-outfit font-bold text-white mb-4">Contact & Information</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have questions regarding admissions, academics, or events? Reach out to the department office.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="glass-card rounded-2xl p-8">
          <h2 className="text-2xl font-outfit font-bold mb-6">Send us a Message</h2>
          <form className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Your Name</label>
                <input 
                  type="text" 
                  className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-sst-teal focus:outline-none" 
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Email Address</label>
                <input 
                  type="email" 
                  className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-sst-teal focus:outline-none" 
                  placeholder="johndoe@example.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Subject</label>
              <select className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-sst-teal focus:outline-none appearance-none">
                <option>Admission Inquiry</option>
                <option>Academic Issue</option>
                <option>Event Participation</option>
                <option>General Support</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Message</label>
              <textarea 
                rows={5}
                className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-sst-teal focus:outline-none resize-none" 
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <button type="button" className="bg-sst-teal w-full text-black font-semibold py-3 rounded flex items-center justify-center gap-2 hover:bg-sst-teal/90 transition-colors mt-6">
              Send Message <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Info & Map */}
        <div className="space-y-8">
          <div className="glass-card rounded-2xl p-8 bg-white/[0.02]">
            <h2 className="text-xl font-outfit font-bold mb-6 border-b border-white/10 pb-4">Our Office</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-sst-teal/10 flex items-center justify-center shrink-0">
                  <MapPin className="text-sst-teal w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Address</h4>
                  <p className="text-sm text-muted-foreground mt-1">Department of CSE Building, Block A, SSTU Campus, [City], Bangladesh</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Phone className="text-blue-500 w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Phone</h4>
                  <p className="text-sm text-muted-foreground mt-1">+880 1234 567890<br/>(9:00 AM - 4:00 PM, Sun-Thu)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-sst-gold/10 flex items-center justify-center shrink-0">
                  <Mail className="text-sst-gold w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Email</h4>
                  <p className="text-sm text-muted-foreground mt-1">head.cse@sstu.edu<br/>admin.cse@sstu.edu</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden h-64 border-white/10 relative flex items-center justify-center">
            {/* Embedded maps usually go here. Using a styled placeholder for now. */}
            <div className="absolute inset-0 bg-[#0c1a2c] opacity-50 z-10 pointer-events-none"></div>
            <div className="text-center z-20">
              <MapPin className="w-8 h-8 text-sst-teal mx-auto mb-2 animate-bounce" />
              <p className="font-outfit font-bold text-lg text-white">SSTU CSE Campus Map</p>
              <p className="text-xs text-sst-teal uppercase tracking-widest mt-1">[Map Embed Placeholder]</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
