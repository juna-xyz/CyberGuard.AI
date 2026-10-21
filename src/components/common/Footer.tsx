import React from 'react';
import { ActiveTab } from '../../types';
import { ShieldAlert, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-hairline bg-surface mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-base text-ink">CyberGuard<span className="text-brand">.AI</span></span>
              <span className="text-[10px] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded bg-brand-soft text-brand border border-brand-border">
                Edukasi &amp; Riset
              </span>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed mb-3">
              Inisiatif literasi keamanan siber untuk memberdayakan pelajar dan masyarakat Indonesia agar senantiasa kritis sebelum mengklik tautan atau membagikan data.
            </p>
            <p className="text-xs font-semibold text-brand">#ThinkBeforeYouClick</p>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-xs font-bold text-ink uppercase tracking-wider mb-3">Navigasi Fitur</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className="text-ink-muted hover:text-brand transition-colors cursor-pointer"
                >
                  Beranda Literasi &amp; 3-Langkah Aman
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('analyzer')}
                  className="text-ink-muted hover:text-brand transition-colors cursor-pointer"
                >
                  Penganalisis Pesan Forensik (Inspeksi Heuristik)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('quiz')}
                  className="text-ink-muted hover:text-brand transition-colors cursor-pointer"
                >
                  Kuis Keputusan Siber (5 Skenario Indonesia)
                </button>
              </li>
            </ul>
          </div>

          {/* Official Hotline & Reporting */}
          <div>
            <h4 className="text-xs font-bold text-ink uppercase tracking-wider mb-3">Saluran Aduan Siber Resmi</h4>
            <ul className="space-y-2 text-xs text-ink-muted">
              <li>
                <a 
                  href="https://aduankonten.id" 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className="inline-flex items-center hover:text-brand transition-colors"
                >
                  AduanKonten.id (Komdigi) <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a 
                  href="https://patrolisiber.id" 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className="inline-flex items-center hover:text-brand transition-colors"
                >
                  PatroliSiber.id (Bareskrim Polri) <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li className="text-[11px] text-ink-subtle pt-1">
                Layanan perbankan darurat: Hubungi kontak resmi di balik kartu ATM Anda.
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="pt-6 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[11px] text-ink-muted">
            <ShieldAlert className="w-4 h-4 text-risk-medium shrink-0" />
            <span>
              Catatan: Hasil analisis adalah instrumen edukasi estimasi risiko, bukan jaminan verifikasi mutlak.
            </span>
          </div>
          <p className="text-[11px] text-ink-subtle">
            &copy; {new Date().getFullYear()} CyberGuard AI. Hackathon Edukasi &amp; Riset.
          </p>
        </div>
      </div>
    </footer>
  );
};
