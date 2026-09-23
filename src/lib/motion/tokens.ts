/**
 * Genius Hub Motion Design Tokens
 * Centralized durations and easing curves for transitions, reveals, and interactive states.
 */

export const motionTokens = {
  durations: {
    fast: 150, // 0.15s - micro-interactions, hover highlights, toggles
    normal: 250, // 0.25s - dropdowns, modest reveals, badge transitions
    slow: 400, // 0.40s - modal enters, drawer slides, accordion unfolds
    editorial: 700, // 0.70s - hero typography reveals, cinematic image transitions
  },
  easings: {
    standard: 'cubic-bezier(0.2, 0.0, 0, 1.0)', // natural UI movement
    enter: 'cubic-bezier(0.0, 0.0, 0.2, 1.0)', // entering viewport / opening
    exit: 'cubic-bezier(0.4, 0.0, 1.0, 1.0)', // leaving viewport / closing
    editorial: 'cubic-bezier(0.16, 1.0, 0.3, 1.0)', // smooth deceleration for hero elements
  },
} as const;

export type MotionDuration = keyof typeof motionTokens.durations;
export type MotionEasing = keyof typeof motionTokens.easings;
