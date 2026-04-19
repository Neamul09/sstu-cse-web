import { prisma } from "@/lib/prisma";
import { Trophy, Star, Target, GraduationCap, Award } from "lucide-react";

export default async function AchievementsPage() {
  const achievements = await prisma.achievement.findMany({
    orderBy: { date: "desc" },
  });

  const universityAchievements = achievements.filter(a => a.category === "UNIVERSITY");
  const otherAchievements = achievements.filter(a => a.category !== "UNIVERSITY");

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-outfit font-bold text-white mb-4 text-gradient">Hall of Fame</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Celebrating the exceptional milestones, competition victories, and research breakthroughs by our students and faculty.
        </p>
      </div>

      <div className="space-y-24">
        {/* Main Records */}
        <section>
          <div className="flex flex-col items-center mb-12">
            <div className="w-16 h-16 rounded-full bg-sst-gold/10 flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-sst-gold" />
            </div>
            <h2 className="text-3xl font-outfit font-bold text-white uppercase tracking-wider">Departmental Triumphs</h2>
            <div className="w-24 h-1 bg-sst-gold rounded-full mt-4 opacity-50"></div>
          </div>

          {achievements.length === 0 ? (
             <div className="text-center p-12 glass-card rounded-2xl text-muted-foreground border-dashed border-2">
                New milestones will be recorded here soon.
             </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {achievements.map((a) => (
                <div key={a.id} className="glass-card rounded-2xl p-8 group relative overflow-hidden transition-all hover:border-sst-gold/30">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-sst-gold/5 rounded-full blur-2xl group-hover:bg-sst-gold/10 transition-colors" />
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-sst-gold/10 rounded-xl text-sst-gold">
                       <Award className="w-6 h-6" />
                    </div>
                    <span className="text-sst-gold bg-sst-gold/10 text-[10px] px-2 py-1 rounded font-bold uppercase tracking-widest">
                       {new Date(a.date).getFullYear()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-outfit text-white mb-4 group-hover:text-sst-gold transition-colors">{a.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-white/10 pl-4">
                     {a.description}
                  </p>
                  <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                     <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Category: {a.category || "General"}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Static Milestone Footer */}
        <section className="text-center py-12 border-t border-white/10 mt-12 bg-white/[0.01] rounded-3xl">
          <GraduationCap className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h2 className="text-2xl font-outfit font-bold text-white mb-2">Heritage of Success</h2>
          <p className="text-muted-foreground">Continuing a legacy of excellence since the department's inception. Join the elite ranks of SSTU CSE.</p>
        </section>
      </div>
    </div>
  );
}
