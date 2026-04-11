"use client";
import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";

export default function AttendanceSystem() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Mock Fetching Logic
  useEffect(() => {
    // In reality, we'd fetch courses assigned to this teacher/CR
    setCourses([{ id: "clx12", code: "CSE-301", name: "Software Engineering" }]);
    // Fetch students in the section
    setStudents([
      { id: "stu1", studentId: "2102001", name: "Rakibul Hasan" },
      { id: "stu2", studentId: "2102002", name: "Ayesha Siddiqa" },
      { id: "stu3", studentId: "2102003", name: "Nabil Khan" }
    ]);
  }, []);

  const handleMarkAttendance = async (studentId: string, status: string) => {
    // Call the POST /api/attendance endpoint
    try {
      await fetch('/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: selectedCourse,
          studentProfileId: studentId,
          date,
          status
        })
      });
      // Here we would typically show a success toast
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-outfit font-bold text-white mb-8">Manage Attendance</h1>
      
      <div className="glass-card rounded-2xl p-6 mb-8 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="text-sm font-medium text-white/80 block mb-2">Select Course</label>
          <select 
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-sst-teal"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">-- Choose Course --</option>
            {courses.map((c: any) => (
              <option key={c.id} value={c.id}>{c.code} - {c.name}</option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="text-sm font-medium text-white/80 block mb-2">Date</label>
          <input 
            type="date" 
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-sst-teal"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button className="bg-sst-teal py-2.5 px-6 rounded-lg text-black font-semibold hover:bg-sst-teal/90 transition-colors">
          Load Students
        </button>
      </div>

      {selectedCourse && (
        <div className="glass-card rounded-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-muted-foreground text-sm">
              <tr>
                <th className="p-4 font-medium">Student ID</th>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {students.map((student: any) => (
                <tr key={student.id} className="hover:bg-white/[0.02]">
                  <td className="p-4 text-white font-mono">{student.studentId}</td>
                  <td className="p-4 text-white">{student.name}</td>
                  <td className="p-4 flex justify-end gap-2">
                    <button 
                      onClick={() => handleMarkAttendance(student.id, "PRESENT")}
                      className="p-2 bg-white/5 hover:bg-green-500/20 text-white/50 hover:text-green-400 rounded transition-colors group" title="Present"
                    >
                      <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                    <button 
                      onClick={() => handleMarkAttendance(student.id, "LATE")}
                      className="p-2 bg-white/5 hover:bg-yellow-500/20 text-white/50 hover:text-yellow-400 rounded transition-colors group" title="Late"
                    >
                      <Clock className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                    <button 
                      onClick={() => handleMarkAttendance(student.id, "ABSENT")}
                      className="p-2 bg-white/5 hover:bg-red-500/20 text-white/50 hover:text-red-400 rounded transition-colors group" title="Absent"
                    >
                      <XCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
