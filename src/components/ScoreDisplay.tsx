/**
 * ScoreDisplay Component
 *
 * Shows the player's current score, streak, and difficulty multiplier.
 * Score animates when it increases.
 *
 * References:
 * - SPEC.md Section 5: ScoreDisplay component
 * - ScoreDisplayProps in types/index.ts
 */

import { useEffect, useState } from 'react';
import { ScoreDisplayProps } from '../types';
import { Zap, Flame } from 'lucide-react';

/**
 * ScoreDisplay shows current game stats
 *
 * @param score - Current total score
 * @param streak - Current winning streak
 * @param multiplier - Current difficulty multiplier (1x, 2x, 3x)
 */
export function ScoreDisplay({
  score,
  streak,
  multiplier,
}: ScoreDisplayProps) {
  // Animate score counting up
  const [displayScore, setDisplayScore] = useState(score);

  useEffect(() => {
    if (displayScore !== score) {
      const diff = score - displayScore;
      const step = Math.ceil(diff / 10);
      const timer = setTimeout(() => {
        setDisplayScore(prev => Math.min(prev + step, score));
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [score, displayScore]);

  return (
    <div className="flex items-center gap-6">
      {/* Score */}
      <div className="text-center">
        <div className="text-2xl font-bold text-white font-mono">
          {displayScore}
        </div>
        <div className="text-xs text-white/50 uppercase tracking-wider">Score</div>
      </div>

      {/* Streak */}
      {streak > 0 && (
        <div className="flex items-center gap-1">
          <Flame className="w-5 h-5 text-orange-400 fill-orange-400" />
          <span className="text-white font-bold">{streak}</span>
        </div>
      )}

      {/* Multiplier */}
      <div className="flex items-center gap-1">
        <Zap className={`w-5 h-5 ${
          multiplier === 3 ? 'text-red-400' :
          multiplier === 2 ? 'text-yellow-400' : 'text-green-400'
        }`} />
        <span className={`font-bold ${
          multiplier === 3 ? 'text-red-400' :
          multiplier === 2 ? 'text-yellow-400' : 'text-green-400'
        }`}>
          {multiplier}x
        </span>
      </div>
    </div>
  );
}
