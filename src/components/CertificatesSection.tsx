'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CertificateItem } from '../lib/data';
import { convertGoogleDriveUrl } from '../lib/gdrive';
import { Award, ExternalLink, Calendar, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

interface CertificatesSectionProps {
  certificates: CertificateItem[];
  categories: string[];
  onOpenImage?: (url: string, title?: string) => void;
}

const ITEMS_PER_PAGE = 6;

export function CertificatesSection({ certificates, categories, onOpenImage }: CertificatesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filterCategories = ['All', ...categories];

  const filteredCertificates =
    selectedCategory === 'All'
      ? certificates
      : certificates.filter((c) => c.category === selectedCategory);

  const totalPages = Math.ceil(filteredCertificates.length / ITEMS_PER_PAGE) || 1;
  const paginatedCertificates = filteredCertificates.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  return (
    <section id="certificates" className="py-24 relative bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" /> Hackathons & Certifications
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Certificates & Honors
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            National hackathon placements, AI certifications, and web development credentials.
          </p>

          {/* Dynamic Category Filter Pills */}
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

        {/* Certificates Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {paginatedCertificates.map((cert) => {
              const parsedImageUrl = convertGoogleDriveUrl(cert.imageUrl);

              return (
                <motion.div
                  key={cert.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl hover:shadow-2xl hover:border-sky-500/50 transition-all flex flex-col group"
                >
                  {/* Certificate Image Banner */}
                  {cert.imageUrl && (
                    <div
                      onClick={() => onOpenImage && onOpenImage(cert.imageUrl || '', cert.title)}
                      className="relative h-48 w-full overflow-hidden bg-slate-950 cursor-pointer"
                    >
                      <img
                        src={parsedImageUrl}
                        alt={cert.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          if (cert.imageUrl && (e.target as HTMLImageElement).src !== cert.imageUrl) {
                            (e.target as HTMLImageElement).src = cert.imageUrl;
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors" />

                      <div className="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/60 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn className="w-4 h-4 text-sky-400" />
                      </div>

                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-sm text-sky-400 text-[11px] font-mono border border-slate-700/50">
                        {cert.category}
                      </div>
                    </div>
                  )}

                  {/* Card Content Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-sky-500" /> {cert.date}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                        Issuer: {cert.issuer}
                      </p>
                      {cert.description && (
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                          {cert.description}
                        </p>
                      )}
                    </div>

                    {cert.credentialUrl && (
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Verify Credential
                        </a>
                      </div>
                    )}
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
