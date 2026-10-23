import React from 'react';
import { ActiveTab } from '../../types';
import { ShieldCheck, Search, HelpCircle, Menu, X, Settings } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { SettingsModal } from './SettingsModal';

interface HeaderProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { t, isSettingsOpen, setIsSettingsOpen } = useSettings();

  const navItems: { tab: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { tab: 'dashboard', label: t('navHome'), icon: <ShieldCheck className="w-4 h-4 mr-1.5" /> },
    { tab: 'analyzer', label: t('navAnalyzer'), icon: <Search className="w-4 h-4 mr-1.5" /> },
    { tab: 'quiz', label: t('navQuiz'), icon: <HelpCircle className="w-4 h-4 mr-1.5" /> },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-hairline">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Brand */}
            <div
              onClick={() => handleNavClick('dashboard')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-control bg-brand-soft border border-brand-border flex items-center justify-center text-brand group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5 text-brand" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-ink tracking-tight">
                    CyberGuard<span className="text-brand">.AI</span>
                  </span>
                  <span className="text-[10px] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded bg-brand-soft dark:bg-[#1D3B66] text-brand dark:text-brand-highlight border border-brand-border dark:border-[#335583]">
                    {t('categoryBadge')}
                  </span>
                </div>
                <p className="text-[11px] text-ink-muted -mt-0.5 font-medium">{t('tagline')}</p>
              </div>
            </div>

            {/* Desktop Navigation & Actions */}
            <div className="hidden md:flex items-center gap-2">
              <nav className="flex items-center gap-1.5">
                {navItems.map((item) => {
                  const isActive = activeTab === item.tab;
                  return (
                    <button
                      key={item.tab}
                      onClick={() => handleNavClick(item.tab)}
                      className={`inline-flex items-center px-3.5 py-2 rounded-control text-sm font-medium transition-all duration-150 focus-ring cursor-pointer ${
                        isActive
                          ? 'bg-brand-soft text-brand font-semibold border border-brand-border'
                          : 'text-ink-muted hover:text-ink hover:bg-surface-muted'
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              <div className="h-5 w-px bg-hairline mx-1" />

              {/* Settings Trigger Button */}
              <button
                type="button"
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 rounded-control text-ink-muted hover:text-ink hover:bg-surface-muted border border-transparent hover:border-hairline transition-all focus-ring cursor-pointer"
                aria-label={t('settingsTitle')}
                title={t('settingsTitle')}
              >
                <Settings className="w-4 h-4 text-ink-muted hover:text-brand" />
              </button>
            </div>

            {/* Mobile Actions (Settings + Hamburger) */}
            <div className="md:hidden flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 rounded-control text-ink-muted hover:text-ink hover:bg-surface-muted focus-ring"
                aria-label={t('settingsTitle')}
                title={t('settingsTitle')}
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-control text-ink-muted hover:text-ink hover:bg-surface-muted focus-ring"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-hairline bg-surface px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => handleNavClick(item.tab)}
                  className={`w-full flex items-center px-3 py-2.5 rounded-control text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-soft text-brand font-semibold'
                      : 'text-ink-muted hover:bg-surface-muted hover:text-ink'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Popover / Dialog Settings */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};
