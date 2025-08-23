/**
 * React Scroll Blocker
 *
 * A modern, React 18 compatible library for preventing body scroll.
 * Inspired by react-scrolllock but built with modern React practices.
 */

export { default as ScrollBlocker, resetScrollBlocker } from './ScrollBlocker'
export { default as TouchScrollable } from './TouchScrollable'
export { useScrollBlocker } from './useScrollBlocker'
export type { ScrollBlockerProps, TouchScrollableProps } from './types'

// Default export for convenience
export { default } from './ScrollBlocker'
