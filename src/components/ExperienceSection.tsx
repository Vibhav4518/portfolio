'use client';

import { motion } from 'framer-motion';
import { ExperienceItem } from '../lib/data';
import { Briefcase, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-20 relative bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" /> Career Journey
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Work & Engineering Experience
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Hands-on engineering internships building REST APIs, databases, and deployment workflows.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:-translate-x-px before:w-0.5 before:bg-gradient-to-b before:from-sky-500 before:via-blue-600 before:to-indigo-500">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative flex flex-col sm:flex-row items-start group"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-0 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-4 border-sky-500 group-hover:scale-125 transition-transform duration-300 shadow-md z-10 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-sky-500" />
              </div>

              {/* Content Card */}
              <div className="pl-12 sm:pl-0 sm:w-1/2 sm:pr-8 group-hover:translate-x-1 transition-transform duration-300">
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50 px-2.5 py-1 rounded-md">
                      <Calendar className="w-3.5 h-3.5" /> {exp.period}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white pt-1">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      {exp.company}
                    </p>
                  </div>

                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
