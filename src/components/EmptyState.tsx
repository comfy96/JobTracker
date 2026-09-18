import React from 'react';
import { SearchX, Plus, RefreshCw, FolderPlus } from 'lucide-react';

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
      <div className="editorial-empty-card">
        <div className="empty-icon-circle">
          <SearchX size={28} />
        </div>
        <h3 className="empty-heading">No matching applications</h3>
        <p className="empty-subtext">
          We couldn't find any job records matching your active search or status filters.
        </p>
        <button onClick={onClearFilters} className="btn-secondary-action">
          Clear Filters & Search
        </button>
      </div>
    );
  }

  return (
    <div className="editorial-empty-card">
      <div className="empty-icon-circle">
        <FolderPlus size={28} />
      </div>
      <h3 className="empty-heading">No applications tracked yet</h3>
      <p className="empty-subtext">
        Start building your application tracker. Log roles, record interview progress, and capture offers.
      </p>
      <div className="empty-actions-row">
        <button onClick={onOpenAddModal} className="btn-primary-cta">
          <Plus size={18} />
          <span>Add First Application</span>
        </button>
        <button onClick={onResetData} className="btn-secondary-action">
          <RefreshCw size={15} />
          <span>Load Sample Data</span>
        </button>
      </div>
    </div>
  );
};
