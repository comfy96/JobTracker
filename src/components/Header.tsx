import React, { useState, useEffect } from 'react';
import { Plus, RefreshCw, Sparkles, MoreHorizontal } from 'lucide-react';
import { HeroIllustration } from './HeroIllustration';

interface HeaderProps {
  onOpenAddModal: () => void;
  onResetData: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAddModal, onResetData }) => {
  const [greeting, setGreeting] = useState('Good morning');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <header className="app-header">
      {/* Top Navbar */}
      <div className="top-nav">
        <div className="nav-container">
          <div className="brand-logo">
            <div className="logo-icon-box" title="JobTrack Career Tracker">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="brand-icon-svg"
              >
                {/* Sleek career upward trend motif with node check */}
                <path
                  d="M3 17L9 11L13 15L21 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 7H21V12"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="13" cy="15" r="2" fill="currentColor" />
              </svg>
            </div>
            <div className="brand-text">
              <span className="brand-job">Job</span>
              <span className="brand-track">Track</span>
            </div>
            <span className="brand-badge-pro">PRO</span>
          </div>

          <div className="top-nav-right">
            {/* Utility Reset Dropdown / Menu */}
            <div className="utility-menu-container">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="btn-utility"
                title="Application Utilities"
                aria-label="Application utilities menu"
              >
                <MoreHorizontal size={18} />
              </button>

              {isMenuOpen && (
                <div className="utility-dropdown">
                  <button
                    onClick={() => {
                      onResetData();
                      setIsMenuOpen(false);
                    }}
                    className="utility-item danger"
                  >
                    <RefreshCw size={14} />
                    <span>Reset Demo Data</span>
                  </button>
                </div>
              )}
            </div>

            {/* Primary Action */}
            <button onClick={onOpenAddModal} className="btn-primary-cta">
              <Plus size={18} />
              <span>Add Application</span>
            </button>
          </div>
        </div>
      </div>

      {/* Editorial Dashboard Hero Welcome Banner */}
      <div className="hero-banner">
        <div className="hero-container">
          <div className="hero-content">
            <div className="greeting-pill">
              <Sparkles size={14} className="greeting-sparkle" />
              <span>{greeting} 👋</span>
            </div>
            <h1 className="hero-headline">Keep your job search moving.</h1>
            <p className="hero-subline">
              Track your applications, interviews, and opportunities in one place.
            </p>
          </div>

          <HeroIllustration className="hero-graphics" />
        </div>
      </div>
    </header>
  );
};

