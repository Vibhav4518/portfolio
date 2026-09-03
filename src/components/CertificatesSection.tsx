'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CertificateItem } from '../lib/data';
import { convertGoogleDriveUrl } from '../lib/gdrive';
import { Award, Calendar, ExternalLink, Trophy } from 'lucide-react';

interface CertificatesSectionProps {
  certificates: CertificateItem[];
  categories?: string[];
}

export function CertificatesSection({ certificates, categories = [] }: CertificatesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filterList = ['All', ...Array.from(new Set(categories))];

  const filteredCertificates = selectedCategory === 'All'
    ? certificates
    : certificates.filter((c) => c.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="certificates" className="py-20 relative bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5" /> Recognition & Growth
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Certifications & Hackathon Achievements
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            National hackathon qualifiers (ISRO, MLSA), Intel AI certifications, and web development bootcamps.
          </p>
        </div>

        {/* Dynamic Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {filterList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25 scale-105'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-sky-500/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCertificates.map((cert, idx) => {
              const displayImage = convertGoogleDriveUrl(cert.imageUrl);

              return (
                <motion.div
                  key={cert.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl p-6 flex flex-col justify-between space-y-4 group hover:border-sky-500/50 transition-all relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-sky-500/10 to-transparent pointer-events-none rounded-bl-full" />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
                        <Award className="w-6 h-6" />
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {cert.category}
                      </span>
                    </div>

                    {displayImage && (
                      <div className="relative h-36 rounded-xl overflow-hidden bg-slate-800 border border-slate-200 dark:border-slate-800">
                        <img
                          src={displayImage}
                          alt={cert.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}

                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-sky-500 transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {cert.issuer}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <span className="text-slate-400 dark:text-slate-500 font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {cert.date}
                    </span>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-600 dark:text-sky-400 hover:underline font-semibold flex items-center gap-1"
                      >
                        View Details <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
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
