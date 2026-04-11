import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col pt-4">
      <div className="container mx-auto px-4 mb-4">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 py-1 px-3 text-xs text-muted-foreground">
          Logged in as: <span className="font-semibold text-sst-teal ml-1">{session.user.role}</span>
        </div>
      </div>
      {children}
    </div>
  );
}
