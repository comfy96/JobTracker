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
    { label: 'All', value: 'ALL' },
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

      {/* Single Unified Toolbar */}
      <div className="unified-toolbar" role="toolbar" aria-label="Applications search, sort, and status filter toolbar">
        {/* Search Field */}
        <div className="toolbar-search-field">
          <Search size={15} className="toolbar-search-icon" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search by company, role..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="toolbar-search-input"
            aria-label="Search applications by company, role, or notes"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="toolbar-search-clear"
              title="Clear search query"
              type="button"
              aria-label="Clear search query"
            >
              <X size={14} aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="toolbar-divider" aria-hidden="true" />

        {/* Sort Dropdown */}
        <div className="toolbar-sort-field">
          <SlidersHorizontal size={14} className="toolbar-sort-icon" aria-hidden="true" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="toolbar-sort-select"
            aria-label="Sort applications"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="company">Company (A–Z)</option>
          </select>
        </div>

        <div className="toolbar-divider" aria-hidden="true" />

        {/* Status Filter Pills */}
        <div className="toolbar-status-pills" role="group" aria-label="Filter applications by status">
          {statuses.map((s) => {
            const isActive = selectedStatus === s.value;
            return (
              <button
                key={s.value}
                onClick={() => onSelectStatus(s.value)}
                className={`toolbar-status-pill ${isActive ? 'active' : ''}`}
                type="button"
                aria-pressed={isActive}
                aria-label={`Filter by ${s.label}`}
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
