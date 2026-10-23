/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--color-canvas)',
        surface: {
          DEFAULT: 'var(--color-surface)',
          muted: 'var(--color-surface-muted)',
        },
        ink: {
          DEFAULT: 'var(--color-ink)',
          muted: 'var(--color-ink-muted)',
          subtle: 'var(--color-ink-subtle)',
        },
        hairline: {
          DEFAULT: 'var(--color-hairline)',
          strong: 'var(--color-hairline-strong)',
        },
        brand: {
          DEFAULT: 'var(--color-brand)',
          hover: 'var(--color-brand-hover)',
          soft: 'var(--color-brand-soft)',
          border: 'var(--color-brand-border)',
          deep: 'var(--color-brand-deep)',
          highlight: 'var(--color-brand-highlight)',
        },
        risk: {
          high: {
            DEFAULT: 'var(--color-risk-high)',
            soft: 'var(--color-risk-high-soft)',
            border: 'var(--color-risk-high-border)',
          },
          medium: {
            DEFAULT: 'var(--color-risk-medium)',
            soft: 'var(--color-risk-medium-soft)',
            border: 'var(--color-risk-medium-border)',
          },
          low: {
            DEFAULT: 'var(--color-risk-low)',
            soft: 'var(--color-risk-low-soft)',
            border: 'var(--color-risk-low-border)',
          },
        },
      },
      borderRadius: {
        badge: 'var(--radius-badge)',
        control: 'var(--radius-control)',
        card: 'var(--radius-card)',
        modal: 'var(--radius-modal)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        subtle: 'var(--shadow-subtle)',
        card: 'var(--shadow-card)',
        popover: 'var(--shadow-popover)',
      },
    },
  },
  plugins: [],
}
