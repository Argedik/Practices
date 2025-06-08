'use client';

import React, { useState } from 'react';
import { InlineEditor } from '../ui/InlineEditor';
import { CareerData } from '../../types/content';

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

	const sectionStyle: React.CSSProperties = {
		padding: '2rem',
		backgroundColor: '#2d3748',
		borderRadius: '12px',
		margin: '1rem 0',
		boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
		border: '1px solid #4a5568',
	};

	const timelineStyle: React.CSSProperties = {
		position: 'relative',
		paddingLeft: '2rem',
	};

	const timelineLineStyle: React.CSSProperties = {
		position: 'absolute',
		left: '1rem',
		top: '0',
		bottom: '0',
		width: '2px',
		background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
		borderRadius: '1px',
	};

	const careerItemStyle: React.CSSProperties = {
		position: 'relative',
		marginBottom: '2rem',
		padding: '1.5rem',
		backgroundColor: '#1a202c',
		borderRadius: '12px',
		border: '1px solid #4a5568',
		marginLeft: '1rem',
	};

	const timelineDotStyle: React.CSSProperties = {
		position: 'absolute',
		left: '-1.5rem',
		top: '1.5rem',
		width: '12px',
		height: '12px',
		backgroundColor: '#667eea',
		borderRadius: '50%',
		border: '3px solid white',
		boxShadow: '0 0 0 2px #667eea',
	};

	const companyHeaderStyle: React.CSSProperties = {
		display: 'flex',
		alignItems: 'center',
		gap: '1rem',
		marginBottom: '1rem',
	};

	const logoStyle: React.CSSProperties = {
		width: '60px',
		height: '60px',
		borderRadius: '8px',
		objectFit: 'cover',
		border: '2px solid #e9ecef',
	};

	const companyInfoStyle: React.CSSProperties = {
		flex: 1,
	};

	const metaInfoStyle: React.CSSProperties = {
		display: 'flex',
		gap: '1rem',
		flexWrap: 'wrap',
		marginBottom: '1rem',
		fontSize: '0.9rem',
		color: '#666',
	};

	const tagStyle: React.CSSProperties = {
		display: 'inline-flex',
		alignItems: 'center',
		gap: '0.25rem',
		padding: '0.25rem 0.75rem',
		backgroundColor: '#e9ecef',
		borderRadius: '15px',
		fontSize: '0.8rem',
		fontWeight: '500',
	};

	return (
		<div style={sectionStyle}>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: '2rem',
				}}
			>
				<h3 style={{ margin: 0, color: '#e2e8f0', fontSize: '1.8rem' }}>
					💼 Kariyer Geçmişi
				</h3>
				<button
					onClick={addCareerItem}
					style={{
						backgroundColor: '#28a745',
						color: 'white',
						border: 'none',
						borderRadius: '20px',
						padding: '8px 16px',
						cursor: 'pointer',
						fontSize: '14px',
						display: 'flex',
						alignItems: 'center',
						gap: '0.5rem',
					}}
				>
					➕ Deneyim Ekle
				</button>
			</div>

			{careerData.length === 0 ? (
				<div
					style={{
						textAlign: 'center',
						padding: '3rem',
						color: '#666',
						border: '2px dashed #ddd',
						borderRadius: '12px',
					}}
				>
					<div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💼</div>
					<p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
						Henüz kariyer deneyimi eklenmedi
					</p>
					<button
						onClick={addCareerItem}
						style={{
							backgroundColor: '#007bff',
							color: 'white',
							border: 'none',
							borderRadius: '20px',
							padding: '12px 24px',
							cursor: 'pointer',
							fontSize: '16px',
						}}
					>
						İlk Deneyiminizi Ekleyin
					</button>
				</div>
			) : (
				<div style={timelineStyle}>
					<div style={timelineLineStyle}></div>
					{careerData.map((item) => (
						<div key={item.id} style={careerItemStyle}>
							<div style={timelineDotStyle}></div>

							{/* Şirket Header */}
							<div style={companyHeaderStyle}>
								<img
									src={item.logoUrl}
									alt={`${item.company} Logo`}
									style={logoStyle}
									onError={(e) => {
										e.currentTarget.src =
											'https://via.placeholder.com/60x60/6B7280/FFFFFF?text=' +
											item.company.charAt(0);
									}}
								/>
								<div style={companyInfoStyle}>
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
							<div style={metaInfoStyle}>
								<div style={tagStyle}>
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

								<div style={tagStyle}>
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

								<div style={tagStyle}>
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
			<div
				style={{
					marginTop: '2rem',
					padding: '1rem',
					backgroundColor: '#e3f2fd',
					borderRadius: '8px',
					border: '1px solid #90caf9',
				}}
			>
				<div style={{ fontSize: '0.9rem', color: '#1976d2' }}>
					💡 <strong>İpucu:</strong> Tüm alanları tıklayarak
					düzenleyebilirsiniz. Logo URL&apos;sini değiştirmek için tarayıcı
					geliştirici araçlarını kullanabilirsiniz.
				</div>
			</div>
		</div>
	);
};
