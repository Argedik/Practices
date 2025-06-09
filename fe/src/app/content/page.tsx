'use client';

import React from 'react';
import styles from './ContentPage.module.scss';

export default function ContentPage() {
	return (
		<div
			className={styles.contentPage}
			data-component="ContentPage"
			data-testid="content-page-container"
		>
			<h1 className={styles.pageTitle}>📝 İçerik Yönetimi</h1>
			<p className={styles.pageSubtitle}>
				Detaylı içerik yönetim araçları ve gelişmiş düzenleme seçenekleri
			</p>

			<div className={styles.featuresGrid}>
				<div
					className={styles.featureCard}
					data-testid="feature-card-theme"
					data-feature-type="ThemeEditor"
				>
					<h3 className={styles.cardTitle}>🎨 Tema Editörü</h3>
					<p className={styles.cardDescription}>
						Renk şemaları, tipografi ve görsel stilleri yönetin
					</p>
				</div>

				<div
					className={styles.featureCard}
					data-testid="feature-card-data"
					data-feature-type="DataManagement"
				>
					<h3 className={styles.cardTitle}>📊 Veri Yönetimi</h3>
					<p className={styles.cardDescription}>
						Toplu veri işlemleri ve içerik aktarımları
					</p>
				</div>

				<div
					className={styles.featureCard}
					data-testid="feature-card-seo"
					data-feature-type="SEOTools"
				>
					<h3 className={styles.cardTitle}>🔧 SEO Araçları</h3>
					<p className={styles.cardDescription}>
						Meta etiketler, sitemap ve arama motoru optimizasyonu
					</p>
				</div>

				<div
					className={styles.featureCard}
					data-testid="feature-card-performance"
					data-feature-type="Performance"
				>
					<h3 className={styles.cardTitle}>🚀 Performans</h3>
					<p className={styles.cardDescription}>
						Hız optimizasyonu ve performans analizi
					</p>
				</div>
			</div>

			<div
				className={styles.comingSoonSection}
				data-testid="coming-soon-section"
			>
				<h3 className={styles.comingSoonTitle}>🎯 Yakında Geliyor</h3>
				<p className={styles.comingSoonText}>
					Bu özellikler şu anda geliştirme aşamasında. İnline editing sistemi
					ile temel düzenlemelerinizi yapabilirsiniz.
				</p>
			</div>
		</div>
	);
}
