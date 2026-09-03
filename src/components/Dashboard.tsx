import React from 'react';
import type { JobApplication, ApplicationStats } from '../types/job';
import { Briefcase, CalendarCheck, CheckCircle2, XCircle, Send } from 'lucide-react';

interface DashboardProps {
  applications: JobApplication[];
  activeFilter: string;
  onSelectFilter: (status: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  applications,
  activeFilter,
  onSelectFilter,
}) => {
  const stats: ApplicationStats = {
    total: applications.length,
    applied: applications.filter((a) => a.status === 'Applied').length,
    interviews: applications.filter((a) => a.status === 'Interview').length,
    offers: applications.filter((a) => a.status === 'Offer').length,
    rejections: applications.filter((a) => a.status === 'Rejected').length,
  };

  const statCards = [
    {
      id: 'ALL',
      title: 'Total Applications',
      count: stats.total,
      icon: Briefcase,
      colorClass: 'stat-total',
      filterValue: 'ALL',
    },
    {
      id: 'Applied',
      title: 'Applied',
      count: stats.applied,
      icon: Send,
      colorClass: 'stat-applied',
      filterValue: 'Applied',
    },
    {
      id: 'Interview',
      title: 'Interviews',
      count: stats.interviews,
      icon: CalendarCheck,
      colorClass: 'stat-interview',
      filterValue: 'Interview',
    },
    {
      id: 'Offer',
      title: 'Offers',
      count: stats.offers,
      icon: CheckCircle2,
      colorClass: 'stat-offer',
      filterValue: 'Offer',
    },
    {
      id: 'Rejected',
      title: 'Rejections',
      count: stats.rejections,
      icon: XCircle,
      colorClass: 'stat-rejected',
      filterValue: 'Rejected',
    },
  ];

  return (
    <section className="dashboard-section">
      <div className="dashboard-grid">
        {statCards.map((card) => {
          const Icon = card.icon;
          const isActive = activeFilter === card.filterValue;

          return (
            <div
              key={card.id}
              onClick={() => onSelectFilter(card.filterValue)}
              className={`stat-card ${card.colorClass} ${isActive ? 'stat-card-active' : ''}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelectFilter(card.filterValue)}
            >
              <div className="stat-header">
                <span className="stat-title">{card.title}</span>
                <div className="stat-icon-wrapper">
                  <Icon size={20} />
                </div>
              </div>
              <div className="stat-count">{card.count}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
