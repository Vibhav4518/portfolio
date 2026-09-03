'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '../lib/data';
import { convertGoogleDriveUrl } from '../lib/gdrive';
import { ExternalLink, Layers, Tag, CheckCircle2, Sparkles } from 'lucide-react';

function GithubIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Full-Stack', 'Frontend', 'Backend', 'E-Commerce', 'Talent & HR Tech', 'EdTech & Learning'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(
        (p) =>
          p.category === selectedCategory ||
          p.fieldTag.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          (selectedCategory === 'E-Commerce' && p.title.toLowerCase().includes('velora')) ||
          (selectedCategory === 'Talent & HR Tech' && p.title.toLowerCase().includes('skillflow')) ||
          (selectedCategory === 'EdTech & Learning' && p.title.toLowerCase().includes('vision'))
      );

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" /> Featured Work
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Production & Full-Stack Projects
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Production-deployed web applications, hiring portals, e-commerce suites, and educational LMS platforms.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25 scale-105'
                  : 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-sky-500/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const displayImage = convertGoogleDriveUrl(project.imageUrl);

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col group hover:border-sky-500/50 transition-all"
                >
                  {/* Card Header Banner / Image */}
                  <div className="relative h-48 w-full bg-slate-800 overflow-hidden">
                    {displayImage ? (
                      <img
                        src={displayImage}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          // Fallback display if image fails to render
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : null}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/90 text-white backdrop-blur-md">
                        {project.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-slate-900/80 text-sky-400 border border-slate-700 backdrop-blur-md flex items-center gap-1">
                        <Tag className="w-3 h-3" /> {project.fieldTag}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <h3 className="text-2xl font-bold text-white tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-300 font-medium line-clamp-1">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                        {project.summary}
                      </p>

                      {project.highlights && project.highlights.length > 0 && (
                        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                          {project.highlights.map((point, pIdx) => (
                            <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                              <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 mt-0.5 shrink-0" />
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-3 pt-2">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" /> Live App
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-sky-500 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                          >
                            <GithubIcon className="w-3.5 h-3.5" /> Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
