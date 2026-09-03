import { getDatabase } from '../lib/db';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { ExperienceSection } from '../components/ExperienceSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { CertificatesSection } from '../components/CertificatesSection';
import { SkillsSection } from '../components/SkillsSection';
import { EducationSection } from '../components/EducationSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';

export const revalidate = 0; // Ensure fresh dynamic data rendering on every request

export default function HomePage() {
  const db = getDatabase();

  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-sky-500 selection:text-white transition-colors duration-200">
      <Navbar />
      <div className="flex-1">
        <HeroSection profile={db.profile} />
        <ExperienceSection experiences={db.experiences || []} />
        <ProjectsSection projects={db.projects || []} categories={db.projectCategories || []} />
        <CertificatesSection certificates={db.certificates || []} categories={db.certificateCategories || []} />
        <SkillsSection skills={db.skills || []} />
        <EducationSection education={db.education || []} />
        <ContactSection profile={db.profile} />
      </div>
      <Footer profile={db.profile} />
    </main>
  );
}
