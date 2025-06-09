'use client';

import React from 'react';
import styles from './AnalyticsPage.module.scss';

export default function AnalyticsPage() {
	return (
		<div
			className={styles.analyticsPage}
			data-component="AnalyticsPage"
			data-testid="analytics-page-container"
		>
			<h1 className={styles.pageTitle}>📊 Site Analitikleri</h1>

			{/* Stats Cards Grid */}
			<div className={styles.statsGrid}>
				<div
					className={styles.statCard}
					data-testid="stat-card-visitors"
					data-stat-type="Visitors"
				>
					<div className={styles.statIcon}>👥</div>
					<div className={styles.statValue}>1,248</div>
					<div className={styles.statLabel}>Toplam Ziyaretçi</div>
				</div>

				<div
					className={styles.statCard}
					data-testid="stat-card-pageviews"
					data-stat-type="PageViews"
				>
					<div className={styles.statIcon}>📄</div>
					<div className={styles.statValue}>3,456</div>
					<div className={styles.statLabel}>Sayfa Görüntüleme</div>
				</div>

				<div
					className={styles.statCard}
					data-testid="stat-card-avgtime"
					data-stat-type="AvgTime"
				>
					<div className={styles.statIcon}>⏱️</div>
					<div className={styles.statValue}>3:42</div>
					<div className={styles.statLabel}>Ortalama Süre</div>
				</div>

				<div
					className={styles.statCard}
					data-testid="stat-card-growth"
					data-stat-type="Growth"
				>
					<div className={styles.statIcon}>📈</div>
					<div className={`${styles.statValue} ${styles.positive}`}>+24%</div>
					<div className={styles.statLabel}>Bu Ay Artış</div>
				</div>
			</div>

			{/* Chart Placeholder */}
			<div className={styles.chartPlaceholder} data-testid="chart-placeholder">
				📊
			</div>

			<div
				className={styles.comingSoonSection}
				data-testid="coming-soon-section"
			>
				<h3 className={styles.comingSoonTitle}>📈 Gelişmiş Analitik</h3>
				<p className={styles.comingSoonText}>
					Detaylı analitik raporları ve gerçek zamanlı istatistikler yakında
				</p>
			</div>
		</div>
	);
}
