import React from 'react';
import { Briefcase, SearchX, Plus, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  hasFilters: boolean;
  onClearFilters: () => void;
  onOpenAddModal: () => void;
  onResetData: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  hasFilters,
  onClearFilters,
  onOpenAddModal,
  onResetData,
}) => {
  if (hasFilters) {
    return (
      <div className="empty-state">
        <div className="empty-icon-wrapper">
          <SearchX size={36} />
        </div>
        <h3 className="empty-title">No matching applications</h3>
        <p className="empty-subtitle">
          We couldn't find any job applications matching your current filter or search criteria.
        </p>
        <button onClick={onClearFilters} className="btn btn-secondary mt-4">
          Clear Filters & Search
        </button>
      </div>
    );
  }

  return (
    <div className="empty-state">
      <div className="empty-icon-wrapper">
        <Briefcase size={36} />
      </div>
      <h3 className="empty-title">No applications tracked yet</h3>
      <p className="empty-subtitle">
        Start tracking your job search! Log your application details, track interviews, and celebrate offers.
      </p>
      <div className="empty-actions">
        <button onClick={onOpenAddModal} className="btn btn-primary btn-icon">
          <Plus size={18} />
          <span>Add First Application</span>
        </button>
        <button onClick={onResetData} className="btn btn-secondary btn-icon">
          <RefreshCw size={16} />
          <span>Load Sample Applications</span>
        </button>
      </div>
    </div>
  );
};
