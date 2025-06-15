'use client';

import React, { useState, useEffect } from 'react';
import { InlineEditor } from '../ui/InlineEditor';

interface ContactSectionProps {
	socialMedia: Array<{ id: string; platform: string; url: string }>;
	contact: {
		phone: { enabled: boolean; value: string };
		email: { enabled: boolean; value: string };
		whatsapp: boolean;
		telegram: boolean;
		position: 'left' | 'right';
	};
	contactForm: {
		enabled: boolean;
		recipientEmail: string;
		nameRequired: boolean;
		phoneRequired: boolean;
		reasonOptions: string[];
	};
	onUpdateSocialMedia: (
		data: Array<{ id: string; platform: string; url: string }>
	) => void;
	onUpdateContact: (data: ContactSectionProps['contact']) => void;
	onUpdateContactForm: (data: ContactSectionProps['contactForm']) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
	socialMedia,
	contact,
	onUpdateSocialMedia,
	onUpdateContact,
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');

	// Sosyal medya hesabı ekle - Backend'e kaydet
	const addSocialMedia = async () => {
		if (isLoading) return; // Çift tıklamayı kesin engelle
		setIsLoading(true);
		try {
			const newSocialMedia = {
				platform: 'Yeni Platform',
				url: 'https://',
				isActive: true,
			};

			console.log('🌐 Backend API\'ye POST isteği gönderiliyor...');
			console.log('📤 Gönderilen Veri:', newSocialMedia);

			const response = await fetch('http://localhost:5000/api/portfolio/social-media', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newSocialMedia),
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
				throw new Error(`Sosyal medya hesabı eklenemedi: ${response.status} ${response.statusText} - ${errorText}`);
			}

			const addedSocialMedia = await response.json();
			console.log('✅ API Başarılı Yanıt:', addedSocialMedia);

			// Güncel sosyal medya hesaplarını çek
			await refreshSocialMedia();
			setSuccessMessage('➕ Sosyal medya hesabı başarıyla eklendi!');

		} catch (error) {
			console.error('❌ Sosyal Medya Ekleme Hatası:', error);
			setSuccessMessage(`❌ Sosyal medya hesabı eklenemedi: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
		} finally {
			setIsLoading(false);
		}
	};

	// Sosyal medya hesabını güncelle - Backend'e kaydet
	const updateSocialMedia = async (id: string, field: 'platform' | 'url', value: string) => {
		console.log('✏️ Sosyal Medya Güncelleme:', { id, field, value });
		setIsLoading(true);

		try {
			// Önce mevcut hesabı bul
			const currentSocialMedia = socialMedia.find(s => s.id === id);
			if (!currentSocialMedia) {
				throw new Error('Sosyal medya hesabı bulunamadı');
			}

			// Güncellenmiş hesap objesi
			const updatedSocialMedia = {
				...currentSocialMedia,
				[field]: value,
			};

			// Backend formatına çevir
			const backendSocialMedia = {
				platform: updatedSocialMedia.platform,
				url: updatedSocialMedia.url,
				isActive: true,
			};

			console.log('🌐 Backend API\'ye PUT isteği gönderiliyor...');
			console.log('📤 Gönderilen Veri:', backendSocialMedia);

			const response = await fetch(`http://localhost:5000/api/portfolio/social-media/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(backendSocialMedia),
			});

			console.log('📥 API Yanıtı:', { status: response.status, ok: response.ok });

			if (!response.ok) {
				throw new Error('Sosyal medya hesabı güncellenemedi');
			}

			console.log('✅ API Başarılı Yanıt');

			// Güncel sosyal medya hesaplarını çek
			await refreshSocialMedia();
			setSuccessMessage('💾 Sosyal medya hesabı başarıyla güncellendi!');

		} catch (error) {
			console.error('❌ Sosyal Medya Güncelleme Hatası:', error);
			setSuccessMessage('❌ Sosyal medya hesabı güncellenemedi!');
		} finally {
			setIsLoading(false);
		}
	};

	// Sosyal medya hesabını sil - Backend'den sil
	const removeSocialMedia = async (id: string) => {
		console.log('🗑️ Sosyal Medya Silme:', { id });
		setIsLoading(true);

		try {
			console.log('🌐 Backend API\'ye DELETE isteği gönderiliyor...');

			const response = await fetch(`http://localhost:5000/api/portfolio/social-media/${id}`, {
				method: 'DELETE',
			});

			console.log('📥 API Yanıtı:', { status: response.status, ok: response.ok });

			if (!response.ok) {
				throw new Error('Sosyal medya hesabı silinemedi');
			}

			console.log('✅ API Başarılı Yanıt');

			// Güncel sosyal medya hesaplarını çek
			await refreshSocialMedia();
			setSuccessMessage('🗑️ Sosyal medya hesabı başarıyla silindi!');

		} catch (error) {
			console.error('❌ Sosyal Medya Silme Hatası:', error);
			setSuccessMessage('❌ Sosyal medya hesabı silinemedi!');
		} finally {
			setIsLoading(false);
		}
	};

	// Güncel sosyal medya hesaplarını backend'den çek
	const refreshSocialMedia = async () => {
		try {
			console.log('🔄 Güncel sosyal medya hesapları çekiliyor...');
			const response = await fetch('http://localhost:5000/api/portfolio/social-media');
			
			if (!response.ok) {
				throw new Error('Sosyal medya hesapları çekilemedi');
			}

			const backendSocialMedia = await response.json();
			console.log('📦 Backend Sosyal Medya:', backendSocialMedia);

			// Backend formatını frontend formatına çevir
			const frontendSocialMedia = backendSocialMedia.map((social: any) => ({
				id: social.id.toString(),
				platform: social.platform,
				url: social.url,
			}));

			console.log('🔄 Frontend Sosyal Medya:', frontendSocialMedia);
			onUpdateSocialMedia(frontendSocialMedia);

		} catch (error) {
			console.error('❌ Sosyal Medya Çekme Hatası:', error);
		}
	};

	// İletişim bilgilerini güncelle - Backend'e kaydet
	const updateContact = async (
		field: string,
		value: ContactSectionProps['contact'][keyof ContactSectionProps['contact']]
	) => {
		console.log('✏️ İletişim Bilgisi Güncelleme:', { field, value });
		setIsLoading(true);

		try {
			const updatedContact = { ...contact, [field]: value };

			// Backend formatına çevir
			const backendContact = {
				email: updatedContact.email.value,
				phone: updatedContact.phone.value,
				location: 'İstanbul, Türkiye', // Varsayılan lokasyon
				social: {
					linkedIn: '',
					github: '',
					twitter: '',
					instagram: '',
					website: '',
				},
			};

			console.log('🌐 Backend API\'ye PUT isteği gönderiliyor...');
			console.log('📤 Gönderilen Veri:', backendContact);

			const response = await fetch('http://localhost:5000/api/portfolio/contact', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(backendContact),
			});

			console.log('📥 API Yanıtı:', { status: response.status, ok: response.ok });

			if (!response.ok) {
				throw new Error('İletişim bilgileri güncellenemedi');
			}

			console.log('✅ API Başarılı Yanıt');
			onUpdateContact(updatedContact);
			setSuccessMessage('💾 İletişim bilgileri başarıyla güncellendi!');

		} catch (error) {
			console.error('❌ İletişim Güncelleme Hatası:', error);
			setSuccessMessage('❌ İletişim bilgileri güncellenemedi!');
		} finally {
			setIsLoading(false);
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

	const sectionStyle: React.CSSProperties = {
		padding: '2rem',
		backgroundColor: '#2d3748',
		borderRadius: '12px',
		margin: '1rem 0',
		boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
		border: '1px solid #4a5568',
	};

	const contactCardStyle: React.CSSProperties = {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		gap: '2rem',
		marginBottom: '2rem',
	};

	const socialMediaItemStyle: React.CSSProperties = {
		display: 'flex',
		alignItems: 'center',
		gap: '1rem',
		padding: '1rem',
		backgroundColor: '#1a202c',
		borderRadius: '8px',
		border: '1px solid #4a5568',
		marginBottom: '1rem',
	};

	const contactItemStyle: React.CSSProperties = {
		display: 'flex',
		alignItems: 'center',
		gap: '1rem',
		padding: '1rem',
		backgroundColor: '#1a202c',
		borderRadius: '8px',
		border: '1px solid #4a5568',
		marginBottom: '1rem',
	};

	const getPlatformIcon = (platform: string) => {
		const icons: { [key: string]: string } = {
			LinkedIn: '💼',
			GitHub: '🐙',
			Twitter: '🐦',
			Instagram: '📷',
			Facebook: '📘',
			YouTube: '🎥',
			TikTok: '🎵',
			Discord: '🎮',
		};
		return icons[platform] || '🌐';
	};

	return (
		<div style={sectionStyle}>
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

			<h3
				style={{ margin: '0 0 2rem 0', color: '#e2e8f0', fontSize: '1.8rem' }}
			>
				📞 İletişim & Sosyal Medya
			</h3>

			<div style={contactCardStyle}>
				{/* İletişim Bilgileri */}
				<div>
					<h4
						style={{
							margin: '0 0 1rem 0',
							color: '#cbd5e1',
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						📧 İletişim Bilgileri
					</h4>

					{/* Email */}
					{contact.email.enabled && (
						<div style={contactItemStyle}>
							<span style={{ fontSize: '1.5rem' }}>📧</span>
							<div style={{ flex: 1 }}>
								<div
									style={{
										fontSize: '0.9rem',
										color: '#a0aec0',
										marginBottom: '0.25rem',
									}}
								>
									Email
								</div>
								<InlineEditor
									initialValue={contact.email.value}
									onSave={(value) =>
										updateContact('email', { ...contact.email, value })
									}
									style={{
										fontSize: '1rem',
										color: '#e2e8f0',
									}}
								>
									<a
										href={`mailto:${contact.email.value}`}
										style={{ color: '#007bff', textDecoration: 'none' }}
									>
										{contact.email.value}
									</a>
								</InlineEditor>
							</div>
						</div>
					)}

					{/* Phone */}
					{contact.phone.enabled && (
						<div style={contactItemStyle}>
							<span style={{ fontSize: '1.5rem' }}>📱</span>
							<div style={{ flex: 1 }}>
								<div
									style={{
										fontSize: '0.9rem',
										color: '#a0aec0',
										marginBottom: '0.25rem',
									}}
								>
									Telefon
								</div>
								<InlineEditor
									initialValue={contact.phone.value}
									onSave={(value) =>
										updateContact('phone', { ...contact.phone, value })
									}
									style={{
										fontSize: '1rem',
										color: '#e2e8f0',
									}}
								>
									<a
										href={`tel:${contact.phone.value}`}
										style={{ color: '#007bff', textDecoration: 'none' }}
									>
										{contact.phone.value}
									</a>
								</InlineEditor>
							</div>
						</div>
					)}

					{/* WhatsApp */}
					{contact.whatsapp && contact.phone.enabled && (
						<div style={contactItemStyle}>
							<span style={{ fontSize: '1.5rem' }}>💬</span>
							<div style={{ flex: 1 }}>
								<div
									style={{
										fontSize: '0.9rem',
										color: '#a0aec0',
										marginBottom: '0.25rem',
									}}
								>
									WhatsApp
								</div>
								<a
									href={`https://wa.me/${contact.phone.value.replace(
										/\D/g,
										''
									)}`}
									target="_blank"
									rel="noopener noreferrer"
									style={{ color: '#25D366', textDecoration: 'none' }}
								>
									WhatsApp&apos;tan Mesaj Gönder
								</a>
							</div>
						</div>
					)}
				</div>

				{/* Sosyal Medya */}
				<div>
					<h4
						style={{
							margin: '0 0 1rem 0',
							color: '#cbd5e1',
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						🌐 Sosyal Medya
						<button
							onClick={addSocialMedia}
							disabled={isLoading}
							style={{
								backgroundColor: isLoading ? '#6c757d' : '#28a745',
								color: 'white',
								border: 'none',
								borderRadius: '15px',
								padding: '4px 12px',
								cursor: isLoading ? 'not-allowed' : 'pointer',
								fontSize: '12px',
								opacity: isLoading ? 0.7 : 1,
							}}
						>
							{isLoading ? '⏳' : '➕ Ekle'}
						</button>
					</h4>

					{socialMedia.length === 0 && (
						<div
							style={{
								textAlign: 'center',
								padding: '2rem',
								color: '#a0aec0',
								border: '2px dashed #4a5568',
								borderRadius: '8px',
								backgroundColor: '#1a202c',
							}}
						>
							<p style={{ margin: '0 0 1rem 0' }}>
								Henüz sosyal medya hesabı eklenmedi
							</p>
						</div>
					)}

					{socialMedia.map((item) => (
						<div key={item.id} style={socialMediaItemStyle}>
							<span style={{ fontSize: '1.5rem' }}>
								{getPlatformIcon(item.platform)}
							</span>
							<div style={{ flex: 1 }}>
								{/* Platform Adı */}
								<InlineEditor
									initialValue={item.platform}
									onSave={(value) =>
										updateSocialMedia(item.id, 'platform', value)
									}
									onDelete={() => removeSocialMedia(item.id)}
									style={{
										fontSize: '0.9rem',
										color: '#a0aec0',
										marginBottom: '0.25rem',
									}}
								>
									<div
										style={{
											fontSize: '0.9rem',
											color: '#a0aec0',
											marginBottom: '0.25rem',
										}}
									>
										{item.platform}
									</div>
								</InlineEditor>

								{/* URL */}
								<InlineEditor
									initialValue={item.url}
									onSave={(value) => updateSocialMedia(item.id, 'url', value)}
									style={{
										fontSize: '1rem',
										color: '#e2e8f0',
									}}
								>
									<a
										href={item.url}
										target="_blank"
										rel="noopener noreferrer"
										style={{ color: '#007bff', textDecoration: 'none' }}
									>
										{item.url}
									</a>
								</InlineEditor>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Bilgilendirme */}
			<div
				style={{
					backgroundColor: '#1a202c',
					border: '1px solid #4a5568',
					borderRadius: '8px',
					padding: '1rem',
					marginTop: '1rem',
				}}
			>
				<div style={{ color: '#a0aec0', fontSize: '0.9rem' }}>
					💡 <strong>İpucu:</strong> Tüm alanları tıklayarak
					düzenleyebilirsiniz. Sosyal medya hesaplarınızı ekleyip güncelleyebilirsiniz.
				</div>
			</div>
		</div>
	);
};
