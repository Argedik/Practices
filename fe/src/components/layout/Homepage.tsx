'use client';

import { useState, useEffect } from 'react';
import { HeroSection } from '../sections/HeroSection';
import { SkillsSection } from '../sections/SkillsSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { CareerSection } from '../sections/CareerSection';
import { ContactSection } from '../sections/ContactSection';
import { ContentData } from '../../types/content';

import styles from './Homepage.module.scss';

/**
 * Homepage Component - Portfolio API Integration
 * - Backend'den verileri Portfolio API üzerinden çeker
 * - Tüm değişiklikler Portfolio API'ye kaydedilir
 * - ContentManagement ile aynı veri kaynağını kullanır
 */
export const Homepage = () => {
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

	const [isLoading, setIsLoading] = useState(false);

	// Backend'den verileri yükle - Portfolio API kullan
	const loadContentFromAPI = async () => {
		try {
			setIsLoading(true);

			// Portfolio API'den tüm verileri çek
			const response = await fetch('http://localhost:5000/api/portfolio');
			if (!response.ok) {
				throw new Error('Portfolio API çağrısı başarısız');
			}

			const portfolioData = await response.json();
			console.log('📦 Portfolio API verisi:', portfolioData);

			// Portfolio verisini ContentData formatına dönüştür
			const convertedData: Partial<ContentData> = {
				heroSection: {
					title: portfolioData.personal?.fullName || 'Merhaba, Ben John Doe',
					text:
						portfolioData.personal?.welcomeMessage || 'Full Stack Developer',
					imageUrl:
						portfolioData.personal?.profileImage ||
						'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
					position:
						(portfolioData.personal?.position as 'left' | 'right') || 'left',
					areaNumber: portfolioData.personal?.areaNumber || 1,
				},
				skills:
					portfolioData.about?.detailedSkills?.map(
						(skill: { name: string; proficiency: number }, index: number) => ({
							id: `skill-${index}`,
							name: skill.name,
							proficiency: skill.proficiency,
						})
					) ||
					portfolioData.about?.skills?.map(
						(skillName: string, index: number) => ({
							id: `skill-${index}`,
							name: skillName,
							proficiency: 75, // Fallback varsayılan değer
						})
					) ||
					[],
				career: portfolioData.experiences || [],
				projects:
					portfolioData.projects?.map(
						(project: {
							id: number;
							title: string;
							description: string;
							imageUrl: string;
							createdDate: string;
						}) => ({
							id: project.id.toString(),
							name: project.title,
							startDate: project.createdDate,
							endDate: project.createdDate,
							description: project.description,
							logoUrl: project.imageUrl || '',
						})
					) || [],
			};

			setContentData((prev) => ({ ...prev, ...convertedData }));
			console.log('✅ Homepage: Portfolio API veriler yüklendi');
		} catch (error) {
			console.warn(
				'⚠️ Backend bağlantısı başarısız, local veriler kullanılıyor:',
				error
			);
		} finally {
			setIsLoading(false);
		}
	};

	// Sayfa yüklendiğinde SADECE BİR KEZ backend'den verileri getir
	useEffect(() => {
		let isMounted = true; // Cleanup için flag

		const loadData = async () => {
			if (isMounted) {
				await loadContentFromAPI();
			}
		};

		loadData();

		// Cleanup function
		return () => {
			isMounted = false;
		};
	}, []); // Boş dependency array - sadece mount'ta çalışır

	// Veri güncelleme ve backend'e kaydetme - Portfolio API kullan
	const updateContentData = async (newData: Partial<ContentData>) => {
		// Önce local state'i güncelle (anında UI response)
		setContentData((prev) => ({ ...prev, ...newData }));

		// Sonra backend'e kaydet (arka planda)
		try {
			// Personal bilgiler güncelleme (Hero Section + Position)
			if (newData.heroSection) {
				const response = await fetch(
					'http://localhost:5000/api/portfolio/personal',
					{
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							fullName: newData.heroSection.title,
							title: 'Frontend Developer',
							profileImage: newData.heroSection.imageUrl,
							cvDownloadLink: '',
							welcomeMessage: newData.heroSection.text,
							position: newData.heroSection.position,
							areaNumber: newData.heroSection.areaNumber,
						}),
					}
				);

				if (response.ok) {
					console.log(
						"✅ Hero bilgileri backend'e kaydedildi (position dahil)!"
					);
				}
			}

			// Skills güncelleme (About Section + Proficiency)
			if (newData.skills) {
				const skillNames = newData.skills.map((skill) => skill.name);
				const detailedSkills = newData.skills.map((skill) => ({
					name: skill.name,
					proficiency: skill.proficiency,
				}));

				const response = await fetch(
					'http://localhost:5000/api/portfolio/about',
					{
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							description:
								contentData.heroSection.text || 'Yazılım geliştiricisi',
							skills: skillNames,
							detailedSkills: detailedSkills,
							yearsExperience: 5,
							projectsCompleted: 25,
						}),
					}
				);

				if (response.ok) {
					console.log("✅ Skills backend'e kaydedildi (proficiency dahil)!");
				}
			}

			// Diğer güncellmeler burada olacak (projeler, kariyer vs.)
			if (newData.projects) {
				console.log('📂 Projeler güncellendi (backend entegrasyonu yapılacak)');
			}

			if (newData.career) {
				console.log('💼 Kariyer güncellendi (backend entegrasyonu yapılacak)');
			}
		} catch (error) {
			console.warn('⚠️ Backend kaydetme hatası:', error);
		}
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
			{/* Loading Indicator */}
			{isLoading && (
				<div
					style={{
						position: 'fixed',
						top: '20px',
						right: '20px',
						background: 'var(--bg-glass)',
						padding: '0.5rem 1rem',
						borderRadius: 'var(--radius-lg)',
						border: '1px solid var(--border-primary)',
						zIndex: 1000,
						display: 'flex',
						alignItems: 'center',
						gap: '0.5rem',
					}}
				>
					<div
						className="spinner"
						style={{ width: '16px', height: '16px' }}
					></div>
					<span style={{ fontSize: '0.875rem' }}>
						Backend&apos;den yükleniyor...
					</span>
				</div>
			)}

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
			<div
				style={{
					position: 'fixed',
					bottom: '20px',
					left: '20px',
					background: 'var(--bg-glass)',
					padding: '0.5rem 1rem',
					borderRadius: 'var(--radius-lg)',
					border: '1px solid var(--border-primary)',
					fontSize: '0.75rem',
					color: 'var(--text-secondary)',
				}}
			>
				💡 Değişiklikler otomatik kaydedilir
			</div>
		</div>
	);
};
