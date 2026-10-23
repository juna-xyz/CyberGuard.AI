import React, { useEffect, useRef } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { X, Sun, Moon, Globe, Palette } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { language, setLanguage, theme, setTheme, t } = useSettings();
  const modalRef = useRef<HTMLDivElement>(null);

  // Tutup dengan tombol Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Tutup jika klik di luar modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-end sm:pt-20 sm:pr-8 p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-dialog-title"
    >
      <div
        ref={modalRef}
        className="w-full max-w-sm rounded-card bg-surface border border-hairline shadow-popover p-5 space-y-5 animate-in zoom-in-95 duration-150"
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between pb-3 border-b border-hairline">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-control bg-brand-soft border border-brand-border flex items-center justify-center text-brand">
              <Palette className="w-4 h-4" />
            </div>
            <h3 id="settings-dialog-title" className="text-sm font-bold text-ink">
              {t('settingsTitle')}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-control text-ink-muted hover:text-ink hover:bg-surface-muted transition-colors focus-ring"
            aria-label={t('close')}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Section 1: Bahasa / Language */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-ink-muted uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-brand" />
            <span>{t('languageLabel')}</span>
          </label>
          <div className="grid grid-cols-2 gap-2 p-1 rounded-control bg-surface-muted border border-hairline">
            <button
              type="button"
              onClick={() => setLanguage('id')}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-control text-xs font-semibold transition-all cursor-pointer focus-ring ${
                language === 'id'
                  ? 'bg-brand text-white shadow-subtle'
                  : 'text-ink-muted hover:text-ink hover:bg-surface/60'
              }`}
            >
              <span>🇮🇩</span>
              <span>Bahasa Indonesia</span>
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-control text-xs font-semibold transition-all cursor-pointer focus-ring ${
                language === 'en'
                  ? 'bg-brand text-white shadow-subtle'
                  : 'text-ink-muted hover:text-ink hover:bg-surface/60'
              }`}
            >
              <span>🇬🇧</span>
              <span>English</span>
            </button>
          </div>
        </div>

        {/* Section 2: Tampilan / Appearance */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-ink-muted uppercase tracking-wider flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-brand" />
            <span>{t('themeLabel')}</span>
          </label>
          <div className="grid grid-cols-2 gap-2 p-1 rounded-control bg-surface-muted border border-hairline">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-control text-xs font-semibold transition-all cursor-pointer focus-ring ${
                theme === 'light'
                  ? 'bg-brand text-white shadow-subtle'
                  : 'text-ink-muted hover:text-ink hover:bg-surface/60'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>{t('themeLight')}</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-control text-xs font-semibold transition-all cursor-pointer focus-ring ${
                theme === 'dark'
                  ? 'bg-brand text-white shadow-subtle'
                  : 'text-ink-muted hover:text-ink hover:bg-surface/60'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>{t('themeDark')}</span>
            </button>
          </div>
        </div>

        {/* Footer info note */}
        <div className="pt-2 border-t border-hairline text-center">
          <p className="text-[11px] text-ink-subtle">
            {language === 'id' 
              ? 'Pengaturan tersimpan otomatis di peramban Anda.' 
              : 'Preferences are saved automatically in your browser.'}
          </p>
        </div>
      </div>
    </div>
  );
};
