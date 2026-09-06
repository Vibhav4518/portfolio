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
    <section id="certificates" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider shadow-[0_0_15px_rgba(0,242,254,0.2)]">
            <Award className="w-3.5 h-3.5 text-cyan-400" /> Hackathons & Certifications
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-crisp-white tracking-tight text-glow-white">
            Certificates & Honors
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
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
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,242,254,0.35)] scale-105'
                    : 'bg-slate-900/80 backdrop-blur-md text-slate-300 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300'
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
                  className="relative rounded-3xl p-2.5 bg-gradient-to-b from-purple-600/30 via-cyan-500/10 to-transparent border border-slate-800/80 shadow-[0_0_35px_rgba(127,0,255,0.2)] hover:shadow-[0_0_45px_rgba(0,242,254,0.3)] hover:border-cyan-500/50 transition-all duration-500 group flex flex-col"
                >
                  <div className="w-full h-full rounded-2xl bg-slate-950/90 border border-slate-800/80 overflow-hidden flex flex-col justify-between">
                    {/* Certificate Image Banner */}
                    {cert.imageUrl && (
                      <div
                        onClick={() => onOpenImage && onOpenImage(cert.imageUrl || '', cert.title)}
                        className="relative h-48 w-full overflow-hidden bg-slate-950 cursor-pointer border-b border-slate-800/80"
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
                        <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors" />

                        <div className="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/70 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity border border-slate-800">
                          <ZoomIn className="w-4 h-4 text-cyan-400" />
                        </div>

                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-sm text-cyan-400 text-[11px] font-mono border border-cyan-500/30 shadow-[0_0_10px_rgba(0,242,254,0.2)]">
                          {cert.category}
                        </div>
                      </div>
                    )}

                    {/* Card Content Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-cyan-400" /> {cert.date}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-crisp-white group-hover:text-cyan-300 transition-colors">
                          {cert.title}
                        </h3>
                        <p className="text-xs font-semibold text-cyan-400">
                          Issuer: {cert.issuer}
                        </p>
                        {cert.description && (
                          <p className="text-sm text-slate-300 leading-relaxed pt-1">
                            {cert.description}
                          </p>
                        )}
                      </div>

                      {cert.credentialUrl && (
                        <div className="pt-3 border-t border-slate-800">
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:underline"
                          >
                            <ExternalLink className="w-3.5 h-3.5" /> Verify Credential
                          </a>
                        </div>
                      )}
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
              className="p-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-cyan-400 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-xl text-xs font-semibold font-mono transition-all ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-cyan-400/50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-cyan-400 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
