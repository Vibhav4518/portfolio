'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Download, FileText, ZoomIn } from 'lucide-react';
import { convertGoogleDriveUrl } from '../lib/gdrive';

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  title?: string;
  onClose: () => void;
}

export function ImageModal({ isOpen, imageUrl, title, onClose }: ImageModalProps) {
  if (!isOpen || !imageUrl) return null;

  const displayUrl = convertGoogleDriveUrl(imageUrl);

  return (
    <AnimatePresence>
      {/* Backdrop overlay - clicking anywhere outside closes the modal */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md cursor-pointer"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing
          className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] cursor-default"
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
            <div className="flex items-center gap-2 text-white font-medium text-sm truncate">
              <ZoomIn className="w-4 h-4 text-sky-400" />
              <span className="truncate">{title || 'Image Preview'}</span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Open original link"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Image Container */}
          <div className="flex-1 p-4 overflow-auto flex items-center justify-center bg-slate-950/30 min-h-[300px]">
            <img
              src={displayUrl}
              alt={title || 'Enlarged view'}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-lg border border-slate-800"
              onError={(e) => {
                (e.target as HTMLImageElement).src = imageUrl;
              }}
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

interface ResumeModalProps {
  isOpen: boolean;
  resumeUrl: string;
  onClose: () => void;
}

export function ResumeModal({ isOpen, resumeUrl, onClose }: ResumeModalProps) {
  if (!isOpen || !resumeUrl) return null;

  let embedUrl = resumeUrl;
  const gdriveMatch = resumeUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (gdriveMatch && gdriveMatch[1]) {
    embedUrl = `https://drive.google.com/file/d/${gdriveMatch[1]}/preview`;
  }

  return (
    <AnimatePresence>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md cursor-pointer"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-5xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[85vh] cursor-default"
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base leading-tight">Resume PDF Preview</h3>
                <p className="text-xs text-slate-400 font-mono">Vibhav Srivastava — Full-Stack Developer</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg transition-colors"
              >
                <Download className="w-4 h-4" /> Download PDF
              </a>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Iframe PDF Viewer Container */}
          <div className="flex-1 bg-slate-950 p-2 relative">
            <iframe
              src={embedUrl}
              className="w-full h-full rounded-2xl border border-slate-800 bg-white"
              title="Resume Document Viewer"
              allow="autoplay"
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
