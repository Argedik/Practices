'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
	isVisible: boolean;
	onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isVisible, onToggle }) => {
	const pathname = usePathname();
	const [hoveredMenuItem, setHoveredMenuItem] = useState<number | null>(null);
	const [isExploding, setIsExploding] = useState(false);

	const handleExplosiveToggle = () => {
		if (isVisible) {
			// Panel kapatılırken patlama efekti
			setIsExploding(true);

			// 600ms sonra gerçek toggle ve animation reset
			setTimeout(() => {
				onToggle();
				setIsExploding(false);
			}, 600);
		} else {
			// Panel açılırken normal toggle
			onToggle();
		}
	};

	const menuItems = [
		{
			name: 'Anasayfa',
			path: '/',
			icon: '🏠',
			description: 'Portfolio Görünümü',
		},
		{
			name: 'İçerik Düzenleme',
			path: '/edit',
			icon: '✏️',
			description: 'İnline Düzenleme',
		},
		{
			name: 'Admin Panel',
			path: '/admin',
			icon: '⚙️',
			description: 'Site Ayarları',
		},
		{
			name: 'İçerik Yönetimi',
			path: '/content',
			icon: '📝',
			description: 'Detaylı Yönetim',
		},
		{
			name: 'Galeri',
			path: '/gallery',
			icon: '🖼️',
			description: 'Medya Dosyaları',
		},
		{
			name: 'Analitik',
			path: '/analytics',
			icon: '📊',
			description: 'Site İstatistikleri',
		},
	];

	const sidebarStyle: React.CSSProperties = {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '17%',
		height: '100vh',
		background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
		boxShadow: '4px 0 20px rgba(0,0,0,0.15)',
		transform: isVisible ? 'translateX(0)' : 'translateX(-100%)',
		transition: isExploding
			? 'none'
			: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
		zIndex: 1000,
		display: 'flex',
		flexDirection: 'column',
		overflow: 'hidden',
		animation: isExploding ? 'panelClose 0.6s ease-out forwards' : 'none',
	};

	const headerStyle: React.CSSProperties = {
		padding: '2rem 1.5rem 1rem 1.5rem',
		borderBottom: '1px solid rgba(255,255,255,0.2)',
		background: 'rgba(255,255,255,0.1)',
	};

	const logoStyle: React.CSSProperties = {
		fontSize: '1.8rem',
		fontWeight: '700',
		color: 'white',
		margin: 0,
		textShadow: '0 2px 4px rgba(0,0,0,0.3)',
	};

	const subtitleStyle: React.CSSProperties = {
		fontSize: '0.9rem',
		color: 'rgba(255,255,255,0.8)',
		margin: '0.5rem 0 0 0',
		fontWeight: '400',
	};

	const menuStyle: React.CSSProperties = {
		flex: 1,
		padding: '1rem 0',
		overflow: 'auto',
	};

	const menuItemStyle = (isActive: boolean): React.CSSProperties => ({
		display: 'flex',
		alignItems: 'center',
		gap: '1rem',
		padding: '1rem 1.5rem',
		color: 'white',
		textDecoration: 'none',
		transition: 'all 0.3s ease',
		borderLeft: isActive ? '4px solid white' : '4px solid transparent',
		background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
		position: 'relative',
		overflow: 'hidden',
	});

	const iconStyle: React.CSSProperties = {
		fontSize: '1.4rem',
		minWidth: '2rem',
		textAlign: 'center',
	};

	const textContainerStyle: React.CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
	};

	const nameStyle: React.CSSProperties = {
		fontSize: '1rem',
		fontWeight: '600',
		margin: 0,
	};

	const descriptionStyle: React.CSSProperties = {
		fontSize: '0.8rem',
		opacity: 0.8,
		margin: '0.2rem 0 0 0',
	};

	const toggleButtonStyle: React.CSSProperties = {
		position: 'absolute',
		top: '50%',
		right: '8px',
		transform: 'translateY(-50%)',
		width: '35px',
		height: '35px',
		background: isExploding
			? 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)'
			: isVisible
			? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
			: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
		border: 'none',
		borderRadius: '50%',
		color: 'white',
		fontSize: '0.8rem',
		cursor: isExploding ? 'not-allowed' : 'pointer',
		display: isExploding ? 'none' : 'flex', // Patlama sırasında butonu gizle
		alignItems: 'center',
		justifyContent: 'center',
		boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
		transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
		zIndex: 1002,
		opacity: 0.9,
		animation: isExploding ? 'magicalDisappear 1.2s ease-out forwards' : 'none',
	};

	const footerStyle: React.CSSProperties = {
		padding: '1rem 1.5rem',
		borderTop: '1px solid rgba(255,255,255,0.2)',
		background: 'rgba(0,0,0,0.1)',
	};

	const versionStyle: React.CSSProperties = {
		fontSize: '0.8rem',
		color: 'rgba(255,255,255,0.6)',
		textAlign: 'center',
		margin: 0,
	};

	return (
		<>
			{/* ✨ Sihirli Kaybolma Efektleri */}
			{isExploding && (
				<>
					{/* Sihirli Parçacıklar */}
					{[...Array(15)].map((_, i) => {
						const angle = (i * 24 * Math.PI) / 180; // 24 derece aralıklarla
						const distance = 80 + (i % 4) * 20;
						return (
							<div
								key={`particle-${i}`}
								style={
									{
										position: 'fixed',
										top: '50%',
										left: 'calc(17% - 17px)', // Buton merkezi
										width: `${4 + (i % 3)}px`,
										height: `${4 + (i % 3)}px`,
										background: `hsl(${45 + i * 20}, 90%, 70%)`,
										borderRadius: '50%',
										'--dx': `${Math.cos(angle) * distance}px`,
										'--dy': `${Math.sin(angle) * distance}px`,
										animation: `magicalParticle 1.2s ease-out forwards`,
										animationDelay: `${0.3 + i * 0.05}s`,
										zIndex: 1004,
										pointerEvents: 'none',
										boxShadow: '0 0 10px currentColor',
									} as React.CSSProperties
								}
							/>
						);
					})}

					{/* Yıldız Patlamaları */}
					{[...Array(6)].map((_, i) => (
						<div
							key={`star-${i}`}
							style={{
								position: 'fixed',
								top: '50%',
								left: 'calc(17% - 17px)',
								width: '8px',
								height: '8px',
								background: '#fbbf24',
								clipPath:
									'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
								animation: `starBurst ${0.8 + i * 0.1}s ease-out forwards`,
								animationDelay: `${0.2 + i * 0.1}s`,
								zIndex: 1003,
								pointerEvents: 'none',
								filter: 'drop-shadow(0 0 6px #fbbf24)',
							}}
						/>
					))}

					{/* Parıltı Efektleri */}
					{[...Array(12)].map((_, i) => (
						<div
							key={`sparkle-${i}`}
							style={{
								position: 'fixed',
								top: `calc(50% + ${(i - 6) * 8}px)`,
								left: `calc(17% - ${17 + (i % 3) * 10}px)`,
								width: '3px',
								height: '3px',
								background: `hsl(${60 + i * 25}, 100%, 80%)`,
								borderRadius: '50%',
								animation: `sparkleFloat 1.5s ease-out forwards`,
								animationDelay: `${0.4 + i * 0.08}s`,
								zIndex: 1002,
								pointerEvents: 'none',
								boxShadow: '0 0 8px currentColor',
							}}
						/>
					))}

					{/* Işık Halkası */}
					<div
						style={{
							position: 'fixed',
							top: '50%',
							left: 'calc(17% - 17px)',
							width: '70px',
							height: '70px',
							border: '2px solid rgba(251, 191, 36, 0.6)',
							borderRadius: '50%',
							transform: 'translate(-50%, -50%)',
							animation: 'starBurst 1s ease-out forwards',
							animationDelay: '0.1s',
							zIndex: 1001,
							pointerEvents: 'none',
							boxShadow:
								'0 0 20px rgba(251, 191, 36, 0.4), ' +
								'inset 0 0 20px rgba(251, 191, 36, 0.2)',
						}}
					/>
				</>
			)}

			<nav style={sidebarStyle}>
				{/* Header */}
				<div style={headerStyle}>
					<h1 style={logoStyle}>🎨 Portfolio CMS</h1>
					<p style={subtitleStyle}>Modern İçerik Yönetimi</p>
				</div>

				{/* Menu Items */}
				<div style={menuStyle}>
					{menuItems.map((item, index) => (
						<Link
							key={item.path}
							href={item.path}
							style={menuItemStyle(pathname === item.path)}
							onMouseEnter={(e) => {
								setHoveredMenuItem(index);
								if (pathname !== item.path) {
									e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
									e.currentTarget.style.transform = 'translateX(5px)';
								}
							}}
							onMouseLeave={(e) => {
								setHoveredMenuItem(null);
								if (pathname !== item.path) {
									e.currentTarget.style.background = 'transparent';
									e.currentTarget.style.transform = 'translateX(0)';
								}
							}}
						>
							<span style={iconStyle}>{item.icon}</span>
							<div style={textContainerStyle}>
								<div style={nameStyle}>{item.name}</div>
								<div style={descriptionStyle}>{item.description}</div>
							</div>
							{/* Hover indicator */}
							{hoveredMenuItem === index && (
								<div
									style={{
										position: 'absolute',
										right: '-15px',
										top: '50%',
										transform: 'translateY(-50%)',
										width: '8px',
										height: '30px',
										background:
											'linear-gradient(180deg, #fbbf24 0%, var(--success-color-light) 100%)',
										borderRadius: '0 4px 4px 0',
										transition: 'all 0.2s ease',
										boxShadow: '2px 0 8px rgba(251, 191, 36, 0.4)',
									}}
								/>
							)}
						</Link>
					))}
				</div>

				{/* Footer */}
				<div style={footerStyle}>
					<p style={versionStyle}>v2.0.1 - Modern Edition</p>
				</div>

				{/* Toggle Button */}
				<button
					style={toggleButtonStyle}
					onClick={handleExplosiveToggle}
					onMouseEnter={(e) => {
						e.currentTarget.style.transform =
							'translateY(-50%) scale(1.2) rotate(5deg)';
						e.currentTarget.style.boxShadow = isVisible
							? '0 6px 20px rgba(102, 126, 234, 0.4)'
							: '0 6px 20px rgba(52, 211, 153, 0.4)';
						e.currentTarget.style.opacity = '1';
						e.currentTarget.style.background = isVisible
							? 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'
							: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.transform =
							'translateY(-50%) scale(1) rotate(0deg)';
						e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
						e.currentTarget.style.opacity = '0.9';
						e.currentTarget.style.background = isVisible
							? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
							: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)';
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: '1.1rem',
							transition: 'transform 0.3s ease',
							transform: isVisible ? 'rotate(0deg)' : 'rotate(180deg)',
						}}
					>
						{isVisible ? '◀' : '▶'}
					</div>
				</button>
			</nav>
		</>
	);
};
