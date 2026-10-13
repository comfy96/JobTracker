import React from 'react';

export const JobCardSkeleton: React.FC = () => {
  return (
    <article className="editorial-job-card skeleton-card" aria-hidden="true">
      {/* Top row: Avatar + Company/Date + Status pill */}
      <div className="card-top-focal-row">
        <div className="company-focal-group">
          <div className="skeleton-box skeleton-avatar" />
          <div className="company-focal-meta">
            <div className="skeleton-box skeleton-title-sm" />
            <div className="skeleton-box skeleton-date-sm" />
          </div>
        </div>
        <div className="skeleton-box skeleton-badge-pill" />
      </div>

      {/* Role title placeholder */}
      <div className="card-role-section">
        <div className="skeleton-box skeleton-role-lg" />
      </div>

      {/* Notes block placeholder */}
      <div className="skeleton-box skeleton-notes-box" />

      {/* Footer row: Timestamp + Action buttons */}
      <div className="card-footer-row">
        <div className="skeleton-box skeleton-time-sm" />
        <div className="card-actions-row">
          <div className="skeleton-box skeleton-action-btn" />
          <div className="skeleton-box skeleton-action-icon" />
        </div>
      </div>
    </article>
  );
};
