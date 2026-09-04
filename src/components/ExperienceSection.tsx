'use client';

import { motion } from 'framer-motion';
import { ExperienceItem } from '../lib/data';
import { Briefcase, Calendar, CheckCircle2, Building2, Sparkles } from 'lucide-react';

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-24 relative bg-slate-50/50 dark:bg-slate-900/30 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" /> Industry Impact
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineering & Professional Experience
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Hands-on internships and development work building production-grade web applications, REST APIs, and database architectures.
          </p>
        </div>

        {/* Professional Modern Timeline Layout */}
        <div className="max-w-4xl mx-auto relative before:absolute before:inset-0 before:left-6 sm:before:left-1/2 before:-translate-x-px before:w-0.5 before:bg-gradient-to-b before:from-sky-500 before:via-blue-600 before:to-indigo-600 space-y-12">
          {experiences.map((exp, idx) => {
            const isEven = idx % 2 === 0;

            // Generate 2-letter initials for company badge
            const companyInitials = exp.company
              .split(' ')
              .map((w) => w[0])
              .filter((char) => /[A-Za-z]/.test(char))
              .slice(0, 2)
              .join('')
              .toUpperCase() || 'EXP';

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative flex flex-col sm:flex-row items-start group"
              >
                {/* Glowing Center Node Dot */}
                <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 top-6 w-10 h-10 rounded-2xl bg-white dark:bg-slate-900 border-2 border-sky-500 group-hover:border-blue-500 group-hover:scale-110 transition-all duration-300 shadow-xl z-20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 animate-pulse" />
                </div>

                {/* Experience Card */}
                <div className={`pl-16 sm:pl-0 sm:w-1/2 ${isEven ? 'sm:pr-12' : 'sm:pl-12 sm:ml-auto'}`}>
                  <div className="p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-xl hover:shadow-2xl group-hover:border-sky-500/50 transition-all duration-300 space-y-5 relative overflow-hidden">
                    {/* Decorative Top Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600" />

                    {/* Card Header: Initials Logo Badge & Meta */}
                    <div className="flex items-start justify-between gap-4 pt-1">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-500/10 to-blue-600/20 border border-sky-500/20 text-sky-600 dark:text-sky-400 font-extrabold text-sm flex items-center justify-center shrink-0">
                          {companyInitials}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                            {exp.role}
                          </h3>
                          <p className="text-sm font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-1 mt-0.5">
                            <Building2 className="w-3.5 h-3.5" /> {exp.company}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Date Pill */}
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      <Calendar className="w-3.5 h-3.5 text-sky-500" /> {exp.period}
                    </div>

                    {/* Bullet Highlights */}
                    <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
                      {exp.highlights.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack Badges */}
                    {exp.techStack && exp.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                        {exp.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
