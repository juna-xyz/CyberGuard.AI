import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-control transition-all duration-150 focus-ring cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 select-none';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base'
  }[size];

  const variantClasses = {
    primary: 'bg-brand text-white hover:bg-brand-hover shadow-subtle active:scale-[0.98]',
    secondary: 'bg-brand-soft text-brand hover:bg-[#D5EFEA] border border-brand-border active:scale-[0.98]',
    outline: 'bg-surface text-ink hover:bg-surface-muted border border-hairline active:scale-[0.98]',
    danger: 'bg-risk-high text-white hover:bg-[#A32F2F] shadow-subtle active:scale-[0.98]',
    ghost: 'bg-transparent text-ink-muted hover:text-ink hover:bg-surface-muted'
  }[variant];

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
