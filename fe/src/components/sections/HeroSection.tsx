'use client';

import React from 'react';
import { InlineEditor } from '../ui/InlineEditor';

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

	const sectionStyle: React.CSSProperties = {
		display: 'flex',
		flexDirection: data.position === 'right' ? 'row-reverse' : 'row',
		alignItems: 'center',
		gap: '2rem',
		padding: '2rem',
		minHeight: '400px',
		backgroundColor: '#2d3748',
		borderRadius: '12px',
		margin: '1rem 0',
		position: 'relative',
		border: '1px solid #4a5568',
	};

	const textContentStyle: React.CSSProperties = {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		gap: '1rem',
	};

	const imageContentStyle: React.CSSProperties = {
		flex: 1,
		maxWidth: '400px',
	};

	return (
		<div style={sectionStyle}>
			{/* Metin İçeriği */}
			<div style={textContentStyle}>
				<InlineEditor
					initialValue={data.title}
					onSave={(value) => handleChange('title', value)}
					style={{
						fontSize: '2.5rem',
						fontWeight: 'bold',
						color: '#e2e8f0',
						lineHeight: '1.2',
						marginBottom: '0.5rem',
					}}
				>
					<h1
						style={{
							fontSize: '2.5rem',
							fontWeight: 'bold',
							color: '#e2e8f0',
							lineHeight: '1.2',
							margin: 0,
						}}
					>
						{data.title || 'Başlığınızı buraya yazın'}
					</h1>
				</InlineEditor>

				<InlineEditor
					initialValue={data.text}
					onSave={(value) => handleChange('text', value)}
					type="textarea"
					style={{
						fontSize: '1.1rem',
						color: '#cbd5e1',
						lineHeight: '1.6',
					}}
				>
					<p
						style={{
							fontSize: '1.1rem',
							color: '#cbd5e0',
							lineHeight: '1.6',
							margin: 0,
						}}
					>
						{data.text || 'Açıklama metninizi buraya yazın'}
					</p>
				</InlineEditor>
			</div>

			{/* Görsel İçeriği */}
			<div style={imageContentStyle}>
				<InlineEditor
					initialValue={data.imageUrl}
					onSave={(value) => handleChange('imageUrl', value)}
					type="image"
					style={{
						width: '100%',
						height: '300px',
						borderRadius: '8px',
						overflow: 'hidden',
					}}
				/>
			</div>

			{/* Pozisyon Değiştirme Butonu */}
			<button
				onClick={() =>
					handleChange('position', data.position === 'left' ? 'right' : 'left')
				}
				style={{
					position: 'absolute',
					bottom: '10px',
					left: '50%',
					transform: 'translateX(-50%)',
					backgroundColor: '#007bff',
					color: 'white',
					border: 'none',
					borderRadius: '20px',
					padding: '8px 16px',
					cursor: 'pointer',
					fontSize: '14px',
					zIndex: 1,
				}}
				title={`Görseli ${data.position === 'left' ? 'sağa' : 'sola'} taşı`}
			>
				↔️ Pozisyon Değiştir
			</button>
		</div>
	);
};
