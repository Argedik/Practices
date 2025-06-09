'use client';

import React, { useState } from 'react';
import { InlineEditor } from '../ui/InlineEditor';
import { CareerData } from '../../types/content';
import styles from './CareerSection.module.scss';

interface CareerSectionProps {
	data?: CareerData[];
	onUpdate?: (data: CareerData[]) => void;
}

export const CareerSection: React.FC<CareerSectionProps> = ({
	data = [],
	onUpdate = () => {},
}) => {
	// Örnek veriler - müşteriler bunları görerek nasıl doldurabileceklerini anlayacak
	const [careerData, setCareerData] = useState<CareerData[]>(
		data.length > 0
			? data
			: [
					{
						id: '1',
						company: 'TechCorp A.Ş.',
						position: 'Senior Frontend Developer',
						startDate: 'Ocak 2022',
						endDate: 'Devam Ediyor',
						description:
							'React, TypeScript ve Next.js kullanarak modern web uygulamaları geliştiriyorum. Takım liderliği ve kod review süreçlerinde aktif rol alıyorum.',
						logoUrl: 'https://via.placeholder.com/60x60/4F46E5/FFFFFF?text=TC',
						location: 'İstanbul',
						workType: 'Tam Zamanlı',
						lastUpdated: '2024-12-20T10:00:00Z',
					},
					{
						id: '2',
						company: 'DigitalWave Studio',
						position: 'Fullstack Developer',
						startDate: 'Haziran 2020',
						endDate: 'Aralık 2021',
						description:
							'E-ticaret platformları ve kurumsal web siteleri geliştirdim. Node.js, MongoDB ve React teknolojilerinde uzmanlaştım.',
						logoUrl: 'https://via.placeholder.com/60x60/10B981/FFFFFF?text=DW',
						location: 'Ankara',
						workType: 'Tam Zamanlı',
						lastUpdated: '2024-12-20T10:00:00Z',
					},
					{
						id: '3',
						company: 'Freelance',
						position: 'Web Developer',
						startDate: 'Mart 2019',
						endDate: 'Mayıs 2020',
						description:
							'Çeşitli küçük ve orta ölçekli işletmeler için web siteleri ve mobil uygulamalar geliştirdim.',
						logoUrl: 'https://via.placeholder.com/60x60/F59E0B/FFFFFF?text=FL',
						location: 'Uzaktan',
						workType: 'Freelance',
						lastUpdated: '2024-12-20T10:00:00Z',
					},
			  ]
	);

	const addCareerItem = () => {
		const newItem: CareerData = {
			id: Date.now().toString(),
			company: 'Yeni Şirket',
			position: 'Pozisyon Adı',
			startDate: 'Başlangıç Tarihi',
			endDate: 'Bitiş Tarihi',
			description: 'İş tanımınızı buraya yazın...',
			logoUrl: 'https://via.placeholder.com/60x60/6B7280/FFFFFF?text=YS',
			location: 'Şehir',
			workType: 'Tam Zamanlı',
			lastUpdated: new Date().toISOString(),
		};
		const updated = [...careerData, newItem];
		setCareerData(updated);
		onUpdate(updated);
	};

	const updateCareerItem = (
		id: string,
		field: keyof CareerData,
		value: string
	) => {
		const updated = careerData.map((item) =>
			item.id === id ? { ...item, [field]: value } : item
		);
		setCareerData(updated);
		onUpdate(updated);
	};

	const removeCareerItem = (id: string) => {
		const updated = careerData.filter((item) => item.id !== id);
		setCareerData(updated);
		onUpdate(updated);
	};

	// CSS Module stilleri kullanılıyor

	return (
		<div className={styles.section}>
			<div className={styles.header}>
				<h3 className={styles.title}>💼 Kariyer Geçmişi</h3>
				<button onClick={addCareerItem} className={styles.addButton}>
					➕ Deneyim Ekle
				</button>
			</div>

			{careerData.length === 0 ? (
				<div className={styles.emptyState}>
					<div className={styles.emptyIcon}>💼</div>
					<p className={styles.emptyText}>Henüz kariyer deneyimi eklenmedi</p>
					<button onClick={addCareerItem} className={styles.emptyButton}>
						İlk Deneyiminizi Ekleyin
					</button>
				</div>
			) : (
				<div className={styles.timeline}>
					<div className={styles.timelineLine}></div>
					{careerData.map((item) => (
						<div key={item.id} className={styles.careerItem}>
							<div className={styles.timelineDot}></div>

							{/* Şirket Header */}
							<div className={styles.companyHeader}>
								<img
									src={item.logoUrl}
									alt={`${item.company} Logo`}
									className={styles.logo}
									onError={(e) => {
										e.currentTarget.src =
											'https://via.placeholder.com/60x60/6B7280/FFFFFF?text=' +
											item.company.charAt(0);
									}}
								/>
								<div className={styles.companyInfo}>
									<InlineEditor
										initialValue={item.company}
										onSave={(value) =>
											updateCareerItem(item.id, 'company', value)
										}
										onDelete={() => removeCareerItem(item.id)}
										style={{
											fontSize: '1.3rem',
											fontWeight: '600',
											color: '#333',
											marginBottom: '0.25rem',
										}}
									>
										<h4
											style={{
												margin: 0,
												fontSize: '1.3rem',
												fontWeight: '600',
												color: '#333',
											}}
										>
											{item.company}
										</h4>
									</InlineEditor>

									<InlineEditor
										initialValue={item.position}
										onSave={(value) =>
											updateCareerItem(item.id, 'position', value)
										}
										style={{
											fontSize: '1.1rem',
											color: '#667eea',
											fontWeight: '500',
										}}
									>
										<div
											style={{
												fontSize: '1.1rem',
												color: '#667eea',
												fontWeight: '500',
											}}
										>
											{item.position}
										</div>
									</InlineEditor>
								</div>
							</div>

							{/* Meta Bilgiler */}
							<div className={styles.metaInfo}>
								<div className={styles.tag}>
									📅
									<InlineEditor
										initialValue={item.startDate}
										onSave={(value) =>
											updateCareerItem(item.id, 'startDate', value)
										}
										style={{ fontSize: '0.8rem' }}
									>
										<span>{item.startDate}</span>
									</InlineEditor>
									{' - '}
									<InlineEditor
										initialValue={item.endDate}
										onSave={(value) =>
											updateCareerItem(item.id, 'endDate', value)
										}
										style={{ fontSize: '0.8rem' }}
									>
										<span>{item.endDate}</span>
									</InlineEditor>
								</div>

								<div className={styles.tag}>
									📍
									<InlineEditor
										initialValue={item.location}
										onSave={(value) =>
											updateCareerItem(item.id, 'location', value)
										}
										style={{ fontSize: '0.8rem' }}
									>
										<span>{item.location}</span>
									</InlineEditor>
								</div>

								<div className={styles.tag}>
									⚡
									<InlineEditor
										initialValue={item.workType}
										onSave={(value) =>
											updateCareerItem(item.id, 'workType', value)
										}
										style={{ fontSize: '0.8rem' }}
									>
										<span>{item.workType}</span>
									</InlineEditor>
								</div>
							</div>

							{/* Açıklama */}
							<InlineEditor
								initialValue={item.description}
								onSave={(value) =>
									updateCareerItem(item.id, 'description', value)
								}
								style={{
									fontSize: '1rem',
									color: '#555',
									lineHeight: '1.6',
								}}
							>
								<p
									style={{
										margin: 0,
										fontSize: '1rem',
										color: '#555',
										lineHeight: '1.6',
									}}
								>
									{item.description}
								</p>
							</InlineEditor>
						</div>
					))}
				</div>
			)}

			{/* Bilgilendirme */}
			<div className={styles.infoBox}>
				<div className={styles.infoText}>
					💡 <strong>İpucu:</strong> Tüm alanları tıklayarak
					düzenleyebilirsiniz. Logo URL&apos;sini değiştirmek için tarayıcı
					geliştirici araçlarını kullanabilirsiniz.
				</div>
			</div>
		</div>
	);
};
