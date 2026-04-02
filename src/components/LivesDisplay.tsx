/**
 * LivesDisplay Component
 *
 * Shows remaining lives as heart icons.
 * Filled hearts = lives remaining, empty hearts = lives lost.
 *
 * References:
 * - SPEC.md Section 5: LivesDisplay component
 * - LivesDisplayProps in types/index.ts
 */

import { Heart } from 'lucide-react';
import { LivesDisplayProps } from '../types';

/**
 * LivesDisplay shows the player's remaining lives
 *
 * @param lives - Number of lives remaining
 * @param maxLives - Total lives (default: 3)
 */
export function LivesDisplay({
  lives,
  maxLives = 3,
}: LivesDisplayProps) {
  // Create array of hearts (filled for remaining, empty for lost)
  const hearts = Array.from({ length: maxLives }, (_, i) => i < lives);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-white/60 mr-1">Lives</span>
      <div className="flex gap-1">
        {hearts.map((isFilled, index) => (
          <Heart
            key={index}
            className={`w-6 h-6 transition-all duration-300 ${
              isFilled
                ? 'fill-red-500 text-red-500'
                : 'fill-transparent text-white/30'
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-mono text-white/80 ml-1">
        {lives}/{maxLives}
      </span>
    </div>
  );
}
