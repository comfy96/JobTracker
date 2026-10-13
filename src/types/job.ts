export type ApplicationStatus = 'Applied' | 'Interview' | 'Offer' | 'Rejected';

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  appliedDate: string; // YYYY-MM-DD
  status: ApplicationStatus;
  notes: string;
  createdAt: number;
  updatedAt: number;
}

export interface ApplicationStats {
  total: number;
  applied: number;
  interviews: number;
  offers: number;
  rejections: number;
}
