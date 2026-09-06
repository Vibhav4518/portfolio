'use client';

import { motion } from 'framer-motion';
import { SkillCategory } from '../lib/data';
import { Code2, Database, Layout, Terminal, Wrench } from 'lucide-react';

interface SkillsSectionProps {
  skills: SkillCategory[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'languages':
        return <Terminal className="w-5 h-5 text-cyan-400" />;
      case 'frontend':
        return <Layout className="w-5 h-5 text-blue-400" />;
      case 'backend':
        return <Code2 className="w-5 h-5 text-purple-400" />;
      case 'databases':
        return <Database className="w-5 h-5 text-indigo-400" />;
      default:
        return <Wrench className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider shadow-[0_0_15px_rgba(0,242,254,0.2)]">
            <Code2 className="w-3.5 h-3.5 text-cyan-400" /> Technical Arsenal
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-crisp-white tracking-tight text-glow-white">
            Skills & Frameworks
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Full-stack engineering capabilities across Node.js/Next.js, Python/Django, databases, and DevOps tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((cat, idx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-6 rounded-3xl backdrop-blur-md bg-slate-900/60 border border-slate-800 shadow-xl space-y-4 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(0,242,254,0.15)] transition-all"
            >
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  {getCategoryIcon(cat.category)}
                </div>
                <h3 className="text-lg font-bold text-crisp-white">
                  {cat.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-slate-950/80 text-slate-300 border border-slate-800/80 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
