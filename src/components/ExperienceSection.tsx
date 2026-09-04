'use client';

import { motion } from 'framer-motion';
import { ExperienceItem } from '../lib/data';
import { Briefcase, Calendar, CheckCircle2, Building2, TrendingUp } from 'lucide-react';

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-20 relative bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" /> Work Experience
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Professional Experience & Internships
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Hands-on internships and development work building production-grade web applications, REST APIs, and database architectures.
          </p>
        </div>

        {/* Clean Spacious Card Layout with Progression Flow Bar */}
        <div className="space-y-6 max-w-5xl mx-auto">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-md hover:shadow-xl transition-all space-y-4 relative overflow-hidden"
            >
              {/* Progression Note Bar */}
              {exp.progressionNote && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-sky-500/10 to-blue-600/10 border border-sky-500/20 text-sky-600 dark:text-sky-300 text-xs font-semibold">
                  <TrendingUp className="w-3.5 h-3.5 text-sky-500" />
                  <span>{exp.progressionNote}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-1.5 mt-0.5">
                    <Building2 className="w-4 h-4" /> {exp.company}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0 self-start sm:self-auto">
                  <Calendar className="w-3.5 h-3.5 text-sky-500" /> {exp.period}
                </div>
              </div>

              <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
                {exp.highlights.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>

              {exp.techStack && exp.techStack.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
