import React, { useState } from 'react'
import ScrollBlocker from '../src/ScrollBlocker'

/**
 * Basic usage example showing how to use ScrollBlocker with a modal
 */
const BasicUsageExample: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	return (
		<div>
			<h1>Basic ScrollBlocker Usage</h1>

			<div style={{ height: '200vh', padding: '20px' }}>
				<p>This page is intentionally tall to demonstrate scroll blocking.</p>
				<p>Try scrolling up and down, then open the modal.</p>

				<button
					onClick={() => setIsModalOpen(true)}
					style={{
						padding: '10px 20px',
						fontSize: '16px',
						marginTop: '20px',
					}}>
					Open Modal
				</button>

				<p style={{ marginTop: '100vh' }}>More content to scroll through...</p>
			</div>

			{isModalOpen && (
				<>
					{/* ScrollBlocker will prevent body scroll when this modal is mounted */}
					<ScrollBlocker />

					<div
						style={{
							position: 'fixed',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundColor: 'rgba(0, 0, 0, 0.5)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							zIndex: 1000,
						}}
						onClick={() => setIsModalOpen(false)}>
						<div
							style={{
								backgroundColor: 'white',
								padding: '30px',
								borderRadius: '8px',
								maxWidth: '500px',
								margin: '20px',
							}}
							onClick={(e) => e.stopPropagation()}>
							<h2>Modal Title</h2>
							<p>
								While this modal is open, the background content cannot be
								scrolled. Try scrolling with your mouse wheel or touch gestures.
							</p>
							<button
								onClick={() => setIsModalOpen(false)}
								style={{
									padding: '8px 16px',
									marginTop: '20px',
								}}>
								Close Modal
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default BasicUsageExample
