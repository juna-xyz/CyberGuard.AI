import React from 'react';
import { RiskLevel } from '../../types';
import { ShieldAlert, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export interface BadgeProps {
  variant?: 'brand' | 'neutral' | 'high' | 'medium' | 'low';
  riskLevel?: RiskLevel;
  className?: string;
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant,
  riskLevel,
  className = '',
  children
}) => {
  const { language } = useSettings();

  // Jika diberikan riskLevel, otomatis petakan varian
  const activeVariant = riskLevel
    ? (riskLevel === 'HIGH' ? 'high' : riskLevel === 'MEDIUM' ? 'medium' : 'low')
    : (variant || 'neutral');

  const variantStyles = {
    brand: 'bg-brand-soft text-brand border-brand-border',
    neutral: 'bg-surface-muted text-ink-muted border-hairline',
    high: 'bg-risk-high-soft text-risk-high border-risk-high-border',
    medium: 'bg-risk-medium-soft text-risk-medium border-risk-medium-border',
    low: 'bg-risk-low-soft text-risk-low border-risk-low-border'
  }[activeVariant];

  const renderIcon = () => {
    if (activeVariant === 'high') return <ShieldAlert className="w-3.5 h-3.5 mr-1" />;
    if (activeVariant === 'medium') return <AlertTriangle className="w-3.5 h-3.5 mr-1" />;
    if (activeVariant === 'low') return <ShieldCheck className="w-3.5 h-3.5 mr-1" />;
    return null;
  };

  const defaultLabel = riskLevel === 'HIGH'
    ? (language === 'en' ? 'HIGH RISK' : 'RISIKO TINGGI')
    : riskLevel === 'MEDIUM'
      ? (language === 'en' ? 'MEDIUM RISK' : 'RISIKO SEDANG')
      : (language === 'en' ? 'LOW RISK' : 'RISIKO RENDAH');

  return (
    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-badge border ${variantStyles} ${className}`}>
      {renderIcon()}
      {children || defaultLabel}
    </span>
  );
};
