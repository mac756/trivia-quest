/**
 * QuestionCard Component
 *
 * Displays a trivia question with multiple choice answers.
 * Handles answer selection, correct/wrong feedback, and
 * difficulty-based choice counts (4/3/2 choices).
 *
 * References:
 * - SPEC.md Section 5: QuestionCard component
 * - QuestionCardProps in types/index.ts
 */

import { QuestionCardProps } from '../types';
import { Check, X } from 'lucide-react';

/**
 * QuestionCard displays a single question with answer buttons
 *
 * @param question - The Question object to display
 * @param selectedAnswer - Currently selected answer (null if none)
 * @param answerRevealed - Whether to show correct/wrong feedback
 * @param onAnswer - Callback when an answer is selected
 * @param choiceCount - Number of choices to display (4, 3, or 2)
 */
export function QuestionCard({
  question,
  selectedAnswer,
  answerRevealed,
  onAnswer,
  choiceCount,
}: QuestionCardProps) {
  // Build answer choices: correct + wrong, then shuffled
  const allChoices = [question.correctAnswer, ...question.wrongAnswers];
  const shuffledChoices = shuffleArray(allChoices).slice(0, choiceCount);

  // Get button class based on state
  const getButtonClass = (choice: string): string => {
    const baseClass = 'answer-btn flex items-center gap-3';

    if (!answerRevealed) {
      // Before reveal: show selection highlight if selected
      if (selectedAnswer === choice) {
        return `${baseClass} border-slate-400 bg-slate-600/80`;
      }
      return baseClass;
    }

    // After reveal: show correct/wrong/neutral states
    if (choice === question.correctAnswer) {
      return `${baseClass} correct`;
    }
    if (selectedAnswer === choice && choice !== question.correctAnswer) {
      return `${baseClass} wrong`;
    }
    return `${baseClass} show-correct opacity-60`;
  };

  return (
    <div className="glass-card p-6 rounded-2xl">
      {/* Question Text */}
      <div className="mb-6">
        <p className="text-lg md:text-xl text-white font-medium leading-relaxed text-center">
          {question.question}
        </p>
      </div>

      {/* Era Badge */}
      <div className="flex justify-center mb-4">
        <span className="text-xs text-white/50 uppercase tracking-wider">
          {question.era}
        </span>
      </div>

      {/* Answer Choices */}
      <div className="space-y-3">
        {shuffledChoices.map((choice, index) => (
          <button
            key={`${choice}-${index}`}
            onClick={() => !answerRevealed && onAnswer(choice)}
            disabled={answerRevealed}
            className={getButtonClass(choice)}
          >
            {/* Letter prefix (A, B, C, D) */}
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center
                           text-sm font-bold text-white/70">
              {String.fromCharCode(65 + index)}
            </span>

            {/* Answer text */}
            <span className="flex-1">{choice}</span>

            {/* Result icon (shown after reveal) */}
            {answerRevealed && choice === question.correctAnswer && (
              <Check className="w-6 h-6 text-green-400 flex-shrink-0" />
            )}
            {answerRevealed && selectedAnswer === choice && choice !== question.correctAnswer && (
              <X className="w-6 h-6 text-red-400 flex-shrink-0" />
            )}
          </button>
        ))}
      </div>

      {/* Feedback message (shown after reveal) */}
      {answerRevealed && selectedAnswer && (
        <div className="mt-6 text-center">
          {selectedAnswer === question.correctAnswer ? (
            <p className="text-green-400 font-medium animate-pulse">
              Correct! +{100} points
            </p>
          ) : (
            <p className="text-red-400 font-medium">
              Wrong! The answer was: {question.correctAnswer}
            </p>
          )}
        </div>
      )}

      {/* Source citation */}
      {question.source && (
        <div className="mt-4 text-center">
          <span className="text-xs text-white/30">
            Source: {question.source}
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * Fisher-Yates shuffle for answer randomization
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
