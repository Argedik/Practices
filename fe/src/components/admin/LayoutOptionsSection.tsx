import React from 'react';
import { SectionProps } from '../../types/admin';
import styles from './LayoutOptionsSection.module.scss';

export const LayoutOptionsSection: React.FC<SectionProps> = ({
	settings,
	onSettingsChange,
	clickedStates,
}) => {
	const handleGridClick = (position: number) => {
		onSettingsChange({
			layoutOptions: {
				...settings.layoutOptions,
				fixedAreaPosition: position,
			},
		});
	};

	const handleImagePositionChange = (imagePosition: string) => {
		onSettingsChange({
			layoutOptions: {
				...settings.layoutOptions,
				imagePosition: imagePosition as
					| 'background'
					| 'left'
					| 'right'
					| 'top'
					| 'bottom',
			},
		});
	};

	const handleTextPositionChange = (textPosition: string) => {
		onSettingsChange({
			layoutOptions: {
				...settings.layoutOptions,
				textPosition: textPosition as
					| 'center'
					| 'left'
					| 'right'
					| 'top'
					| 'middle'
					| 'bottom',
			},
		});
	};

	return (
		<div className={styles.section}>
			<div className={styles.affectedBadge}>Layout</div>
			<h3 className={styles.sectionTitle}>
				<span style={{ fontSize: '1.5rem' }}>🎨</span>
				Layout Seçenekleri
			</h3>

			{/* Grid Pozisyon Seçimi */}
			<div style={{ marginBottom: '1.5rem' }}>
				<h4 style={{ color: '#f1f5f9', marginBottom: '1rem' }}>
					Sabit Alan Pozisyonu (3x3 Grid):
				</h4>
				<div className={styles.gridContainer}>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((position) => (
						<button
							key={position}
							className={`${styles.gridButton} ${
								settings.layoutOptions.fixedAreaPosition === position
									? styles.gridButtonSelected
									: ''
							} ${
								clickedStates?.clickedGridItem === position
									? styles.gridButtonClicked
									: ''
							}`}
							onClick={() => handleGridClick(position)}
						>
							{position}
						</button>
					))}
				</div>
			</div>

			{/* Görsel Pozisyonu */}
			<div className={styles.selectContainer}>
				<label
					style={{ color: '#f1f5f9', display: 'block', marginBottom: '0.5rem' }}
				>
					Görsel Pozisyonu:
				</label>
				<select
					className={styles.select}
					value={settings.layoutOptions.imagePosition}
					onChange={(e) => handleImagePositionChange(e.target.value)}
				>
					<option value="background">Arka Plan</option>
					<option value="left">Sol</option>
					<option value="right">Sağ</option>
					<option value="top">Üst</option>
					<option value="bottom">Alt</option>
				</select>
			</div>

			{/* Metin Pozisyonu */}
			<div className={styles.selectContainer}>
				<label
					style={{ color: '#f1f5f9', display: 'block', marginBottom: '0.5rem' }}
				>
					Metin Pozisyonu:
				</label>
				<select
					className={styles.select}
					value={settings.layoutOptions.textPosition}
					onChange={(e) => handleTextPositionChange(e.target.value)}
				>
					<option value="center">Orta</option>
					<option value="left">Sol</option>
					<option value="right">Sağ</option>
					<option value="top">Üst</option>
					<option value="middle">Orta</option>
					<option value="bottom">Alt</option>
				</select>
			</div>
		</div>
	);
};
