import React, { useEffect, useRef } from 'react';
import { ScrollBlockerProps } from './types';
import { getScrollbarWidth, isIOS, preventDefault } from './utils';
import TouchScrollable from './TouchScrollable';

/**
 * A counter to track how many ScrollBlocker instances are active.
 * This allows multiple modals/components to use ScrollBlocker without conflicts.
 */
let lockCounter = 0;

/**
 * Store original body styles to restore them later
 */
const originalBodyStyles = {
  overflow: '',
  paddingRight: '',
};

/**
 * ScrollBlocker component that prevents scrolling on the document body.
 * 
 * Features:
 * - Prevents body scroll when mounted and active
 * - Accounts for scrollbar width to prevent layout shift
 * - Supports nested scroll blocker instances
 * - Handles iOS touch scrolling issues
 * - Allows specific child elements to remain scrollable
 */
const ScrollBlocker: React.FC<ScrollBlockerProps> = ({
  isActive = true,
  accountForScrollbars = true,
  children,
}) => {
  const touchMoveListenerRef = useRef<((event: TouchEvent) => void) | null>(null);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    // Increment the lock counter
    lockCounter++;

    // Store original styles only on the first lock
    if (lockCounter === 1) {
      const body = document.body;
      originalBodyStyles.overflow = body.style.overflow;
      originalBodyStyles.paddingRight = body.style.paddingRight;

      // Calculate scrollbar width and apply styles
      const scrollbarWidth = accountForScrollbars ? getScrollbarWidth() : 0;
      
      body.style.overflow = 'hidden';
      
      if (scrollbarWidth > 0 && accountForScrollbars) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }

      // iOS Safari doesn't respect overflow: hidden on body, so we need to prevent touchmove
      if (isIOS()) {
        const preventTouchMove = (event: TouchEvent) => {
          // Only prevent if the touch isn't on a scrollable element
          const target = event.target as Element;
          if (!target.closest('[data-scroll-lock-scrollable]')) {
            preventDefault(event);
          }
        };

        touchMoveListenerRef.current = preventTouchMove;
        document.addEventListener('touchmove', preventTouchMove, { passive: false });
      }
    }

    // Cleanup function
    return () => {
      lockCounter--;

      // Only restore styles when all locks are removed
      if (lockCounter === 0) {
        const body = document.body;
        body.style.overflow = originalBodyStyles.overflow;
        body.style.paddingRight = originalBodyStyles.paddingRight;

        // Remove iOS touch move listener
        if (touchMoveListenerRef.current) {
          document.removeEventListener('touchmove', touchMoveListenerRef.current);
          touchMoveListenerRef.current = null;
        }
      }
    };
  }, [isActive, accountForScrollbars]);

  // If children are provided, wrap them in TouchScrollable
  if (children) {
    return <TouchScrollable>{children}</TouchScrollable>;
  }

  return null;
};

export default ScrollBlocker;
