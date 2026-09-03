import React, { useState, useEffect } from 'react';
import type { JobApplication, ApplicationStatus } from '../types/job';
import { X, Building2, Briefcase, Calendar, MessageSquare, Save } from 'lucide-react';

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'>) => void;
  editingApplication: JobApplication | null;
}

export const JobModal: React.FC<JobModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingApplication,
}) => {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [appliedDate, setAppliedDate] = useState('');
  const [status, setStatus] = useState<ApplicationStatus>('Applied');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (editingApplication) {
      setCompany(editingApplication.company);
      setRole(editingApplication.role);
      setAppliedDate(editingApplication.appliedDate);
      setStatus(editingApplication.status);
      setNotes(editingApplication.notes || '');
    } else {
      // Default new application values
      const today = new Date().toISOString().split('T')[0];
      setCompany('');
      setRole('');
      setAppliedDate(today);
      setStatus('Applied');
      setNotes('');
    }
    setErrors({});
  }, [editingApplication, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!company.trim()) newErrors.company = 'Company name is required';
    if (!role.trim()) newErrors.role = 'Job title / role is required';
    if (!appliedDate) newErrors.appliedDate = 'Application date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      company: company.trim(),
      role: role.trim(),
      appliedDate,
      status,
      notes: notes.trim(),
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header">
          <h2>{editingApplication ? 'Edit Application' : 'Add New Application'}</h2>
          <button onClick={onClose} className="close-btn" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label" htmlFor="company-name">
              <Building2 size={16} /> Company Name <span className="required">*</span>
            </label>
            <input
              id="company-name"
              type="text"
              className={`form-input ${errors.company ? 'input-error' : ''}`}
              placeholder="e.g. Stripe, Google, Linear"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              autoFocus
            />
            {errors.company && <span className="error-message">{errors.company}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="job-role">
              <Briefcase size={16} /> Job Title / Role <span className="required">*</span>
            </label>
            <input
              id="job-role"
              type="text"
              className={`form-input ${errors.role ? 'input-error' : ''}`}
              placeholder="e.g. Frontend Engineer, Product Manager"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            {errors.role && <span className="error-message">{errors.role}</span>}
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label className="form-label" htmlFor="applied-date">
                <Calendar size={16} /> Application Date <span className="required">*</span>
              </label>
              <input
                id="applied-date"
                type="date"
                className={`form-input ${errors.appliedDate ? 'input-error' : ''}`}
                value={appliedDate}
                onChange={(e) => setAppliedDate(e.target.value)}
              />
              {errors.appliedDate && <span className="error-message">{errors.appliedDate}</span>}
            </div>

            <div className="form-group flex-1">
              <label className="form-label" htmlFor="application-status">
                Status <span className="required">*</span>
              </label>
              <select
                id="application-status"
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="job-notes">
              <MessageSquare size={16} /> Notes
            </label>
            <textarea
              id="job-notes"
              className="form-textarea"
              rows={4}
              placeholder="Add key details: referral context, interview dates, salary range, recruiter contact, next steps..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-icon">
              <Save size={18} />
              <span>{editingApplication ? 'Save Changes' : 'Add Application'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
