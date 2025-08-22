import React, { useState } from 'react'
import { useScrollBlocker } from '../src/useScrollBlocker'

/**
 * Example showing how to use the useScrollBlocker hook
 */
const HookUsageExample: React.FC = () => {
	const [isBlocked, setIsBlocked] = useState(false)
	const { blockScroll, unblockScroll } = useScrollBlocker(isBlocked)

	return (
		<div style={{ padding: '20px' }}>
			<h1>useScrollBlocker Hook Example</h1>

			<div style={{ marginBottom: '20px' }}>
				<button
					onClick={() => setIsBlocked(!isBlocked)}
					style={{
						padding: '10px 20px',
						fontSize: '16px',
						backgroundColor: isBlocked ? '#ff4444' : '#44ff44',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer',
					}}>
					{isBlocked ? 'Unblock Scroll' : 'Block Scroll'}
				</button>

				<div style={{ marginTop: '10px' }}>
					<button
						onClick={blockScroll}
						style={{ marginRight: '10px', padding: '5px 10px' }}>
						Manual Block
					</button>
					<button
						onClick={unblockScroll}
						style={{ padding: '5px 10px' }}>
						Manual Unblock
					</button>
				</div>
			</div>

			<div style={{ height: '200vh' }}>
				<h2>Scroll Status: {isBlocked ? 'BLOCKED' : 'UNBLOCKED'}</h2>
				<p>
					This example demonstrates the useScrollBlocker hook which gives you
					programmatic control over scroll blocking.
				</p>
				<p>
					Use the toggle button to block/unblock scrolling, or use the manual
					block/unblock buttons to control it directly.
				</p>

				<div
					style={{
						marginTop: '50vh',
						padding: '20px',
						backgroundColor: '#f0f0f0',
					}}>
					<h3>Middle Content</h3>
					<p>This content is in the middle of a long page.</p>
				</div>

				<div
					style={{
						marginTop: '50vh',
						padding: '20px',
						backgroundColor: '#e0e0e0',
					}}>
					<h3>Bottom Content</h3>
					<p>This content is at the bottom of the page.</p>
				</div>
			</div>
		</div>
	)
}

export default HookUsageExample
