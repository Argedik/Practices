'use client';

import React from 'react';
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
	const addSocialMedia = () => {
		const newSocialMedia = {
			id: Date.now().toString(),
			platform: 'Yeni Platform',
			url: 'https://',
		};
		onUpdateSocialMedia([...socialMedia, newSocialMedia]);
	};

	const updateSocialMedia = (
		id: string,
		field: 'platform' | 'url',
		value: string
	) => {
		const updated = socialMedia.map((item) =>
			item.id === id ? { ...item, [field]: value } : item
		);
		onUpdateSocialMedia(updated);
	};

	const removeSocialMedia = (id: string) => {
		const updated = socialMedia.filter((item) => item.id !== id);
		onUpdateSocialMedia(updated);
	};

	const updateContact = (
		field: string,
		value: ContactSectionProps['contact'][keyof ContactSectionProps['contact']]
	) => {
		onUpdateContact({ ...contact, [field]: value });
	};

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
							style={{
								backgroundColor: '#28a745',
								color: 'white',
								border: 'none',
								borderRadius: '15px',
								padding: '4px 12px',
								cursor: 'pointer',
								fontSize: '12px',
							}}
						>
							➕ Ekle
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
							<button
								onClick={addSocialMedia}
								style={{
									backgroundColor: '#007bff',
									color: 'white',
									border: 'none',
									borderRadius: '20px',
									padding: '8px 16px',
									cursor: 'pointer',
								}}
							>
								İlk Hesabınızı Ekleyin
							</button>
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
		</div>
	);
};
