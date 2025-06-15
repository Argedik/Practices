'use client';

import React, { useState, useEffect } from 'react';
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
	const [isLoading, setIsLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [cities, setCities] = useState<string[]>([]);

	// Şehirleri backend'den çek
	useEffect(() => {
		const loadCities = async () => {
			try {
				const response = await fetch('http://localhost:5000/api/portfolio/cities');
				if (response.ok) {
					const citiesData = await response.json();
					setCities(citiesData);
				}
			} catch (error) {
				console.error('❌ Şehirler çekilemedi:', error);
			}
		};

		loadCities();
	}, []);

	// Kariyer deneyimi ekle - Backend'e kaydet
	const addCareerItem = async () => {
		console.log('➕ Kariyer Deneyimi Ekleme Başlatıldı');
		setIsLoading(true);

		try {
			const newExperience = {
			company: 'Yeni Şirket',
			position: 'Pozisyon Adı',
				startDate: new Date().toISOString().split('T')[0],
				endDate: new Date().toISOString().split('T')[0],
			description: 'İş tanımınızı buraya yazın...',
				location: 'İstanbul',
			workType: 'Tam Zamanlı',
				logoUrl: 'https://picsum.photos/60/60?random=N',
				isActive: true,
			};

			console.log('🌐 Backend API\'ye POST isteği gönderiliyor...');
			console.log('📤 Gönderilen Veri:', newExperience);

			const response = await fetch('http://localhost:5000/api/portfolio/experiences', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newExperience),
			});

			console.log('📥 API Yanıtı:', { 
				status: response.status, 
				ok: response.ok,
				statusText: response.statusText,
				url: response.url
			});

			if (!response.ok) {
				const errorText = await response.text();
				console.error('❌ API Error Response:', errorText);
				throw new Error(`Kariyer deneyimi eklenemedi: ${response.status} ${response.statusText} - ${errorText}`);
			}

			const addedExperience = await response.json();
			console.log('✅ API Başarılı Yanıt:', addedExperience);

			// Güncel deneyimleri çek
			await refreshExperiences();
			setSuccessMessage('➕ Kariyer deneyimi başarıyla eklendi!');

		} catch (error) {
			console.error('❌ Kariyer Deneyimi Ekleme Hatası:', error);
			setSuccessMessage(`❌ Kariyer deneyimi eklenemedi: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
		} finally {
			setIsLoading(false);
		}
	};

	// Kariyer deneyimi güncelle - Backend'e kaydet
	const updateCareerItem = async (id: string, field: keyof CareerData, value: string) => {
		console.log('✏️ Kariyer Deneyimi Güncelleme:', { id, field, value });
		setIsLoading(true);

		try {
			// Önce mevcut deneyimi bul
			const currentExperience = data.find(e => e.id === id);
			if (!currentExperience) {
				throw new Error('Kariyer deneyimi bulunamadı');
			}

			// Güncellenmiş deneyim objesi
			const updatedExperience = {
				...currentExperience,
				[field]: value,
			};

			// Backend formatını frontend formatına çevir
			const backendExperience = {
				company: updatedExperience.company,
				position: updatedExperience.position,
				startDate: updatedExperience.startDate,
				endDate: updatedExperience.endDate,
				description: updatedExperience.description,
				location: updatedExperience.location,
				workType: updatedExperience.workType,
				logoUrl: updatedExperience.logoUrl,
				isActive: true,
			};

			console.log('🌐 Backend API\'ye PUT isteği gönderiliyor...');
			console.log('📤 Gönderilen Veri:', backendExperience);

			const response = await fetch(`http://localhost:5000/api/portfolio/experiences/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(backendExperience),
			});

			console.log('📥 API Yanıtı:', { status: response.status, ok: response.ok });

			if (!response.ok) {
				throw new Error('Kariyer deneyimi güncellenemedi');
			}

			console.log('✅ API Başarılı Yanıt');

			// Güncel deneyimleri çek
			await refreshExperiences();
			setSuccessMessage('💾 Kariyer deneyimi başarıyla güncellendi!');

		} catch (error) {
			console.error('❌ Kariyer Deneyimi Güncelleme Hatası:', error);
			setSuccessMessage('❌ Kariyer deneyimi güncellenemedi!');
		} finally {
			setIsLoading(false);
		}
	};

	// Kariyer deneyimi sil - Backend'den sil
	const removeCareerItem = async (id: string) => {
		console.log('🗑️ Kariyer Deneyimi Silme:', { id });
		setIsLoading(true);

		try {
			console.log('🌐 Backend API\'ye DELETE isteği gönderiliyor...');

			const response = await fetch(`http://localhost:5000/api/portfolio/experiences/${id}`, {
				method: 'DELETE',
			});

			console.log('📥 API Yanıtı:', { status: response.status, ok: response.ok });

			if (!response.ok) {
				throw new Error('Kariyer deneyimi silinemedi');
			}

			console.log('✅ API Başarılı Yanıt');

			// Güncel deneyimleri çek
			await refreshExperiences();
			setSuccessMessage('🗑️ Kariyer deneyimi başarıyla silindi!');

		} catch (error) {
			console.error('❌ Kariyer Deneyimi Silme Hatası:', error);
			setSuccessMessage('❌ Kariyer deneyimi silinemedi!');
		} finally {
			setIsLoading(false);
		}
	};

	// Güncel deneyimleri backend'den çek
	const refreshExperiences = async () => {
		try {
			console.log('🔄 Güncel kariyer deneyimleri çekiliyor...');
			const response = await fetch('http://localhost:5000/api/portfolio/experiences');
			
			if (!response.ok) {
				throw new Error('Kariyer deneyimleri çekilemedi');
			}

			const backendExperiences = await response.json();
			console.log('📦 Backend Deneyimler:', backendExperiences);

			// Backend formatını frontend formatına çevir
			const frontendExperiences = backendExperiences.map((experience: any) => ({
				id: experience.id.toString(),
				company: experience.company,
				position: experience.position,
				startDate: experience.startDate || new Date().toISOString().split('T')[0],
				endDate: experience.endDate || new Date().toISOString().split('T')[0],
				description: experience.description,
				logoUrl: experience.logoUrl || `https://picsum.photos/60/60?random=${experience.company?.charAt(0) || 'X'}`,
				location: experience.location,
				workType: experience.workType,
				lastUpdated: experience.lastUpdated || new Date().toISOString(),
			}));

			console.log('🔄 Frontend Deneyimler:', frontendExperiences);
			onUpdate(frontendExperiences);

		} catch (error) {
			console.error('❌ Kariyer Deneyimleri Çekme Hatası:', error);
		}
	};

	// Success mesajını otomatik temizle
	useEffect(() => {
		if (successMessage) {
			const timer = setTimeout(() => {
				setSuccessMessage('');
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [successMessage]);

	// Tarih seçici component
	const DatePicker = ({ value, onChange, label }: { value: string, onChange: (value: string) => void, label: string }) => {
		const [isEditing, setIsEditing] = useState(false);
		const [tempValue, setTempValue] = useState(value);

		const handleSave = () => {
			onChange(tempValue);
			setIsEditing(false);
		};

		const handleCancel = () => {
			setTempValue(value);
			setIsEditing(false);
		};

		if (isEditing) {
			return (
				<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
					<input
						type="date"
						value={tempValue}
						onChange={(e) => setTempValue(e.target.value)}
						style={{
							padding: '0.25rem 0.5rem',
							border: '1px solid #4a5568',
							borderRadius: '4px',
							backgroundColor: '#2d3748',
							color: '#e2e8f0',
							fontSize: '0.8rem',
						}}
					/>
					<button
						onClick={handleSave}
						style={{
							backgroundColor: '#28a745',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							padding: '0.25rem 0.5rem',
							cursor: 'pointer',
							fontSize: '0.7rem',
						}}
					>
						💾
					</button>
					<button
						onClick={handleCancel}
						style={{
							backgroundColor: '#dc3545',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							padding: '0.25rem 0.5rem',
							cursor: 'pointer',
							fontSize: '0.7rem',
						}}
					>
						❌
					</button>
				</div>
			);
		}

		return (
			<span
				onClick={() => setIsEditing(true)}
				style={{
					cursor: 'pointer',
					padding: '0.25rem 0.5rem',
					borderRadius: '4px',
					backgroundColor: '#374151',
					color: '#e2e8f0',
					fontSize: '0.8rem',
				}}
				title="Tarihi değiştirmek için tıklayın"
			>
				{value}
			</span>
		);
	};

	// Şehir seçici component
	const CityPicker = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => {
		const [isEditing, setIsEditing] = useState(false);
		const [tempValue, setTempValue] = useState(value);

		const handleSave = () => {
			onChange(tempValue);
			setIsEditing(false);
		};

		const handleCancel = () => {
			setTempValue(value);
			setIsEditing(false);
		};

		if (isEditing) {
			return (
				<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
					<select
						value={tempValue}
						onChange={(e) => setTempValue(e.target.value)}
						style={{
							padding: '0.25rem 0.5rem',
							border: '1px solid #4a5568',
							borderRadius: '4px',
							backgroundColor: '#2d3748',
							color: '#e2e8f0',
							fontSize: '0.8rem',
							minWidth: '120px',
						}}
					>
						{cities.map((city) => (
							<option key={city} value={city}>
								{city}
							</option>
						))}
					</select>
					<button
						onClick={handleSave}
						style={{
							backgroundColor: '#28a745',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							padding: '0.25rem 0.5rem',
							cursor: 'pointer',
							fontSize: '0.7rem',
						}}
					>
						💾
					</button>
					<button
						onClick={handleCancel}
						style={{
							backgroundColor: '#dc3545',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							padding: '0.25rem 0.5rem',
							cursor: 'pointer',
							fontSize: '0.7rem',
						}}
					>
						❌
					</button>
				</div>
			);
		}

		return (
			<span
				onClick={() => setIsEditing(true)}
				style={{
					cursor: 'pointer',
					padding: '0.25rem 0.5rem',
					borderRadius: '4px',
					backgroundColor: '#374151',
					color: '#e2e8f0',
					fontSize: '0.8rem',
				}}
				title="Şehri değiştirmek için tıklayın"
			>
				{value}
			</span>
		);
	};

	// İş tipi seçici component
	const WorkTypePicker = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => {
		const [isEditing, setIsEditing] = useState(false);
		const [tempValue, setTempValue] = useState(value);

		const workTypes = ['Tam Zamanlı', 'Yarı Zamanlı', 'Stajer', 'Freelance', 'Sözleşmeli'];

		const handleSave = () => {
			onChange(tempValue);
			setIsEditing(false);
		};

		const handleCancel = () => {
			setTempValue(value);
			setIsEditing(false);
		};

		if (isEditing) {
			return (
				<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
					<select
						value={tempValue}
						onChange={(e) => setTempValue(e.target.value)}
						style={{
							padding: '0.25rem 0.5rem',
							border: '1px solid #4a5568',
							borderRadius: '4px',
							backgroundColor: '#2d3748',
							color: '#e2e8f0',
							fontSize: '0.8rem',
							minWidth: '120px',
						}}
					>
						{workTypes.map((type) => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</select>
					<button
						onClick={handleSave}
						style={{
							backgroundColor: '#28a745',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							padding: '0.25rem 0.5rem',
							cursor: 'pointer',
							fontSize: '0.7rem',
						}}
					>
						💾
					</button>
					<button
						onClick={handleCancel}
						style={{
							backgroundColor: '#dc3545',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							padding: '0.25rem 0.5rem',
							cursor: 'pointer',
							fontSize: '0.7rem',
						}}
					>
						❌
					</button>
				</div>
			);
		}

		return (
			<span
				onClick={() => setIsEditing(true)}
				style={{
					cursor: 'pointer',
					padding: '0.25rem 0.5rem',
					borderRadius: '4px',
					backgroundColor: '#374151',
					color: '#e2e8f0',
					fontSize: '0.8rem',
				}}
				title="İş tipini değiştirmek için tıklayın"
			>
				{value}
			</span>
		);
	};

	return (
		<div className={styles.section}>
			{/* Success Message */}
			{successMessage && (
				<div
					style={{
						position: 'fixed',
						top: '20px',
						right: '20px',
						backgroundColor: successMessage.includes('❌') ? '#dc3545' : '#28a745',
						color: 'white',
						padding: '1rem 1.5rem',
						borderRadius: '8px',
						boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
						zIndex: 1000,
						fontSize: '0.9rem',
					}}
				>
					{successMessage}
				</div>
			)}

			<div className={styles.header}>
				<h3 className={styles.title}>💼 Kariyer Geçmişi</h3>
				<button 
					onClick={addCareerItem} 
					disabled={isLoading}
					className={styles.addButton}
					style={{
						opacity: isLoading ? 0.7 : 1,
						cursor: isLoading ? 'not-allowed' : 'pointer',
					}}
				>
					{isLoading ? '⏳ Ekleniyor...' : '➕ Deneyim Ekle'}
				</button>
			</div>

			{data.length === 0 ? (
				<div className={styles.emptyState}>
					<div className={styles.emptyIcon}>💼</div>
					<p className={styles.emptyText}>Henüz kariyer deneyimi eklenmedi</p>
					<button 
						onClick={addCareerItem} 
						disabled={isLoading}
						className={styles.emptyButton}
						style={{
							opacity: isLoading ? 0.7 : 1,
							cursor: isLoading ? 'not-allowed' : 'pointer',
						}}
					>
						{isLoading ? '⏳ Ekleniyor...' : 'İlk Deneyiminizi Ekleyin'}
					</button>
				</div>
			) : (
				<div className={styles.timeline}>
					<div className={styles.timelineLine}></div>
					{data.map((item) => (
						<div key={item.id} className={styles.careerItem}>
							<div className={styles.timelineDot}></div>

							{/* Şirket Header */}
							<div className={styles.companyHeader}>
								<img
									src={item.logoUrl || `https://picsum.photos/60/60?random=${item.company?.charAt(0) || 'X'}`}
									alt={`${item.company} Logo`}
									className={styles.logo}
									onError={(e) => {
										e.currentTarget.src =
											'https://picsum.photos/60/60?random=' +
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
									<DatePicker
										value={item.startDate}
										onChange={(value) => updateCareerItem(item.id, 'startDate', value)}
										label="Başlangıç"
									/>
									{' - '}
									<DatePicker
										value={item.endDate}
										onChange={(value) => updateCareerItem(item.id, 'endDate', value)}
										label="Bitiş"
									/>
								</div>

								<div className={styles.tag}>
									📍
									<CityPicker
										value={item.location}
										onChange={(value) => updateCareerItem(item.id, 'location', value)}
									/>
								</div>

								<div className={styles.tag}>
									⚡
									<WorkTypePicker
										value={item.workType}
										onChange={(value) => updateCareerItem(item.id, 'workType', value)}
									/>
								</div>
							</div>

							{/* Açıklama */}
							<InlineEditor
								initialValue={item.description}
								onSave={(value) =>
									updateCareerItem(item.id, 'description', value)
								}
								type="textarea"
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
					düzenleyebilirsiniz. Tarih, şehir ve iş tipi alanlarına tıklayarak dropdown menüleri kullanabilirsiniz.
				</div>
			</div>
		</div>
	);
};
