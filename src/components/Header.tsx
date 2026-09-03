import React from 'react';
import { Briefcase, Plus, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onOpenAddModal: () => void;
  onResetData: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAddModal, onResetData }) => {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="brand">
          <div className="logo-icon">
            <Briefcase className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h1 className="app-title">JobTrack</h1>
            <p className="app-subtitle">Personal Application Tracker</p>
          </div>
        </div>

        <div className="header-actions">
          <button
            onClick={onResetData}
            className="btn btn-secondary btn-icon"
            title="Reset to Sample Applications"
          >
            <RefreshCw size={16} />
            <span className="hidden-mobile">Reset Demo Data</span>
          </button>

          <button onClick={onOpenAddModal} className="btn btn-primary btn-icon">
            <Plus size={18} />
            <span>Add Application</span>
          </button>
        </div>
      </div>
    </header>
  );
};
