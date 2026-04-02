/**
 * App.tsx - Main Application Component
 *
 * This is the root component that manages the game flow:
 * - Home screen with category selection
 * - Active gameplay with questions, timer, lives, score
 * - Game over modal with results
 *
 * Peter & Paul's trivia game for mac.
 * Built with React + TypeScript + Tailwind CSS.
 *
 * Remember: "Christ is Lord!"
 */

import { useState, useEffect, useCallback } from 'react';
import { useGame } from './hooks/useGame';
import { CATEGORIES } from './data/questions';
import { Category } from './types';
import { CategoryCard } from './components/CategoryCard';
import { QuestionCard } from './components/QuestionCard';
import { TimerBar } from './components/TimerBar';
import { LivesDisplay } from './components/LivesDisplay';
import { ScoreDisplay } from './components/ScoreDisplay';
import { GameOverModal } from './components/GameOverModal';
import { BookOpen, Zap, Info } from 'lucide-react';

// ============================================================================
// HOMESCREEN COMPONENT
// ============================================================================

interface HomeScreenProps {
  onSelectCategory: (category: Category) => void;
}

/**
 * HomeScreen displays the category selection with era-themed cards
 */
function HomeScreen({ onSelectCategory }: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-[#0a0a1a] p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BookOpen className="w-10 h-10 text-purple-400" />
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Trivia Quest
          </h1>
          <BookOpen className="w-10 h-10 text-purple-400" />
        </div>
        <p className="text-white/60 text-lg max-w-md mx-auto">
          Test your knowledge across History, Science, Sports, and Entertainment.
          How far can you go?
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {CATEGORIES.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat.id}
            name={cat.name}
            subtitle={cat.subtitle}
            imageUrl={cat.imageUrl}
            colorPrimary={cat.colorPrimary}
            colorAccent={cat.colorAccent}
            onSelect={onSelectCategory}
          />
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 text-white/30 text-sm">
          <Info className="w-4 h-4" />
          <span>3 lives | Progressive difficulty | How far can you go?</span>
        </div>
      </div>

      {/* Credits */}
      <div className="mt-8 text-center">
        <p className="text-white/20 text-xs">
          Christ is Lord! | Questions from Open Trivia Database & Wikipedia
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// GAMESCREEN COMPONENT
// ============================================================================

interface GameScreenProps {
  onGoHome: () => void;
}

/**
 * GameScreen handles the active gameplay
 */
function GameScreen({ onGoHome }: GameScreenProps) {
  const {
    state,
    startGame,
    answerQuestion,
    handleTimeout,
    nextQuestion,
    choiceCount,
    timeLimit,
    multiplier,
  } = useGame();

  // Local state for answer feedback
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);

  // Timer effect
  useEffect(() => {
    if (state.gameStatus !== 'playing' || answerRevealed) return;

    setTimeRemaining(timeLimit);
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeout();
          setAnswerRevealed(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.currentQuestionId, state.gameStatus, answerRevealed, timeLimit, handleTimeout]);

  // Get current category info
  const currentCategory = CATEGORIES.find(c => c.id === state.selectedCategory);

  // Handle answer selection
  const handleAnswer = useCallback((answer: string) => {
    if (selectedAnswer || answerRevealed) return;

    setSelectedAnswer(answer);
    answerQuestion(answer);
    setAnswerRevealed(true);

    // Auto-advance after showing feedback
    setTimeout(() => {
      setSelectedAnswer(null);
      setAnswerRevealed(false);
      nextQuestion();
    }, 1500);
  }, [selectedAnswer, answerRevealed, answerQuestion, nextQuestion]);

  // Handle play again
  const handlePlayAgain = () => {
    setSelectedAnswer(null);
    setAnswerRevealed(false);
    if (state.selectedCategory) {
      startGame(state.selectedCategory);
    }
  };

  if (!state.currentQuestion || !currentCategory) {
    return <HomeScreen onSelectCategory={(cat) => startGame(cat)} />;
  }

  return (
    <div
      className="min-h-screen bg-[#0a0a1a] p-4 md:p-6"
      style={{
        backgroundImage: `linear-gradient(to bottom, ${currentCategory.colorPrimary}33 0%, #0a0a1a 50%), url(${currentCategory.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Header Bar */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          {/* Back to Home */}
          <button
            onClick={onGoHome}
            className="text-white/60 hover:text-white flex items-center gap-2 text-sm"
          >
            ← Home
          </button>

          {/* Category Badge */}
          <div className="flex items-center gap-2">
            <div
              className="px-4 py-1 rounded-full text-white text-sm font-medium"
              style={{ backgroundColor: currentCategory.colorPrimary }}
            >
              {currentCategory.name}
            </div>
          </div>

          {/* Lives */}
          <LivesDisplay lives={state.lives} />
        </div>

        {/* Score and Difficulty */}
        <div className="flex items-center justify-between mb-4">
          <ScoreDisplay
            score={state.score}
            streak={state.streak}
            multiplier={multiplier}
          />

          {/* Difficulty Badge */}
          <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
            state.difficulty === 'hard' ? 'bg-red-500/20 text-red-400' :
            state.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-green-500/20 text-green-400'
          }`}>
            {state.difficulty}
          </div>
        </div>

        {/* Timer Bar */}
        <TimerBar
          timeRemaining={timeRemaining}
          totalTime={timeLimit}
          isActive={!answerRevealed && state.gameStatus === 'playing'}
        />
      </div>

      {/* Question Area */}
      <div className="max-w-2xl mx-auto">
        <QuestionCard
          question={state.currentQuestion}
          selectedAnswer={selectedAnswer}
          answerRevealed={answerRevealed}
          onAnswer={handleAnswer}
          choiceCount={choiceCount}
        />

        {/* Progress */}
        <div className="mt-6 text-center text-white/40 text-sm">
          <Zap className="w-4 h-4 inline mr-1" />
          {state.correctAnswers} correct in a row
        </div>
      </div>

      {/* Game Over Modal */}
      <GameOverModal
        isOpen={state.gameStatus === 'gameOver'}
        score={state.score}
        correctAnswers={state.correctAnswers}
        longestStreak={state.longestStreak}
        category={state.selectedCategory!}
        totalQuestions={state.questionsAnswered}
        onPlayAgain={handlePlayAgain}
        onGoHome={onGoHome}
      />
    </div>
  );
}

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

/**
 * Main App component
 * Single source of truth for game state
 */
function App() {
  const { state, startGame, resetGame } = useGame();

  const handleSelectCategory = (category: Category) => {
    startGame(category);
  };

  const handleGoHome = () => {
    resetGame();
  };

  // Show home if idle, game if playing
  if (state.gameStatus === 'idle' || !state.currentQuestion) {
    return <HomeScreen onSelectCategory={handleSelectCategory} />;
  }

  return <GameScreen onGoHome={handleGoHome} />;
}

export default App;
