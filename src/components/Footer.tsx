'use client';

import Link from 'next/link';
import { ProfileData } from '../lib/data';
import { ShieldCheck, Heart, Terminal } from 'lucide-react';

interface FooterProps {
  profile: ProfileData;
}

export function Footer({ profile }: FooterProps) {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md py-10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-blue-500 text-slate-950 flex items-center justify-center font-extrabold text-sm shadow-[0_0_15px_rgba(0,242,254,0.3)]">
            VS
          </div>
          <div>
            <p className="font-bold text-crisp-white">
              {profile.name}
            </p>
            <p className="text-xs text-slate-400 font-mono">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-medium font-mono">
          <a href="#about" className="text-slate-300 hover:text-cyan-400 transition-colors">
            About
          </a>
          <a href="#experience" className="text-slate-300 hover:text-cyan-400 transition-colors">
            Experience
          </a>
          <a href="#projects" className="text-slate-300 hover:text-cyan-400 transition-colors">
            Projects
          </a>
          <a href="#certificates" className="text-slate-300 hover:text-cyan-400 transition-colors">
            Certificates
          </a>
          <a href="#contact" className="text-slate-300 hover:text-cyan-400 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
