/**
 * GameOverModal Component
 *
 * Displays the final score and stats when the game ends.
 * Shows breakdown of performance and options to replay or return home.
 *
 * References:
 * - SPEC.md Section 5: GameOverModal component
 * - GameOverModalProps in types/index.ts
 */

import { Trophy, Home, RotateCcw, Target, Flame, BookOpen } from 'lucide-react';
import { GameOverModalProps } from '../types';

/**
 * GameOverModal shows final results and replay options
 *
 * @param isOpen - Whether modal is visible
 * @param score - Final score
 * @param correctAnswers - Questions answered correctly
 * @param longestStreak - Best streak achieved
 * @param category - Category that was played
 * @param totalQuestions - Total questions answered
 * @param onPlayAgain - Callback for replay button
 * @param onGoHome - Callback for home button
 */
export function GameOverModal({
  isOpen,
  score,
  correctAnswers,
  longestStreak,
  category,
  totalQuestions,
  onPlayAgain,
  onGoHome,
}: GameOverModalProps) {
  if (!isOpen) return null;

  const accuracy = totalQuestions > 0
    ? Math.round((correctAnswers / totalQuestions) * 100)
    : 0;

  const getCategoryDisplayName = () => {
    const names: Record<string, string> = {
      history: 'History',
      science: 'Science',
      sports: 'Sports',
      entertainment: 'Entertainment',
    };
    return names[category] || category;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md glass-card rounded-3xl p-8 text-center">
        {/* Trophy Icon */}
        <div className="mb-6">
          <Trophy className="w-16 h-16 mx-auto text-yellow-400" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-white mb-2">
          Game Over!
        </h2>
        <p className="text-white/60 mb-8">
          {getCategoryDisplayName()} Category
        </p>

        {/* Final Score */}
        <div className="mb-8">
          <div className="text-6xl font-bold text-white mb-2">
            {score}
          </div>
          <div className="text-white/50 uppercase tracking-wider text-sm">
            Final Score
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {/* Accuracy */}
          <div className="bg-white/5 rounded-xl p-3">
            <Target className="w-5 h-5 mx-auto text-cyan-400 mb-1" />
            <div className="text-xl font-bold text-white">{accuracy}%</div>
            <div className="text-xs text-white/40">Accuracy</div>
          </div>

          {/* Correct Answers */}
          <div className="bg-white/5 rounded-xl p-3">
            <BookOpen className="w-5 h-5 mx-auto text-green-400 mb-1" />
            <div className="text-xl font-bold text-white">{correctAnswers}</div>
            <div className="text-xs text-white/40">Correct</div>
          </div>

          {/* Best Streak */}
          <div className="bg-white/5 rounded-xl p-3">
            <Flame className="w-5 h-5 mx-auto text-orange-400 mb-1" />
            <div className="text-xl font-bold text-white">{longestStreak}</div>
            <div className="text-xs text-white/40">Best Streak</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onGoHome}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                       bg-white/10 text-white font-medium hover:bg-white/20 transition-all"
          >
            <Home className="w-5 h-5" />
            Home
          </button>
          <button
            onClick={onPlayAgain}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                       bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold
                       hover:opacity-90 transition-all shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
        </div>

        {/* Credits */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-xs text-white/30">
            Questions from Open Trivia Database & Wikipedia
          </p>
        </div>
      </div>
    </div>
  );
}
