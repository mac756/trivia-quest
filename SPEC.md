# Trivia Game - Project Specification

## 1. Concept & Vision

A dynamic trivia game with four knowledge categories — History, Science, Sports, and Entertainment — where players answer questions until they get three wrong. Each category is themed with distinct historical eras and visual identities. Difficulty escalates as players succeed: fewer answer choices, tighter time limits, and tougher questions. The experience should feel like stepping into a curated museum of knowledge — modern professionalism meets vibrant educational energy.

**Player:** mac (high school student, learning TypeScript)
**Team:** Peter (director), Paul (OpenCode/builder), mac (business owner)

---

## 2. Design Language

### Color Palette
- **History**: Deep burgundy `#8B2635` + gold accents `#D4AF37` (ancient manuscripts feel)
- **Science**: Deep navy `#1A365D` + electric cyan `#00D4FF` (laboratory/modern tech)
- **Sports**: Forest green `#2D5A27` + white `#FFFFFF` (classic athletic energy)
- **Entertainment**: Rich purple `#6B21A8` + hot pink `#F472B6` (Hollywood Glam)

### Typography
- **Headings**: Poppins (bold, modern)
- **Body**: Inter (clean, readable)

### Layout
- Landing screen with four category cards (era-themed)
- Game screen: question top, timer bar, lives indicator, score
- Results: score summary, category breakdown

### Motion
- Category cards hover lift with shadow
- Timer bar shrinks smoothly
- Answer feedback: correct = green pulse, wrong = red shake
- Screen transitions: fade + slide

### Assets
- Unsplash for era-appropriate imagery per category
- Lucide React for icons

---

## 3. Layout & Structure

### Screens
1. **Home/Landing** — Title, tagline, four era-themed category cards
2. **Game** — Category header with era image, question card, timer bar, lives, score
3. **Game Over** — Final score, category breakdown, restart button
4. **Settings** (optional) — Sound toggle, difficulty preferences

### Responsive
- Mobile-first, works on desktop
- Cards stack on mobile, grid on desktop

---

## 4. Features & Interactions

### Core Mechanics
- **Lives**: 3 lives (2 wrong answers allowed before game over)
- **Progressive Difficulty**:
  - **Easy**: 4 answer choices, 20-second timer
  - **Medium**: 3 answer choices, 15-second timer (after 3 correct)
  - **Hard**: 2 answer choices, 10-second timer (after 6 correct)
- **Scoring**: 100 points base × difficulty multiplier (1x, 2x, 3x)
- **Wrong Answer**: Lose 1 life, show correct answer, proceed to next question
- **Game Over**: After 3rd wrong answer, show final score + stats

### Categories (each with 3+ era themes)
1. **History** — Ancient Civilizations, Medieval Times, Modern Era, Contemporary
2. **Science** — Earth & Nature, Space Exploration, Biology & Life, Chemistry & Physics
3. **Sports** — Baseball Era, Football Classics, Olympic History, Modern Sports
4. **Entertainment** — Golden Age Hollywood, Music Through Decades, Gaming History, Modern Media

### Question Bank
- Minimum 20 questions per category
- Sourced from: Open Trivia DB (opentdb.com), Wikipedia facts
- All sources cited in credits section

### Interactions
- **Answer selection**: Click/tap, immediate feedback (1 second delay before next)
- **Timer expiry**: Counts as wrong answer
- **Hover on cards**: Lift + glow effect
- **Lives display**: Heart icons (filled = remaining, empty = lost)

---

## 5. Component Inventory

### CategoryCard
- Era-themed background image (Unsplash)
- Category name + era subtitle
- Difficulty badge
- States: default (image + overlay), hover (lifted, brighter overlay)

### QuestionCard
- Question text (large, centered)
- Answer buttons (4/3/2 depending on difficulty)
- States: default, selected, correct (green border + check), wrong (red border + X)

### TimerBar
- Horizontal bar that shrinks left to right
- Color transitions: green → yellow → red as time depletes
- Smooth CSS animation

### LivesDisplay
- 3 heart icons
- Filled = life remaining, empty outline = life lost

### ScoreDisplay
- Current score with animated count-up on correct answer
- Streak counter

### GameOverModal
- Final score (large)
- Stats: questions answered, longest streak, category breakdown
- "Play Again" and "Home" buttons
- Resources/credits section

---

## 6. Technical Approach

### Stack
- **Framework**: React 18 + TypeScript (Vite)
- **Styling**: Tailwind CSS (rapid development, modern look)
- **State**: React useState/useReducer (no external state library needed)
- **Routing**: React Router (if multi-page)
- **Icons**: Lucide React
- **Images**: Unsplash (via direct URL or unpic)

### File Structure
```
trivia-game/
├── src/
│   ├── components/
│   │   ├── CategoryCard.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── TimerBar.tsx
│   │   ├── LivesDisplay.tsx
│   │   ├── ScoreDisplay.tsx
│   │   └── GameOverModal.tsx
│   ├── data/
│   │   └── questions.ts (all categories + era questions)
│   ├── hooks/
│   │   └── useGame.ts (game state logic)
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── SPEC.md
```

### Data Model
```typescript
interface Question {
  category: 'history' | 'science' | 'sports' | 'entertainment';
  era: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  correctAnswer: string;
  wrongAnswers: string[];
  source?: string;
}

interface GameState {
  currentQuestion: Question | null;
  score: number;
  lives: number;
  questionsAnswered: number;
  streak: number;
  difficulty: 'easy' | 'medium' | 'hard';
  gameStatus: 'idle' | 'playing' | 'gameOver';
}
```

---

## 7. Resources & Credits

Questions sourced from:
- Open Trivia Database (https://opentdb.com/) — CC BY-SA 4.0
- Wikipedia (https://wikipedia.org) — CC BY-SA 3.0
- Britannica (https://britannica.com) — fair use for educational

Images from Unsplash (free license, attribution appreciated).

---

## 8. Development Notes

- Build in phases: scaffolding first → questions data → game logic → styling
- Paul to write clean, commented TypeScript (mac is learning)
- Peter to review each phase before next
- mac to test and give feedback after each milestone
