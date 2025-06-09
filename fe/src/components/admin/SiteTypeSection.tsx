import React from 'react';
import { SectionProps } from '../../types/admin';
import styles from './SiteTypeSection.module.scss';

export const SiteTypeSection: React.FC<SectionProps> = ({
	settings,
	onSettingsChange,
	selectedTags,
	onTagsChange,
	clickedStates,
}) => {
	const handleRadioClick = (type: string, isOnePageSite: boolean) => {
		onSettingsChange({ isOnePageSite });
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
			<div className={styles.affectedBadge}>Tüm Sayfa</div>
			<h3 className={styles.sectionTitle}>
				<span style={{ fontSize: '1.5rem' }}>📄</span>
				Site Tipi
			</h3>
			<div className={styles.tagInfo}>
				Etkilenen inline editing parçaları:
				{renderClickableTag('Hero', 'hero', 'siteType')}
				{renderClickableTag('Skills', 'skills', 'siteType')}
				{renderClickableTag('Projects', 'projects', 'siteType')}
				{renderClickableTag('Career', 'career', 'siteType')}
				{renderClickableTag('Contact', 'contact', 'siteType')}
			</div>
			<div className={styles.radioGroup}>
				<label
					className={`${styles.radioItem} ${
						settings.isOnePageSite ? styles.radioItemSelected : ''
					}`}
					onClick={() => handleRadioClick('onepage', true)}
				>
					<span
						className={styles.radioIcon}
						style={{
							transform:
								clickedStates?.clickedRadio === 'onepage'
									? 'rotate(15deg)'
									: 'rotate(0deg)',
						}}
					>
						📄
					</span>
					Tek Sayfa (One Page)
				</label>
				<label
					className={`${styles.radioItem} ${
						!settings.isOnePageSite ? styles.radioItemSelected : ''
					}`}
					onClick={() => handleRadioClick('multipage', false)}
				>
					<span
						className={styles.radioIcon}
						style={{
							transform:
								clickedStates?.clickedRadio === 'multipage'
									? 'rotateY(180deg)'
									: 'rotateY(0deg)',
						}}
					>
						📚
					</span>
					Çok Sayfa (Multi Page)
				</label>
			</div>
		</div>
	);
};
