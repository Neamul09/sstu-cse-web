import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0A1628] py-12 text-muted-foreground mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        <div className="space-y-4">
          <h3 className="font-outfit text-lg font-bold text-white">SSTU CSE</h3>
          <p className="text-sm">
            Empowering the next generation of computer scientists and software engineers through excellence in education and research.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-outfit text-lg font-bold text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/faculty" className="hover:text-sst-teal">Faculty Directory</Link></li>
            <li><Link href="/academics" className="hover:text-sst-teal">Academic Curriculum</Link></li>
            <li><Link href="/notices" className="hover:text-sst-teal">Notice Board</Link></li>
            <li><Link href="/alumni" className="hover:text-sst-teal">Alumni Association</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-outfit text-lg font-bold text-white">Student Portal</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/login" className="hover:text-sst-teal">Dashboard Login</Link></li>
            <li><Link href="/student" className="hover:text-sst-teal">Class Routines</Link></li>
            <li><Link href="/materials" className="hover:text-sst-teal">Study Materials</Link></li>
            <li><Link href="/contact" className="hover:text-sst-teal">Support</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-outfit text-lg font-bold text-white">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-sst-teal shrink-0" />
              <span>SSTU Campus, Department of CSE Building, Block A</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-sst-teal shrink-0" />
              <span>+880 1234 567890</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-sst-teal shrink-0" />
              <span>head.cse@sstu.edu</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-12 px-4 text-center text-sm border-t border-white/5 pt-8">
        © {new Date().getFullYear()} Department of Computer Science & Engineering, SSTU. All rights reserved.
      </div>
    </footer>
  );
}
