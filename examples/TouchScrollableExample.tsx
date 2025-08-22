import React, { useState } from 'react'
import ScrollBlocker, { TouchScrollable } from '../src'

/**
 * Example showing ScrollBlocker with TouchScrollable for elements that should remain scrollable
 */
const TouchScrollableExample: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	return (
		<div>
			<h1>TouchScrollable Example</h1>

			<div style={{ height: '200vh', padding: '20px' }}>
				<p>
					This page demonstrates how TouchScrollable allows specific elements to
					remain scrollable.
				</p>
				<p>
					Try opening the modal and scrolling within the modal content on a
					touch device.
				</p>

				<button
					onClick={() => setIsModalOpen(true)}
					style={{
						padding: '10px 20px',
						fontSize: '16px',
						marginTop: '20px',
					}}>
					Open Scrollable Modal
				</button>

				<p style={{ marginTop: '100vh' }}>
					Background content that will be locked when modal opens...
				</p>
			</div>

			{isModalOpen && (
				<>
					{/* ScrollBlocker with children automatically wraps them in TouchScrollable */}
					<ScrollBlocker>
						<div
							style={{
								position: 'fixed',
								top: '10%',
								left: '10%',
								right: '10%',
								bottom: '10%',
								backgroundColor: 'white',
								borderRadius: '8px',
								boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
								overflow: 'auto',
								zIndex: 1000,
							}}>
							<div style={{ padding: '20px' }}>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										marginBottom: '20px',
									}}>
									<h2>Scrollable Modal Content</h2>
									<button
										onClick={() => setIsModalOpen(false)}
										style={{ padding: '5px 10px' }}>
										✕
									</button>
								</div>

								<p>
									This modal content is scrollable even when ScrollBlocker is
									active.
								</p>

								{/* Generate long content to demonstrate scrolling */}
								{Array.from({ length: 50 }, (_, i) => (
									<div
										key={i}
										style={{
											padding: '10px',
											margin: '10px 0',
											backgroundColor: i % 2 === 0 ? '#f8f9fa' : '#e9ecef',
											borderRadius: '4px',
										}}>
										<h3>Section {i + 1}</h3>
										<p>
											This is scrollable content inside the modal. The
											background page scroll is blocked, but this content area
											remains fully scrollable. This works on both desktop and
											mobile devices.
										</p>
									</div>
								))}
							</div>
						</div>
					</ScrollBlocker>

					{/* Background overlay */}
					<div
						style={{
							position: 'fixed',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundColor: 'rgba(0, 0, 0, 0.5)',
							zIndex: 999,
						}}
						onClick={() => setIsModalOpen(false)}
					/>
				</>
			)}
		</div>
	)
}

export default TouchScrollableExample
