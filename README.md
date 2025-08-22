# React Scroll Blocker

🔒 A modern, React 18 compatible library for preventing body scroll when components are mounted.

[![npm version](https://img.shields.io/npm/v/react-scroll-blocker.svg)](https://www.npmjs.com/package/react-scroll-blocker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Why React Scroll Blocker?

This library was created as a modern alternative to [`react-scrolllock`](https://github.com/jossmac/react-scrolllock), which is no longer maintained and doesn't support React 18. React Scroll Blocker provides the same functionality with modern React practices, TypeScript support, and React 18 compatibility.

## Features

- ✅ **React 18 Compatible** - Full support for React 18 and its concurrent features
- ✅ **TypeScript Support** - Written in TypeScript with full type definitions
- ✅ **Zero Dependencies** - No external dependencies except React
- ✅ **Mobile Friendly** - Handles iOS Safari scroll issues correctly
- ✅ **Layout Shift Prevention** - Accounts for scrollbar width to prevent layout jumps
- ✅ **Multiple Instances** - Support for nested/multiple scroll locks
- ✅ **Hook Support** - Includes both component and hook APIs
- ✅ **Touch Scrollable Areas** - Allow specific elements to remain scrollable
- ✅ **Server-Side Rendering** - Works with SSR/Next.js

## Installation

```bash
npm install react-scroll-blocker
# or
yarn add react-scroll-blocker
# or
pnpm add react-scroll-blocker
```

## Quick Start

```tsx
import React, { useState } from 'react'
import ScrollBlocker from 'react-scroll-blocker'

function MyModal() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div>
			<button onClick={() => setIsOpen(true)}>Open Modal</button>

			{isOpen && (
				<>
					{/* This will prevent body scroll while the modal is open */}
					<ScrollBlocker />

					<div
						className='modal-overlay'
						onClick={() => setIsOpen(false)}>
						<div
							className='modal-content'
							onClick={(e) => e.stopPropagation()}>
							<h2>Modal Title</h2>
							<p>Modal content here...</p>
							<button onClick={() => setIsOpen(false)}>Close</button>
						</div>
					</div>
				</>
			)}
		</div>
	)
}
```

## API Reference

### ScrollBlocker Component

The main component that prevents body scroll when mounted.

```tsx
import ScrollBlocker from 'react-scroll-blocker'
;<ScrollBlocker
	isActive={true} // Optional: whether the blocker is active (default: true)
	accountForScrollbars={true} // Optional: prevent layout shift (default: true)
>
	{/* Optional: scrollable content for mobile */}
</ScrollBlocker>
```

#### Props

| Prop                   | Type        | Default     | Description                                                   |
| ---------------------- | ----------- | ----------- | ------------------------------------------------------------- |
| `isActive`             | `boolean`   | `true`      | Whether the scroll blocker is active                          |
| `accountForScrollbars` | `boolean`   | `true`      | Whether to add padding to compensate for removed scrollbar    |
| `children`             | `ReactNode` | `undefined` | Child elements that should remain scrollable on touch devices |

### useScrollBlocker Hook

A React hook that provides programmatic control over scroll blocking.

```tsx
import { useScrollBlocker } from 'react-scroll-blocker'

function MyComponent() {
	const { blockScroll, unblockScroll, isBlocked } = useScrollBlocker()

	return (
		<div>
			<button onClick={blockScroll}>Block Scroll</button>
			<button onClick={unblockScroll}>Unblock Scroll</button>
			<p>Scroll is {isBlocked ? 'blocked' : 'unblocked'}</p>
		</div>
	)
}
```

#### Parameters

| Parameter              | Type      | Default | Description                            |
| ---------------------- | --------- | ------- | -------------------------------------- |
| `isBlocked`            | `boolean` | `false` | Whether scroll should be blocked       |
| `accountForScrollbars` | `boolean` | `true`  | Whether to account for scrollbar width |

#### Returns

| Property        | Type         | Description                         |
| --------------- | ------------ | ----------------------------------- |
| `blockScroll`   | `() => void` | Function to manually block scroll   |
| `unblockScroll` | `() => void` | Function to manually unblock scroll |
| `isBlocked`     | `boolean`    | Current block state                 |

### TouchScrollable Component

A component that allows its children to remain scrollable even when ScrollBlocker is active. This is particularly useful for mobile devices.

```tsx
import { ScrollBlocker, TouchScrollable } from 'react-scroll-blocker'

function ScrollableModal() {
	return (
		<>
			<ScrollBlocker />
			<TouchScrollable>
				<div className='scrollable-content'>
					{/* This content will be scrollable on mobile */}
				</div>
			</TouchScrollable>
		</>
	)
}
```

#### Alternative: Automatic TouchScrollable

When you pass children to ScrollBlocker, they are automatically wrapped in TouchScrollable:

```tsx
<ScrollBlocker>
	<div className='scrollable-content'>
		{/* Automatically scrollable on mobile */}
	</div>
</ScrollBlocker>
```

## Usage Examples

### Basic Modal

```tsx
import React, { useState } from 'react'
import ScrollBlocker from 'react-scroll-blocker'

function Modal() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div>
			<button onClick={() => setIsOpen(true)}>Open Modal</button>

			{isOpen && (
				<>
					<ScrollBlocker />
					<div
						style={
							{
								/* modal styles */
							}
						}>
						<h2>Modal Content</h2>
						<button onClick={() => setIsOpen(false)}>Close</button>
					</div>
				</>
			)}
		</div>
	)
}
```

### Conditional Scroll Lock

```tsx
import ScrollBlocker from 'react-scroll-blocker'

function ConditionalLock({ shouldLock }) {
	return (
		<div>
			<ScrollBlocker isActive={shouldLock} />
			<p>Scroll is {shouldLock ? 'locked' : 'unlocked'}</p>
		</div>
	)
}
```

### Hook-based Approach

```tsx
import { useScrollBlocker } from 'react-scroll-blocker'

function HookExample() {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { lockScroll, unlockScroll } = useScrollBlocker(isModalOpen)

	return (
		<div>
			<button onClick={() => setIsModalOpen(true)}>Open Modal</button>
			{/* Modal JSX */}
		</div>
	)
}
```

### Scrollable Modal Content

```tsx
import ScrollBlocker from 'react-scroll-blocker'

function ScrollableModal() {
	return (
		<ScrollBlocker>
			<div
				style={{
					position: 'fixed',
					top: '10%',
					bottom: '10%',
					left: '10%',
					right: '10%',
					overflow: 'auto', // This content will be scrollable
				}}>
				<div style={{ height: '200vh' }}>Long scrollable content...</div>
			</div>
		</ScrollBlocker>
	)
}
```

### Multiple Nested Locks

```tsx
import ScrollBlocker from 'react-scroll-blocker'

function NestedModals() {
	const [modal1Open, setModal1Open] = useState(false)
	const [modal2Open, setModal2Open] = useState(false)

	return (
		<div>
			{modal1Open && <ScrollBlocker />}
			{modal2Open && <ScrollBlocker />}

			{/* Both modals can be open simultaneously */}
			{/* Scroll is locked while any modal is open */}
			{/* Scroll is restored only when both are closed */}
		</div>
	)
}
```

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ iOS Safari
- ✅ Chrome Mobile
- ✅ Samsung Internet

## Migration from react-scrolllock

React Scroll Blocker is designed as a drop-in replacement for react-scrolllock:

```tsx
// Before (react-scrolllock)
import ScrollBlocker, { TouchScrollable } from 'react-scrolllock'

// After (react-scroll-blocker)
import ScrollBlocker, { TouchScrollable } from 'react-scroll-blocker'
// API is identical!
```

### Breaking Changes from react-scrolllock

- **React 18 Required**: This library requires React 18+
- **TypeScript**: Full TypeScript support (may require type updates)
- **Modern Build**: Uses modern build tools and ES modules

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © lomelo-x

## Acknowledgments

This library is inspired by and serves as a modern replacement for [`react-scrolllock`](https://github.com/jossmac/react-scrolllock) by [Joss Mackison](https://github.com/jossmac). Thanks for the original implementation and inspiration!
