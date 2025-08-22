import React, { useRef, useEffect, ReactElement, cloneElement } from 'react';
import { TouchScrollableProps } from './types';
import { isScrollable, findScrollableParent } from './utils';

/**
 * TouchScrollable component that allows an element to remain scrollable 
 * even when ScrollLock is active. This is particularly important for iOS
 * devices where overflow: hidden on body doesn't prevent touch scrolling.
 */
const TouchScrollable: React.FC<TouchScrollableProps> = ({ children }) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let startY = 0;
    let allowTouchMove = false;

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        startY = event.touches[0].clientY;
        
        // Check if the touch target or its parent is scrollable
        const target = event.target as Element;
        const scrollableParent = findScrollableParent(target) || target;
        allowTouchMove = isScrollable(scrollableParent);
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;

      const touch = event.touches[0];
      const currentY = touch.clientY;
      const element = elementRef.current;
      
      if (!element || !allowTouchMove) return;

      const deltaY = currentY - startY;
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight;
      const clientHeight = element.clientHeight;

      // Check if we're at the boundaries of the scrollable element
      const isAtTop = scrollTop === 0 && deltaY > 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight && deltaY < 0;

      // Prevent rubber band scrolling at the boundaries
      if (isAtTop || isAtBottom) {
        event.preventDefault();
      }
    };

    // Add touch event listeners
    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Clone the child element and add our ref and data attribute
  const child = React.Children.only(children) as ReactElement;
  
  return cloneElement(child, {
    ref: elementRef,
    'data-scroll-lock-scrollable': true,
    ...child.props,
  });
};

export default TouchScrollable;
