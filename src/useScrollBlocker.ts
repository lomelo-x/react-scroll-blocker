import { useEffect, useRef } from 'react';
import { getScrollbarWidth, isIOS, preventDefault } from './utils';

/**
 * A React hook that provides scroll blocking functionality.
 * This is useful when you want to control scroll blocking programmatically
 * without using the ScrollBlocker component.
 * 
 * @param isBlocked - Whether scroll should be blocked
 * @param accountForScrollbars - Whether to account for scrollbar width
 * @returns An object with methods to manually block/unblock scroll
 */
export function useScrollBlocker(
  isBlocked: boolean = false,
  accountForScrollbars: boolean = true
) {
  const lockCounterRef = useRef(0);
  const originalStylesRef = useRef({ overflow: '', paddingRight: '' });
  const touchMoveListenerRef = useRef<((event: TouchEvent) => void) | null>(null);

  const blockScroll = () => {
    lockCounterRef.current++;

    if (lockCounterRef.current === 1) {
      const body = document.body;
      originalStylesRef.current.overflow = body.style.overflow;
      originalStylesRef.current.paddingRight = body.style.paddingRight;

      const scrollbarWidth = accountForScrollbars ? getScrollbarWidth() : 0;
      
      body.style.overflow = 'hidden';
      
      if (scrollbarWidth > 0 && accountForScrollbars) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }

      if (isIOS()) {
        const preventTouchMove = (event: TouchEvent) => {
          const target = event.target as Element;
          if (!target.closest('[data-scroll-lock-scrollable]')) {
            preventDefault(event);
          }
        };

        touchMoveListenerRef.current = preventTouchMove;
        document.addEventListener('touchmove', preventTouchMove, { passive: false });
      }
    }
  };

  const unblockScroll = () => {
    if (lockCounterRef.current > 0) {
      lockCounterRef.current--;

      if (lockCounterRef.current === 0) {
        const body = document.body;
        body.style.overflow = originalStylesRef.current.overflow;
        body.style.paddingRight = originalStylesRef.current.paddingRight;

        if (touchMoveListenerRef.current) {
          document.removeEventListener('touchmove', touchMoveListenerRef.current);
          touchMoveListenerRef.current = null;
        }
      }
    }
  };

  useEffect(() => {
    if (isBlocked) {
      blockScroll();
    } else {
      unblockScroll();
    }

    return () => {
      unblockScroll();
    };
  }, [isBlocked, accountForScrollbars]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Force unblock when component unmounts
      if (lockCounterRef.current > 0) {
        const body = document.body;
        body.style.overflow = originalStylesRef.current.overflow;
        body.style.paddingRight = originalStylesRef.current.paddingRight;

        if (touchMoveListenerRef.current) {
          document.removeEventListener('touchmove', touchMoveListenerRef.current);
        }
      }
    };
  }, []);

  return {
    blockScroll,
    unblockScroll,
    isBlocked: lockCounterRef.current > 0,
  };
}
