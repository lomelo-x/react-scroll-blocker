/**
 * Utility functions for scroll lock functionality
 */

/**
 * Gets the current scrollbar width
 */
export function getScrollbarWidth(): number {
  // Create a temporary element to measure scrollbar width
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  const inner = document.createElement('div');
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Clean up
  outer.parentNode?.removeChild(outer);

  return scrollbarWidth;
}

/**
 * Checks if the current device is iOS
 */
export function isIOS(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

/**
 * Prevents the default behavior of an event
 */
export function preventDefault(event: Event): void {
  event.preventDefault();
}

/**
 * Checks if an element is scrollable
 */
export function isScrollable(element: Element): boolean {
  const { overflow, overflowX, overflowY } = window.getComputedStyle(element);
  return /auto|scroll/.test(overflow + overflowX + overflowY);
}

/**
 * Finds the closest scrollable parent of an element
 */
export function findScrollableParent(element: Element | null): Element | null {
  if (!element || element === document.body) {
    return null;
  }
  
  if (isScrollable(element)) {
    return element;
  }
  
  return findScrollableParent(element.parentElement);
}
