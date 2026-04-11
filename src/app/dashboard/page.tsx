import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  console.log("Dashboard level session check:", { 
    id: session.user.id, 
    role: session.user.role 
  });

  // Role-based redirection
  const role = session.user.role?.toUpperCase();

  if (role === "ADMIN") {
    return redirect("/admin");
  } else if (role === "TEACHER") {
    return redirect("/dashboard/teacher");
  } else if (role === "CR") {
    return redirect("/dashboard/cr");
  } else if (role === "STUDENT") {
    return redirect("/dashboard/student");
  }

  // If someone is a GUEST or has no specific dashboard, they stay here
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <div className="glass-card rounded-2xl p-12 max-w-2xl mx-auto">
        <h1 className="text-3xl font-outfit font-bold text-white mb-4">Portal Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome, {session.user.name}. Your role is currently set as <span className="text-sst-teal font-bold">{session.user.role || 'GUEST'}</span>.
        </p>
        <p className="text-muted-foreground mt-4 text-sm">
          If you are a student or faculty member and this is incorrect, please contact your department administrator.
        </p>
      </div>
    </div>
  );
}
