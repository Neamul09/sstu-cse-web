import Link from 'next/link';
import { auth } from '@/lib/auth';
import { LogOut, User } from 'lucide-react';
import { signOut } from '@/lib/auth';

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex flex-col">
            <span className="font-outfit text-xl font-bold tracking-tight text-sst-teal">
              SSTU CSE
            </span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:block">
              Department Portal
            </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-sst-teal transition-colors">Home</Link>
          <Link href="/faculty" className="hover:text-sst-teal transition-colors">Faculty</Link>
          <Link href="/student" className="hover:text-sst-teal transition-colors">Students</Link>
          <Link href="/notices" className="hover:text-sst-teal transition-colors">Notices</Link>
          <Link href="/events" className="hover:text-sst-teal transition-colors">Events</Link>
          <Link href="/achievements" className="hover:text-sst-teal transition-colors">Achievements</Link>
          <Link href="/alumni" className="hover:text-sst-teal transition-colors">Alumni</Link>
          <Link href="/contact" className="hover:text-sst-teal transition-colors">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          {session?.user ? (
            <>
              <Link 
                href="/dashboard" 
                className="flex items-center gap-2 rounded-md bg-sst-teal/10 px-4 py-2 text-sm font-medium text-sst-teal hover:bg-sst-teal/20 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <form action={async () => {
                'use server';
                await signOut();
              }}>
                <button 
                  type="submit"
                  className="p-2 text-muted-foreground hover:text-red-400 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </form>
            </>
          ) : (
            <Link 
              href="/login" 
              className="rounded-md bg-sst-teal/10 px-4 py-2 text-sm font-medium text-sst-teal hover:bg-sst-teal/20 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
