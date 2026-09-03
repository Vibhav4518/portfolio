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
        return <Terminal className="w-5 h-5 text-sky-500" />;
      case 'frontend':
        return <Layout className="w-5 h-5 text-blue-500" />;
      case 'backend':
        return <Code2 className="w-5 h-5 text-emerald-500" />;
      case 'databases':
        return <Database className="w-5 h-5 text-purple-500" />;
      default:
        return <Wrench className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider">
            <Code2 className="w-3.5 h-3.5" /> Technical Arsenal
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Skills & Frameworks
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
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
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4 hover:border-sky-500/50 transition-all"
            >
              <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                  {getCategoryIcon(cat.category)}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {cat.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-700/50 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 transition-colors"
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
