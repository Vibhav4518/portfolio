'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '../lib/data';
import { convertGoogleDriveUrl } from '../lib/gdrive';
import { FolderKanban, ExternalLink, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

interface ProjectsSectionProps {
  projects: ProjectItem[];
  categories: string[];
  onOpenImage?: (url: string, title?: string) => void;
}

const ITEMS_PER_PAGE = 6;

export function ProjectsSection({ projects, categories, onOpenImage }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filterCategories = ['All', ...categories];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE) || 1;
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider">
            <FolderKanban className="w-3.5 h-3.5" /> Featured Engineering Projects
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Production & Full-Stack Projects
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Filter projects by domain or explore full-stack platforms, APIs, and client systems.
          </p>

          {/* Dynamic Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 scale-105'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {paginatedProjects.map((project) => {
              const parsedImageUrl = convertGoogleDriveUrl(project.imageUrl);

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl hover:shadow-2xl hover:border-sky-500/50 transition-all flex flex-col group"
                >
                  {/* Card Image Cover */}
                  {project.imageUrl && (
                    <div
                      onClick={() => onOpenImage && onOpenImage(project.imageUrl || '', project.title)}
                      className="relative h-52 w-full overflow-hidden bg-slate-950 cursor-pointer"
                    >
                      <img
                        src={parsedImageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          if (project.imageUrl && (e.target as HTMLImageElement).src !== project.imageUrl) {
                            (e.target as HTMLImageElement).src = project.imageUrl;
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors" />

                      <div className="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/60 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn className="w-4 h-4 text-sky-400" />
                      </div>

                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-sm text-sky-400 text-[11px] font-mono border border-slate-700/50">
                        {project.category}
                      </div>
                    </div>
                  )}

                  {/* Card Content Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-semibold text-sky-600 dark:text-sky-400">
                          {project.fieldTag}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors">
                        {project.title}
                      </h3>
                      {project.subtitle && (
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          {project.subtitle}
                        </p>
                      )}
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 pt-1">
                        {project.summary}
                      </p>
                    </div>

                    <div className="space-y-4 pt-2">
                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-sky-500/20 transition-all"
                          >
                            <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-all"
                          >
                            <GithubIcon className="w-3.5 h-3.5" /> Source Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-12">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-sky-500 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-xl text-xs font-semibold font-mono transition-all ${
                  currentPage === page
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-sky-500/50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-sky-500 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
