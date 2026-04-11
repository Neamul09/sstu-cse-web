import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { Pin, Calendar as CalendarIcon } from "lucide-react";

export default async function NoticesPage() {
  const notices = await prisma.notice.findMany({
    orderBy: [
      { pinned: "desc" },
      { createdAt: "desc" }
    ],
    include: {
      author: true
    }
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-outfit font-bold text-white mb-4">Notice Board</h1>
        <p className="text-muted-foreground border-l-4 border-sst-teal pl-4 ml-1">
          Stay up to date with official department announcements, schedules, and events.
        </p>
      </div>

      <div className="flex flex-col gap-4 max-w-4xl">
        {notices.length === 0 ? (
          <div className="text-center text-muted-foreground py-12 glass-card rounded-xl">
            No notices available at the moment.
          </div>
        ) : (
          notices.map((notice) => (
            <div 
              key={notice.id} 
              className={`glass-card rounded-xl p-6 transition-all hover:bg-white/[0.15] ${notice.pinned ? 'border-l-4 border-l-sst-gold' : ''}`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    {notice.pinned && (
                      <span className="flex items-center gap-1 text-xs font-bold text-sst-gold bg-sst-gold/10 px-2 py-1 rounded">
                        <Pin className="w-3 h-3" /> Pinned
                      </span>
                    )}
                    <span className="text-xs font-semibold tracking-wider uppercase text-sst-teal">
                      {notice.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-outfit font-bold text-white">{notice.title}</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap mt-2">{notice.body}</p>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground md:flex-col md:items-end md:min-w-[120px]">
                  <div className="flex items-center gap-1.5">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{format(new Date(notice.createdAt), "MMM d, yyyy")}</span>
                  </div>
                  <div className="text-xs opacity-60">
                    By {notice.author?.name || "Admin"}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
