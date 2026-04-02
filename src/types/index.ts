// TypeScript type definitions for the trivia game
// These define the shape of our data throughout the app

/**
 * Available trivia categories
 * Each category has a distinct visual theme and era subdivisions
 */
export type Category = 'history' | 'science' | 'sports' | 'entertainment';

/**
 * Difficulty levels that affect gameplay:
 * - easy: 4 answer choices, 20 seconds
 * - medium: 3 answer choices, 15 seconds (after 3+ correct)
 * - hard: 2 answer choices, 10 seconds (after 6+ correct)
 */
export type Difficulty = 'easy' | 'medium' | 'hard';

/**
 * Overall game status
 * - idle: Player is on home screen selecting a category
 * - playing: Active gameplay in progress
 * - gameOver: Player has lost all 3 lives
 */
export type GameStatus = 'idle' | 'playing' | 'gameOver';

/**
 * Represents a single trivia question
 * All answer choices should have similar length to avoid giving hints
 */
export interface Question {
  /** Which category this question belongs to */
  category: Category;
  /** Era/theme within the category (e.g., "Ancient Civilizations" for history) */
  era: string;
  /** Difficulty level of this specific question */
  difficulty: Difficulty;
  /** The question text displayed to the player */
  question: string;
  /** The correct answer - always one of the choices */
  correctAnswer: string;
  /** Array of wrong answers (3 for easy, 2 for medium, 1 for hard) */
  wrongAnswers: string[];
  /** Optional source citation for the question */
  source?: string;
}

/**
 * Complete game state managed by useGame hook
 * Tracks all gameplay metrics and current state
 */
export interface GameState {
  /** Currently active question, or null if game hasn't started */
  currentQuestion: Question | null;
  /** Player's total accumulated score */
  score: number;
  /** Remaining lives (starts at 3) */
  lives: number;
  /** Total questions answered correctly */
  correctAnswers: number;
  /** Current winning streak (resets on wrong answer) */
  streak: number;
  /** Longest streak achieved in this game */
  longestStreak: number;
  /** Current difficulty level based on performance */
  difficulty: Difficulty;
  /** Current game phase */
  gameStatus: GameStatus;
  /** Selected category for this game */
  selectedCategory: Category | null;
  /** Questions answered in current game */
  questionsAnswered: number;
  /** ID of the current question (for tracking unique questions used) */
  currentQuestionId: number;
  /** Set of used question texts to avoid repeats in this game */
  usedQuestionTexts: Set<string>;
}

/**
 * Action types for the game reducer
 * These represent all possible state changes
 */
export type GameAction =
  | { type: 'START_GAME'; category: Category }
  | { type: 'ANSWER_QUESTION'; answer: string; isCorrect: boolean }
  | { type: 'TIMEOUT' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'END_GAME' }
  | { type: 'RESET_GAME' };

/**
 * Props for the CategoryCard component
 * Contains all data needed to render a category selection card
 */
export interface CategoryCardProps {
  /** The category identifier */
  category: Category;
  /** Display name (e.g., "History") */
  name: string;
  /** Era subtitle (e.g., "Ancient Civilizations, Medieval Times...") */
  subtitle: string;
  /** Unsplash image URL for the card background */
  imageUrl: string;
  /** Primary theme color (hex) */
  colorPrimary: string;
  /** Accent color (hex) */
  colorAccent: string;
  /** Callback when card is clicked */
  onSelect: (category: Category) => void;
}

/**
 * Props for the QuestionCard component
 */
export interface QuestionCardProps {
  /** The question to display */
  question: Question;
  /** Currently selected answer (null if none selected) */
  selectedAnswer: string | null;
  /** Whether the answer has been revealed (after selection or timeout) */
  answerRevealed: boolean;
  /** Callback when an answer is selected */
  onAnswer: (answer: string) => void;
  /** Pre-shuffled answer choices (deterministic, from useGame hook) */
  shuffledChoices: string[];
}

/**
 * Props for the TimerBar component
 */
export interface TimerBarProps {
  /** Time remaining in seconds */
  timeRemaining: number;
  /** Total time allowed for the question */
  totalTime: number;
  /** Whether the timer is actively counting down */
  isActive: boolean;
}

/**
 * Props for the LivesDisplay component
 */
export interface LivesDisplayProps {
  /** Number of lives remaining */
  lives: number;
  /** Total lives (always 3) */
  maxLives?: number;
}

/**
 * Props for the ScoreDisplay component
 */
export interface ScoreDisplayProps {
  /** Current total score */
  score: number;
  /** Current streak */
  streak: number;
  /** Difficulty multiplier for display */
  multiplier: number;
}

/**
 * Props for the GameOverModal component
 */
export interface GameOverModalProps {
  /** Whether the modal is visible */
  isOpen: boolean;
  /** Final score to display */
  score: number;
  /** Questions answered correctly */
  correctAnswers: number;
  /** Longest streak achieved */
  longestStreak: number;
  /** Category that was played */
  category: Category;
  /** Total questions answered */
  totalQuestions: number;
  /** Callback for play again button */
  onPlayAgain: () => void;
  /** Callback for home button */
  onGoHome: () => void;
}

/**
 * Difficulty configuration settings
 */
export interface DifficultyConfig {
  /** Number of answer choices */
  choiceCount: 4 | 3 | 2;
  /** Time limit in seconds */
  timeLimit: number;
  /** Points multiplier for correct answers */
  multiplier: number;
  /** Number of correct answers required to reach this level */
  requiredCorrect: number;
}

/**
 * Lookup table for difficulty settings
 */
export const DIFFICULTY_CONFIG: Record<Difficulty, DifficultyConfig> = {
  easy: {
    choiceCount: 4,
    timeLimit: 20,
    multiplier: 1,
    requiredCorrect: 0,
  },
  medium: {
    choiceCount: 3,
    timeLimit: 15,
    multiplier: 2,
    requiredCorrect: 3,
  },
  hard: {
    choiceCount: 2,
    timeLimit: 10,
    multiplier: 3,
    requiredCorrect: 6,
  },
};
