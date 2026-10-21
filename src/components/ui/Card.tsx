import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'surface' | 'muted' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'surface',
  padding = 'md',
  className = '',
  ...props
}) => {
  const variantStyles = {
    surface: 'bg-surface border border-hairline shadow-card',
    muted: 'bg-surface-muted border border-hairline',
    interactive: 'bg-surface border border-hairline hover:border-brand-border hover:shadow-card hover:-translate-y-0.5 transition-all duration-150 cursor-pointer'
  }[variant];

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }[padding];

  return (
    <div
      className={`rounded-card ${variantStyles} ${paddingStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
