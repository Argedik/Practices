'use client';

import React from 'react';
import { InlineEditor } from '../ui/InlineEditor';
import styles from './HeroSection.module.scss';

interface HeroSectionData {
	title: string;
	text: string;
	imageUrl: string;
	position: 'left' | 'right';
	areaNumber: number;
}

interface HeroSectionProps {
	data: HeroSectionData;
	onUpdate: (data: HeroSectionData) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data, onUpdate }) => {
	const handleChange = (
		field: keyof HeroSectionData,
		value: string | number | 'left' | 'right'
	) => {
		onUpdate({ ...data, [field]: value });
	};

	const sectionClass =
		data.position === 'right'
			? `${styles.section} ${styles.sectionReverse}`
			: `${styles.section} ${styles.sectionNormal}`;

	return (
		<div className={sectionClass}>
			{/* Metin İçeriği */}
			<div className={styles.textContent}>
				<InlineEditor
					initialValue={data.title}
					onSave={(value) => handleChange('title', value)}
					className={styles.titleEditor}
				>
					<h1 className={styles.title}>
						{data.title || 'Başlığınızı buraya yazın'}
					</h1>
				</InlineEditor>

				<InlineEditor
					initialValue={data.text}
					onSave={(value) => handleChange('text', value)}
					type="textarea"
					className={styles.textEditor}
				>
					<p className={styles.text}>
						{data.text || 'Açıklama metninizi buraya yazın'}
					</p>
				</InlineEditor>
			</div>

			{/* Görsel İçeriği */}
			<div className={styles.imageContent}>
				<InlineEditor
					initialValue={data.imageUrl}
					onSave={(value) => handleChange('imageUrl', value)}
					type="image"
					className={styles.imageEditor}
				/>
			</div>

			{/* Pozisyon Değiştirme Butonu */}
			<button
				onClick={() =>
					handleChange('position', data.position === 'left' ? 'right' : 'left')
				}
				className={styles.positionButton}
				title={`Görseli ${data.position === 'left' ? 'sağa' : 'sola'} taşı`}
			>
				↔️ Pozisyon Değiştir
			</button>
		</div>
	);
};
