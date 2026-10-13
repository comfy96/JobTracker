import React from 'react';
import { SearchX, Plus, RefreshCw, FolderPlus, Send, CalendarCheck, CheckCircle2, XCircle } from 'lucide-react';

interface EmptyStateProps {
  hasFilters: boolean;
  activeStatus?: string;
  searchQuery?: string;
  onClearFilters: () => void;
  onOpenAddModal: () => void;
  onResetData: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  hasFilters,
  activeStatus = 'ALL',
  searchQuery = '',
  onClearFilters,
  onOpenAddModal,
  onResetData,
}) => {
  // 1. Status Filtered / Search Empty State
  if (hasFilters) {
    const isStatusFiltered = activeStatus !== 'ALL';
    const isSearchFiltered = searchQuery.trim().length > 0;

    const getStatusIcon = () => {
      switch (activeStatus) {
        case 'Applied':
          return <Send size={28} className="empty-status-icon text-blue-500" />;
        case 'Interview':
          return <CalendarCheck size={28} className="empty-status-icon text-purple-500" />;
        case 'Offer':
          return <CheckCircle2 size={28} className="empty-status-icon text-emerald-500" />;
        case 'Rejected':
          return <XCircle size={28} className="empty-status-icon text-rose-500" />;
        default:
          return <SearchX size={28} className="empty-status-icon text-slate-500" />;
      }
    };

    return (
      <div className="editorial-empty-card" role="region" aria-label="No applications match filters">
        <div className="empty-icon-circle-wrapper">
          <div className="empty-icon-circle">
            {getStatusIcon()}
          </div>
          <div className="empty-glow-ring" />
        </div>

        <h3 className="empty-heading">
          {isStatusFiltered && !isSearchFiltered
            ? `No ${activeStatus} applications yet`
            : isSearchFiltered
            ? `No results for "${searchQuery}"`
            : 'No matching applications found'}
        </h3>

        <p className="empty-subtext">
          {isStatusFiltered && !isSearchFiltered
            ? `You don't have any job applications currently in the "${activeStatus}" stage. Track a new role or clear filters to view your other applications.`
            : isSearchFiltered
            ? `We couldn't find any job records matching your search terms. Check your spelling or reset the filter.`
            : "We couldn't find any job records matching your current filter criteria."}
        </p>

        <div className="empty-actions-row">
          <button
            onClick={onClearFilters}
            className="btn-primary-cta empty-btn"
            type="button"
          >
            Clear Active Filters
          </button>
          <button
            onClick={onOpenAddModal}
            className="btn-secondary-action empty-btn"
            type="button"
          >
            <Plus size={16} aria-hidden="true" />
            <span>Add Application</span>
          </button>
        </div>
      </div>
    );
  }

  // 2. Initial Zero Applications State
  return (
    <div className="editorial-empty-card" role="region" aria-label="No job applications tracked">
      <div className="empty-icon-circle-wrapper">
        <div className="empty-icon-circle initial">
          <FolderPlus size={32} />
        </div>
        <div className="empty-glow-ring" />
      </div>

      <h3 className="empty-heading">No applications tracked yet</h3>
      <p className="empty-subtext">
        Start building your personal application pipeline. Track interview schedules, follow-up timelines, notes, and offers all in one place.
      </p>

      <div className="empty-actions-row">
        <button
          onClick={onOpenAddModal}
          className="btn-primary-cta"
          type="button"
        >
          <Plus size={18} aria-hidden="true" />
          <span>Add First Application</span>
        </button>
        <button
          onClick={onResetData}
          className="btn-secondary-action"
          type="button"
        >
          <RefreshCw size={15} aria-hidden="true" />
          <span>Load Sample Data</span>
        </button>
      </div>
    </div>
  );
};
