import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, RefreshCw, Sparkles, MoreHorizontal } from 'lucide-react';
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
            <div className="logo-icon-box">
              <Briefcase size={20} className="brand-icon" />
            </div>
            <div className="brand-text">
              <span className="brand-name">JobTrack</span>
              <span className="brand-badge">Pro</span>
            </div>
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

            <div className="hero-actions-row">
              <button onClick={onOpenAddModal} className="btn-primary-cta hero-btn">
                <Plus size={18} />
                <span>Add Application</span>
              </button>
              <button
                onClick={onResetData}
                className="btn-ghost-utility"
                title="Reset sample data"
              >
                <RefreshCw size={14} />
                <span>Reset Demo Data</span>
              </button>
            </div>
          </div>

          <HeroIllustration className="hero-graphics" />
        </div>
      </div>
    </header>
  );
};
