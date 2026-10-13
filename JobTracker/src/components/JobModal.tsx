import React, { useState, useEffect } from 'react';
import type { JobApplication, ApplicationStatus } from '../types/job';
import { X, Building2, Briefcase, Calendar, MessageSquare, CheckCircle2 } from 'lucide-react';

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
    <div className="editorial-modal-backdrop" onClick={onClose}>
      <div
        className="editorial-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-top-bar">
          <div>
            <h3 className="modal-title">
              {editingApplication ? 'Edit Application' : 'Add New Application'}
            </h3>
            <p className="modal-description">
              {editingApplication
                ? 'Update company details, interview stage, or notes.'
                : 'Log a new position to keep your job search organized.'}
            </p>
          </div>
          <button onClick={onClose} className="btn-modal-close" aria-label="Close dialog">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body-form">
          <div className="input-field-group">
            <label className="field-label" htmlFor="company-name">
              <Building2 size={15} /> Company Name <span className="req-asterisk">*</span>
            </label>
            <input
              id="company-name"
              type="text"
              className={`text-input ${errors.company ? 'has-error' : ''}`}
              placeholder="e.g. Stripe, Vercel, Linear"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              autoFocus
            />
            {errors.company && <span className="field-error">{errors.company}</span>}
          </div>

          <div className="input-field-group">
            <label className="field-label" htmlFor="job-role">
              <Briefcase size={15} /> Job Title / Role <span className="req-asterisk">*</span>
            </label>
            <input
              id="job-role"
              type="text"
              className={`text-input ${errors.role ? 'has-error' : ''}`}
              placeholder="e.g. Senior Frontend Engineer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            {errors.role && <span className="field-error">{errors.role}</span>}
          </div>

          <div className="input-row-two-col">
            <div className="input-field-group col-half">
              <label className="field-label" htmlFor="applied-date">
                <Calendar size={15} /> Applied Date <span className="req-asterisk">*</span>
              </label>
              <input
                id="applied-date"
                type="date"
                className={`text-input ${errors.appliedDate ? 'has-error' : ''}`}
                value={appliedDate}
                onChange={(e) => setAppliedDate(e.target.value)}
              />
              {errors.appliedDate && <span className="field-error">{errors.appliedDate}</span>}
            </div>

            <div className="input-field-group col-half">
              <label className="field-label" htmlFor="application-status">
                Current Status <span className="req-asterisk">*</span>
              </label>
              <select
                id="application-status"
                className="select-input"
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

          <div className="input-field-group">
            <label className="field-label" htmlFor="job-notes">
              <MessageSquare size={15} /> Application Notes
            </label>
            <textarea
              id="job-notes"
              className="textarea-input"
              rows={3}
              placeholder="Referral details, compensation targets, recruiter contact info, next interview dates..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="modal-bottom-actions">
            <button type="button" onClick={onClose} className="btn-modal-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-primary-cta modal-submit">
              <CheckCircle2 size={16} />
              <span>{editingApplication ? 'Save Changes' : 'Save Application'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
