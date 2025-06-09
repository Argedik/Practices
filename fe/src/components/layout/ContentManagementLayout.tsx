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
		<div
			className={styles.contentManagement}
			data-component="ContentManagementLayout"
			data-testid="content-management-layout"
		>
			<div
				className={styles.gridContainer}
				data-component="ContentGrid"
				data-testid="content-grid-container"
			>
				{/* Hero Content Management Section */}
				<div
					className={`${styles.section} ${styles.heroContentSection}`}
					data-component="HeroContentSection"
					data-testid="hero-content-section"
					data-content-type="hero"
				>
					<div className={styles.sectionHeader}>
						<h3>🎯 Hero Bölümü</h3>
					</div>
					<p>Hero section form alanları burada olacak</p>
					<small>Başlık, metin, resim, pozisyon, alan seçimi</small>
				</div>

				{/* Skills Content Management Section */}
				<div
					className={`${styles.section} ${styles.skillsContentSection}`}
					data-component="SkillsContentSection"
					data-testid="skills-content-section"
					data-content-type="skills"
				>
					<div className={styles.sectionHeader}>
						<h3>💪 Yetenekler</h3>
						<button className={styles.addButton} data-testid="add-skill-button">
							➕ Yetenek Ekle
						</button>
					</div>
					<p>Dinamik yetenek listesi burada olacak</p>
					<small>Yetenek adı + yetkinlik slider</small>
				</div>

				{/* Projects Content Management Section */}
				<div
					className={`${styles.section} ${styles.projectsContentSection}`}
					data-component="ProjectsContentSection"
					data-testid="projects-content-section"
					data-content-type="projects"
				>
					<div className={styles.sectionHeader}>
						<h3>🚀 Projeler</h3>
						<button
							className={styles.addButton}
							data-testid="add-project-button"
						>
							➕ Proje Ekle
						</button>
					</div>
					<p>Proje portföyü burada olacak</p>
					<small>Proje adı, tarih aralığı, açıklama, logo</small>
				</div>

				{/* Career Content Management Section */}
				<div
					className={`${styles.section} ${styles.careerContentSection}`}
					data-component="CareerContentSection"
					data-testid="career-content-section"
					data-content-type="career"
				>
					<div className={styles.sectionHeader}>
						<h3>💼 Kariyer</h3>
						<button
							className={styles.addButton}
							data-testid="add-career-button"
						>
							➕ Kariyer Ekle
						</button>
					</div>
					<p>Kariyer deneyimleri burada olacak</p>
					<small>Departman, tarih aralığı, açıklama, logo</small>
				</div>

				{/* Contact Content Management Section */}
				<div
					className={`${styles.section} ${styles.contactContentSection}`}
					data-component="ContactContentSection"
					data-testid="contact-content-section"
					data-content-type="contact"
				>
					<div className={styles.sectionHeader}>
						<h3>📞 İletişim & Sosyal Medya</h3>
						<button
							className={styles.addButton}
							data-testid="add-contact-button"
						>
							➕ Sosyal Medya Ekle
						</button>
					</div>
					<p>İletişim ve sosyal medya burada olacak</p>
					<small>10 sosyal medya + iletişim formu + toggle&apos;lar</small>
				</div>
			</div>
		</div>
	);
};
