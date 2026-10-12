import React, { useState, useRef, useEffect } from 'react';
import type { JobApplication, ApplicationStatus } from '../types/job';
import { StatusBadge } from './StatusBadge';
import { CompanyLogo } from './CompanyLogo';
import { Calendar, Edit2, Trash2, ChevronDown, Clock, Quote, MoreHorizontal } from 'lucide-react';

interface JobCardProps {
  application: JobApplication;
  onEdit: (app: JobApplication) => void;
  onDeleteRequest: (app: JobApplication) => void;
  onStatusChange: (id: string, status: ApplicationStatus) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  application,
  onEdit,
  onDeleteRequest,
  onStatusChange,
}) => {
  const [isChangingStatus, setIsChangingStatus] = useState(false);
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);
  
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const actionsMenuRef = useRef<HTMLDivElement>(null);

  const statuses: ApplicationStatus[] = ['Applied', 'Interview', 'Offer', 'Rejected'];

  // Close dropdowns on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(target)) {
        setIsChangingStatus(false);
      }
      if (actionsMenuRef.current && !actionsMenuRef.current.contains(target)) {
        setIsActionsMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsChangingStatus(false);
        setIsActionsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    try {
      const date = new Date(dateStr + 'T00:00:00');
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const formatRelativeUpdate = (timestamp: number) => {
    if (!timestamp) return '';
    try {
      const date = new Date(timestamp);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  };

  return (
    <article className="editorial-job-card" aria-labelledby={`job-role-${application.id}`}>
      {/* 1. Primary Focal Row: Company Name & Status Pill side-by-side */}
      <div className="card-top-focal-row">
        <div className="company-focal-group">
          <CompanyLogo company={application.company} size={42} />
          <div className="company-focal-meta">
            <h3 className="company-name">{application.company}</h3>
            <span className="applied-date-sub">
              <Calendar size={12} className="meta-icon" aria-hidden="true" />
              Applied {formatDate(application.appliedDate)}
            </span>
          </div>
        </div>

        {/* Status Pill Focal Trigger */}
        <div className="status-selector-wrapper" ref={statusDropdownRef}>
          <button
            onClick={() => setIsChangingStatus(!isChangingStatus)}
            className="status-trigger-button"
            title="Click to update status"
            type="button"
            aria-expanded={isChangingStatus}
            aria-haspopup="listbox"
            aria-label={`Status: ${application.status}. Click to change.`}
          >
            <StatusBadge status={application.status} size="md" />
            <ChevronDown size={14} className="chevron-indicator" aria-hidden="true" />
          </button>

          {isChangingStatus && (
            <div className="status-dropdown-menu" role="listbox" aria-label="Change application status">
              <div className="dropdown-label">Change Status</div>
              {statuses.map((st) => (
                <button
                  key={st}
                  onClick={() => {
                    onStatusChange(application.id, st);
                    setIsChangingStatus(false);
                  }}
                  className={`dropdown-option ${st === application.status ? 'selected' : ''}`}
                  type="button"
                  role="option"
                  aria-selected={st === application.status}
                >
                  <StatusBadge status={st} size="sm" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. Immediate Follow-up: Job Role Title */}
      <div className="card-role-section">
        <h4 id={`job-role-${application.id}`} className="job-role-title">
          {application.role}
        </h4>
      </div>

      {/* 3. Notes Accent Block */}
      {application.notes ? (
        <div className="card-notes-accent-block">
          <Quote size={12} className="notes-quote-icon" aria-hidden="true" />
          <p className="notes-text-content">{application.notes}</p>
        </div>
      ) : (
        <div className="card-notes-placeholder">
          <span className="placeholder-text">No additional notes</span>
        </div>
      )}

      {/* 4. Footer Meta & Actions (Triple-Dot Menu for Destructive Actions) */}
      <div className="card-footer-row">
        <span className="updated-timestamp">
          <Clock size={12} className="meta-icon" aria-hidden="true" />
          Updated {formatRelativeUpdate(application.updatedAt)}
        </span>

        <div className="card-actions-row">
          {/* Primary Quick Action: Edit */}
          <button
            onClick={() => onEdit(application)}
            className="btn-card-ghost edit"
            title="Edit Application"
            type="button"
            aria-label={`Edit ${application.role} at ${application.company}`}
          >
            <Edit2 size={13} aria-hidden="true" />
            <span>Edit</span>
          </button>

          {/* Contextual Triple-Dot Overflow Menu */}
          <div className="card-overflow-wrapper" ref={actionsMenuRef}>
            <button
              onClick={() => setIsActionsMenuOpen(!isActionsMenuOpen)}
              className={`btn-card-overflow ${isActionsMenuOpen ? 'active' : ''}`}
              title="More actions"
              type="button"
              aria-label={`More options for ${application.company}`}
              aria-expanded={isActionsMenuOpen}
              aria-haspopup="true"
            >
              <MoreHorizontal size={15} aria-hidden="true" />
            </button>

            {isActionsMenuOpen && (
              <div className="card-overflow-menu" role="menu" aria-label="Card actions">
                <button
                  onClick={() => {
                    setIsActionsMenuOpen(false);
                    onEdit(application);
                  }}
                  className="card-overflow-item"
                  type="button"
                  role="menuitem"
                >
                  <Edit2 size={13} aria-hidden="true" />
                  <span>Edit details</span>
                </button>

                <div className="card-overflow-divider" role="separator" />

                <button
                  onClick={() => {
                    setIsActionsMenuOpen(false);
                    onDeleteRequest(application);
                  }}
                  className="card-overflow-item danger"
                  type="button"
                  role="menuitem"
                >
                  <Trash2 size={13} aria-hidden="true" />
                  <span>Delete application</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
