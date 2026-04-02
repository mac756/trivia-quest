/**
 * TimerBar Component
 *
 * Visual countdown timer that shrinks from left to right.
 * Color transitions from green → yellow → red as time depletes.
 *
 * References:
 * - SPEC.md Section 5: TimerBar component
 * - TimerBarProps in types/index.ts
 */

import { useEffect, useState } from 'react';
import { TimerBarProps } from '../types';

/**
 * TimerBar displays a shrinking countdown bar
 *
 * @param timeRemaining - Seconds remaining
 * @param totalTime - Total time for this question
 * @param isActive - Whether the timer is counting down
 */
export function TimerBar({
  timeRemaining,
  totalTime,
  isActive,
}: TimerBarProps) {
  // Calculate percentage remaining
  const percentage = totalTime > 0 ? (timeRemaining / totalTime) * 100 : 0;

  // Determine color based on time remaining
  const getColorClass = (): string => {
    if (percentage > 50) return 'timer-green';
    if (percentage > 25) return 'timer-yellow';
    return 'timer-red';
  };

  return (
    <div className="w-full">
      {/* Time label */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-white/60">Time</span>
        <span
          className={`text-sm font-mono font-bold transition-colors duration-300 ${
            percentage <= 25 ? 'text-red-400' : 'text-white/80'
          }`}
        >
          {timeRemaining}s
        </span>
      </div>

      {/* Bar container */}
      <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
        {/* Animated bar */}
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${getColorClass()}`}
          style={{
            width: `${percentage}%`,
            // Add subtle pulse animation when low
            ...(percentage <= 25 && isActive
              ? { animation: 'pulse 0.5s ease-in-out infinite' }
              : {}),
          }}
        />
      </div>

      {/* Color legend (subtle) */}
      <div className="flex justify-between mt-1 text-xs text-white/30">
        <span>Start</span>
        <span>End</span>
      </div>
    </div>
  );
}

/**
 * TimerBarWithCountdown - TimerBar with built-in countdown logic
 * Use this when you need the component to manage its own time
 */
export function TimerBarWithCountdown({
  totalTime,
  isActive,
  onTimeout,
}: {
  totalTime: number;
  isActive: boolean;
  onTimeout: () => void;
}) {
  const [timeRemaining, setTimeRemaining] = useState(totalTime);

  // Reset timer when isActive changes (new question)
  useEffect(() => {
    setTimeRemaining(totalTime);
  }, [totalTime, isActive]);

  // Countdown logic
  useEffect(() => {
    if (!isActive || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeRemaining, onTimeout]);

  return (
    <TimerBar
      timeRemaining={timeRemaining}
      totalTime={totalTime}
      isActive={isActive}
    />
  );
}
