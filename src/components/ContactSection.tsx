'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProfileData } from '../lib/data';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface ContactSectionProps {
  profile: ProfileData;
}

export function ContactSection({ profile }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        showToast('Thank you! Your message has been sent successfully.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        showToast(data.error || 'Failed to send message. Please try again.', 'error');
      }
    } catch (err) {
      showToast('Error sending message. Please try again.', 'error');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-slate-50/50 dark:bg-slate-900/30 overflow-hidden">
      {/* Fixed Top-Right Floating Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-5 right-5 z-50 p-4 rounded-2xl text-sm font-semibold flex items-center gap-3 shadow-2xl border backdrop-blur-xl ${
              toast.type === 'success'
                ? 'bg-slate-900/95 border-emerald-500/50 text-emerald-400 shadow-emerald-500/10'
                : 'bg-slate-900/95 border-rose-500/50 text-rose-400 shadow-rose-500/10'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <span>{toast.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider shadow-[0_0_15px_rgba(0,242,254,0.2)]">
            <Mail className="w-3.5 h-3.5 text-cyan-400" /> Get In Touch
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-crisp-white tracking-tight text-glow-white">
            Let's Build Something Great Together
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Have an opportunity, collaboration idea, or project query? Send a message directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Direct Contact Card */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-gradient-to-br from-purple-950/90 via-slate-900 to-slate-950 border border-purple-500/30 text-white shadow-[0_0_40px_rgba(127,0,255,0.2)] flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-300">
                Contact Information
              </span>
              <h3 className="text-2xl font-bold text-crisp-white">Direct Channels</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Feel free to reach out via email, phone, or by submitting the contact form. I typically respond quickly.
              </p>
            </div>

            <div className="space-y-6 text-sm">
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all"
                >
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-slate-200 truncate">{profile.email}</span>
                </a>
              )}

              {profile.phone && (
                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all"
                >
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-slate-200">{profile.phone}</span>
                </a>
              )}

              {profile.location && (
                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-slate-200">{profile.location}</span>
                </div>
              )}
            </div>

            <div className="pt-4 text-xs font-mono text-cyan-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Open for Full-Time & Engineering Roles</span>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 p-8 rounded-3xl backdrop-blur-md bg-slate-900/60 border border-slate-800 shadow-xl space-y-5"
          >
            <h3 className="text-xl font-bold text-crisp-white">Send a Message</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-crisp-white text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-crisp-white text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-400">Subject</label>
              <input
                type="text"
                required
                placeholder="Opportunity / Collaboration Inquiry"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-crisp-white text-sm focus:border-cyan-400 focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-400">Message</label>
              <textarea
                rows={4}
                required
                placeholder="Type your message here..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-crisp-white text-sm resize-none focus:border-cyan-400 focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(0,242,254,0.35)] flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {sending ? (
                <span>Sending Message...</span>
              ) : (
                <>
                  <Send className="w-4 h-4 text-slate-950" /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
