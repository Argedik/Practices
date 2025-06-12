'use client';

import React, { useState, useEffect } from 'react';
import { ContentData, CareerData } from '../../types/content';
import { ContentManagementLayout } from './ContentManagementLayout';

const API_BASE_URL = 'http://localhost:5000/api/portfolio';

// Backend'den gelen veri tipleri (gerçek format)
interface BackendPersonalData {
	fullName: string;
	title: string;
	profileImage: string;
	cvDownloadLink: string;
	welcomeMessage: string;
	position: string;
	areaNumber: number;
}

interface BackendSkill {
	name: string;
	proficiency: number;
}

interface BackendAboutData {
	description: string;
	skills: string[];
	detailedSkills: BackendSkill[];
	yearsExperience: number;
	projectsCompleted: number;
}

interface BackendProjectData {
	id: number;
	title: string;
	description: string;
	imageUrl: string;
	projectUrl: string;
	githubUrl: string;
	technologies: string[];
	createdDate: string;
	isActive: boolean;
}

interface BackendContactData {
	email: string;
	phone: string;
	location: string;
	social: {
		linkedIn: string;
		gitHub: string;
		twitter: string;
		instagram: string;
		website: string;
	};
}

interface BackendThemeData {
	primaryColor: string;
	secondaryColor: string;
	backgroundColor: string;
	textColor: string;
	fontFamily: string;
	darkMode: boolean;
}

interface BackendPortfolioData {
	personal: BackendPersonalData;
	about: BackendAboutData;
	projects: BackendProjectData[];
	experiences: CareerData[];
	contact: BackendContactData;
	theme: BackendThemeData;
}

// Backend'den gelen veriyi frontend formatına dönüştür
const adaptBackendData = (backendData: BackendPortfolioData): ContentData => {
	return {
		heroSection: {
			title: backendData.personal?.fullName || '',
			text: backendData.personal?.welcomeMessage || '',
			imageUrl: backendData.personal?.profileImage || '',
			position: (backendData.personal?.position as 'left' | 'right') || 'left',
			areaNumber: backendData.personal?.areaNumber || 1,
		},
		skills:
			backendData.about?.detailedSkills?.map(
				(skill: BackendSkill, index: number) => ({
					id: `skill-${index}`,
					name: skill.name,
					proficiency: skill.proficiency,
				})
			) ||
			backendData.about?.skills?.map((skillName: string, index: number) => ({
				id: `skill-${index}`,
				name: skillName,
				proficiency: 75, // Fallback varsayılan değer
			})) ||
			[],
		career: backendData.experiences || [],
		projects:
			backendData.projects?.map((project: BackendProjectData) => ({
				id: project.id.toString(),
				name: project.title,
				startDate: project.createdDate,
				endDate: project.createdDate, // Tek tarih var
				description: project.description,
				logoUrl: project.imageUrl || '',
			})) || [],
		socialMedia: [
			{
				id: 'linkedin',
				platform: 'LinkedIn',
				url: backendData.contact?.social?.linkedIn || '',
			},
			{
				id: 'github',
				platform: 'GitHub',
				url: backendData.contact?.social?.gitHub || '',
			},
		],
		contact: {
			phone: {
				enabled: !!backendData.contact?.phone,
				value: backendData.contact?.phone || '',
			},
			email: {
				enabled: !!backendData.contact?.email,
				value: backendData.contact?.email || '',
			},
			whatsapp: false,
			telegram: false,
			position: 'left' as const,
		},
		contactForm: {
			enabled: false,
			recipientEmail: backendData.contact?.email || '',
			nameRequired: true,
			phoneRequired: false,
			reasonOptions: [],
		},
	};
};

export const ContentManagement: React.FC = () => {
	const [contentData, setContentData] = useState<ContentData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// İçerik verilerini yükle
	useEffect(() => {
		const fetchContentData = async () => {
			try {
				const response = await fetch(`${API_BASE_URL}`);
				if (!response.ok) {
					throw new Error('İçerik verileri yüklenemedi');
				}
				const backendData = await response.json();
				const adaptedData = adaptBackendData(backendData);
				setContentData(adaptedData);
				console.log('✅ Backend verisi başarıyla yüklendi:', adaptedData);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
				console.error('❌ İçerik verileri yüklenirken hata:', err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchContentData();
	}, []);

	// İçeriği güncelle
	const handleUpdateContent = async (updates: Partial<ContentData>) => {
		if (!contentData) return;

		try {
			// Hero güncelleme - Personal bilgiler olarak kaydet (position ve areaNumber dahil)
			if (updates.heroSection) {
				const response = await fetch(`${API_BASE_URL}/personal`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						fullName: updates.heroSection.title,
						title: 'Frontend Developer', // Varsayılan
						profileImage: updates.heroSection.imageUrl,
						cvDownloadLink: '',
						welcomeMessage: updates.heroSection.text,
						position: updates.heroSection.position,
						areaNumber: updates.heroSection.areaNumber,
					}),
				});

				if (!response.ok) {
					throw new Error('Personal bilgiler güncelleme başarısız');
				}
				console.log(
					'🎯 Personal bilgiler güncellendi (position + areaNumber dahil)'
				);
			}

			// Skills güncelleme - About bilgiler olarak kaydet (detailedSkills dahil)
			if (updates.skills) {
				const skillNames = updates.skills.map((skill) => skill.name);
				const detailedSkills = updates.skills.map((skill) => ({
					name: skill.name,
					proficiency: skill.proficiency,
				}));

				const response = await fetch(`${API_BASE_URL}/about`, {
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
				});

				if (!response.ok) {
					throw new Error('Skills güncelleme başarısız');
				}
				console.log('💪 Skills güncellendi (proficiency dahil)');
			}

			// Projeler güncelleme
			if (updates.projects) {
				// Şimdilik console'a log, gerçek implementasyon sonra
				console.log('📂 Proje güncellemeleri:', updates.projects);
			}

			// Local state'i güncelle
			const updatedData = { ...contentData, ...updates };
			setContentData(updatedData);

			console.log('✅ Veriler backend&apos;e kaydedildi!');
		} catch (error) {
			console.error('❌ İçerik güncellenirken hata:', error);
			// Hata durumunda verileri yeniden yükle
			const response = await fetch(`${API_BASE_URL}`);
			const originalData = await response.json();
			const adaptedData = adaptBackendData(originalData);
			setContentData(adaptedData);
			throw error;
		}
	};

	if (isLoading) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '200px',
				}}
			>
				<div>⏳ C# Backend&apos;den veriler yükleniyor...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					height: '200px',
					color: 'red',
					textAlign: 'center',
				}}
			>
				<div>❌ Backend Bağlantı Hatası: {error}</div>
				<div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
					Backend&apos;in http://localhost:5000 adresinde çalıştığından emin
					olun
				</div>
				<div style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: '#999' }}>
					CORS hatası varsa backend&apos;de CORS ayarlarını kontrol edin
				</div>
			</div>
		);
	}

	if (!contentData) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '200px',
				}}
			>
				<div>📝 İçerik verisi bulunamadı</div>
			</div>
		);
	}

	return (
		<ContentManagementLayout
			contentData={contentData}
			onUpdateContent={handleUpdateContent}
		/>
	);
};
