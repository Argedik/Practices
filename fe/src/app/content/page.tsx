'use client';

import React from 'react';

export default function ContentPage() {
	const pageStyle: React.CSSProperties = {
		padding: '2rem',
		background: 'white',
		borderRadius: '16px',
		boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
		textAlign: 'center',
	};

	const titleStyle: React.CSSProperties = {
		fontSize: '2.5rem',
		fontWeight: '700',
		background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
		WebkitBackgroundClip: 'text',
		WebkitTextFillColor: 'transparent',
		marginBottom: '1rem',
	};

	const subtitleStyle: React.CSSProperties = {
		fontSize: '1.2rem',
		color: '#666',
		marginBottom: '2rem',
	};

	const featureStyle: React.CSSProperties = {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
		gap: '1.5rem',
		marginTop: '2rem',
	};

	const cardStyle: React.CSSProperties = {
		padding: '2rem',
		background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
		borderRadius: '12px',
		border: '1px solid rgba(0,0,0,0.05)',
		transition: 'transform 0.3s ease',
	};

	return (
		<div style={pageStyle}>
			<h1 style={titleStyle}>📝 İçerik Yönetimi</h1>
			<p style={subtitleStyle}>
				Detaylı içerik yönetim araçları ve gelişmiş düzenleme seçenekleri
			</p>

			<div style={featureStyle}>
				<div
					style={cardStyle}
					onMouseEnter={(e) => {
						e.currentTarget.style.transform = 'translateY(-5px)';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.transform = 'translateY(0)';
					}}
				>
					<h3 style={{ margin: '0 0 1rem 0', fontSize: '1.4rem' }}>
						🎨 Tema Editörü
					</h3>
					<p style={{ color: '#666', margin: 0 }}>
						Renk şemaları, tipografi ve görsel stilleri yönetin
					</p>
				</div>

				<div
					style={cardStyle}
					onMouseEnter={(e) => {
						e.currentTarget.style.transform = 'translateY(-5px)';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.transform = 'translateY(0)';
					}}
				>
					<h3 style={{ margin: '0 0 1rem 0', fontSize: '1.4rem' }}>
						📊 Veri Yönetimi
					</h3>
					<p style={{ color: '#666', margin: 0 }}>
						Toplu veri işlemleri ve içerik aktarımları
					</p>
				</div>

				<div
					style={cardStyle}
					onMouseEnter={(e) => {
						e.currentTarget.style.transform = 'translateY(-5px)';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.transform = 'translateY(0)';
					}}
				>
					<h3 style={{ margin: '0 0 1rem 0', fontSize: '1.4rem' }}>
						🔧 SEO Araçları
					</h3>
					<p style={{ color: '#666', margin: 0 }}>
						Meta etiketler, sitemap ve arama motoru optimizasyonu
					</p>
				</div>

				<div
					style={cardStyle}
					onMouseEnter={(e) => {
						e.currentTarget.style.transform = 'translateY(-5px)';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.transform = 'translateY(0)';
					}}
				>
					<h3 style={{ margin: '0 0 1rem 0', fontSize: '1.4rem' }}>
						🚀 Performans
					</h3>
					<p style={{ color: '#666', margin: 0 }}>
						Hız optimizasyonu ve performans analizi
					</p>
				</div>
			</div>

			<div
				style={{
					marginTop: '3rem',
					padding: '2rem',
					background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
					borderRadius: '12px',
					color: 'white',
				}}
			>
				<h3 style={{ margin: '0 0 1rem 0' }}>🎯 Yakında Geliyor</h3>
				<p style={{ margin: 0, opacity: 0.9 }}>
					Bu özellikler şu anda geliştirme aşamasında. İnline editing sistemi
					ile temel düzenlemelerinizi yapabilirsiniz.
				</p>
			</div>
		</div>
	);
}
