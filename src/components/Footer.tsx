'use client';

import Link from 'next/link';
import { ProfileData } from '../lib/data';
import { ShieldCheck, Heart, Terminal } from 'lucide-react';

interface FooterProps {
  profile: ProfileData;
}

export function Footer({ profile }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center font-bold text-sm">
            VS
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">
              {profile.name}
            </p>
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-medium">
          <a href="#about" className="hover:text-sky-500">
            About
          </a>
          <a href="#projects" className="hover:text-sky-500">
            Projects
          </a>
          <a href="#certificates" className="hover:text-sky-500">
            Certificates
          </a>
          <a href="#contact" className="hover:text-sky-500">
            Contact
          </a>
          <Link href="/admin" className="text-sky-500 hover:underline flex items-center gap-1 font-mono">
            <ShieldCheck className="w-3.5 h-3.5" /> Admin Panel
          </Link>
        </div>
      </div>
    </footer>
  );
}
