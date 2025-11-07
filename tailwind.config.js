/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          orange: '#DB6A00',
          blue: '#001F54',
          light: '#FF8C42',
          dark: '#000D2E'
        },
        hazard: {
          critical: '#EF4444',
          high: '#F97316',
          medium: '#F59E0B',
          low: '#10B981'
        }
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #001F54, #DB6A00)',
        'gradient-card': 'linear-gradient(145deg, rgba(0, 31, 84, 0.1), rgba(219, 106, 0, 0.1))',
        'gradient-hover': 'linear-gradient(145deg, rgba(0, 31, 84, 0.2), rgba(219, 106, 0, 0.2))'
      },
      boxShadow: {
        'glow-orange': '0 0 20px rgba(219, 106, 0, 0.3)',
        'glow-blue': '0 0 20px rgba(0, 31, 84, 0.3)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite'
      }
    },
  },
  plugins: [],
}
