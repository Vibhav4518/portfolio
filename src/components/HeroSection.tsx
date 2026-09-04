'use client';

import { motion } from 'framer-motion';
import { ProfileData } from '../lib/data';
import { convertGoogleDriveUrl } from '../lib/gdrive';
import { FileText, Mail, Phone, ArrowRight, Code, Sparkles, MapPin, CheckCircle2, ZoomIn } from 'lucide-react';

interface HeroSectionProps {
  profile: ProfileData;
  onOpenResume?: () => void;
  onOpenImage?: (url: string, title?: string) => void;
}

function GithubIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function HeroSection({ profile, onOpenResume, onOpenImage }: HeroSectionProps) {
  const avatarImage = convertGoogleDriveUrl(profile.avatarUrl);
  const techStack = profile.primaryTechStack || ['Next.js 14', 'PostgreSQL', 'Express.js', 'Django REST', 'React.js', 'Python'];

  return (
    <section id="about" className="relative min-h-[90vh] pt-32 pb-20 flex items-center overflow-hidden">
      {/* Background glow decorations */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 dark:bg-sky-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-blue-600/10 dark:bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & Hero Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 space-y-6"
          >
            {/* Status Badge */}
            {profile.statusBadge && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-300 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-sky-500 animate-pulse" />
                <span>{profile.statusBadge}</span>
              </div>
            )}

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Hi, I'm{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600">
                  {profile.name}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-slate-700 dark:text-slate-300">
                {profile.title}
              </p>
            </div>

            {/* Summary */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
              {profile.summary}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {profile.resumeUrl && (
                <button
                  type="button"
                  onClick={() => onOpenResume ? onOpenResume() : window.open(profile.resumeUrl, '_blank')}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold shadow-lg shadow-sky-500/25 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <FileText className="w-5 h-5" /> Download Resume
                </button>
              )}
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-sky-500 dark:hover:border-sky-500 bg-white/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                View Projects <ArrowRight className="w-4 h-4 text-sky-500" />
              </a>
            </div>

            {/* Social & Direct Contact Buttons */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800/80">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Connect:
              </span>
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 hover:border-sky-500/50 transition-all shadow-sm"
                  title="GitHub Profile"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 hover:border-sky-500/50 transition-all shadow-sm"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
              )}
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 hover:border-sky-500/50 transition-all shadow-sm"
                  title={`Email: ${profile.email}`}
                >
                  <Mail className="w-5 h-5" />
                </a>
              )}
              {profile.phone && (
                <a
                  href={`tel:${profile.phone}`}
                  className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 hover:border-sky-500/50 transition-all shadow-sm"
                  title={`Call: ${profile.phone}`}
                >
                  <Phone className="w-5 h-5" />
                </a>
              )}
            </div>
          </motion.div>

          {/* Right Column: Dynamic Profile Image OR Tech Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4"
          >
            {avatarImage ? (
              /* Profile Image Mode */
              <div className="relative rounded-3xl p-3 bg-gradient-to-b from-sky-500/20 via-blue-600/10 to-transparent border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
                <div
                  onClick={() => onOpenImage && onOpenImage(profile.avatarUrl || '', profile.name)}
                  className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner group bg-slate-900 cursor-pointer"
                >
                  <img
                    src={avatarImage}
                    alt={profile.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      const gdriveMatch = profile.avatarUrl?.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
                      if (gdriveMatch && gdriveMatch[1]) {
                        img.src = `https://lh3.googleusercontent.com/d/${gdriveMatch[1]}`;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/60 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4 text-sky-400" />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1 text-white">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Verified Engineer
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">{profile.name}</h3>
                    <p className="text-xs text-slate-300 font-medium">{profile.title}</p>
                  </div>
                </div>

                {profile.location && (
                  <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" /> {profile.location}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono">
                      ● Active
                    </span>
                  </div>
                )}
              </div>
            ) : (
              /* Tech Stack Card Mode */
              <div className="relative rounded-2xl p-6 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">developer.config.ts</span>
                </div>

                <div className="space-y-3 font-mono text-xs text-slate-700 dark:text-slate-300">
                  <div className="text-sky-600 dark:text-sky-400 font-semibold">// Core Tech Stack</div>
                  <div className="grid grid-cols-2 gap-2">
                    {techStack.map((tech, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2">
                        <Code className="w-4 h-4 text-sky-500" /> {tech}
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" /> Location: {profile.location}
                  </div>
                </div>

                {profile.tagline && (
                  <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-center">
                    <p className="text-xs text-sky-700 dark:text-sky-300 font-medium">
                      {profile.tagline}
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
