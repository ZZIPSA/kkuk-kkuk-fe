import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}', './stories/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        grey: {
          50: '#F7F7F7',
          100: '#D9D9D9',
          200: '#C8C1BA',
          300: '#6A6664',
          400: '#3F3B3A',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      fontSize: {
        xs: ['0.75rem', '1'],
        sm: ['0.875rem', '1'],
        base: ['1rem', '1'],
        lg: ['1.125rem', '1'],
        xl: ['1.25rem', '1'],
        '2xl': ['1.5rem', '1'],
        '3xl': ['1.875rem', '1'],
        '4xl': ['2.25rem', '1'],
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        'rally-route': "url('/rally-route.svg')",
        'rally-flag': "url('/rally-flag.svg')",
      },
      spacing: {
        15: '3.75rem',
        25: '6.25rem',
        30: '7.5rem',
      },
      size: {
        15: '3.75rem',
        25: '6.25rem',
        30: '7.5rem',
      },
    },
  },
  safelist: [{ pattern: /^order-\d+$/ }],
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar-hide')],
} satisfies Config;

export default config;
