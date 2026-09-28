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
    <section className="dashboard-metrics-section">
      <div className="metrics-layout-grid">
        {/* Primary Stat Block */}
        <div
          onClick={() => onSelectFilter('ALL')}
          className={`primary-metric-card ${activeFilter === 'ALL' ? 'active' : ''}`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onSelectFilter('ALL')}
          title="View all applications"
        >
          <div className="primary-metric-top">
            <span className="primary-metric-title">Total Applications</span>
            <div className="primary-metric-icon">
              <Briefcase size={18} />
            </div>
          </div>

          <div className="primary-metric-body">
            <span className="primary-metric-count">{formatNumber(stats.total)}</span>
            <span className="primary-metric-label">Applications</span>
          </div>

          <div className="primary-metric-footer">
            <span className="filter-hint">
              {activeFilter === 'ALL' ? 'Showing all records' : 'Click to show all'}
            </span>
          </div>
        </div>

        {/* Secondary Metrics Panel */}
        <div className="secondary-metrics-wrapper">
          <div className="secondary-metrics-grid">
            {statusMetrics.map((item) => {
              const Icon = item.icon;
              const isActive = activeFilter === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectFilter(item.id)}
                  className={`secondary-metric-chip ${isActive ? 'active' : ''}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onSelectFilter(item.id)}
                  title={`Filter by ${item.label}`}
                >
                  <div className="chip-header">
                    <span className="chip-dot" style={{ backgroundColor: item.dotColor }} />
                    <span className="chip-title">{item.label}</span>
                  </div>
                  <div className="chip-body">
                    <span className="chip-count">{formatNumber(item.count)}</span>
                    <Icon size={15} className="chip-icon" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pipeline Bar */}
          {stats.total > 0 && (
            <div className="pipeline-visualizer">
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
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
