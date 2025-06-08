'use client';

import React from 'react';

export default function AnalyticsPage() {
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

	const statsGridStyle: React.CSSProperties = {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
		gap: '1.5rem',
		marginBottom: '2rem',
	};

	const statCardStyle: React.CSSProperties = {
		padding: '2rem',
		background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
		borderRadius: '12px',
		textAlign: 'center',
		border: '1px solid rgba(0,0,0,0.05)',
		transition: 'transform 0.3s ease',
	};

	const chartPlaceholderStyle: React.CSSProperties = {
		height: '300px',
		background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
		borderRadius: '12px',
		border: '2px dashed #cbd5e0',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: '4rem',
		marginBottom: '2rem',
	};

	return (
		<div style={pageStyle}>
			<h1 style={titleStyle}>📊 Site Analitikleri</h1>

			{/* Stats Cards */}
			<div style={statsGridStyle}>
				<div
					style={statCardStyle}
					onMouseEnter={(e) => {
						e.currentTarget.style.transform = 'translateY(-5px)';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.transform = 'translateY(0)';
					}}
				>
					<div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
					<div
						style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}
					>
						1,248
					</div>
					<div style={{ color: '#666' }}>Toplam Ziyaretçi</div>
				</div>

				<div
					style={statCardStyle}
					onMouseEnter={(e) => {
						e.currentTarget.style.transform = 'translateY(-5px)';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.transform = 'translateY(0)';
					}}
				>
					<div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📄</div>
					<div
						style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}
					>
						3,456
					</div>
					<div style={{ color: '#666' }}>Sayfa Görüntüleme</div>
				</div>

				<div
					style={statCardStyle}
					onMouseEnter={(e) => {
						e.currentTarget.style.transform = 'translateY(-5px)';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.transform = 'translateY(0)';
					}}
				>
					<div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏱️</div>
					<div
						style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}
					>
						3:42
					</div>
					<div style={{ color: '#666' }}>Ortalama Süre</div>
				</div>

				<div
					style={statCardStyle}
					onMouseEnter={(e) => {
						e.currentTarget.style.transform = 'translateY(-5px)';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.transform = 'translateY(0)';
					}}
				>
					<div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📈</div>
					<div
						style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22c55e' }}
					>
						+24%
					</div>
					<div style={{ color: '#666' }}>Bu Ay Artış</div>
				</div>
			</div>

			{/* Chart Placeholder */}
			<div style={chartPlaceholderStyle}>📊</div>

			<div
				style={{
					padding: '2rem',
					background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
					borderRadius: '12px',
					color: 'white',
					textAlign: 'center',
				}}
			>
				<h3 style={{ margin: '0 0 1rem 0' }}>📈 Gelişmiş Analitik</h3>
				<p style={{ margin: 0, opacity: 0.9 }}>
					Detaylı analitik raporları ve gerçek zamanlı istatistikler yakında
				</p>
			</div>
		</div>
	);
}
