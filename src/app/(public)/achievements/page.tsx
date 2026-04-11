import { Trophy, Star, Target, GraduationCap } from "lucide-react";

export default function AchievementsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-outfit font-bold text-white mb-4">Hall of Fame</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Celebrating the exceptional milestones, competition victories, and research breakthroughs by our students and faculty.
        </p>
      </div>

      <div className="space-y-24">
        {/* Student Achievements */}
        <section>
          <div className="flex flex-col items-center mb-12">
            <div className="w-16 h-16 rounded-full bg-sst-gold/10 flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-sst-gold" />
            </div>
            <h2 className="text-3xl font-outfit font-bold">Student Triumphs</h2>
            <div className="w-24 h-1 bg-sst-gold rounded-full mt-4 opacity-50"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card rounded-2xl overflow-hidden group">
              <div className="h-48 bg-white/5 border-b border-white/10 flex items-center justify-center relative">
                 <span className="text-muted-foreground text-sm">Winner Image Placeholder</span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold font-outfit text-white group-hover:text-sst-gold transition-colors">NASA Space Apps Challenge</h3>
                  <span className="bg-sst-gold/20 text-sst-gold text-xs px-2 py-1 rounded font-bold">2025</span>
                </div>
                <p className="text-sst-gold text-sm font-medium mb-4">Global Finalists</p>
                <p className="text-sm text-muted-foreground">Team 'AstroCoders' developed an interactive 3D mapping tool for planetary surfaces, securing a spot in the top 40 global finalists out of 5,000+ teams.</p>
              </div>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden group">
              <div className="h-48 bg-white/5 border-b border-white/10 flex items-center justify-center relative">
                 <span className="text-muted-foreground text-sm">Winner Image Placeholder</span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold font-outfit text-white group-hover:text-sst-gold transition-colors">National Cyber Drill</h3>
                  <p className="bg-sst-gold/20 text-sst-gold text-xs px-2 py-1 rounded font-bold">2024</p>
                </div>
                <p className="text-sst-gold text-sm font-medium mb-4">1st Runner Up</p>
                <p className="text-sm text-muted-foreground">Defending against simulated critical infrastructure attacks, our cyber defense team showcased unparalleled skills in reverse engineering and incident response.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Faculty Achievements */}
        <section>
          <div className="flex flex-col items-center mb-12">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-blue-500" />
            </div>
            <h2 className="text-3xl font-outfit font-bold">Faculty Excellence</h2>
            <div className="w-24 h-1 bg-blue-500 rounded-full mt-4 opacity-50"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card rounded-2xl p-6 relative border-t-2 border-t-blue-500/50">
                <Target className="absolute top-6 right-6 w-6 h-6 text-white/10" />
                <h3 className="font-bold text-lg mb-1 text-white">Best Paper Award</h3>
                <p className="text-sm text-blue-400 mb-4">IEEE Conference on AI</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Dr. Exemplary Faculty awarded for their groundbreaking research on optimizing neural network architectures for low-power edge devices.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Milestone Footer */}
        <section className="text-center py-12 border-t border-white/10 mt-12">
          <GraduationCap className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h2 className="text-2xl font-outfit font-bold text-white mb-2">Department Milestones</h2>
          <p className="text-muted-foreground">Over <span className="text-sst-teal font-bold">5,000+</span> graduates working in top global tech companies since 2010.</p>
        </section>
      </div>
    </div>
  );
}
