# React Scroll Blocker

A modern, lightweight React component that prevents body scrolling when modals, dropdowns, or overlays are open. Built for React 18 with proper scrollbar width compensation and TypeScript support.

## Features

- 🚫 **Prevents body scroll** when components are mounted
- 📏 **Scrollbar compensation** - maintains layout by accounting for scrollbar width
- ⚡ **Lightweight** - minimal bundle size with zero dependencies
- 🔄 **React 18 compatible** - works with modern React features
- 🎯 **Multiple instances** - handles overlapping scroll locks gracefully
- 📱 **Mobile friendly** - supports touch scroll prevention
- 🎨 **No layout shift** - preserves page layout when scroll is blocked
- 🔧 **TypeScript support** - fully typed for better DX

## Perfect for

- Modal dialogs
- Dropdown menus  
- Side navigation panels
- Image galleries
- Mobile overlays
- Any overlay that should prevent background scrolling

## Installation

```bash
npm install react-scroll-blocker
# or
yarn add react-scroll-blocker
```

## Quick Start

```jsx
import ScrollBlocker from 'react-scroll-blocker'

function Modal({ isOpen }) {
  return (
    <>
      {isOpen && <ScrollBlocker />}
      {/* Your modal content */}
    </>
  )
}
```
```

**Repository Topics/Keywords:**
