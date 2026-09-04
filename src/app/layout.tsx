import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../components/ThemeProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Vibhav Srivastava | Full-Stack Software Developer & CSE Student',
  description:
    'Portfolio of Vibhav Srivastava - Full-Stack Developer & B.Tech CSE Student skilled in Node.js, Express, Next.js, Python, Django, PostgreSQL, and React. Featured projects: SkillFlow, Velora, Vision.',
  keywords: [
    'Vibhav Srivastava',
    'Full Stack Developer',
    'CSE Student Portfolio',
    'Next.js Portfolio',
    'React Developer',
    'Django REST Framework',
    'SkillFlow',
    'Velora',
    'Vision',
  ],
  authors: [{ name: 'Vibhav Srivastava' }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Vibhav Srivastava | Full-Stack Software Developer & CSE Student',
    description:
      'Computer Science undergraduate with full-stack software development experience across Node.js/Next.js and Python/Django ecosystems.',
    url: 'https://vibhav-portfolio04.vercel.app',
    siteName: 'Vibhav Srivastava Portfolio',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${mono.variable} font-sans min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
