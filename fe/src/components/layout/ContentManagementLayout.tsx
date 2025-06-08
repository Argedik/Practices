'use client';

import React from 'react';
import { ContentData } from '../../types/content';
import styles from './ContentManagement.module.scss';

interface ContentManagementLayoutProps {
	contentData: ContentData;
	onUpdateContent: (newData: Partial<ContentData>) => void;
}

/**
 * Layout Component - SOLID Prensipleri:
 * - Single Responsibility: Sadece 5 grid layout ve UI rendering
 * - Open/Closed: Props ile genişletilebilir
 * - Dependency Inversion: Container'dan data alır
 */
export const ContentManagementLayout: React.FC<
	ContentManagementLayoutProps
> = () => {
	return (
		<div className={styles.contentManagement}>
			<div className={styles.gridContainer}>
				{/* Bölüm 1: Hero Section */}
				<div className={`${styles.section} ${styles.section1}`}>
					<div className={styles.sectionHeader}>
						<h3>🎯 Hero Bölümü</h3>
					</div>
					<p>Hero section form alanları burada olacak</p>
					<small>Başlık, metin, resim, pozisyon, alan seçimi</small>
				</div>

				{/* Bölüm 2: Skills */}
				<div className={`${styles.section} ${styles.section2}`}>
					<div className={styles.sectionHeader}>
						<h3>💪 Yetenekler</h3>
						<button className={styles.addButton}>➕ Yetenek Ekle</button>
					</div>
					<p>Dinamik yetenek listesi burada olacak</p>
					<small>Yetenek adı + yetkinlik slider</small>
				</div>

				{/* Bölüm 3: Career */}
				<div className={`${styles.section} ${styles.section3}`}>
					<div className={styles.sectionHeader}>
						<h3>💼 Kariyer</h3>
						<button className={styles.addButton}>➕ Kariyer Ekle</button>
					</div>
					<p>Kariyer deneyimleri burada olacak</p>
					<small>Departman, tarih aralığı, açıklama, logo</small>
				</div>

				{/* Bölüm 4: Projects */}
				<div className={`${styles.section} ${styles.section4}`}>
					<div className={styles.sectionHeader}>
						<h3>🚀 Projeler</h3>
						<button className={styles.addButton}>➕ Proje Ekle</button>
					</div>
					<p>Proje portföyü burada olacak</p>
					<small>Proje adı, tarih aralığı, açıklama, logo</small>
				</div>

				{/* Bölüm 5: Contact & Social Media */}
				<div className={`${styles.section} ${styles.section5}`}>
					<div className={styles.sectionHeader}>
						<h3>📞 İletişim & Sosyal Medya</h3>
						<button className={styles.addButton}>➕ Sosyal Medya Ekle</button>
					</div>
					<p>İletişim ve sosyal medya burada olacak</p>
					<small>10 sosyal medya + iletişim formu + toggle&apos;lar</small>
				</div>
			</div>
		</div>
	);
};
