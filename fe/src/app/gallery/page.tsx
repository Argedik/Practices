'use client';

import React from 'react';
import styles from './GalleryPage.module.scss';

export default function GalleryPage() {
	return (
		<div className="gallery-page-wrapper">
			<div
				className={styles.galleryPage}
				data-component="GalleryPage"
				data-testid="gallery-page-container"
			>
				<h1 className={styles.pageTitle}>🖼️ Medya Galerisi</h1>

				<div className={styles.mediaGrid}>
					{Array.from({ length: 8 }, (_, i) => (
						<div
							key={i}
							className={styles.mediaPlaceholder}
							data-testid={`media-placeholder-${i}`}
							data-media-index={i}
							data-media-type="placeholder"
						>
							📷
						</div>
					))}
				</div>

				<div
					className={styles.comingSoonSection}
					data-testid="coming-soon-section"
				>
					<h3 className={styles.comingSoonTitle}>📸 Yakında</h3>
					<p className={styles.comingSoonText}>
						Medya yönetimi ve galeri özellikleri geliştirme aşamasında
					</p>
				</div>
			</div>
		</div>
	);
}
