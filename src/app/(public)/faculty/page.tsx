import { prisma } from "@/lib/prisma";
import { Mail, BookText } from "lucide-react";

export default async function FacultyPage() {
  // Fetch teachers from DB (Prisma)
  // Need to ensure teacherProfile & user info is included.
  const teachers = await prisma.user.findMany({
    where: { role: "TEACHER" },
    include: { teacherProfile: true },
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-outfit font-bold text-white mb-4">Our Faculty</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Meet the experienced educators and researchers shaping the future of computer science at SST.
        </p>
      </div>

      {teachers.length === 0 ? (
        <div className="text-center text-muted-foreground p-12 glass-card rounded-2xl">
          Faculty profiles will be updated soon.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="glass-card rounded-2xl p-6 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-sst-teal/20 border-2 border-sst-teal flex items-center justify-center text-2xl font-bold text-sst-teal">
                  {teacher.name?.charAt(0) || "T"}
                </div>
                <div>
                  <h3 className="font-outfit font-bold text-lg text-white group-hover:text-sst-teal transition-colors">
                    {teacher.name}
                  </h3>
                  <p className="text-sm text-sst-teal">
                    {teacher.teacherProfile?.designation || "Faculty Member"}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3 mt-6">
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <BookText className="w-4 h-4 mt-0.5 text-white/50" />
                  <p>{teacher.teacherProfile?.researchInterests || "Research interests not specified."}</p>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-white/50" />
                  <a href={`mailto:${teacher.email}`} className="hover:text-sst-teal transition-colors">
                    {teacher.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
