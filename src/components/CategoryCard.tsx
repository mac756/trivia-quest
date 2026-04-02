/**
 * CategoryCard Component
 *
 * Displays a category selection card on the home screen.
 * Each card has a themed background image, category name,
 * and era subtitle with hover effects.
 *
 * References:
 * - SPEC.md Section 5: CategoryCard component
 * - CategoryCardProps in types/index.ts
 */

import { CategoryCardProps } from '../types';
import { CATEGORIES } from '../data/questions';

/**
 * CategoryCard displays a single category option for the player to select
 *
 * @param category - Category identifier (history, science, sports, entertainment)
 * @param name - Display name of the category
 * @param subtitle - Era/theme description
 * @param imageUrl - Unsplash background image URL
 * @param colorPrimary - Primary theme color (hex)
 * @param colorAccent - Accent color (hex)
 * @param onSelect - Callback when card is clicked
 */
export function CategoryCard({
  category,
  name,
  subtitle,
  imageUrl,
  colorPrimary,
  colorAccent,
  onSelect,
}: CategoryCardProps) {
  return (
    <button
      onClick={() => onSelect(category)}
      className="relative w-full h-48 rounded-2xl overflow-hidden group cursor-pointer
                 card-hover focus:outline-none focus:ring-4 focus:ring-white/30"
      style={{
        backgroundColor: colorPrimary,
      }}
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500
                   group-hover:scale-110"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />

      {/* Gradient Overlay for readability */}
      <div
        className="absolute inset-0 opacity-80 transition-opacity duration-300
                   group-hover:opacity-70"
        style={{
          background: `linear-gradient(135deg, ${colorPrimary}CC 0%, ${colorPrimary}99 100%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6 text-left">
        {/* Accent line */}
        <div
          className="w-12 h-1 rounded-full mb-3 transition-all duration-300
                     group-hover:w-20"
          style={{ backgroundColor: colorAccent }}
        />

        {/* Category Name */}
        <h2 className="text-2xl font-bold text-white mb-1 font-heading">
          {name}
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-white/80 font-body">
          {subtitle}
        </p>

        {/* Difficulty hint at bottom */}
        <div className="flex items-center gap-2 mt-3">
          <span
            className="text-xs font-medium px-2 py-1 rounded-full"
            style={{
              backgroundColor: `${colorAccent}33`,
              color: colorAccent,
            }}
          >
            4 Choices
          </span>
          <span className="text-xs text-white/60">→</span>
          <span
            className="text-xs font-medium px-2 py-1 rounded-full"
            style={{
              backgroundColor: `${colorAccent}33`,
              color: colorAccent,
            }}
          >
            2 Choices
          </span>
        </div>
      </div>

      {/* Hover glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                   pointer-events-none"
        style={{
          boxShadow: `inset 0 0 60px ${colorAccent}40`,
        }}
      />
    </button>
  );
}

/**
 * CategoryGrid displays all category cards in a responsive grid
 * Used on the home screen
 */
export function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
      {CATEGORIES.map((cat) => (
        <CategoryCard
          key={cat.id}
          category={cat.id}
          name={cat.name}
          subtitle={cat.subtitle}
          imageUrl={cat.imageUrl}
          colorPrimary={cat.colorPrimary}
          colorAccent={cat.colorAccent}
          onSelect={() => {}}  // Will be connected in App.tsx
        />
      ))}
    </div>
  );
}
