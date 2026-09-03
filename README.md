# JobTrack — Personal Job Application Tracker

JobTrack is a clean, responsive, and functional web application built to help job seekers effortlessly organize, track, and manage their job applications in one central dashboard.

![JobTrack Interface Demo](public/favicon.svg)

---

## 📌 Problem & Purpose

### Who it is designed for
JobTrack is designed for software engineers, designers, product managers, and active job seekers who are applying to multiple companies and need an intuitive way to track their application pipeline.

### The Problem It Solves
When actively job hunting, candidates often send out dozens of applications across different boards and portals. Tracking application dates, status updates (Applied, Interview, Offer, Rejected), and interview notes in messy spreadsheets or text notes leads to missed follow-ups and clutter. 

JobTrack solves this by providing:
- A real-time visual dashboard summarizing application statistics.
- Direct filtering by application status (`Applied`, `Interview`, `Offer`, `Rejected`).
- Instant search across company names, job titles, and interview notes.
- Seamless client-side LocalStorage persistence so data remains intact across sessions without complex login systems or external backends.

---

## ✨ Features

- **📊 Visual Dashboard**: Instant breakdown of total applications, active interviews, job offers, and rejections.
- **➕ Add Applications**: Record company name, role title, application date, current status, and custom notes.
- **✏️ Edit & Update**: Modify application details or use the quick status switcher menu directly on card elements.
- **🗑️ Confirmation Deletion**: Safe deletion of application cards with modal confirmation dialog.
- **🔍 Filter & Search**: Filter pipeline by status tabs (`All`, `Applied`, `Interview`, `Offer`, `Rejected`) and live search by company or role.
- **📶 LocalStorage Persistence**: Automatically persists data in browser storage with instant pre-loaded sample data on first launch.
- **📱 Responsive & Accessible**: Dark slate design system with fluid grid layouts for mobile and desktop screens.

---

## 🛠️ Tech Stack & Tools

- **Framework**: React 18 / Vite 6
- **Language**: TypeScript (Strict Mode)
- **Icons**: Lucide React Icons (`lucide-react`)
- **Styling**: Modern CSS Design System (CSS variables, glassmorphism, responsive grid layout)
- **State & Storage**: React Hooks (`useState`, `useEffect`, `useMemo`) + Browser `localStorage` API

---

## 🚀 Installation & Local Development

Follow these simple steps to run JobTrack locally on your machine:

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Steps

1. **Clone or navigate to the repository directory**:
   ```bash
   cd JobTracker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:5173` to view and interact with JobTrack.

5. **Build for production**:
   ```bash
   npm run build
   ```

---

## 💡 Technical & Product Decisions

1. **Client-Side Persistence via LocalStorage**:
   - Chosen to fulfill zero-backend friction. Data stays private on the user's browser with zero latency.
   - Pre-seeded with sample job applications so users can explore dashboard stats and filters immediately on first visit.

2. **Standard CSS Variables over Heavy Utility Frameworks**:
   - Built a sleek dark slate theme (`#0f172a`, `#1e293b`) using native CSS variables for maximum performance, crisp typography (Inter font), micro-animations, and fast page loads.

3. **Modal Dialogs with Backdrop Blur**:
   - Used overlay backdrop blur (`backdrop-filter`) for form modal and deletion confirmation to maintain visual context while preventing accidental clicks.

---

## 🧗 Challenges & Solutions

| Challenge | Solution |
| :--- | :--- |
| **Vite `verbatimModuleSyntax` TypeScript Strict Import Errors** | Vite 6 enforces explicit type imports (`import type { ... }`). Resolved by converting interface imports to type-only imports across all components. |
| **Quick Status Switching UX** | Users often want to move a job from "Applied" to "Interview" without opening a full edit modal. Added an inline click menu directly on status badges for 1-click status updates. |
| **Data Persistence on First Load** | New users opening an empty tracker might wonder how the app looks with active data. Created an automatic demo-seeding utility in `StorageService` with a manual "Reset Demo Data" option. |
