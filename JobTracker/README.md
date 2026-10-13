# JobTrack SaaS – Upgraded Dashboard 🚀

An elite, production-grade job search tracking web application built with Vite, React, TypeScript, and modern CSS/Tailwind design tokens. This version represents a comprehensive UI/UX and accessibility (A11y) iteration overhaul.

![JobTrack Interface Demo](public/favicon.svg)

---

## ✨ What's New in This Iteration (SaaS Polish)

### 1. Typography & Layout Refinement
* **Hierarchy:** De-emphasized secondary greetings to establish the main value proposition as the clear anchor $h1$.
* **Fluid Scaling:** Implemented modern CSS `clamp()` techniques for smooth scaling across viewports.
* **Card Rhythm:** Standardized internal padding across all application cards (Linear, Vercel, Stripe) for a clean visual cadence.

### 2. Visual Polish & Micro-Interactions
* **Card Elevation:** Added smooth hover transitions (`hover:-translate-y-0.5 hover:shadow-md`) for a tactile, responsive grid.
* **Interactive Pipeline:** Upgraded the application status pipeline bar with instant visual feedback upon filtering.
* **Robust States:** Added custom empty states for filtered queries and component skeleton loaders.

### 3. Ergonomics & Architecture
* **Consolidated Metrics:** Streamlined the top-level key performance indicator (KPI) layout for rapid data scanning.
* **Contextual Actions:** Moved destructive actions (like "Delete") into a clean dropdown menu to prevent accidental clicks.
* **Filter Clarity:** Applied high-contrast active states to status filter pills (`All`, `Applied`, `Interview`, etc.).

### 4. Accessibility (A11y) & Resilience
* **WCAG AA Compliance:** Audited muted text and badge color luminance against backgrounds.
* **Focus Rings:** Added explicit visible focus rings (`focus-visible`) for full keyboard navigation support.
* **Screen Reader Semantics:** Enhanced ARIA labels and live region wrappers (`aria-live`) for dynamic count announcements.

---

## 📌 Problem & Purpose

### Who it is designed for
JobTrack is designed for software engineers, designers, product managers, and active job seekers who are applying to multiple companies and need an intuitive, friction-free way to track their application pipeline.

### The Problem It Solves
When actively job hunting, candidates often send out dozens of applications across different boards and portals. Tracking application dates, status updates (`Applied`, `Interview`, `Offer`, `Rejected`), and interview notes in messy spreadsheets or text notes leads to missed follow-ups and clutter. 

JobTrack solves this by providing:
- A real-time visual dashboard summarizing application statistics.
- Direct filtering by application status (`Applied`, `Interview`, `Offer`, `Rejected`).
- Instant search across company names, job titles, and interview notes.
- Seamless client-side LocalStorage persistence so data remains intact across sessions without complex login systems or external backends.

---

## ✨ Features

- **📊 Consolidated Metrics Strip**: Unified total applications KPI, status-specific metric chips, and an interactive application pipeline visualizer in a single scannable card.
- **➕ Add Applications**: Record company name, role title, application date, current status, and custom notes.
- **✏️ Edit & Update**: Modify application details or use the quick status switcher menu directly on card elements.
- **🗑️ Safe Contextual Deletion**: Destructive delete action moved into a contextual triple-dot (`...`) dropdown menu with confirmation modal protection.
- **🔍 Filter & Search**: Filter pipeline by high-contrast status tabs (`All`, `Applied`, `Interview`, `Offer`, `Rejected`) and live search by company or role.
- **📶 LocalStorage Persistence**: Automatically persists data in browser storage with instant pre-loaded sample data on first launch.
- **📱 Responsive & Accessible**: WCAG AA compliant contrast ratios, visible `:focus-visible` keyboard rings, and screen reader announcements (`aria-live`).

---

## 🛠️ Tech Stack & Tools

- **Framework**: React 18 / Vite 6
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS & Modern Custom Design System Tokens (CSS variables, fluid typography, glassmorphism)
- **Icons**: Lucide React Icons (`lucide-react`)
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
   cd "job tracker New"
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
   Navigate to `http://localhost:5173` (or the port specified by Vite) to view and interact with JobTrack.

5. **Build for production**:
   ```bash
   npm run build
   ```

---

## 💡 Technical & Product Decisions

1. **Consolidated Metrics Strip Layout**:
   - Replaced disjointed stats blocks with an integrated ribbon connecting total applications, status breakdown, and the visual pipeline bar.
   - Streamlines eye tracking and preserves vertical viewport space.

2. **Contextual Action Menus over Inline Destructive Links**:
   - Primary "Edit" action remains accessible directly on the card.
   - Destructive "Delete" action is safely tucked into an accessible triple-dot (`...`) dropdown menu with click-outside and `Escape` listeners.

3. **Fluid Typography with CSS `clamp()`**:
   - Section headings and primary metric counters dynamically adapt between small and large viewports without abrupt breakpoint layout shifts.

4. **Client-Side Persistence via LocalStorage**:
   - Private, instant data storage with zero backend overhead.
   - Pre-seeded with sample applications for an immediate out-of-the-box experience.

---

## 🧗 Challenges & Solutions

| Challenge | Solution |
| :--- | :--- |
| **Accidental Card Deletions** | Migrated direct text "Delete" buttons to a contextual triple-dot dropdown menu accompanied by a confirmation modal. |
| **Filter View Ambiguity** | Replaced subtle background shifts on status pills with solid, high-contrast brand styling (`#2563EB`) and bold typography. |
| **Screen Reader State Sync** | Integrated `aria-live="polite"` regions and `role="region"` wrappers to announce dynamic counts and filter updates. |
| **Muted Text Contrast Standards** | Audited all secondary text, timestamps, and badges against background surfaces to ensure strict WCAG AA (>4.5:1) compliance. |
