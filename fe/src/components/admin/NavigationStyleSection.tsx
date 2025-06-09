import React from 'react';
import { SectionProps } from '../../types/admin';
import styles from './SiteTypeSection.module.scss'; // Aynı stilleri kullanıyoruz

export const NavigationStyleSection: React.FC<SectionProps> = ({
	settings,
	onSettingsChange,
	selectedTags,
	onTagsChange,
	clickedStates,
}) => {
	const handleRadioClick = (
		type: string,
		navigationStyle: 'scroll' | 'click'
	) => {
		onSettingsChange({ navigationStyle });
	};

	const handleTagClick = (section: string, sectionId: string) => {
		const newSelectedTags = { ...selectedTags };
		const currentSectionTags = new Set(newSelectedTags[sectionId]);

		if (currentSectionTags.has(section)) {
			currentSectionTags.delete(section);
		} else {
			currentSectionTags.add(section);
		}

		newSelectedTags[sectionId] = currentSectionTags;
		onTagsChange(newSelectedTags);
	};

	const renderClickableTag = (
		text: string,
		section: string,
		sectionId: string
	) => {
		const isSelected = selectedTags[sectionId]?.has(section) || false;

		return (
			<span
				className={`${styles.inlineTag} ${
					isSelected ? styles.inlineTagSelected : ''
				}`}
				onClick={() => handleTagClick(section, sectionId)}
				title={`${text} bölümü ${
					isSelected ? 'seçili' : 'seçilmedi'
				} - tıklayarak değiştir`}
			>
				{text}
			</span>
		);
	};

	return (
		<div className={styles.section}>
			<div className={styles.affectedBadge}>Bölüm Geçişi</div>
			<h3 className={styles.sectionTitle}>
				<span style={{ fontSize: '1.5rem' }}>🧭</span>
				Navigasyon Stili
			</h3>
			<div className={styles.tagInfo}>
				Etkilenen inline editing parçaları:
				{renderClickableTag('Hero ↔ Skills', 'hero', 'navigation')}
				{renderClickableTag('Skills ↔ Projects', 'skills', 'navigation')}
				{renderClickableTag('Projects ↔ Career', 'projects', 'navigation')}
				{renderClickableTag('Career ↔ Contact', 'career', 'navigation')}
			</div>
			<div className={styles.radioGroup}>
				<label
					className={`${styles.radioItem} ${
						settings.navigationStyle === 'scroll'
							? styles.radioItemSelected
							: ''
					}`}
					onClick={() => handleRadioClick('scroll', 'scroll')}
				>
					<span
						className={styles.radioIcon}
						style={{
							transform:
								clickedStates?.clickedRadio === 'scroll'
									? 'translateY(-2px)'
									: 'translateY(0px)',
						}}
					>
						📜
					</span>
					Kaydırılabilir (Scroll)
				</label>
				<label
					className={`${styles.radioItem} ${
						settings.navigationStyle === 'click' ? styles.radioItemSelected : ''
					}`}
					onClick={() => handleRadioClick('click', 'click')}
				>
					<span
						className={styles.radioIcon}
						style={{
							transform:
								clickedStates?.clickedRadio === 'click'
									? 'scale(1.2)'
									: 'scale(1)',
						}}
					>
						👆
					</span>
					Tıklanabilir (Click)
				</label>
			</div>
		</div>
	);
};
