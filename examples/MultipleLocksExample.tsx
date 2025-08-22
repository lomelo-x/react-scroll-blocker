import React, { useState } from 'react'
import ScrollBlocker from '../src/ScrollBlocker'

/**
 * Example demonstrating multiple ScrollBlocker instances working together
 */
const MultipleLocksExample: React.FC = () => {
	const [isModal1Open, setIsModal1Open] = useState(false)
	const [isModal2Open, setIsModal2Open] = useState(false)
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	return (
		<div>
			<h1>Multiple ScrollBlocker Instances</h1>

			<div style={{ height: '200vh', padding: '20px' }}>
				<p>
					This example shows how multiple ScrollBlocker instances work together.
				</p>
				<p>
					You can have multiple modals, sidebars, or other components using
					ScrollBlocker simultaneously.
				</p>

				<div style={{ marginTop: '20px' }}>
					<button
						onClick={() => setIsModal1Open(true)}
						style={{ padding: '10px 20px', marginRight: '10px' }}>
						Open Modal 1
					</button>
					<button
						onClick={() => setIsModal2Open(true)}
						style={{ padding: '10px 20px', marginRight: '10px' }}>
						Open Modal 2
					</button>
					<button
						onClick={() => setIsSidebarOpen(true)}
						style={{ padding: '10px 20px' }}>
						Open Sidebar
					</button>
				</div>

				<p style={{ marginTop: '100vh' }}>
					Scroll will be blocked as long as any component with ScrollBlocker is
					active. Only when all are closed will scroll be restored.
				</p>
			</div>

			{/* Modal 1 */}
			{isModal1Open && (
				<>
					<ScrollBlocker />
					<div
						style={{
							position: 'fixed',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundColor: 'rgba(255, 0, 0, 0.3)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							zIndex: 1000,
						}}
						onClick={() => setIsModal1Open(false)}>
						<div
							style={{
								backgroundColor: 'white',
								padding: '30px',
								borderRadius: '8px',
								border: '3px solid red',
								maxWidth: '400px',
							}}
							onClick={(e) => e.stopPropagation()}>
							<h2>Modal 1 (Red)</h2>
							<p>
								This is the first modal. You can open other modals while this is
								open.
							</p>
							<button onClick={() => setIsModal1Open(false)}>
								Close Modal 1
							</button>
						</div>
					</div>
				</>
			)}

			{/* Modal 2 */}
			{isModal2Open && (
				<>
					<ScrollBlocker />
					<div
						style={{
							position: 'fixed',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundColor: 'rgba(0, 0, 255, 0.3)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							zIndex: 1001,
						}}
						onClick={() => setIsModal2Open(false)}>
						<div
							style={{
								backgroundColor: 'white',
								padding: '30px',
								borderRadius: '8px',
								border: '3px solid blue',
								maxWidth: '400px',
							}}
							onClick={(e) => e.stopPropagation()}>
							<h2>Modal 2 (Blue)</h2>
							<p>This is the second modal, stacked on top of other content.</p>
							<button onClick={() => setIsModal2Open(false)}>
								Close Modal 2
							</button>
						</div>
					</div>
				</>
			)}

			{/* Sidebar */}
			{isSidebarOpen && (
				<>
					<ScrollBlocker />
					<div
						style={{
							position: 'fixed',
							top: 0,
							left: 0,
							width: '300px',
							bottom: 0,
							backgroundColor: 'white',
							boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
							padding: '20px',
							zIndex: 1002,
						}}>
						<h2>Sidebar</h2>
						<p>
							This sidebar also uses ScrollBlocker to prevent background
							scrolling.
						</p>
						<button onClick={() => setIsSidebarOpen(false)}>
							Close Sidebar
						</button>
					</div>

					{/* Sidebar overlay */}
					<div
						style={{
							position: 'fixed',
							top: 0,
							left: '300px',
							right: 0,
							bottom: 0,
							backgroundColor: 'rgba(0, 0, 0, 0.3)',
							zIndex: 1001,
						}}
						onClick={() => setIsSidebarOpen(false)}
					/>
				</>
			)}
		</div>
	)
}

export default MultipleLocksExample
