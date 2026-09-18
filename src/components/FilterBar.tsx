import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

interface FilterBarProps {
  selectedStatus: string;
  onSelectStatus: (status: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalCount: number;
  filteredCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedStatus,
  onSelectStatus,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalCount,
  filteredCount,
}) => {
  const statuses: Array<{ label: string; value: string }> = [
    { label: 'All Applications', value: 'ALL' },
    { label: 'Applied', value: 'Applied' },
    { label: 'Interview', value: 'Interview' },
    { label: 'Offer', value: 'Offer' },
    { label: 'Rejected', value: 'Rejected' },
  ];

  return (
    <div className="applications-filter-container">
      {/* Header Row */}
      <div className="filter-header-row">
        <div className="heading-group">
          <h2 className="section-title">Applications</h2>
          <span className="count-pill">
            {filteredCount} {filteredCount === 1 ? 'application' : 'applications'}
          </span>
        </div>

        {totalCount > 0 && totalCount !== filteredCount && (
          <span className="filtering-info-text">
            Filtered from {totalCount} total
          </span>
        )}
      </div>

      {/* Control Toolbar */}
      <div className="filter-toolbar-row">
        <div className="search-sort-group">
          <div className="search-field-wrapper">
            <Search size={15} className="search-field-icon" />
            <input
              type="text"
              placeholder="Search by company or role..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-field-input"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="search-clear-button"
                title="Clear search"
                type="button"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="sort-field-wrapper">
            <SlidersHorizontal size={14} className="sort-field-icon" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="sort-field-select"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="company">Company (A–Z)</option>
            </select>
          </div>
        </div>

        {/* Status Filter Pills */}
        <div className="status-pills-list">
          {statuses.map((s) => {
            const isActive = selectedStatus === s.value;
            return (
              <button
                key={s.value}
                onClick={() => onSelectStatus(s.value)}
                className={`status-pill-item ${isActive ? 'active' : ''}`}
                type="button"
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
