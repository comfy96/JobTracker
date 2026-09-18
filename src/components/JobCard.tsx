import React, { useState, useRef, useEffect } from 'react';
import type { JobApplication, ApplicationStatus } from '../types/job';
import { StatusBadge } from './StatusBadge';
import { CompanyLogo } from './CompanyLogo';
import { Calendar, Edit2, Trash2, ChevronDown, Clock, Quote } from 'lucide-react';

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  const statuses: ApplicationStatus[] = ['Applied', 'Interview', 'Offer', 'Rejected'];

  // Close status dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsChangingStatus(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
    <article className="editorial-job-card">
      {/* 1. Header Row: Logo, Company Name, Applied Date & Status Trigger */}
      <div className="card-header-row">
        <div className="company-branding-group">
          <CompanyLogo company={application.company} size={44} />
          <div className="company-text-meta">
            <h3 className="company-name">{application.company}</h3>
            <span className="applied-date-sub">
              <Calendar size={13} className="meta-icon" />
              Applied {formatDate(application.appliedDate)}
            </span>
          </div>
        </div>

        {/* Status Dropdown Trigger */}
        <div className="status-selector-wrapper" ref={dropdownRef}>
          <button
            onClick={() => setIsChangingStatus(!isChangingStatus)}
            className="status-trigger-button"
            title="Click to update status"
            type="button"
            aria-expanded={isChangingStatus}
          >
            <StatusBadge status={application.status} size="md" />
            <ChevronDown size={14} className="chevron-indicator" />
          </button>

          {isChangingStatus && (
            <div className="status-dropdown-menu">
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
                >
                  <StatusBadge status={st} size="sm" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. Job Role Hierarchy */}
      <div className="role-title-row">
        <h4 className="job-role-title">{application.role}</h4>
      </div>

      {/* 3. Notes Accent Block */}
      {application.notes ? (
        <div className="card-notes-accent-block">
          <Quote size={13} className="notes-quote-icon" />
          <p className="notes-text-content">{application.notes}</p>
        </div>
      ) : (
        <div className="card-notes-placeholder">
          <span className="placeholder-text">No additional notes added</span>
        </div>
      )}

      {/* 4. Footer Meta & Actions */}
      <div className="card-footer-row">
        <span className="updated-timestamp">
          <Clock size={12} className="meta-icon" />
          Updated {formatRelativeUpdate(application.updatedAt)}
        </span>

        <div className="card-actions-row">
          <button
            onClick={() => onEdit(application)}
            className="btn-card-ghost edit"
            title="Edit Application"
            type="button"
          >
            <Edit2 size={13} />
            <span>Edit</span>
          </button>

          <button
            onClick={() => onDeleteRequest(application)}
            className="btn-card-ghost delete"
            title="Delete Application"
            type="button"
          >
            <Trash2 size={13} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </article>
  );
};
