'use client';

import { useState, useEffect } from 'react';
import { PortfolioDatabase } from '../lib/data';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { ExperienceSection } from '../components/ExperienceSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { CertificatesSection } from '../components/CertificatesSection';
import { SkillsSection } from '../components/SkillsSection';
import { EducationSection } from '../components/EducationSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { ImageModal, ResumeModal } from '../components/Modals';
import { RefreshCw } from 'lucide-react';

export default function HomePage() {
  const [dbData, setDbData] = useState<PortfolioDatabase | null>(null);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [imageModal, setImageModal] = useState<{ isOpen: boolean; url: string; title?: string }>({
    isOpen: false,
    url: '',
    title: '',
  });

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const res = await fetch(`/api/portfolio?t=${Date.now()}`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setDbData(data);
        }
      } catch (err) {
        console.error('Failed to load portfolio:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPortfolio();
  }, []);

  const openImageModal = (url: string, title?: string) => {
    if (!url) return;
    setImageModal({ isOpen: true, url, title });
  };

  const closeImageModal = () => {
    setImageModal({ isOpen: false, url: '', title: '' });
  };

  if (loading || !dbData) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-mono text-sm">
        <RefreshCw className="w-5 h-5 animate-spin text-sky-500 mr-2" /> Loading Portfolio...
      </div>
    );
  }

  const sectionOrder = dbData.sectionOrder || ['about', 'experience', 'projects', 'certificates', 'skills', 'education', 'contact'];

  const renderSection = (secName: string) => {
    switch (secName) {
      case 'about':
        return (
          <HeroSection
            key="about"
            profile={dbData.profile}
            onOpenResume={() => setIsResumeOpen(true)}
            onOpenImage={(url, title) => openImageModal(url, title)}
          />
        );
      case 'experience':
        return <ExperienceSection key="experience" experiences={dbData.experiences || []} />;
      case 'projects':
        return (
          <ProjectsSection
            key="projects"
            projects={dbData.projects || []}
            categories={dbData.projectCategories || []}
            onOpenImage={(url, title) => openImageModal(url, title)}
          />
        );
      case 'certificates':
        return (
          <CertificatesSection
            key="certificates"
            certificates={dbData.certificates || []}
            categories={dbData.certificateCategories || []}
            onOpenImage={(url, title) => openImageModal(url, title)}
          />
        );
      case 'skills':
        return <SkillsSection key="skills" skills={dbData.skills || []} />;
      case 'education':
        return <EducationSection key="education" education={dbData.education || []} />;
      case 'contact':
        return <ContactSection key="contact" profile={dbData.profile} />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-sky-500 selection:text-white transition-colors duration-200">
      <Navbar />
      <div className="flex-1">
        {sectionOrder.map((secName) => renderSection(secName))}
      </div>
      <Footer profile={dbData.profile} />

      {/* Global Modals */}
      <ResumeModal
        isOpen={isResumeOpen}
        resumeUrl={dbData.profile.resumeUrl}
        onClose={() => setIsResumeOpen(false)}
      />

      <ImageModal
        isOpen={imageModal.isOpen}
        imageUrl={imageModal.url}
        title={imageModal.title}
        onClose={closeImageModal}
      />
    </main>
  );
}
