/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Era-themed color palettes for each category
      colors: {
        // History: Deep burgundy + gold accents (ancient manuscripts feel)
        history: {
          primary: '#8B2635',
          accent: '#D4AF37',
        },
        // Science: Deep navy + electric cyan (laboratory/modern tech)
        science: {
          primary: '#1A365D',
          accent: '#00D4FF',
        },
        // Sports: Forest green + white (classic athletic energy)
        sports: {
          primary: '#2D5A27',
          accent: '#FFFFFF',
        },
        // Entertainment: Rich purple + hot pink (Hollywood Glam)
        entertainment: {
          primary: '#6B21A8',
          accent: '#F472B6',
        },
      },
      fontFamily: {
        // Headings: Poppins (bold, modern)
        heading: ['Poppins', 'sans-serif'],
        // Body: Inter (clean, readable)
        body: ['Inter', 'sans-serif'],
      },
      // Animation classes for smooth transitions
      animation: {
        'pulse-correct': 'pulseCorrect 0.5s ease-out',
        'shake-wrong': 'shakeWrong 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'count-up': 'countUp 0.3s ease-out',
      },
      keyframes: {
        pulseCorrect: {
          '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(34, 197, 94, 0.7)' },
          '50%': { transform: 'scale(1.02)', boxShadow: '0 0 20px 10px rgba(34, 197, 94, 0.3)' },
          '100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(34, 197, 94, 0)' },
        },
        shakeWrong: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        countUp: {
          '0%': { transform: 'scale(1.2)', color: '#22c55e' },
          '100%': { transform: 'scale(1)', color: 'inherit' },
        },
      },
    },
  },
  plugins: [],
}
