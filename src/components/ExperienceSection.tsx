'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExperienceItem } from '../lib/data';
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Building2,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  // Track collapsed/expanded state for cards. Default all to expanded.
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    experiences.forEach((exp) => {
      initial[exp.id] = true;
    });
    return initial;
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider shadow-[0_0_15px_rgba(0,242,254,0.2)]">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" /> Work Experience
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-crisp-white tracking-tight text-glow-white">
            Professional Experience & Internships
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Hands-on software development roles building production-grade web applications, REST APIs, and scalable backend systems.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Glowing Vertical Timeline Spine */}
          <div className="absolute left-4 sm:left-8 top-3 bottom-3 w-1 bg-gradient-to-b from-cyan-500 via-purple-600 to-indigo-600 rounded-full shadow-[0_0_15px_rgba(0,242,254,0.4)]" />

          <div className="space-y-12 pl-10 sm:pl-20 relative">
            {experiences.map((exp, idx) => {
              const isExpanded = expandedIds[exp.id] ?? true;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="relative group"
                >
                  {/* Timeline Pulse Node */}
                  <div className="absolute -left-10 sm:-left-20 top-6 -translate-x-1/2 flex items-center justify-center">
                    <div className="relative flex items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-7 w-7 rounded-full bg-cyan-400 opacity-40" />
                      <div className="w-6 h-6 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_#00f2fe] group-hover:scale-125 transition-transform duration-300">
                        <div className="w-2 h-2 rounded-full bg-cyan-300" />
                      </div>
                    </div>
                  </div>

                  {/* Glassmorphism Card */}
                  <div className="rounded-3xl backdrop-blur-md bg-slate-900/60 border border-slate-800/80 p-6 sm:p-8 shadow-2xl hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(0,242,254,0.15)] transition-all duration-300 space-y-5">
                    {/* Progression Note */}
                    {exp.progressionNote && (
                      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/30 text-purple-300 text-xs font-semibold shadow-sm">
                        <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
                        <span>{exp.progressionNote}</span>
                      </div>
                    )}

                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
                      <div className="space-y-1.5">
                        <h3 className="text-xl sm:text-2xl font-bold text-crisp-white group-hover:text-cyan-300 transition-colors">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 text-sm font-semibold text-cyan-400">
                          <span className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                            <Building2 className="w-4 h-4 text-cyan-400" />
                          </span>
                          <span>{exp.company}</span>
                        </div>
                      </div>

                      {/* Duration Tag */}
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono font-semibold text-cyan-300 shadow-inner shrink-0 self-start sm:self-auto">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    {/* Collapsible Key Accomplishments & Metrics */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Accomplishments & Metrics
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleExpand(exp.id)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:underline transition-colors focus:outline-none"
                        >
                          {isExpanded ? (
                            <>
                              <span>Hide Details</span>
                              <ChevronUp className="w-4 h-4 text-cyan-400" />
                            </>
                          ) : (
                            <>
                              <span>Show Details ({exp.highlights.length})</span>
                              <ChevronDown className="w-4 h-4 text-cyan-400" />
                            </>
                          )}
                        </button>
                      </div>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-2.5 text-sm text-slate-300 overflow-hidden pt-1"
                          >
                            {exp.highlights.map((point, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-3">
                                <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                                <span className="leading-relaxed text-slate-300">{point}</span>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Stylized Tech Stack Pills */}
                    {exp.techStack && exp.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800/80">
                        {exp.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-xl text-xs font-mono font-medium bg-slate-950/80 text-cyan-300 border border-slate-800 hover:border-cyan-500/40 hover:text-white transition-colors"
                          >
                            #{tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
