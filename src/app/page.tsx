import Link from "next/link";
import { ArrowRight, BookOpen, Users, Trophy, ChevronRight, Calendar } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32 flex items-center justify-center">
        {/* Abstract Background */}
        <div className="absolute inset-0 -z-10 bg-[#0A1628]">
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 blur-[120px] opacity-40">
            <div className="h-[400px] w-[600px] rounded-full bg-sst-teal/30" />
          </div>
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 blur-[120px] opacity-40">
            <div className="h-[400px] w-[600px] rounded-full bg-blue-600/20" />
          </div>
        </div>

        <div className="container px-4 md:px-6 relative z-10 text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-sst-teal mb-4 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-sst-teal animate-pulse mr-2" />
            Admissions Open for Fall 2026
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-outfit font-bold tracking-tight text-white mb-6">
            Computer Science and Engineering Department <br />
            <span className="text-gradient">Official Portal</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
            Welcome to the Department of Computer Science & Engineering. We cultivate innovators, leaders, and problem solvers ready to tackle tomorrow's tech challenges.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/student" 
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-md bg-sst-teal px-8 text-sm font-medium text-black transition-colors hover:bg-sst-teal/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Explore Our Programs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link 
              href="/faculty" 
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-md border border-white/20 bg-white/5 px-8 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring glass-card"
            >
              Meet Our Faculty
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 gap-y-12 text-center">
          {[
            { label: "Active Students", value: "80+" },
            { label: "Expert Faculty", value: "4+" },
            { label: "Research Labs", value: "2" },
            { label: "Alumni Worldwide", value: "0" },
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <h4 className="text-4xl md:text-5xl font-outfit font-bold text-white">{stat.value}</h4>
              <p className="text-sm font-medium text-sst-teal uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links / Features */}
      <section className="py-24 container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-outfit font-bold mb-4">Portal Resources</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Access everything you need, whether you are a prospective student, current student, or faculty member.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <Link href="/notices" className="group glass-card rounded-2xl p-6 transition-all hover:border-sst-teal/50 hover:bg-white-[0.12]">
            <div className="h-12 w-12 rounded-lg bg-sst-teal/10 flex items-center justify-center mb-6 text-sst-teal group-hover:scale-110 transition-transform">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-outfit font-semibold mb-2 flex items-center justify-between">
              Notices & Announcements <ChevronRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity text-sst-teal" />
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">Stay updated with the latest department news, exam schedules, and holiday announcements.</p>
          </Link>

          {/* Card 2 */}
          <Link href="/events" className="group glass-card rounded-2xl p-6 transition-all hover:border-sst-teal/50 hover:bg-white-[0.12]">
            <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 transition-transform">
              <Calendar className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-outfit font-semibold mb-2 flex items-center justify-between">
              Events & Tech Fests <ChevronRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">Join upcoming seminars, workshops, and our annual signature CSE Tech Fest.</p>
          </Link>

          {/* Card 3 */}
          <Link href="/achievements" className="group glass-card rounded-2xl p-6 transition-all hover:border-sst-teal/50 hover:bg-white-[0.12]">
            <div className="h-12 w-12 rounded-lg bg-sst-gold/10 flex items-center justify-center mb-6 text-sst-gold group-hover:scale-110 transition-transform">
              <Trophy className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-outfit font-semibold mb-2 flex items-center justify-between">
              Achievements <ChevronRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity text-sst-gold" />
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">Explore the incredible milestones our students and faculty have achieved in global competitions.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
