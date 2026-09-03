export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  website: string;
  resumeUrl: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  highlights: string[];
  techStack: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Full-Stack' | 'Frontend' | 'Backend' | 'AI/ML' | 'Mobile';
  fieldTag: string;
  summary: string;
  highlights: string[];
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: 'Hackathons' | 'AI & Data' | 'Web Development' | 'Competitions' | 'General';
  credentialUrl?: string;
  imageUrl?: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  score?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read?: boolean;
}

export interface PortfolioDatabase {
  profile: ProfileData;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  certificates: CertificateItem[];
  skills: SkillCategory[];
  education: EducationItem[];
  messages: ContactMessage[];
}

export const initialPortfolioData: PortfolioDatabase = {
  profile: {
    name: 'Vibhav Srivastava',
    title: 'Full Stack Software Developer & CSE Student',
    tagline: 'Building high-performance REST APIs, relational databases, & responsive web applications.',
    summary: 'Computer Science undergraduate with full-stack software development experience across the Node.js/Next.js and Python/Django ecosystems, built through engineering internships at HI Labs and Barrownz Learning Academy. Proficient in designing REST APIs, relational databases, and responsive user interfaces, with a track record of shipping production-deployed applications. Strong problem-solving foundation demonstrated through hackathon placements and national-level competitions.',
    email: 'vibhavsrivastav355@gmail.com',
    phone: '+91 8467859131',
    location: 'Uttar Pradesh, India',
    github: 'https://github.com/Vibhav4518',
    linkedin: 'https://linkedin.com/in/vibhav-srivastava04',
    website: 'https://vibhav-portfolio04.vercel.app',
    resumeUrl: 'https://vibhav-portfolio04.vercel.app',
  },
  experiences: [
    {
      id: 'exp-1',
      role: 'Software Development Engineering Intern',
      company: 'HI Labs (Human Intelligence Labs)',
      period: 'Jul 2026 – Aug 2026',
      highlights: [
        'Gained hands-on experience in backend and frontend development working with Express.js, Node.js, PostgreSQL, and Next.js in a fast-paced product environment.',
        'Contributed to the development of a hiring platform, building REST APIs and authentication workflows as part of a small engineering team.',
        'Practiced debugging, code review, and deployment processes for a production-grade web application.'
      ],
      techStack: ['Node.js', 'Express.js', 'Next.js', 'PostgreSQL', 'REST API Design']
    },
    {
      id: 'exp-2',
      role: 'Full Stack Web Development Trainee (Python)',
      company: 'Barrownz Learning Academy',
      period: 'Sep 2025 – Feb 2026',
      highlights: [
        'Completed a hands-on internship in full-stack web development using Python, Django, and Django REST Framework.',
        'Contributed to an e-commerce platform project, gaining experience in backend architecture, database design, and deployment workflows.',
        'Applied industry-relevant development and debugging practices to deliver real-world application features.'
      ],
      techStack: ['Python', 'Django', 'Django REST Framework', 'PostgreSQL', 'Database Design']
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'SkillFlow',
      subtitle: 'Hiring & Talent Management Platform',
      category: 'Full-Stack',
      fieldTag: 'Talent & HR Tech',
      summary: 'Full-stack recruitment & candidate tracking system supporting candidate pipelines and multi-role dashboards.',
      highlights: [
        'Built a full-stack, deployment-ready hiring platform with Next.js 14 (App Router), Express 5, PostgreSQL, and Prisma ORM supporting seamless recruitment workflows.',
        'Implemented candidate profile management, job posting, and application tracking with live status updates (Applied, Shortlisted, Interview, Selected, Rejected).',
        'Built an employer dashboard for candidate pipeline review and an admin dashboard with platform metrics, skills catalog management, and JWT role access.'
      ],
      techStack: ['Next.js 14', 'Express 5', 'PostgreSQL', 'Prisma ORM', 'JWT', 'Tailwind CSS'],
      demoUrl: 'https://skillflow-frontend-blush.vercel.app',
      githubUrl: 'https://github.com/Vibhav4518',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 'proj-2',
      title: 'Velora',
      subtitle: 'Full-Stack E-Commerce Platform',
      category: 'Full-Stack',
      fieldTag: 'E-Commerce',
      summary: 'Production-ready e-commerce platform with Django REST API, React SPA, and automated invoice tracking.',
      highlights: [
        'Engineered a production-ready e-commerce platform using Django REST Framework, PostgreSQL, and a React.js (Vite) single-page application styled with Tailwind CSS.',
        'Built product catalog, multi-image galleries, search, filtering, cart, wishlist, and checkout flows with coupon & tax calculation.',
        'Implemented order and invoice system with status tracking, inventory auto-adjustment, and a role-based admin dashboard with real-time analytics.'
      ],
      techStack: ['React.js', 'Vite', 'Django REST Framework', 'PostgreSQL', 'Tailwind CSS', 'Python'],
      demoUrl: 'https://velora-beryl-five.vercel.app',
      githubUrl: 'https://github.com/Vibhav4518',
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67daf64f42?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 'proj-3',
      title: 'Vision',
      subtitle: 'Learning Management System (LMS) Website',
      category: 'Frontend',
      fieldTag: 'EdTech & Learning',
      summary: 'Responsive LMS platform featuring structured quiz modules, interactive learning materials, and smooth UI navigation.',
      highlights: [
        'Developed a responsive LMS website with a clean interface, structured quiz sections, and smooth navigation for an engaging learning experience.',
        'Implemented a user-friendly layout for accessing learning materials, articles, and educational content consistently across devices.'
      ],
      techStack: ['JavaScript', 'HTML5', 'CSS3', 'GitHub Pages', 'Responsive Web Design'],
      demoUrl: 'https://vibhav4518.github.io/Vision',
      githubUrl: 'https://github.com/Vibhav4518/Vision',
      imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1000&auto=format&fit=crop'
    }
  ],
  certificates: [
    {
      id: 'cert-1',
      title: 'Bharatiya Antariksh Hackathon 2026',
      issuer: 'Indian Space Research Organisation (ISRO) & Hack2skill',
      date: '2026',
      category: 'Hackathons',
      description: 'National space tech hackathon participant recognized by ISRO.',
      credentialUrl: 'https://vibhav-portfolio04.vercel.app',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 'cert-2',
      title: 'AI for All — AI Fundamentals Certification',
      issuer: 'Intel via Skill India Digital Hub (NSDC)',
      date: '2025',
      category: 'AI & Data',
      description: 'Certified in foundational Artificial Intelligence concepts and application domains.',
      credentialUrl: 'https://vibhav-portfolio04.vercel.app',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 'cert-3',
      title: 'Frontend Web Development Using React.js & Lovable AI',
      issuer: 'Smarted (5-Day Bootcamp)',
      date: '2025',
      category: 'Web Development',
      description: 'Hands-on training in React.js UI patterns and modern web development workflows.',
      credentialUrl: 'https://vibhav-portfolio04.vercel.app',
      imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 'cert-4',
      title: 'Triwizardathon 1.0 — Finale Round Qualifier',
      issuer: 'Microsoft Learn Student Ambassadors (MLSA) & GLA University',
      date: '2025',
      category: 'Hackathons',
      description: 'Qualified for the Grand Finale round in the national MLSA hackathon.',
      credentialUrl: 'https://vibhav-portfolio04.vercel.app',
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 'cert-5',
      title: 'AKTU AI Tech Confluence 2025 Hackathon',
      issuer: 'Powered by HCL GUVI',
      date: '2025',
      category: 'Competitions',
      description: 'Participated in competitive AI solution building and tech confluence hackathon.',
      credentialUrl: 'https://vibhav-portfolio04.vercel.app',
      imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop'
    }
  ],
  skills: [
    {
      category: 'Languages',
      skills: ['Python', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'SQL']
    },
    {
      category: 'Frontend',
      skills: ['React.js', 'Next.js (App Router)', 'Tailwind CSS', 'Bootstrap', 'Vite']
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express.js', 'Django', 'Django REST Framework', 'Prisma ORM', 'REST API Design']
    },
    {
      category: 'Databases',
      skills: ['PostgreSQL', 'MySQL']
    },
    {
      category: 'Tools & Platforms',
      skills: ['Git', 'GitHub', 'Postman', 'Figma', 'Trello', 'Jira', 'SonarQube', 'VS Code', 'Vercel', 'Netlify', 'Render']
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.Tech, Computer Science & Engineering',
      institution: 'Sagar Institute of Technology and Management, Barabanki',
      period: '2023 – 2027'
    },
    {
      id: 'edu-2',
      degree: 'Senior Secondary (Class XII), CBSE',
      institution: 'Saraswati Vidya Mandir S.S. School, Rambagh, Basti, UP',
      period: '2023'
    }
  ],
  messages: []
};
