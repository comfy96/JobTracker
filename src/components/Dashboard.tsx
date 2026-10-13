import React from 'react';
import type { JobApplication, ApplicationStats } from '../types/job';
import { Briefcase, Send, CalendarCheck, CheckCircle2, XCircle } from 'lucide-react';

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

  const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  // Calculate funnel percentages
  const totalCount = stats.total || 1;
  const appliedPct = Math.round((stats.applied / totalCount) * 100);
  const interviewPct = Math.round((stats.interviews / totalCount) * 100);
  const offerPct = Math.round((stats.offers / totalCount) * 100);
  const rejectionsPct = Math.round((stats.rejections / totalCount) * 100);

  const statusMetrics = [
    {
      id: 'Applied',
      label: 'Applied',
      count: stats.applied,
      pct: appliedPct,
      icon: Send,
      dotColor: '#3B82F6',
    },
    {
      id: 'Interview',
      label: 'Interview',
      count: stats.interviews,
      pct: interviewPct,
      icon: CalendarCheck,
      dotColor: '#8B5CF6',
    },
    {
      id: 'Offer',
      label: 'Offer',
      count: stats.offers,
      pct: offerPct,
      icon: CheckCircle2,
      dotColor: '#10B981',
    },
    {
      id: 'Rejected',
      label: 'Rejected',
      count: stats.rejections,
      pct: rejectionsPct,
      icon: XCircle,
      dotColor: '#EF4444',
    },
  ];

  return (
    <section className="dashboard-metrics-section" aria-label="Application statistics and pipeline summary">
      {/* Consolidated Metrics Strip */}
      <div className="metrics-strip-card">
        <div className="metrics-strip-top">
          {/* 1. Total Applications Hero Anchor */}
          <button
            type="button"
            onClick={() => onSelectFilter('ALL')}
            className={`total-metric-anchor ${activeFilter === 'ALL' ? 'active' : ''}`}
            aria-pressed={activeFilter === 'ALL'}
            title="View all applications"
          >
            <div className="total-metric-header">
              <div className="total-metric-icon-box" aria-hidden="true">
                <Briefcase size={16} />
              </div>
              <span className="total-metric-title">Total Applications</span>
            </div>

            <div className="total-metric-val-row">
              <span className="total-metric-count">{formatNumber(stats.total)}</span>
              <span className="total-metric-label">Applications</span>
            </div>

            <div className="total-metric-footer">
              <span className="filter-hint">
                {activeFilter === 'ALL' ? 'Showing all records' : 'Click to show all'}
              </span>
            </div>
          </button>

          {/* Vertical Divider Rail */}
          <div className="metrics-strip-divider" aria-hidden="true" />

          {/* 2. Status Metrics Streamlined Grid / Row */}
          <div className="status-metrics-strip" role="group" aria-label="Status filters">
            {statusMetrics.map((item) => {
              const Icon = item.icon;
              const isActive = activeFilter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectFilter(item.id)}
                  className={`status-metric-chip ${isActive ? 'active' : ''}`}
                  aria-pressed={isActive}
                  title={`Filter by ${item.label}`}
                >
                  <div className="chip-header">
                    <span className="chip-dot" style={{ backgroundColor: item.dotColor }} aria-hidden="true" />
                    <span className="chip-title">{item.label}</span>
                  </div>
                  <div className="chip-body">
                    <span className="chip-count">{formatNumber(item.count)}</span>
                    <Icon size={15} className="chip-icon" aria-hidden="true" />
                  </div>
                  <div className="chip-footer">
                    <span className="chip-percentage">{item.pct}% of total</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Integrated Application Pipeline Bar */}
        {stats.total > 0 && (
          <div className="metrics-strip-pipeline">
            <div className="pipeline-label-row">
              <div className="pipeline-title-group">
                <span className="pipeline-title">Application Pipeline</span>
                <span className="pipeline-interactive-hint">&bull; Click segment to filter</span>
              </div>
              <span className="pipeline-stats-summary">{stats.total} Total Tracked</span>
            </div>
            <div className="pipeline-bar-track" role="region" aria-label="Interactive pipeline breakdown">
              {stats.applied > 0 && (
                <button
                  type="button"
                  onClick={() => onSelectFilter('Applied')}
                  className={`pipeline-seg seg-applied ${activeFilter === 'Applied' ? 'active-seg' : ''}`}
                  style={{ width: `${appliedPct}%` }}
                  title={`Click to filter: Applied (${stats.applied} - ${appliedPct}%)`}
                  aria-label={`Filter by Applied status (${stats.applied} applications)`}
                  aria-pressed={activeFilter === 'Applied'}
                />
              )}
              {stats.interviews > 0 && (
                <button
                  type="button"
                  onClick={() => onSelectFilter('Interview')}
                  className={`pipeline-seg seg-interview ${activeFilter === 'Interview' ? 'active-seg' : ''}`}
                  style={{ width: `${interviewPct}%` }}
                  title={`Click to filter: Interview (${stats.interviews} - ${interviewPct}%)`}
                  aria-label={`Filter by Interview status (${stats.interviews} applications)`}
                  aria-pressed={activeFilter === 'Interview'}
                />
              )}
              {stats.offers > 0 && (
                <button
                  type="button"
                  onClick={() => onSelectFilter('Offer')}
                  className={`pipeline-seg seg-offer ${activeFilter === 'Offer' ? 'active-seg' : ''}`}
                  style={{ width: `${offerPct}%` }}
                  title={`Click to filter: Offer (${stats.offers} - ${offerPct}%)`}
                  aria-label={`Filter by Offer status (${stats.offers} applications)`}
                  aria-pressed={activeFilter === 'Offer'}
                />
              )}
              {stats.rejections > 0 && (
                <button
                  type="button"
                  onClick={() => onSelectFilter('Rejected')}
                  className={`pipeline-seg seg-rejected ${activeFilter === 'Rejected' ? 'active-seg' : ''}`}
                  style={{ width: `${rejectionsPct}%` }}
                  title={`Click to filter: Rejected (${stats.rejections} - ${rejectionsPct}%)`}
                  aria-label={`Filter by Rejected status (${stats.rejections} applications)`}
                  aria-pressed={activeFilter === 'Rejected'}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
