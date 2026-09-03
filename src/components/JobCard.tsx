import React, { useState } from 'react';
import type { JobApplication, ApplicationStatus } from '../types/job';
import { StatusBadge } from './StatusBadge';
import { Building2, Calendar, FileText, Edit2, Trash2, ChevronDown } from 'lucide-react';

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

  const statuses: ApplicationStatus[] = ['Applied', 'Interview', 'Offer', 'Rejected'];

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

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="company-info">
          <div className="company-avatar">
            <Building2 size={20} />
          </div>
          <div>
            <h3 className="company-name">{application.company}</h3>
            <p className="job-role">{application.role}</p>
          </div>
        </div>

        <div className="status-dropdown-wrapper">
          <div
            onClick={() => setIsChangingStatus(!isChangingStatus)}
            className="status-click-area"
            title="Click to change status"
            role="button"
            tabIndex={0}
          >
            <StatusBadge status={application.status} />
            <ChevronDown size={14} className="status-chevron" />
          </div>

          {isChangingStatus && (
            <div className="status-dropdown-menu">
              <div className="dropdown-header">Change Status</div>
              {statuses.map((st) => (
                <button
                  key={st}
                  onClick={() => {
                    onStatusChange(application.id, st);
                    setIsChangingStatus(false);
                  }}
                  className={`dropdown-item ${st === application.status ? 'active' : ''}`}
                >
                  <StatusBadge status={st} size="sm" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="job-card-body">
        <div className="meta-item">
          <Calendar size={15} className="meta-icon" />
          <span>Applied on {formatDate(application.appliedDate)}</span>
        </div>

        {application.notes && (
          <div className="notes-container">
            <FileText size={15} className="notes-icon" />
            <p className="notes-text">{application.notes}</p>
          </div>
        )}
      </div>

      <div className="job-card-footer">
        <span className="last-updated">
          Updated {new Date(application.updatedAt).toLocaleDateString()}
        </span>

        <div className="card-actions">
          <button
            onClick={() => onEdit(application)}
            className="action-btn edit-btn"
            title="Edit Application"
          >
            <Edit2 size={16} />
            <span>Edit</span>
          </button>

          <button
            onClick={() => onDeleteRequest(application)}
            className="action-btn delete-btn"
            title="Delete Application"
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};
