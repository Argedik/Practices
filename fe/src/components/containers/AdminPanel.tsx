'use client';

import { useState, useRef, useEffect } from 'react';
import { ApiService } from '../../services/api';
import { SiteSettings, SelectedTags } from '../../types/admin';
import {
	AdminPanelHeader,
	SiteTypeSection,
	NavigationStyleSection,
	LayoutOptionsSection,
	PageOrderSection,
	SaveSection,
} from '../admin';
import { useClickableTags } from '../../hooks/useClickableTags';
import styles from './AdminPanel.module.scss';

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
	const [clickedGridItem] = useState<number | null>(null);
	const [clickedRadio] = useState<string | null>(null);
	const [clickedOrderButton, setClickedOrderButton] = useState<string | null>(
		null
	);
	const [selectedTags, setSelectedTags] = useState<SelectedTags>({
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
					'http://localhost:5001/api/content/admin-settings'
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
					'🔍 Backend çalışıyor mu? http://localhost:5001/api/content/admin-settings'
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

	// Hooks
	const { renderClickableTag } = useClickableTags(
		selectedTags,
		setSelectedTags
	);

	// Handler fonksiyonları
	const handleSettingsChange = (newSettings: Partial<SiteSettings>) => {
		setSettings((prev) => ({ ...prev, ...newSettings }));
	};

	const handleTagsChange = (newTags: SelectedTags) => {
		setSelectedTags(newTags);
	};

	// Click state'leri
	const clickedStates = {
		clickedRadio,
		clickedGridItem,
		clickedOrderButton,
	};

	return (
		<div className={styles.container}>
			<div className={styles.panel}>
				<AdminPanelHeader />

				<SiteTypeSection
					settings={settings}
					onSettingsChange={handleSettingsChange}
					selectedTags={selectedTags}
					onTagsChange={handleTagsChange}
					clickedStates={clickedStates}
				/>

				<NavigationStyleSection
					settings={settings}
					onSettingsChange={handleSettingsChange}
					selectedTags={selectedTags}
					onTagsChange={handleTagsChange}
					clickedStates={clickedStates}
				/>

				<LayoutOptionsSection
					settings={settings}
					onSettingsChange={handleSettingsChange}
					selectedTags={selectedTags}
					onTagsChange={handleTagsChange}
					clickedStates={clickedStates}
				/>

				<PageOrderSection
					settings={settings}
					onSettingsChange={handleSettingsChange}
					clickedStates={clickedStates}
					renderClickableTag={renderClickableTag}
					onOrderChange={handleOrderButtonClick}
				/>

				<SaveSection
					onSave={handleSave}
					isLoading={isLoading}
					isSaving={isSaving}
					showSaveSuccess={showSaveSuccess}
				/>
			</div>
		</div>
	);
};
