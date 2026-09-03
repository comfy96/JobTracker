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
    <div className="filter-bar">
      <div className="filter-controls">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by company or job role..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="search-clear-btn"
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="sort-box">
          <SlidersHorizontal size={16} className="sort-icon" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="sort-select"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="company">Company (A-Z)</option>
          </select>
        </div>
      </div>

      <div className="status-tabs">
        {statuses.map((s) => {
          const isActive = selectedStatus === s.value;
          return (
            <button
              key={s.value}
              onClick={() => onSelectStatus(s.value)}
              className={`status-tab ${isActive ? 'status-tab-active' : ''}`}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      <div className="results-info">
        Showing <span className="highlight-count">{filteredCount}</span> of {totalCount} applications
      </div>
    </div>
  );
};
