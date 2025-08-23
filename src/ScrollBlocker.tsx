import React, { useEffect, useRef, useState } from 'react'
import { ScrollBlockerProps } from './types'
import { getScrollbarWidth, isIOS, preventDefault } from './utils'
import TouchScrollable from './TouchScrollable'

/**
 * Track active ScrollBlocker instances using a Set for better management
 */
const activeBlockers = new Set<string>()

/**
 * Generate unique ID for each ScrollBlocker instance
 */
let instanceCounter = 0
const generateInstanceId = () => `scroll-blocker-${++instanceCounter}`

/**
 * Global type for storing original styles on window object
 */
declare global {
	interface Window {
		__scrollBlockerOriginalStyles?: {
			overflow: string
			position: string
			paddingRight: string
		}
	}
}

/**
 * Reset all ScrollBlocker instances - useful for emergency cleanup
 */
export const resetScrollBlocker = (): void => {
	// Clear all active instances
	activeBlockers.clear()

	// Restore body styles to default
	const body = document.body
	body.style.overflow = ''
	body.style.position = ''
	body.style.paddingRight = ''

	// Clean up global original styles reference
	delete window.__scrollBlockerOriginalStyles

	// Remove all touch event listeners
	const clonedBody = body.cloneNode(true) as HTMLElement
	body.parentNode?.replaceChild(clonedBody, body)

	// Clean up any data attributes
	const existingElements = document.querySelectorAll(
		'[data-scroll-lock-scrollable]',
	)
	existingElements.forEach((el) => {
		el.removeAttribute('data-scroll-lock-scrollable')
	})
}

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
	const [isBlocking, setIsBlocking] = useState(false)
	const instanceIdRef = useRef<string>()
	const touchMoveListenerRef = useRef<((event: TouchEvent) => void) | null>(
		null,
	)

	// Generate unique instance ID on first render
	if (!instanceIdRef.current) {
		instanceIdRef.current = generateInstanceId()
	}

	useEffect(() => {
		if (!isActive || isBlocking) {
			return
		}

		const instanceId = instanceIdRef.current!
		const body = document.body

		// Add this instance to active set
		activeBlockers.add(instanceId)

		// Apply scroll blocking styles (only if first instance)
		if (activeBlockers.size === 1) {
			// Store the ORIGINAL styles globally on first instance only
			if (!window.__scrollBlockerOriginalStyles) {
				window.__scrollBlockerOriginalStyles = {
					overflow: body.style.overflow,
					position: body.style.position,
					paddingRight: body.style.paddingRight,
				}
			}

			const scrollbarWidth = accountForScrollbars ? getScrollbarWidth() : 0

			body.style.overflow = 'hidden'
			body.style.position = 'relative' // ← Add this line!
			if (scrollbarWidth > 0 && accountForScrollbars) {
				body.style.paddingRight = `${scrollbarWidth}px`
			}

			// iOS Safari touch handling
			if (isIOS()) {
				const preventTouchMove = (event: TouchEvent) => {
					const target = event.target as Element
					if (!target.closest('[data-scroll-lock-scrollable]')) {
						if (event.cancelable && event.type === 'touchmove') {
							preventDefault(event)
						}
					}
				}

				touchMoveListenerRef.current = preventTouchMove
				document.addEventListener('touchmove', preventTouchMove, {
					passive: false,
				})
			}
		}

		setIsBlocking(true)

		// Cleanup function - component-scoped
		return () => {
			activeBlockers.delete(instanceId)
			setIsBlocking(false)

			// Only restore styles when no more active blockers
			if (activeBlockers.size === 0) {
				const originalStyles = window.__scrollBlockerOriginalStyles
				body.style.overflow = originalStyles?.overflow || ''
				body.style.position = originalStyles?.position || ''
				body.style.paddingRight = originalStyles?.paddingRight || ''

				// Clean up global reference
				delete window.__scrollBlockerOriginalStyles

				// Remove touch listener
				if (touchMoveListenerRef.current) {
					document.removeEventListener(
						'touchmove',
						touchMoveListenerRef.current,
					)
					touchMoveListenerRef.current = null
				}
			}
		}
	}, [isActive, accountForScrollbars])

	// If children are provided, wrap them in TouchScrollable
	if (children) {
		return <TouchScrollable>{children}</TouchScrollable>
	}

	return null
}

export default ScrollBlocker
