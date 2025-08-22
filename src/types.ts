import { ReactNode } from 'react';

export interface ScrollBlockerProps {
  /**
   * Whether the scroll blocker is active.
   * @default true
   */
  isActive?: boolean;
  
  /**
   * Whether to account for scrollbars when blocking scroll.
   * This prevents layout shift by adding padding to compensate for the removed scrollbar.
   * @default true
   */
  accountForScrollbars?: boolean;
  
  /**
   * Child element that will be wrapped in TouchScrollable.
   * If provided, this element will remain scrollable on touch devices.
   */
  children?: ReactNode;
}

export interface TouchScrollableProps {
  /**
   * Child elements that should remain scrollable on touch devices.
   */
  children: ReactNode;
}
