'use client';

import React from 'react';

export default function GalleryPage() {
	const pageStyle: React.CSSProperties = {
		padding: '2rem',
		background: 'white',
		borderRadius: '16px',
		boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
	};

	const titleStyle: React.CSSProperties = {
		fontSize: '2.5rem',
		fontWeight: '700',
		background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
		WebkitBackgroundClip: 'text',
		WebkitTextFillColor: 'transparent',
		marginBottom: '2rem',
		textAlign: 'center',
	};

	const gridStyle: React.CSSProperties = {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
		gap: '1.5rem',
		marginTop: '2rem',
	};

	const placeholderStyle: React.CSSProperties = {
		aspectRatio: '1',
		background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
		borderRadius: '12px',
		border: '2px dashed #cbd5e0',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: '3rem',
		transition: 'all 0.3s ease',
		cursor: 'pointer',
	};

	return (
		<div style={pageStyle}>
			<h1 style={titleStyle}>🖼️ Medya Galerisi</h1>

			<div style={gridStyle}>
				{Array.from({ length: 8 }, (_, i) => (
					<div
						key={i}
						style={placeholderStyle}
						onMouseEnter={(e) => {
							e.currentTarget.style.transform = 'scale(1.05)';
							e.currentTarget.style.borderColor = '#667eea';
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.transform = 'scale(1)';
							e.currentTarget.style.borderColor = '#cbd5e0';
						}}
					>
						📷
					</div>
				))}
			</div>

			<div
				style={{
					marginTop: '3rem',
					textAlign: 'center',
					padding: '2rem',
					background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
					borderRadius: '12px',
					color: 'white',
				}}
			>
				<h3 style={{ margin: '0 0 1rem 0' }}>📸 Yakında</h3>
				<p style={{ margin: 0, opacity: 0.9 }}>
					Medya yönetimi ve galeri özellikleri geliştirme aşamasında
				</p>
			</div>
		</div>
	);
}
