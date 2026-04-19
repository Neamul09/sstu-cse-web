import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { 
  ShieldAlert, 
  Users, 
  Settings, 
  Bell, 
  BookText, 
  LayoutDashboard, 
  FileText, 
  Calendar,
  Award,
  GraduationCap,
  Briefcase
} from "lucide-react";
import UserRoleManager from "./UserRoleManager";

export default async function AdminDashboard() {
  const session = await auth();

  if (!session || session.user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Top Banner */}
      <div className="relative border-b border-white/5 bg-white/[0.01] backdrop-blur-sm overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-sst-teal/5 blur-3xl -z-10" />
        <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-sst-teal/20 rounded-lg border border-sst-teal/30">
                <ShieldAlert className="w-5 h-5 text-sst-teal" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-sst-teal">Administration Control</span>
            </div>
            <h1 className="text-4xl font-outfit font-bold tracking-tight">System Master Panel</h1>
            <p className="text-muted-foreground mt-2 max-w-lg">
              Authorized personnel only. Oversee campus operations, manage user roles, and update portal configurations from this central hub.
            </p>
          </div>
          <div className="flex gap-3">
             <button className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium">System Logs</button>
             <button className="px-5 py-2.5 rounded-xl bg-sst-teal text-black hover:bg-sst-teal/90 transition-all font-bold text-sm">Backup Core</button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Core Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Users", val: "1,245", icon: Users, color: "text-sst-teal", border: "border-sst-teal/30" },
            { label: "Courses", val: "48", icon: BookText, color: "text-blue-500", border: "border-blue-500/30" },
            { label: "Active Notices", val: "156", icon: Bell, color: "text-sst-gold", border: "border-sst-gold/30" },
            { label: "Security Alerts", val: "0", icon: ShieldAlert, color: "text-red-500", border: "border-red-500/30" },
          ].map((stat, i) => (
            <div key={i} className={`glass-card rounded-2xl p-6 bg-white/[0.02] border ${stat.border} hover:bg-white/[0.04] transition-all`}>
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-xl bg-white/5 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-outfit font-bold">{stat.val}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main User Manager */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-card rounded-3xl p-8 bg-white/[0.02] border border-white/5">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-2xl font-outfit font-bold">User Access Control</h2>
                  <p className="text-sm text-muted-foreground mt-1">Manage global permissions and department hierarchies.</p>
                </div>
                <div className="flex gap-2">
                   <div className="relative">
                      <input type="text" placeholder="Search users..." className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-sst-teal" />
                   </div>
                </div>
              </div>
              
              <UserRoleManager />
            </div>
          </div>

          {/* Sidebar Tools */}
          <div className="space-y-8">
            <div className="glass-card rounded-3xl p-8 bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-3 mb-8">
                 <LayoutDashboard className="w-5 h-5 text-sst-teal" />
                 <h2 className="text-xl font-outfit font-bold">Quick Management</h2>
              </div>
              <div className="grid gap-3">
                {[
                  { name: "Faculty Roster", icon: Briefcase, href: "/admin/faculty" },
                  { name: "Notice Board", icon: FileText, href: "/admin/notices" },
                  { name: "Event Calendar", icon: Calendar, href: "/admin/events" },
                  { name: "Student Records", icon: GraduationCap, href: "/admin/students" },
                  { name: "Academic Syllabi", icon: BookText, href: "/admin/academics" },
                  { name: "Hall of Fame", icon: Award, href: "/admin/achievements" },
                ].map((tool, i) => (
                  <Link key={i} href={tool.href} className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-white/5 text-muted-foreground group-hover:text-sst-teal transition-colors">
                        <tool.icon className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-sm">{tool.name}</span>
                    </div>
                    <Settings className="w-4 h-4 text-muted-foreground/50 group-hover:rotate-45 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-3xl p-8 bg-gradient-to-br from-sst-teal/10 to-transparent border border-sst-teal/20">
              <h3 className="font-bold mb-2">Portal Status</h3>
              <div className="flex items-center gap-3 text-sm text-green-400 mb-6">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>All systems operational</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The database is connected to <span className="text-white">Neon PostgreSQL</span> via Prisma. Real-time updates are enabled.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
