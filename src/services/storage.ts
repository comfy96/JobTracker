import type { JobApplication } from '../types/job';

const STORAGE_KEY = 'jobtrack_applications_v1';

const SAMPLE_APPLICATIONS: JobApplication[] = [
  {
    id: 'demo-1',
    company: 'Stripe',
    role: 'Frontend Engineer',
    appliedDate: '2026-08-25',
    status: 'Interview',
    notes: 'Passed initial recruiter screening. Technical round scheduled for next Tuesday.',
    createdAt: Date.now() - 86400000 * 9,
    updatedAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'demo-2',
    company: 'Linear',
    role: 'Fullstack Developer',
    appliedDate: '2026-08-20',
    status: 'Offer',
    notes: 'Received initial verbal offer! Reviewing compensation package details.',
    createdAt: Date.now() - 86400000 * 14,
    updatedAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'demo-3',
    company: 'Vercel',
    role: 'UI/UX Engineer',
    appliedDate: '2026-08-28',
    status: 'Applied',
    notes: 'Applied via company careers page with updated portfolio link.',
    createdAt: Date.now() - 86400000 * 6,
    updatedAt: Date.now() - 86400000 * 6,
  },
  {
    id: 'demo-4',
    company: 'Figma',
    role: 'Product Designer / Developer',
    appliedDate: '2026-08-10',
    status: 'Rejected',
    notes: 'Position closed internally. Will follow up in 6 months for future openings.',
    createdAt: Date.now() - 86400000 * 24,
    updatedAt: Date.now() - 86400000 * 10,
  },
];

export const StorageService = {
  getApplications(): JobApplication[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        // Initialize with sample applications for high quality first impression
        this.saveApplications(SAMPLE_APPLICATIONS);
        return SAMPLE_APPLICATIONS;
      }
      return JSON.parse(data) as JobApplication[];
    } catch (error) {
      console.error('Failed to read from localStorage:', error);
      return SAMPLE_APPLICATIONS;
    }
  },

  saveApplications(applications: JobApplication[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    } catch (error) {
      console.error('Failed to write to localStorage:', error);
    }
  },

  addApplication(appData: Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'>): JobApplication {
    const apps = this.getApplications();
    const newApp: JobApplication = {
      ...appData,
      id: `job-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const updated = [newApp, ...apps];
    this.saveApplications(updated);
    return newApp;
  },

  updateApplication(id: string, updates: Partial<Omit<JobApplication, 'id' | 'createdAt'>>): JobApplication[] {
    const apps = this.getApplications();
    const updated = apps.map((app) =>
      app.id === id
        ? {
            ...app,
            ...updates,
            updatedAt: Date.now(),
          }
        : app
    );
    this.saveApplications(updated);
    return updated;
  },

  deleteApplication(id: string): JobApplication[] {
    const apps = this.getApplications();
    const updated = apps.filter((app) => app.id !== id);
    this.saveApplications(updated);
    return updated;
  },

  resetToSampleData(): JobApplication[] {
    this.saveApplications(SAMPLE_APPLICATIONS);
    return SAMPLE_APPLICATIONS;
  },
};
