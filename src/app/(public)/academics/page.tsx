import { BookOpen, Calendar, FileText, Download } from "lucide-react";

export default function AcademicsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-outfit font-bold text-white mb-4">Academic Curriculum</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          The B.Sc in Computer Science & Engineering is a 4-year program comprising 8 semesters. Explore the course structure below.
        </p>
      </div>

      {[{ semester: "1st Semester", courses: [
          { code: "CSE-101", title: "Introduction to Computer Systems", credit: 3.0 },
          { code: "CSE-102", title: "Programming Language C", credit: 3.0 },
          { code: "PHY-101", title: "Physics I", credit: 3.0 },
          { code: "MATH-101", title: "Calculus I", credit: 3.0 }
        ]},
        { semester: "2nd Semester", courses: [
          { code: "CSE-105", title: "Data Structures", credit: 3.0 },
          { code: "CSE-106", title: "Data Structures Lab", credit: 1.5 },
          { code: "MATH-103", title: "Linear Algebra", credit: 3.0 },
          { code: "ENG-101", title: "English Communication", credit: 2.0 }
        ]}].map((term, i) => (
        <div key={i} className="mb-12 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
            <h2 className="text-2xl font-outfit font-bold text-sst-teal">{term.semester}</h2>
            <button className="text-sm bg-white/5 hover:bg-white/10 px-3 py-1 flex items-center gap-2 rounded transition-colors text-muted-foreground">
              <Download className="w-4 h-4" /> Syllabus PDF
            </button>
          </div>
          <div className="glass-card rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-muted-foreground">
                <tr>
                  <th className="p-4 font-medium w-32">Course Code</th>
                  <th className="p-4 font-medium">Course Title</th>
                  <th className="p-4 font-medium text-right">Credit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {term.courses.map((course, j) => (
                  <tr key={j} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 text-white font-medium tracking-wide">{course.code}</td>
                    <td className="p-4 text-white/80">{course.title}</td>
                    <td className="p-4 text-right text-muted-foreground">{course.credit.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <div className="max-w-4xl mx-auto mt-12 text-center p-8 border border-dashed border-white/20 rounded-2xl bg-white/[0.02]">
        <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
        <h3 className="font-outfit text-xl font-bold mb-2">Full Curriculum Available</h3>
        <p className="text-muted-foreground mb-6">Want to see the entire 4-year structure including electives and thesis guidelines?</p>
        <button className="bg-sst-teal text-black px-6 py-2 rounded font-semibold hover:bg-sst-teal/90 transition-colors inline-block">
          Download Complete Curriculum
        </button>
      </div>
    </div>
  );
}
