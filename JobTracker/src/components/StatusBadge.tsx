import React from 'react';
import type { ApplicationStatus } from '../types/job';

interface StatusBadgeProps {
  status: ApplicationStatus;
  size?: 'sm' | 'md' | 'lg';
  showDotOnly?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStatusConfig = (st: ApplicationStatus) => {
    switch (st) {
      case 'Applied':
        return {
          label: 'Applied',
          className: 'badge-applied',
          dotColor: '#3B82F6',
        };
      case 'Interview':
        return {
          label: 'Interview',
          className: 'badge-interview',
          dotColor: '#8B5CF6',
        };
      case 'Offer':
        return {
          label: 'Offer',
          className: 'badge-offer',
          dotColor: '#10B981',
        };
      case 'Rejected':
        return {
          label: 'Rejected',
          className: 'badge-rejected',
          dotColor: '#EF4444',
        };
      default:
        return {
          label: st,
          className: 'badge-default',
          dotColor: '#6B7280',
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={`status-badge ${config.className} size-${size}`}>
      <span className="status-badge-dot" style={{ backgroundColor: config.dotColor }} />
      <span className="status-badge-text">{config.label}</span>
    </span>
  );
};
