'use client';

import Link from 'next/link';
import { useState } from 'react';
import { HeroSection } from '../sections/HeroSection';
import { SkillsSection } from '../sections/SkillsSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { CareerSection } from '../sections/CareerSection';
import { ContactSection } from '../sections/ContactSection';
import { ContentData } from '../../types/content';

import styles from './Homepage.module.scss';

/**
 * Homepage Component - Inline Editing Demo
 * - Kullanıcı direkt sayfa üzerinde düzenleyebilir
 * - Admin panel sadece derin ayarlar için
 */
export const Homepage = () => {
	// Demo içerik verisi
	const [contentData, setContentData] = useState<ContentData>({
		heroSection: {
			title: 'Merhaba, Ben John Doe',
			text: 'Full Stack Developer ve UI/UX tasarımcısıyım. Modern web teknolojileri ile kullanıcı dostu çözümler geliştiriyorum.',
			imageUrl:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
			position: 'left',
			areaNumber: 1,
		},
		skills: [
			{ id: '1', name: 'React', proficiency: 90 },
			{ id: '2', name: 'Node.js', proficiency: 85 },
			{ id: '3', name: 'TypeScript', proficiency: 88 },
		],
		career: [],
		projects: [
			{
				id: '1',
				name: 'E-Ticaret Platformu',
				startDate: '2024-01-01',
				endDate: '2024-06-01',
				description: 'Modern bir e-ticaret sitesi',
				logoUrl:
					'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
			},
		],
		socialMedia: [
			{ id: '1', platform: 'LinkedIn', url: 'https://linkedin.com' },
			{ id: '2', platform: 'GitHub', url: 'https://github.com' },
		],
		contact: {
			phone: { enabled: true, value: '+90 555 123 45 67' },
			email: { enabled: true, value: 'john.doe@example.com' },
			whatsapp: true,
			telegram: false,
			position: 'left',
		},
		contactForm: {
			enabled: true,
			recipientEmail: 'john.doe@example.com',
			nameRequired: true,
			phoneRequired: false,
			reasonOptions: ['İş için', 'Proje için', 'Genel'],
		},
	});

	const updateContentData = (newData: Partial<ContentData>) => {
		setContentData((prev) => ({ ...prev, ...newData }));
	};

	return (
		<div
			className={styles.homepage}
			style={{
				backgroundColor: '#0f172a',
				minHeight: '100vh',
				color: '#f1f5f9',
			}}
		>
			{/* Üst Bar - Admin Panel Linki */}
			<div
				style={{
					position: 'fixed',
					top: '20px',
					right: '20px',
					zIndex: 1000,
					display: 'flex',
					gap: '10px',
				}}
			>
				<Link
					href="/admin"
					style={{
						backgroundColor: '#1e293b',
						color: '#f1f5f9',
						padding: '10px 20px',
						borderRadius: '25px',
						textDecoration: 'none',
						fontSize: '14px',
						boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
						border: '1px solid #334155',
					}}
				>
					⚙️ Admin Panel
				</Link>
				<div
					style={{
						backgroundColor: '#f59e0b',
						color: '#0f172a',
						padding: '10px 20px',
						borderRadius: '25px',
						fontSize: '14px',
						boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
						fontWeight: '600',
					}}
				>
					✨ Inline Editing Aktif
				</div>
			</div>

			{/* Hoşgeldin Mesajı */}
			<div
				style={{
					backgroundColor: '#1e293b',
					padding: '1rem',
					margin: '2rem 0',
					borderRadius: '8px',
					border: '1px solid #f59e0b',
				}}
			>
				<h2 style={{ color: '#f59e0b', margin: '0 0 0.5rem 0' }}>
					🎉 Yeni Inline Editing Sistemi!
				</h2>
				<p style={{ margin: 0, color: '#cbd5e1' }}>
					Artık metin ve görsellere <strong>direkt tıklayarak</strong>{' '}
					düzenleyebilirsiniz. Mouse ile üzerine geldiğinizde düzenleme ve silme
					butonları görünecek.
				</p>
			</div>

			{/* Portfolio Bölümleri */}
			<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
				<HeroSection
					data={contentData.heroSection}
					onUpdate={(data) => updateContentData({ heroSection: data })}
				/>

				<SkillsSection
					data={contentData.skills}
					onUpdate={(data) => updateContentData({ skills: data })}
				/>

				<ProjectsSection
					data={contentData.projects}
					onUpdate={(data) => updateContentData({ projects: data })}
				/>

				<CareerSection
					data={contentData.career}
					onUpdate={(data) => updateContentData({ career: data })}
				/>

				<ContactSection
					socialMedia={contentData.socialMedia}
					contact={contentData.contact}
					contactForm={contentData.contactForm}
					onUpdateSocialMedia={(data) =>
						updateContentData({ socialMedia: data })
					}
					onUpdateContact={(data) => updateContentData({ contact: data })}
					onUpdateContactForm={(data) =>
						updateContentData({ contactForm: data })
					}
				/>
			</div>

			{/* Alt Bar - Bilgi */}
			<footer
				style={{
					marginTop: '4rem',
					padding: '2rem',
					backgroundColor: '#1e293b',
					borderRadius: '8px',
					textAlign: 'center',
					color: '#cbd5e1',
					border: '1px solid #334155',
				}}
			>
				<p>
					💡 <strong>İpucu:</strong> Derin ayarlar için Admin Panel&apos;i
					kullanın. Sayfa tipi (tek/çok sayfa), navigasyon stili ve layout
					seçenekleri orada.
				</p>
			</footer>
		</div>
	);
};
