'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PortfolioDatabase, ProjectItem, CertificateItem, ExperienceItem, ProfileData, ContactMessage } from '../../lib/data';
import { convertGoogleDriveUrl } from '../../lib/gdrive';
import {
  ShieldCheck, LogOut, User, FolderKanban, Briefcase, Award, Code2,
  Mail, Plus, Trash2, Edit3, Save, CheckCircle2, AlertCircle, ExternalLink,
  RefreshCw, FileText, Image as ImageIcon, Link as LinkIcon
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'experiences' | 'certificates' | 'skills' | 'messages'>('profile');
  const [dbData, setDbData] = useState<PortfolioDatabase | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form states for adding/editing
  const [editingProfile, setEditingProfile] = useState<Partial<ProfileData>>({});
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem> | null>(null);
  const [editingCert, setEditingCert] = useState<Partial<CertificateItem> | null>(null);
  const [editingExp, setEditingExp] = useState<Partial<ExperienceItem> | null>(null);

  // Check auth session and fetch portfolio data
  useEffect(() => {
    async function loadAdminData() {
      try {
        const authRes = await fetch('/api/auth/me');
        if (!authRes.ok) {
          router.push('/admin/login');
          return;
        }

        const dataRes = await fetch('/api/portfolio');
        if (dataRes.ok) {
          const data = await dataRes.json();
          setDbData(data);
          setEditingProfile(data.profile || {});
        }
      } catch (err) {
        console.error('Failed to load admin panel data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAdminData();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const refreshData = async () => {
    const res = await fetch('/api/portfolio');
    if (res.ok) {
      const data = await res.json();
      setDbData(data);
      setEditingProfile(data.profile || {});
    }
  };

  // --- Profile Save ---
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProfile),
      });
      if (res.ok) {
        showNotification('Profile updated successfully!');
        refreshData();
      } else {
        showNotification('Failed to update profile', 'error');
      }
    } catch (err) {
      showNotification('Error saving profile', 'error');
    }
  };

  // --- Project Save & Delete ---
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      const method = editingProject.id ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject),
      });

      if (res.ok) {
        showNotification(`Project ${editingProject.id ? 'updated' : 'added'} successfully!`);
        setEditingProject(null);
        refreshData();
      } else {
        showNotification('Failed to save project', 'error');
      }
    } catch (err) {
      showNotification('Error saving project', 'error');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showNotification('Project deleted');
        refreshData();
      }
    } catch (err) {
      showNotification('Error deleting project', 'error');
    }
  };

  // --- Certificate Save & Delete ---
  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert) return;

    try {
      const method = editingCert.id ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/certificates', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCert),
      });

      if (res.ok) {
        showNotification(`Certificate ${editingCert.id ? 'updated' : 'added'} successfully!`);
        setEditingCert(null);
        refreshData();
      } else {
        showNotification('Failed to save certificate', 'error');
      }
    } catch (err) {
      showNotification('Error saving certificate', 'error');
    }
  };

  const handleDeleteCert = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certificate?')) return;
    try {
      const res = await fetch(`/api/admin/certificates?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showNotification('Certificate deleted');
        refreshData();
      }
    } catch (err) {
      showNotification('Error deleting certificate', 'error');
    }
  };

  // --- Experience Save & Delete ---
  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;

    try {
      const method = editingExp.id ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/experiences', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingExp),
      });

      if (res.ok) {
        showNotification(`Experience ${editingExp.id ? 'updated' : 'added'} successfully!`);
        setEditingExp(null);
        refreshData();
      } else {
        showNotification('Failed to save experience', 'error');
      }
    } catch (err) {
      showNotification('Error saving experience', 'error');
    }
  };

  const handleDeleteExp = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    try {
      const res = await fetch(`/api/admin/experiences?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showNotification('Experience deleted');
        refreshData();
      }
    } catch (err) {
      showNotification('Error deleting experience', 'error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-mono text-sm">
        <RefreshCw className="w-5 h-5 animate-spin text-sky-500 mr-2" /> Loading Admin Session...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-white text-lg tracking-tight">Admin Dashboard</h1>
            <p className="text-xs text-sky-400 font-mono">RBAC Management & Control Center</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View Live Site
          </Link>
          <button
            onClick={handleLogout}
            className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        {/* Toast Notification */}
        {statusMsg && (
          <div
            className={`p-4 rounded-xl text-sm flex items-center gap-2 shadow-lg ${
              statusMsg.type === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
            }`}
          >
            {statusMsg.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Admin Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'profile', label: 'Bio & Resume', icon: User },
            { id: 'projects', label: 'Projects', icon: FolderKanban },
            { id: 'experiences', label: 'Work Experience', icon: Briefcase },
            { id: 'certificates', label: 'Certificates', icon: Award },
            { id: 'skills', label: 'Skills', icon: Code2 },
            { id: 'messages', label: `Messages (${dbData?.messages?.length || 0})`, icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Profile & Resume */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <User className="w-5 h-5 text-sky-400" /> Edit Profile & Resume Links
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400">Full Name</label>
                <input
                  type="text"
                  value={editingProfile.name || ''}
                  onChange={(e) => setEditingProfile({ ...editingProfile, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400">Title</label>
                <input
                  type="text"
                  value={editingProfile.title || ''}
                  onChange={(e) => setEditingProfile({ ...editingProfile, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400">Email Address</label>
                <input
                  type="email"
                  value={editingProfile.email || ''}
                  onChange={(e) => setEditingProfile({ ...editingProfile, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400">Phone Number</label>
                <input
                  type="text"
                  value={editingProfile.phone || ''}
                  onChange={(e) => setEditingProfile({ ...editingProfile, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400">GitHub Link</label>
                <input
                  type="url"
                  value={editingProfile.github || ''}
                  onChange={(e) => setEditingProfile({ ...editingProfile, github: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400">LinkedIn Link</label>
                <input
                  type="url"
                  value={editingProfile.linkedin || ''}
                  onChange={(e) => setEditingProfile({ ...editingProfile, linkedin: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-mono text-sky-400 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" /> Resume PDF Link (Google Drive / Vercel PDF URL)
                </label>
                <input
                  type="url"
                  value={editingProfile.resumeUrl || ''}
                  onChange={(e) => setEditingProfile({ ...editingProfile, resumeUrl: e.target.value })}
                  placeholder="https://drive.google.com/file/d/.../view"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-mono text-slate-400">Bio Summary</label>
                <textarea
                  rows={4}
                  value={editingProfile.summary || ''}
                  onChange={(e) => setEditingProfile({ ...editingProfile, summary: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm flex items-center gap-2 shadow-lg"
            >
              <Save className="w-4 h-4" /> Save Profile Changes
            </button>
          </form>
        )}

        {/* Tab 2: Projects */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FolderKanban className="w-5 h-5 text-sky-400" /> Manage Projects
              </h2>
              <button
                onClick={() =>
                  setEditingProject({
                    title: '',
                    subtitle: '',
                    category: 'Full-Stack',
                    fieldTag: 'Web App',
                    summary: '',
                    highlights: [''],
                    techStack: ['React.js', 'Next.js'],
                    demoUrl: '',
                    githubUrl: '',
                    imageUrl: '',
                  })
                }
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add New Project
              </button>
            </div>

            {/* Project Edit Modal / Card Form */}
            {editingProject && (
              <form onSubmit={handleSaveProject} className="p-6 rounded-2xl bg-slate-900 border border-sky-500/50 space-y-4 shadow-xl">
                <h3 className="text-lg font-bold text-sky-400">
                  {editingProject.id ? 'Edit Project' : 'Add New Project'}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Project Title (e.g. SkillFlow)"
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Subtitle (e.g. Talent Management Platform)"
                    value={editingProject.subtitle || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                    className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                  />

                  <select
                    value={editingProject.category || 'Full-Stack'}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                    className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                  >
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Mobile">Mobile</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Field Tag (e.g. E-Commerce, Talent & HR Tech, EdTech)"
                    value={editingProject.fieldTag || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, fieldTag: e.target.value })}
                    className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                  />

                  <input
                    type="url"
                    placeholder="Live App Demo URL"
                    value={editingProject.demoUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, demoUrl: e.target.value })}
                    className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                  />
                  <input
                    type="url"
                    placeholder="GitHub Repo URL"
                    value={editingProject.githubUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                  />

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-mono text-sky-400 flex items-center gap-1">
                      <ImageIcon className="w-3.5 h-3.5" /> Image Link (Paste Direct or Google Drive Share Link)
                    </label>
                    <input
                      type="url"
                      placeholder="https://drive.google.com/file/d/1ABC123/view?usp=sharing"
                      value={editingProject.imageUrl || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                    />

                    {editingProject.imageUrl && (
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-4">
                        <img
                          src={convertGoogleDriveUrl(editingProject.imageUrl)}
                          alt="Preview"
                          className="w-20 h-14 object-cover rounded-lg border border-slate-700"
                          onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                        />
                        <div className="text-xs font-mono text-slate-400 space-y-1">
                          <p className="text-emerald-400">✓ Auto Google Drive CDN parsing active</p>
                          <p className="truncate max-w-md">{convertGoogleDriveUrl(editingProject.imageUrl)}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-mono text-slate-400">Tech Stack (comma separated)</label>
                    <input
                      type="text"
                      placeholder="Next.js 14, Express, PostgreSQL, Prisma"
                      value={editingProject.techStack?.join(', ') || ''}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          techStack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-mono text-slate-400">Summary</label>
                    <textarea
                      rows={2}
                      value={editingProject.summary || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold"
                  >
                    Save Project
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* List Existing Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dbData?.projects.map((proj) => (
                <div key={proj.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-400">
                      {proj.category} • {proj.fieldTag}
                    </span>
                    <h4 className="font-bold text-white text-base">{proj.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{proj.summary}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setEditingProject(proj)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-rose-900 text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Work Experience */}
        {activeTab === 'experiences' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-sky-400" /> Manage Work Experience
              </h2>
              <button
                onClick={() =>
                  setEditingExp({
                    role: '',
                    company: '',
                    period: '',
                    highlights: [''],
                    techStack: ['Express.js', 'PostgreSQL'],
                  })
                }
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Experience
              </button>
            </div>

            {editingExp && (
              <form onSubmit={handleSaveExp} className="p-6 rounded-2xl bg-slate-900 border border-sky-500/50 space-y-4">
                <h3 className="text-lg font-bold text-sky-400">
                  {editingExp.id ? 'Edit Experience' : 'Add Experience'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Role (e.g. SDE Intern)"
                    value={editingExp.role || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                    className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Company (e.g. HI Labs)"
                    value={editingExp.company || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                    className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Period (e.g. Jul 2026 – Aug 2026)"
                    value={editingExp.period || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, period: e.target.value })}
                    className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm md:col-span-2"
                  />
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-mono text-slate-400">Tech Stack (comma separated)</label>
                    <input
                      type="text"
                      value={editingExp.techStack?.join(', ') || ''}
                      onChange={(e) =>
                        setEditingExp({
                          ...editingExp,
                          techStack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-sky-500 text-white text-xs font-bold">
                    Save Experience
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingExp(null)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-4">
              {dbData?.experiences.map((exp) => (
                <div key={exp.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-sky-400">{exp.period}</span>
                    <h4 className="font-bold text-white">{exp.role} — {exp.company}</h4>
                    <p className="text-xs text-slate-400">{exp.techStack.join(', ')}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingExp(exp)} className="p-2 rounded-lg bg-slate-800 text-sky-400">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteExp(exp.id)} className="p-2 rounded-lg bg-slate-800 text-rose-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Certificates */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-sky-400" /> Manage Certificates & Achievements
              </h2>
              <button
                onClick={() =>
                  setEditingCert({
                    title: '',
                    issuer: '',
                    date: '2026',
                    category: 'Hackathons',
                    description: '',
                    credentialUrl: '',
                    imageUrl: '',
                  })
                }
                className="px-4 py-2 rounded-xl bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Certificate
              </button>
            </div>

            {editingCert && (
              <form onSubmit={handleSaveCert} className="p-6 rounded-2xl bg-slate-900 border border-sky-500/50 space-y-4">
                <h3 className="text-lg font-bold text-sky-400">
                  {editingCert.id ? 'Edit Certificate' : 'Add Certificate'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Title (e.g. ISRO Bharatiya Antariksh Hackathon)"
                    value={editingCert.title || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                    className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Issuer (e.g. ISRO / Intel / Smarted)"
                    value={editingCert.issuer || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                    className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                  />
                  <select
                    value={editingCert.category || 'Hackathons'}
                    onChange={(e) => setEditingCert({ ...editingCert, category: e.target.value as any })}
                    className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                  >
                    <option value="Hackathons">Hackathons</option>
                    <option value="AI & Data">AI & Data</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Competitions">Competitions</option>
                    <option value="General">General</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Year / Date"
                    value={editingCert.date || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, date: e.target.value })}
                    className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                  />
                  <input
                    type="url"
                    placeholder="Credential / Verification URL"
                    value={editingCert.credentialUrl || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, credentialUrl: e.target.value })}
                    className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm md:col-span-2"
                  />

                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-mono text-sky-400">
                      Certificate Image (Pasted Direct or Google Drive Share Link)
                    </label>
                    <input
                      type="url"
                      placeholder="https://drive.google.com/file/d/.../view"
                      value={editingCert.imageUrl || ''}
                      onChange={(e) => setEditingCert({ ...editingCert, imageUrl: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-sky-500 text-white text-xs font-bold">
                    Save Certificate
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingCert(null)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dbData?.certificates.map((cert) => (
                <div key={cert.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-400">
                      {cert.category}
                    </span>
                    <h4 className="font-bold text-white">{cert.title}</h4>
                    <p className="text-xs text-slate-400">{cert.issuer} ({cert.date})</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingCert(cert)} className="p-2 rounded-lg bg-slate-800 text-sky-400">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteCert(cert.id)} className="p-2 rounded-lg bg-slate-800 text-rose-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Contact Messages */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-sky-400" /> Visitor Messages Inbox
            </h2>

            {(!dbData?.messages || dbData.messages.length === 0) ? (
              <div className="p-8 text-center bg-slate-900 rounded-2xl border border-slate-800 text-slate-400 text-sm">
                No contact form messages received yet.
              </div>
            ) : (
              <div className="space-y-3">
                {dbData.messages.map((msg) => (
                  <div key={msg.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-bold text-sky-400">{msg.name} ({msg.email})</span>
                      <span className="font-mono">{new Date(msg.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="font-semibold text-white text-sm">{msg.subject}</p>
                    <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800/60 leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
