import React from 'react';
import type { ApplicationStatus } from '../types/job';
import { Send, CalendarCheck, CheckCircle2, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: ApplicationStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStatusConfig = (status: ApplicationStatus) => {
    switch (status) {
      case 'Applied':
        return {
          label: 'Applied',
          className: 'badge-applied',
          icon: Send,
        };
      case 'Interview':
        return {
          label: 'Interview',
          className: 'badge-interview',
          icon: CalendarCheck,
        };
      case 'Offer':
        return {
          label: 'Offer',
          className: 'badge-offer',
          icon: CheckCircle2,
        };
      case 'Rejected':
        return {
          label: 'Rejected',
          className: 'badge-rejected',
          icon: XCircle,
        };
      default:
        return {
          label: status,
          className: 'badge-default',
          icon: Send,
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <span className={`status-badge ${config.className} badge-${size}`}>
      <Icon size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14} />
      <span>{config.label}</span>
    </span>
  );
};
