# 🚀 Modern Developer Portfolio & Admin Studio

A high-performance, fully dynamic developer portfolio built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **MongoDB Atlas**. Features an exclusive **Google OAuth 2.0 Admin Studio** for live content management without redeploying code.

🌐 **Live Demo**: [vibhav-portfolio04.vercel.app](https://vibhav-portfolio04.vercel.app)

---

## ✨ Key Features

### 💻 Public Portfolio Website
- **Dynamic Hero & Personal Branding**: Customized title, status badges, avatar, social links, and tagline.
- **Projects Catalog**: Filterable by project category, complete with tech stack tags, GitHub repositories, live demo buttons, and modal details.
- **Certifications & Honors**: Showcase national hackathons, AI certifications, and web development credentials with image zoom modals, credential verification links, and detailed description/about text.
- **Work Experience**: Interactive career timeline with role progression badges, company highlights, and tech stacks used.
- **Skills & Tech Stacks**: Categorized technical expertise (Languages, Frameworks, Cloud, Databases).
- **Interactive Contact Form**: Direct visitor messaging system with real-time inbox synchronization to the Admin Studio.
- **Dark/Light Theme**: Fully responsive design optimized across desktop, tablet, and mobile devices.

### 🛡️ Admin Studio (`/admin`)
- **Exclusive Google OAuth 2.0 Authentication**: Secured with Google login verification. Only authorized admin Google accounts are permitted access.
- **Direct Authorized Admin Transfer**: Transfer authorized admin access to any new Google email directly from the dashboard with instant database updates.
- **Complete Content Management (CRUD)**:
  - Profile & Hero Info (Name, Title, Avatar URL, Resume Link, Bio)
  - Projects (Add, Edit, Delete, Reorder Priority)
  - Certificates (Add, Edit, Delete, Description/About text, Drive Image Links, Credential URLs)
  - Work Experience & Progression Timeline
  - Skill Categories & Education History
- **Section Priority Reordering**: Custom section ordering across the main portfolio.
- **Visitor Inbox**: View, read, and delete contact messages submitted by visitors.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Lucide React](https://lucide.dev/) Icons
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) with local JSON/Memory fallback
- **Authentication**: Custom Google OAuth 2.0 Integration (`jose` JWT session tokens)
- **Deployment**: [Vercel](https://vercel.com/)

---

## ⚙️ Environment Variables Setup

Create a `.env.local` file in the root directory and configure the following environment variables:

```env
# Database Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio_db?retryWrites=true&w=majority

# Security & Admin Authorization
ADMIN_EMAIL=vibhavsrivastav355@gmail.com
JWT_SECRET=your_super_secret_jwt_key_here

# Google OAuth 2.0 Authentication
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Application URL
NEXTAUTH_URL=http://localhost:3000
# For Production: NEXTAUTH_URL=https://vibhav-portfolio04.vercel.app
```

---

## 🔑 Setting Up Google OAuth 2.0

To enable Google Login for the Admin Studio:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Navigate to **APIs & Services > Credentials**.
4. Click **Create Credentials > OAuth Client ID** (Select **Web application**).
5. Add Authorized JavaScript origins:
   - `http://localhost:3000`
   - `https://vibhav-portfolio04.vercel.app`
6. Add Authorized redirect URIs:
   - `http://localhost:3000/api/auth/google/callback`
   - `https://vibhav-portfolio04.vercel.app/api/auth/google/callback`
7. Copy the **Client ID** and **Client Secret** into your `.env.local` / Vercel Environment Variables.

---

## 🚀 Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Vibhav4518/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.
5. Access the Admin Studio at [http://localhost:3000/admin](http://localhost:3000/admin).

---

## 📦 Production Build & Deployment

To verify and build the production bundle locally:

```bash
# Check TypeScript types
npx tsc --noEmit

# Build production bundle
npm run build

# Start production server
npm run start
```

### Deploying on Vercel
1. Push your repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com).
3. Add the Environment Variables (`MONGODB_URI`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `JWT_SECRET`, `ADMIN_EMAIL`).
4. Click **Deploy**.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).