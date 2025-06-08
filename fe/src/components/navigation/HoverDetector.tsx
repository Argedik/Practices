'use client';

import React, { useEffect, useState } from 'react';

interface HoverDetectorProps {
	isVisible: boolean;
	onShow: () => void;
}

export const HoverDetector: React.FC<HoverDetectorProps> = ({
	isVisible,
	onShow,
}) => {
	const [isHovering, setIsHovering] = useState(false);

	useEffect(() => {
		let timeoutId: NodeJS.Timeout;

		if (isHovering && !isVisible) {
			timeoutId = setTimeout(() => {
				onShow();
			}, 200); // 200ms gecikme ile panel göster
		}

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, [isHovering, isVisible, onShow]);

	const detectorStyle: React.CSSProperties = {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '10%', // Sol tarafın %10'u - hover detection alanı
		height: '100vh',
		zIndex: 1001, // Daha yüksek z-index
		background:
			isHovering && !isVisible ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
		cursor: 'pointer',
		opacity: isVisible ? 0 : 1, // Panel görünürken detector gizli
		pointerEvents: isVisible ? 'none' : 'auto',
		transition: 'all 0.3s ease',
	};

	const indicatorStyle: React.CSSProperties = {
		position: 'absolute',
		top: '50%',
		right: '0',
		transform:
			isHovering && !isVisible
				? 'translateY(-50%) scaleX(2)'
				: 'translateY(-50%) scaleX(1)',
		width: '6px',
		height: '100px',
		background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
		borderRadius: '0 6px 6px 0',
		transition: 'all 0.3s ease',
		opacity: isHovering && !isVisible ? 1 : 0,
		boxShadow:
			isHovering && !isVisible ? '2px 0 10px rgba(102, 126, 234, 0.3)' : 'none',
	};

	const tooltipStyle: React.CSSProperties = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		background: 'rgba(0, 0, 0, 0.8)',
		color: 'white',
		padding: '0.5rem 1rem',
		borderRadius: '8px',
		fontSize: '0.9rem',
		opacity: isHovering && !isVisible ? 1 : 0,
		transition: 'opacity 0.3s ease',
		pointerEvents: 'none',
		whiteSpace: 'nowrap',
	};

	return (
		<div
			style={detectorStyle}
			onMouseEnter={() => {
				console.log('🖱️ HoverDetector: Mouse girdi');
				setIsHovering(true);
			}}
			onMouseLeave={() => {
				console.log('🖱️ HoverDetector: Mouse çıktı');
				setIsHovering(false);
			}}
			onClick={() => {
				console.log('🖱️ HoverDetector: Tıklandı');
				onShow();
			}}
		>
			<div style={indicatorStyle} />
			<div style={tooltipStyle}>🎨 Paneli açmak için tıklayın</div>
		</div>
	);
};
