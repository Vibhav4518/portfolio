'use client';

import { motion } from 'framer-motion';
import { EducationItem } from '../lib/data';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

interface EducationSectionProps {
  education: EducationItem[];
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider shadow-[0_0_15px_rgba(0,242,254,0.2)]">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" /> Academic Background
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-crisp-white tracking-tight text-glow-white">
            Education
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {education.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-7 rounded-3xl backdrop-blur-md bg-slate-900/60 border border-slate-800 shadow-xl space-y-4 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(0,242,254,0.15)] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-cyan-400 shadow-[0_0_12px_rgba(0,242,254,0.2)]">
                  <GraduationCap className="w-6 h-6" />
                </span>
                <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-slate-950/80 text-cyan-300 border border-slate-800 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" /> {edu.period}
                </span>
              </div>

              <div className="space-y-1.5 pt-1">
                <h3 className="text-lg font-bold text-crisp-white">
                  {edu.degree}
                </h3>
                <p className="text-sm text-cyan-300/90 font-medium">
                  {edu.institution}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
