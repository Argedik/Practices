'use client';

import { useState, useRef, useEffect } from 'react';
import { ApiService } from '../../services/api';

interface SiteSettings {
	isOnePageSite: boolean;
	pageOrder: string[];
	navigationStyle: 'scroll' | 'click';
	layoutOptions: {
		imagePosition: 'background' | 'left' | 'right' | 'top' | 'bottom';
		textPosition: 'center' | 'left' | 'right' | 'top' | 'middle' | 'bottom';
		gridMode: boolean;
		fixedAreaEnabled: boolean;
		fixedAreaPosition: number;
	};
}

export const AdminPanel = () => {
	const [settings, setSettings] = useState<SiteSettings>({
		isOnePageSite: true,
		pageOrder: ['Hero', 'Skills', 'Projects', 'Career', 'Contact'],
		navigationStyle: 'scroll',
		layoutOptions: {
			imagePosition: 'background',
			textPosition: 'center',
			gridMode: false,
			fixedAreaEnabled: false,
			fixedAreaPosition: 5, // 3x3 grid orta pozisyon
		},
	});

	const [showSaveSuccess, setShowSaveSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const [clickedGridItem, setClickedGridItem] = useState<number | null>(null);
	const [clickedRadio, setClickedRadio] = useState<string | null>(null);
	const [clickedOrderButton, setClickedOrderButton] = useState<string | null>(
		null
	);
	const [selectedTags, setSelectedTags] = useState<{
		[sectionId: string]: Set<string>;
	}>({
		siteType: new Set(),
		navigation: new Set(),
		layout: new Set(),
		pageOrder: new Set(),
	});
	const saveButtonRef = useRef<HTMLButtonElement>(null);

	// Backend'den ayarları yükle
	useEffect(() => {
		const loadSettings = async () => {
			try {
				console.log('🔄 Admin ayarları yükleniyor...');
				console.log(
					'📡 API URL:',
					'http://localhost:5000/api/content/admin-settings'
				);

				const adminSettings = await ApiService.fetchAdminSettings();
				console.log('✅ Admin ayarları yüklendi:', adminSettings);

				setSettings({
					isOnePageSite: adminSettings.isOnePageSite,
					pageOrder: adminSettings.pageOrder,
					navigationStyle: adminSettings.navigationStyle,
					layoutOptions: adminSettings.layoutOptions,
				});

				// Seçili tag'ları backend'den yükle
				if (adminSettings.selectedTags) {
					setSelectedTags({
						siteType: new Set(adminSettings.selectedTags.siteType),
						navigation: new Set(adminSettings.selectedTags.navigation),
						layout: new Set(adminSettings.selectedTags.layout),
						pageOrder: new Set(adminSettings.selectedTags.pageOrder),
					});
				}
			} catch (error) {
				console.error('❌ Admin ayarları yüklenirken hata:', error);
				console.log(
					'🔍 Backend çalışıyor mu? http://localhost:5000/api/content/admin-settings'
				);

				// Backend çalışmıyorsa varsayılan ayarları kullan
				console.log('🔄 Varsayılan ayarlar kullanılıyor...');
				// Settings zaten useState'de varsayılan değerlerle tanımlı
			} finally {
				setIsLoading(false);
			}
		};

		loadSettings();
	}, []);

	const updateSettings = (newSettings: Partial<SiteSettings>) => {
		setSettings((prev) => ({ ...prev, ...newSettings }));
	};

	const handleRadioClick = (type: string, value: Partial<SiteSettings>) => {
		setClickedRadio(type);
		setTimeout(() => setClickedRadio(null), 200);
		updateSettings(value);
	};

	const handleGridClick = (position: number) => {
		setClickedGridItem(position);
		setTimeout(() => setClickedGridItem(null), 200);
		updateSettings({
			layoutOptions: {
				...settings.layoutOptions,
				fixedAreaPosition: position,
			},
		});
	};

	const handleOrderButtonClick = (direction: 'up' | 'down', index: number) => {
		setClickedOrderButton(`${direction}-${index}`);
		setTimeout(() => setClickedOrderButton(null), 200);
	};

	const handleSave = async () => {
		setIsSaving(true);

		// Kaydet animasyonu
		if (saveButtonRef.current) {
			saveButtonRef.current.style.transform = 'scale(0.95)';
			setTimeout(() => {
				if (saveButtonRef.current) {
					saveButtonRef.current.style.transform = 'scale(1)';
				}
			}, 150);
		}

		try {
			// Seçili tag'ları API formatına dönüştür
			const selectedTagsForAPI = {
				siteType: Array.from(selectedTags.siteType),
				navigation: Array.from(selectedTags.navigation),
				layout: Array.from(selectedTags.layout),
				pageOrder: Array.from(selectedTags.pageOrder),
			};

			const settingsToSave = {
				...settings,
				selectedTags: selectedTagsForAPI,
			};

			console.log('💾 Kaydedilen ayarlar:', settingsToSave);
			console.log("🏷️ Seçili tag'lar:", selectedTagsForAPI);

			await ApiService.updateAdminSettings(settingsToSave);
			setTimeout(() => {
				setShowSaveSuccess(true);
				setTimeout(() => setShowSaveSuccess(false), 2000);
			}, 800);
		} catch (error) {
			console.error('❌ Ayarlar kaydedilirken hata:', error);
			console.log(
				'🔍 Backend çalışıyor mu? Terminal&apos;de "cd be && dotnet run" komutu çalıştırın'
			);
			alert(
				"⚠️ Backend çalışmıyor! Ayarlar kaydedilemedi.\n\nTerminal'de şu komutu çalıştırın:\ncd be\ndotnet run"
			);
		} finally {
			setIsSaving(false);
		}
	};

	// Animasyon stilleri - Koyu Tema
	const containerStyle: React.CSSProperties = {
		background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
		minHeight: '100vh',
		fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
		position: 'relative',
		color: '#f1f5f9',
	};

	const panelStyle: React.CSSProperties = {
		background: 'rgba(15, 23, 42, 0.95)',
		backdropFilter: 'blur(10px)',
		borderRadius: '20px',
		padding: '2rem',
		margin: '0 auto',
		boxShadow: '0 15px 30px rgba(0, 0, 0, 0.6)',
		border: '1px solid #334155',
		transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
	};

	const sectionStyle: React.CSSProperties = {
		marginBottom: '1.5rem',
		padding: '1.5rem',
		background: 'rgba(30, 41, 59, 0.8)',
		borderRadius: '12px',
		border: '1px solid #334155',
		transition: 'all 0.3s ease',
		position: 'relative',
	};

	const titleStyle: React.CSSProperties = {
		fontSize: '2rem',
		fontWeight: '700',
		background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
		WebkitBackgroundClip: 'text',
		WebkitTextFillColor: 'transparent',
		textAlign: 'center',
		marginBottom: '2rem',
		textShadow: '0 2px 4px rgba(0,0,0,0.1)',
	};

	const sectionTitleStyle: React.CSSProperties = {
		fontSize: '1.2rem',
		fontWeight: '600',
		color: '#f1f5f9',
		marginBottom: '1rem',
		display: 'flex',
		alignItems: 'center',
		gap: '0.5rem',
	};

	const affectedBadgeStyle: React.CSSProperties = {
		position: 'absolute',
		top: '1rem',
		right: '1rem',
		background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
		color: '#0f172a',
		padding: '0.3rem 0.8rem',
		borderRadius: '15px',
		fontSize: '0.75rem',
		fontWeight: '500',
		boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
	};

	const inlineTagStyle: React.CSSProperties = {
		display: 'inline-block',
		background: 'rgba(245, 158, 11, 0.1)',
		color: '#f59e0b',
		padding: '0.2rem 0.6rem',
		borderRadius: '8px',
		fontSize: '0.7rem',
		fontWeight: '500',
		margin: '0.2rem',
		border: '1px solid rgba(245, 158, 11, 0.2)',
		cursor: 'pointer',
		transition: 'all 0.2s ease',
	};

	// Tıklanabilir tag fonksiyonu
	const handleTagClick = (section: string, sectionId: string) => {
		const newSelectedTags = { ...selectedTags };
		const currentSectionTags = new Set(newSelectedTags[sectionId]);

		if (currentSectionTags.has(section)) {
			currentSectionTags.delete(section);
		} else {
			currentSectionTags.add(section);
		}

		newSelectedTags[sectionId] = currentSectionTags;
		setSelectedTags(newSelectedTags);
	};

	const renderClickableTag = (
		text: string,
		section: string,
		sectionId: string
	) => {
		const isSelected = selectedTags[sectionId]?.has(section) || false;

		return (
			<span
				style={{
					...inlineTagStyle,
					background: isSelected ? '#f59e0b' : 'rgba(245, 158, 11, 0.1)',
					color: isSelected ? '#0f172a' : '#f59e0b',
					border: isSelected
						? '1px solid #f59e0b'
						: '1px solid rgba(245, 158, 11, 0.2)',
					fontWeight: isSelected ? '600' : '500',
				}}
				onClick={() => handleTagClick(section, sectionId)}
				onMouseEnter={(e) => {
					if (!isSelected) {
						e.currentTarget.style.background = 'rgba(245, 158, 11, 0.2)';
						e.currentTarget.style.transform = 'translateY(-1px) scale(1.05)';
						e.currentTarget.style.boxShadow =
							'0 2px 8px rgba(245, 158, 11, 0.3)';
					}
				}}
				onMouseLeave={(e) => {
					if (!isSelected) {
						e.currentTarget.style.background = 'rgba(245, 158, 11, 0.1)';
						e.currentTarget.style.transform = 'translateY(0px) scale(1)';
						e.currentTarget.style.boxShadow = 'none';
					}
				}}
				title={`${text} bölümü ${
					isSelected ? 'seçili' : 'seçilmedi'
				} - tıklayarak değiştir`}
			>
				{text}
			</span>
		);
	};

	const radioGroupStyle: React.CSSProperties = {
		display: 'flex',
		gap: '1rem',
		marginBottom: '1rem',
	};

	const radioItemStyle: React.CSSProperties = {
		display: 'flex',
		alignItems: 'center',
		gap: '0.5rem',
		padding: '0.75rem 1.5rem',
		backgroundColor: '#1e293b',
		border: '2px solid #334155',
		borderRadius: '12px',
		cursor: 'pointer',
		transition: 'all 0.2s ease',
		fontSize: '0.95rem',
		fontWeight: '500',
		color: '#f1f5f9',
	};

	const gridContainerStyle: React.CSSProperties = {
		display: 'grid',
		gridTemplateColumns: 'repeat(3, 1fr)',
		gap: '0.75rem',
		marginBottom: '1.5rem',
		padding: '1.5rem',
		backgroundColor: '#1e293b',
		borderRadius: '12px',
		border: '2px solid #334155',
	};

	const gridButtonStyle = (position: number): React.CSSProperties => ({
		width: '60px',
		height: '60px',
		backgroundColor:
			settings.layoutOptions.fixedAreaPosition === position
				? '#f59e0b'
				: '#334155',
		border:
			settings.layoutOptions.fixedAreaPosition === position
				? '2px solid #f59e0b'
				: '2px solid #475569',
		borderRadius: '12px',
		cursor: 'pointer',
		fontSize: '1.1rem',
		fontWeight: '600',
		color:
			settings.layoutOptions.fixedAreaPosition === position
				? '#0f172a'
				: '#f1f5f9',
		transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
		transform: clickedGridItem === position ? 'scale(0.95)' : 'scale(1)',
		boxShadow:
			settings.layoutOptions.fixedAreaPosition === position
				? '0 8px 25px rgba(245, 158, 11, 0.4)'
				: '0 2px 4px rgba(0,0,0,0.3)',
	});

	const selectStyle: React.CSSProperties = {
		padding: '0.75rem 1rem',
		border: '2px solid #334155',
		borderRadius: '12px',
		backgroundColor: '#1e293b',
		fontSize: '0.95rem',
		color: '#f1f5f9',
		outline: 'none',
		transition: 'all 0.2s ease',
		cursor: 'pointer',
	};

	const pageOrderItemStyle: React.CSSProperties = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '1rem 1.5rem',
		marginBottom: '0.75rem',
		backgroundColor: '#1e293b',
		borderRadius: '12px',
		border: '2px solid #334155',
		transition: 'all 0.2s ease',
		cursor: 'pointer',
	};

	const orderButtonStyle: React.CSSProperties = {
		padding: '0.5rem',
		border: 'none',
		borderRadius: '8px',
		backgroundColor: '#f59e0b',
		color: '#0f172a',
		cursor: 'pointer',
		fontSize: '1rem',
		transition: 'all 0.2s ease',
		marginLeft: '0.5rem',
	};

	const saveButtonStyle: React.CSSProperties = {
		background: showSaveSuccess
			? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
			: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
		color: showSaveSuccess ? '#f1f5f9' : '#0f172a',
		padding: '1rem 3rem',
		border: 'none',
		borderRadius: '16px',
		cursor: 'pointer',
		fontSize: '1.1rem',
		fontWeight: '600',
		boxShadow: showSaveSuccess
			? '0 8px 25px rgba(16, 185, 129, 0.4)'
			: '0 8px 25px rgba(245, 158, 11, 0.4)',
		transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
		position: 'relative',
		overflow: 'hidden',
	};

	const successMessageStyle: React.CSSProperties = {
		position: 'fixed',
		top: '2rem',
		right: '2rem',
		background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
		color: '#f1f5f9',
		padding: '1rem 2rem',
		borderRadius: '12px',
		boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)',
		transform: showSaveSuccess ? 'translateX(0)' : 'translateX(100%)',
		opacity: showSaveSuccess ? 1 : 0,
		transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
		zIndex: 1000,
		fontSize: '0.95rem',
		fontWeight: '500',
	};

	return (
		<div style={containerStyle}>
			{/* Loading State */}
			{isLoading && (
				<div
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						background: 'rgba(255, 255, 255, 0.9)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						zIndex: 2000,
						fontSize: '1.2rem',
						color: '#667eea',
					}}
				>
					⏳ Backend&apos;e bağlanılıyor...
					<br />
					<small
						style={{
							fontSize: '0.9rem',
							marginTop: '0.5rem',
							display: 'block',
						}}
					>
						Eğer bu mesaj uzun süre kalıyorsa, backend&apos;i başlatın:
						<br />
						<code>cd be && dotnet run</code>
					</small>
				</div>
			)}

			{/* Success Message */}
			<div style={successMessageStyle}>✅ Ayarlar başarıyla kaydedildi!</div>

			<div style={panelStyle}>
				<h1 style={titleStyle}>⚙️ Admin Panel</h1>

				{/* Site Tipi Seçimi */}
				<div style={sectionStyle}>
					<div style={affectedBadgeStyle}>Tüm Sayfa</div>
					<h3 style={sectionTitleStyle}>
						<span style={{ fontSize: '1.5rem' }}>📄</span>
						Site Tipi
					</h3>
					<div
						style={{
							marginBottom: '0.8rem',
							fontSize: '0.85rem',
							color: '#666',
						}}
					>
						Etkilenen inline editing parçaları:
						{renderClickableTag('Hero', 'hero', 'siteType')}
						{renderClickableTag('Skills', 'skills', 'siteType')}
						{renderClickableTag('Projects', 'projects', 'siteType')}
						{renderClickableTag('Career', 'career', 'siteType')}
						{renderClickableTag('Contact', 'contact', 'siteType')}
					</div>
					<div style={radioGroupStyle}>
						<label
							style={{
								...radioItemStyle,
								backgroundColor: settings.isOnePageSite ? '#f59e0b' : '#1e293b',
								color: settings.isOnePageSite ? '#0f172a' : '#f1f5f9',
								borderColor: settings.isOnePageSite ? '#f59e0b' : '#334155',
								transform:
									clickedRadio === 'onepage' ? 'scale(0.97)' : 'scale(1)',
								boxShadow: settings.isOnePageSite
									? '0 4px 15px rgba(245, 158, 11, 0.3)'
									: 'none',
							}}
							onMouseEnter={(e) => {
								if (!settings.isOnePageSite) {
									e.currentTarget.style.borderColor = '#f59e0b';
									e.currentTarget.style.transform =
										'translateY(-2px) scale(1.02)';
									e.currentTarget.style.boxShadow =
										'0 4px 15px rgba(245, 158, 11, 0.15)';
								}
							}}
							onMouseLeave={(e) => {
								if (!settings.isOnePageSite) {
									e.currentTarget.style.borderColor = '#334155';
									e.currentTarget.style.transform = 'translateY(0) scale(1)';
									e.currentTarget.style.boxShadow = 'none';
								}
							}}
							onClick={() =>
								handleRadioClick('onepage', { isOnePageSite: true })
							}
						>
							<span
								style={{
									fontSize: '1.2rem',
									transform:
										clickedRadio === 'onepage'
											? 'rotate(15deg)'
											: 'rotate(0deg)',
									transition: 'transform 0.2s ease',
								}}
							>
								📄
							</span>
							Tek Sayfa (One Page)
						</label>
						<label
							style={{
								...radioItemStyle,
								backgroundColor: !settings.isOnePageSite
									? '#f59e0b'
									: '#1e293b',
								color: !settings.isOnePageSite ? '#0f172a' : '#f1f5f9',
								borderColor: !settings.isOnePageSite ? '#f59e0b' : '#334155',
								transform:
									clickedRadio === 'multipage' ? 'scale(0.97)' : 'scale(1)',
								boxShadow: !settings.isOnePageSite
									? '0 4px 15px rgba(245, 158, 11, 0.3)'
									: 'none',
							}}
							onMouseEnter={(e) => {
								if (settings.isOnePageSite) {
									e.currentTarget.style.borderColor = '#f59e0b';
									e.currentTarget.style.transform =
										'translateY(-2px) scale(1.02)';
									e.currentTarget.style.boxShadow =
										'0 4px 15px rgba(245, 158, 11, 0.15)';
								}
							}}
							onMouseLeave={(e) => {
								if (settings.isOnePageSite) {
									e.currentTarget.style.borderColor = '#334155';
									e.currentTarget.style.transform = 'translateY(0) scale(1)';
									e.currentTarget.style.boxShadow = 'none';
								}
							}}
							onClick={() =>
								handleRadioClick('multipage', { isOnePageSite: false })
							}
						>
							<span
								style={{
									fontSize: '1.2rem',
									transform:
										clickedRadio === 'multipage'
											? 'rotateY(180deg)'
											: 'rotateY(0deg)',
									transition: 'transform 0.2s ease',
								}}
							>
								📚
							</span>
							Çok Sayfa (Multi Page)
						</label>
					</div>
				</div>

				{/* Navigasyon Stili */}
				<div style={sectionStyle}>
					<div style={affectedBadgeStyle}>Bölüm Geçişi</div>
					<h3 style={sectionTitleStyle}>
						<span style={{ fontSize: '1.5rem' }}>🧭</span>
						Navigasyon Stili
					</h3>
					<div
						style={{
							marginBottom: '0.8rem',
							fontSize: '0.85rem',
							color: '#666',
						}}
					>
						Etkilenen inline editing parçaları:
						{renderClickableTag('Hero ↔ Skills', 'hero', 'navigation')}
						{renderClickableTag('Skills ↔ Projects', 'skills', 'navigation')}
						{renderClickableTag('Projects ↔ Career', 'projects', 'navigation')}
						{renderClickableTag('Career ↔ Contact', 'career', 'navigation')}
					</div>
					<div style={radioGroupStyle}>
						<label
							style={{
								...radioItemStyle,
								backgroundColor:
									settings.navigationStyle === 'scroll' ? '#f59e0b' : '#1e293b',
								color:
									settings.navigationStyle === 'scroll' ? '#0f172a' : '#f1f5f9',
								borderColor:
									settings.navigationStyle === 'scroll' ? '#f59e0b' : '#334155',
								transform:
									clickedRadio === 'scroll' ? 'scale(0.97)' : 'scale(1)',
								boxShadow:
									settings.navigationStyle === 'scroll'
										? '0 4px 15px rgba(245, 158, 11, 0.3)'
										: 'none',
							}}
							onMouseEnter={(e) => {
								if (settings.navigationStyle !== 'scroll') {
									e.currentTarget.style.borderColor = '#f59e0b';
									e.currentTarget.style.transform =
										'translateY(-2px) scale(1.02)';
									e.currentTarget.style.boxShadow =
										'0 4px 15px rgba(245, 158, 11, 0.15)';
								}
							}}
							onMouseLeave={(e) => {
								if (settings.navigationStyle !== 'scroll') {
									e.currentTarget.style.borderColor = '#334155';
									e.currentTarget.style.transform = 'translateY(0) scale(1)';
									e.currentTarget.style.boxShadow = 'none';
								}
							}}
							onClick={() =>
								handleRadioClick('scroll', { navigationStyle: 'scroll' })
							}
						>
							<span
								style={{
									fontSize: '1.2rem',
									transform:
										clickedRadio === 'scroll'
											? 'translateY(-2px)'
											: 'translateY(0px)',
									transition: 'transform 0.2s ease',
								}}
							>
								📜
							</span>
							Kaydırılabilir (Scroll)
						</label>
						<label
							style={{
								...radioItemStyle,
								backgroundColor:
									settings.navigationStyle === 'click' ? '#f59e0b' : '#1e293b',
								color:
									settings.navigationStyle === 'click' ? '#0f172a' : '#f1f5f9',
								borderColor:
									settings.navigationStyle === 'click' ? '#f59e0b' : '#334155',
								transform:
									clickedRadio === 'click' ? 'scale(0.97)' : 'scale(1)',
								boxShadow:
									settings.navigationStyle === 'click'
										? '0 4px 15px rgba(245, 158, 11, 0.3)'
										: 'none',
							}}
							onMouseEnter={(e) => {
								if (settings.navigationStyle !== 'click') {
									e.currentTarget.style.borderColor = '#f59e0b';
									e.currentTarget.style.transform =
										'translateY(-2px) scale(1.02)';
									e.currentTarget.style.boxShadow =
										'0 4px 15px rgba(245, 158, 11, 0.15)';
								}
							}}
							onMouseLeave={(e) => {
								if (settings.navigationStyle !== 'click') {
									e.currentTarget.style.borderColor = '#334155';
									e.currentTarget.style.transform = 'translateY(0) scale(1)';
									e.currentTarget.style.boxShadow = 'none';
								}
							}}
							onClick={() =>
								handleRadioClick('click', { navigationStyle: 'click' })
							}
						>
							<span
								style={{
									fontSize: '1.2rem',
									transform:
										clickedRadio === 'click' ? 'scale(1.2)' : 'scale(1)',
									transition: 'transform 0.2s ease',
								}}
							>
								👆
							</span>
							Tıklamalı Geçiş
						</label>
					</div>
				</div>

				{/* Layout Seçenekleri */}
				<div style={sectionStyle}>
					<div style={affectedBadgeStyle}>Pozisyon & Görünüm</div>
					<h3 style={sectionTitleStyle}>
						<span style={{ fontSize: '1.5rem' }}>🎨</span>
						Layout Seçenekleri
					</h3>
					<div
						style={{
							marginBottom: '0.8rem',
							fontSize: '0.85rem',
							color: '#666',
						}}
					>
						Etkilenen inline editing parçaları:
						{renderClickableTag('Hero Layout', 'hero', 'layout')}
						{renderClickableTag('Skills Position', 'skills', 'layout')}
						{renderClickableTag('Projects Grid', 'projects', 'layout')}
						{renderClickableTag('Career Timeline', 'career', 'layout')}
					</div>

					{/* 3x3 Grid Seçimi */}
					<div style={{ marginBottom: '2rem' }}>
						<h4
							style={{
								fontSize: '1.1rem',
								fontWeight: '600',
								color: '#4a5568',
								marginBottom: '1rem',
							}}
						>
							Pozisyon Seçimi (3x3 Grid)
						</h4>
						<div style={gridContainerStyle}>
							{Array.from({ length: 9 }, (_, i) => (
								<button
									key={i}
									style={gridButtonStyle(i + 1)}
									onClick={() => handleGridClick(i + 1)}
									onMouseEnter={(e) => {
										if (settings.layoutOptions.fixedAreaPosition !== i + 1) {
											e.currentTarget.style.transform = 'scale(1.05)';
											e.currentTarget.style.backgroundColor = '#e2e8f0';
										}
									}}
									onMouseLeave={(e) => {
										if (settings.layoutOptions.fixedAreaPosition !== i + 1) {
											e.currentTarget.style.transform = 'scale(1)';
											e.currentTarget.style.backgroundColor = '#f7fafc';
										}
									}}
								>
									{i + 1}
								</button>
							))}
						</div>
						<p
							style={{
								fontSize: '0.9rem',
								color: '#718096',
								textAlign: 'center',
								margin: 0,
								fontStyle: 'italic',
							}}
						>
							✨ İki kere tıklanan alan sabit kalır, diğerleri kaydırılabilir
						</p>
					</div>

					{/* Görsel ve Metin Pozisyonları */}
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr',
							gap: '2rem',
						}}
					>
						{/* Görsel Pozisyonu */}
						<div>
							<label
								style={{
									display: 'block',
									marginBottom: '0.5rem',
									fontSize: '0.95rem',
									fontWeight: '600',
									color: '#4a5568',
								}}
							>
								🖼️ Görsel Pozisyonu:
							</label>
							<select
								value={settings.layoutOptions.imagePosition}
								onChange={(e) =>
									updateSettings({
										layoutOptions: {
											...settings.layoutOptions,
											imagePosition: e.target
												.value as SiteSettings['layoutOptions']['imagePosition'],
										},
									})
								}
								style={{
									...selectStyle,
									width: '100%',
								}}
								onFocus={(e) => {
									e.currentTarget.style.borderColor = '#667eea';
									e.currentTarget.style.boxShadow =
										'0 0 0 3px rgba(102, 126, 234, 0.1)';
								}}
								onBlur={(e) => {
									e.currentTarget.style.borderColor = '#e2e8f0';
									e.currentTarget.style.boxShadow = 'none';
								}}
							>
								<option value="background">🌅 Arkaplan</option>
								<option value="left">⬅️ Sol</option>
								<option value="right">➡️ Sağ</option>
								<option value="top">⬆️ Üst</option>
								<option value="bottom">⬇️ Alt</option>
							</select>
						</div>

						{/* Metin Pozisyonu */}
						<div>
							<label
								style={{
									display: 'block',
									marginBottom: '0.5rem',
									fontSize: '0.95rem',
									fontWeight: '600',
									color: '#4a5568',
								}}
							>
								📝 Metin Pozisyonu:
							</label>
							<select
								value={settings.layoutOptions.textPosition}
								onChange={(e) =>
									updateSettings({
										layoutOptions: {
											...settings.layoutOptions,
											textPosition: e.target
												.value as SiteSettings['layoutOptions']['textPosition'],
										},
									})
								}
								style={{
									...selectStyle,
									width: '100%',
								}}
								onFocus={(e) => {
									e.currentTarget.style.borderColor = '#667eea';
									e.currentTarget.style.boxShadow =
										'0 0 0 3px rgba(102, 126, 234, 0.1)';
								}}
								onBlur={(e) => {
									e.currentTarget.style.borderColor = '#e2e8f0';
									e.currentTarget.style.boxShadow = 'none';
								}}
							>
								<option value="center">🎯 Orta</option>
								<option value="left">⬅️ Sol</option>
								<option value="right">➡️ Sağ</option>
								<option value="top">⬆️ Üst</option>
								<option value="middle">🎯 Orta</option>
								<option value="bottom">⬇️ Alt</option>
							</select>
						</div>
					</div>
				</div>

				{/* Sayfa Sıralaması */}
				<div style={sectionStyle}>
					<div style={affectedBadgeStyle}>Sıralama</div>
					<h3 style={sectionTitleStyle}>
						<span style={{ fontSize: '1.5rem' }}>📋</span>
						Sayfa Sıralaması
					</h3>
					<div
						style={{
							marginBottom: '0.8rem',
							fontSize: '0.85rem',
							color: '#666',
						}}
					>
						Etkilenen inline editing parçaları:
						{renderClickableTag('Bölüm Sırası', 'hero', 'pageOrder')}
						{renderClickableTag('Navigation Order', 'skills', 'pageOrder')}
						{renderClickableTag('Scroll Priority', 'contact', 'pageOrder')}
					</div>
					<div>
						{settings.pageOrder.map((page, index) => (
							<div
								key={page}
								style={pageOrderItemStyle}
								onMouseEnter={(e) => {
									e.currentTarget.style.transform = 'translateX(5px)';
									e.currentTarget.style.boxShadow =
										'0 4px 12px rgba(102, 126, 234, 0.15)';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.transform = 'translateX(0)';
									e.currentTarget.style.boxShadow = 'none';
								}}
							>
								<div
									style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
								>
									<span
										style={{
											fontSize: '1.1rem',
											fontWeight: 'bold',
											color: '#f59e0b',
											minWidth: '2rem',
											textAlign: 'center',
										}}
									>
										{index + 1}.
									</span>
									<span
										style={{
											fontSize: '1rem',
											fontWeight: '500',
											color: '#f1f5f9',
										}}
									>
										{page}
									</span>
								</div>
								<div style={{ display: 'flex', gap: '0.5rem' }}>
									<button
										onClick={() => {
											handleOrderButtonClick('up', index);
											const newOrder = [...settings.pageOrder];
											if (index > 0) {
												[newOrder[index], newOrder[index - 1]] = [
													newOrder[index - 1],
													newOrder[index],
												];
												updateSettings({ pageOrder: newOrder });
											}
										}}
										disabled={index === 0}
										style={{
											...orderButtonStyle,
											opacity: index === 0 ? 0.5 : 1,
											cursor: index === 0 ? 'not-allowed' : 'pointer',
											transform:
												clickedOrderButton === `up-${index}`
													? 'scale(0.9) translateY(-2px)'
													: 'scale(1)',
										}}
										onMouseEnter={(e) => {
											if (index !== 0) {
												e.currentTarget.style.backgroundColor = '#3182ce';
												e.currentTarget.style.transform =
													'scale(1.1) translateY(-3px)';
												e.currentTarget.style.boxShadow =
													'0 4px 12px rgba(49, 130, 206, 0.4)';
											}
										}}
										onMouseLeave={(e) => {
											if (index !== 0) {
												e.currentTarget.style.backgroundColor = '#4299e1';
												e.currentTarget.style.transform =
													'scale(1) translateY(0px)';
												e.currentTarget.style.boxShadow = 'none';
											}
										}}
									>
										↑
									</button>
									<button
										onClick={() => {
											handleOrderButtonClick('down', index);
											const newOrder = [...settings.pageOrder];
											if (index < settings.pageOrder.length - 1) {
												[newOrder[index], newOrder[index + 1]] = [
													newOrder[index + 1],
													newOrder[index],
												];
												updateSettings({ pageOrder: newOrder });
											}
										}}
										disabled={index === settings.pageOrder.length - 1}
										style={{
											...orderButtonStyle,
											opacity:
												index === settings.pageOrder.length - 1 ? 0.5 : 1,
											cursor:
												index === settings.pageOrder.length - 1
													? 'not-allowed'
													: 'pointer',
											transform:
												clickedOrderButton === `down-${index}`
													? 'scale(0.9) translateY(2px)'
													: 'scale(1)',
										}}
										onMouseEnter={(e) => {
											if (index !== settings.pageOrder.length - 1) {
												e.currentTarget.style.backgroundColor = '#3182ce';
												e.currentTarget.style.transform =
													'scale(1.1) translateY(3px)';
												e.currentTarget.style.boxShadow =
													'0 4px 12px rgba(49, 130, 206, 0.4)';
											}
										}}
										onMouseLeave={(e) => {
											if (index !== settings.pageOrder.length - 1) {
												e.currentTarget.style.backgroundColor = '#4299e1';
												e.currentTarget.style.transform =
													'scale(1) translateY(0px)';
												e.currentTarget.style.boxShadow = 'none';
											}
										}}
									>
										↓
									</button>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Kaydet Butonu */}
				<div style={{ textAlign: 'center', marginTop: '3rem' }}>
					<button
						ref={saveButtonRef}
						style={saveButtonStyle}
						onClick={handleSave}
						disabled={isSaving}
						onMouseEnter={(e) => {
							if (!showSaveSuccess && !isSaving) {
								e.currentTarget.style.transform =
									'translateY(-2px) scale(1.02)';
								e.currentTarget.style.boxShadow =
									'0 12px 35px rgba(102, 126, 234, 0.6)';
							}
						}}
						onMouseLeave={(e) => {
							if (!showSaveSuccess && !isSaving) {
								e.currentTarget.style.transform = 'translateY(0) scale(1)';
								e.currentTarget.style.boxShadow =
									'0 8px 25px rgba(102, 126, 234, 0.4)';
							}
						}}
					>
						{isSaving ? (
							<>
								<span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>
									⏳
								</span>
								Kaydediliyor...
							</>
						) : showSaveSuccess ? (
							<>
								<span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>
									✅
								</span>
								Kaydedildi!
							</>
						) : (
							<>
								<span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>
									💾
								</span>
								Ayarları Kaydet
							</>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};
