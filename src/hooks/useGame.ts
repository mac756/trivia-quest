/**
 * useGame Hook - Core game logic for the trivia game
 *
 * This hook manages all game state and logic including:
 * - Tracking lives (3 lives, game over on 3rd wrong)
 * - Progressive difficulty: Easy (4 choices, 20s) → Medium (3 choices, 15s) → Hard (2 choices, 10s)
 * - Scoring: 100 × difficulty multiplier (1x, 2x, 3x)
 * - Timer management with countdown
 * - Question selection and shuffling
 *
 * References:
 * - SPEC.md Section 4: Core Mechanics
 * - DifficultyConfig in types/index.ts
 */

import { useReducer, useCallback, useEffect, useRef } from 'react';
import {
  GameState,
  GameAction,
  Question,
  Category,
  Difficulty,
  DIFFICULTY_CONFIG,
} from '../types';
import { getQuestionsByCategory } from '../data/questions';

// =============================================================================
// INITIAL STATE
// =============================================================================

/**
 * Starting state for a new game
 * All values reset when starting a new game
 */
const initialState: GameState = {
  currentQuestion: null,
  score: 0,
  lives: 3,
  correctAnswers: 0,
  streak: 0,
  longestStreak: 0,
  difficulty: 'easy',
  gameStatus: 'idle',
  selectedCategory: null,
  questionsAnswered: 0,
  currentQuestionId: 0,
  usedQuestionTexts: new Set<string>(),
};

// =============================================================================
// REDUCER
// =============================================================================

/**
 * Game state reducer
 * Handles all state changes based on game actions
 *
 * @param state - Current game state
 * @param action - Action to perform
 * @returns Updated game state
 */
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME': {
      // Get questions for selected category
      const categoryQuestions = getQuestionsByCategory(action.category);

      // Shuffle questions and pick first one
      const shuffled = shuffleArray([...categoryQuestions]);
      const firstQuestion = shuffled[0] || null;

      // Track this question as used
      const usedTexts = new Set<string>();
      if (firstQuestion) {
        usedTexts.add(firstQuestion.question);
      }

      return {
        ...initialState,
        gameStatus: 'playing',
        selectedCategory: action.category,
        currentQuestion: firstQuestion,
        currentQuestionId: 0,
        usedQuestionTexts: usedTexts,
        // Track used question IDs to avoid repeats
        questionsAnswered: 0,
      };
    }

    case 'ANSWER_QUESTION': {
      const isCorrect = action.answer === state.currentQuestion?.correctAnswer;

      if (isCorrect) {
        // Calculate new difficulty based on correct answer count
        const newCorrectCount = state.correctAnswers + 1;
        const newDifficulty = calculateDifficulty(newCorrectCount);
        const multiplier = DIFFICULTY_CONFIG[newDifficulty].multiplier;
        const pointsEarned = 100 * multiplier;

        return {
          ...state,
          score: state.score + pointsEarned,
          correctAnswers: newCorrectCount,
          streak: state.streak + 1,
          longestStreak: Math.max(state.longestStreak, state.streak + 1),
          difficulty: newDifficulty,
          questionsAnswered: state.questionsAnswered + 1,
          // Keep currentQuestion for showing "correct" feedback
        };
      } else {
        // Wrong answer - lose a life
        const newLives = state.lives - 1;

        return {
          ...state,
          lives: newLives,
          streak: 0,  // Reset streak on wrong answer
          questionsAnswered: state.questionsAnswered + 1,
          // gameStatus will be set to 'gameOver' if lives reach 0
          gameStatus: newLives <= 0 ? 'gameOver' : state.gameStatus,
        };
      }
    }

    case 'TIMEOUT': {
      // Timer ran out - counts as wrong answer
      const newLives = state.lives - 1;

      return {
        ...state,
        lives: newLives,
        streak: 0,
        questionsAnswered: state.questionsAnswered + 1,
        gameStatus: newLives <= 0 ? 'gameOver' : state.gameStatus,
      };
    }

    case 'NEXT_QUESTION': {
      if (state.gameStatus === 'gameOver') {
        return state;  // Don't load new question if game is over
      }

      // Get fresh set of questions for the category
      const categoryQuestions = getQuestionsByCategory(state.selectedCategory!);

      // Filter out already used questions
      const availableQuestions = categoryQuestions.filter(
        q => !state.usedQuestionTexts.has(q.question)
      );

      // If we've used all questions, reshuffle (loop back)
      const questionsToChooseFrom = availableQuestions.length > 0
        ? availableQuestions
        : shuffleArray([...categoryQuestions]);

      const nextQuestion = questionsToChooseFrom[0] || null;
      const nextId = state.currentQuestionId + 1;

      // Add new question to used set
      const newUsedTexts = new Set(state.usedQuestionTexts);
      if (nextQuestion) {
        newUsedTexts.add(nextQuestion.question);
      }

      return {
        ...state,
        currentQuestion: nextQuestion,
        currentQuestionId: nextId,
        usedQuestionTexts: newUsedTexts,
      };
    }

    case 'END_GAME': {
      return {
        ...state,
        gameStatus: 'gameOver',
      };
    }

    case 'RESET_GAME': {
      return initialState;
    }

    default:
      return state;
  }
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Calculate difficulty based on number of correct answers
 * Easy: 0-2 correct (4 choices, 20s)
 * Medium: 3-5 correct (3 choices, 15s)
 * Hard: 6+ correct (2 choices, 10s)
 */
function calculateDifficulty(correctAnswers: number): Difficulty {
  if (correctAnswers >= 6) return 'hard';
  if (correctAnswers >= 3) return 'medium';
  return 'easy';
}

/**
 * Fisher-Yates shuffle algorithm
 * Randomizes array order for question/answer shuffling
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get a hash code for a question to use as a stable seed
 * This ensures the same question always gets the same answer shuffle
 */
function getQuestionSeed(question: Question): number {
  // Simple hash based on question text
  let hash = 0;
  for (let i = 0; i < question.question.length; i++) {
    const char = question.question.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Shuffle answer choices for display
 * Ensures correct answer isn't always in the same position
 * Uses a seed based on question content so answers are deterministic
 */
function getShuffledAnswers(question: Question, choiceCount: number): string[] {
  // Build choices array: correct answer + wrong answers
  const allChoices = [question.correctAnswer, ...question.wrongAnswers];

  // Use question hash for deterministic shuffle per question
  const seed = getQuestionSeed(question);
  const shuffled = [...allChoices];
  let currentIndex = shuffled.length;
  let currentSeed = seed;
  const random = () => {
    currentSeed = (currentSeed * 1103515245 + 12345) & 0x7fffffff;
    return currentSeed / 0x7fffffff;
  };

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(random() * currentIndex);
    currentIndex--;
    [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
  }

  return shuffled.slice(0, choiceCount);
}

// =============================================================================
// CUSTOM HOOK
// =============================================================================

/**
 * Main game hook
 * Provides game state and actions for components
 *
 * @returns Object containing:
 * - Game state (score, lives, questions, etc.)
 * - Game actions (startGame, answerQuestion, nextQuestion, etc.)
 * - Computed values (current answers, timer settings)
 */
export function useGame() {
  // Use reducer for state management
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Timer reference for cleanup
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // =============================================================================
  // GAME ACTIONS
  // =============================================================================

  /**
   * Start a new game with the selected category
   */
  const startGame = useCallback((category: Category) => {
    dispatch({ type: 'START_GAME', category });
  }, []);

  /**
   * Submit an answer to the current question
   * Handles scoring, life deduction, and difficulty progression
   */
  const answerQuestion = useCallback((answer: string) => {
    dispatch({ type: 'ANSWER_QUESTION', answer, isCorrect: false });
  }, []);

  /**
   * Called when timer runs out
   * Counts as a wrong answer
   */
  const handleTimeout = useCallback(() => {
    dispatch({ type: 'TIMEOUT' });
  }, []);

  /**
   * Move to the next question after feedback is shown
   */
  const nextQuestion = useCallback(() => {
    dispatch({ type: 'NEXT_QUESTION' });
  }, []);

  /**
   * End the current game and show results
   */
  const endGame = useCallback(() => {
    dispatch({ type: 'END_GAME' });
  }, []);

  /**
   * Reset game to initial state (return to home screen)
   */
  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  // =============================================================================
  // COMPUTED VALUES
  // =============================================================================

  /**
   * Current difficulty settings based on game state
   */
  const difficultyConfig = state.difficulty
    ? DIFFICULTY_CONFIG[state.difficulty]
    : DIFFICULTY_CONFIG.easy;

  /**
   * Number of answer choices to display based on current difficulty
   */
  const choiceCount = difficultyConfig.choiceCount;

  /**
   * Time limit for current question in seconds
   */
  const timeLimit = difficultyConfig.timeLimit;

  /**
   * Current difficulty multiplier for score calculation
   */
  const multiplier = difficultyConfig.multiplier;

  /**
   * Shuffled answer choices for current question
   * Uses question content hash for deterministic shuffling
   * Memoized so answers don't jump around on re-renders
   */
  const currentAnswers = state.currentQuestion
    ? getShuffledAnswers(state.currentQuestion, choiceCount)
    : [];

  /**
   * Check if the selected answer was correct
   */
  const isCorrect = (answer: string): boolean => {
    return answer === state.currentQuestion?.correctAnswer;
  };

  // =============================================================================
  // RETURN
  // =============================================================================

  return {
    // Current game state
    state,

    // Game actions
    startGame,
    answerQuestion,
    handleTimeout,
    nextQuestion,
    endGame,
    resetGame,

    // Computed values for components
    difficultyConfig,
    choiceCount,
    timeLimit,
    multiplier,
    currentAnswers,

    // Helper functions
    isCorrect,
  };
}
