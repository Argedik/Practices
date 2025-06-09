import React from 'react';
import { SelectedTags } from '../types/admin';

export const useClickableTags = (
	selectedTags: SelectedTags,
	setSelectedTags: (tags: SelectedTags) => void
) => {
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

		const inlineTagStyle: React.CSSProperties = {
			display: 'inline-block',
			background: isSelected ? '#f59e0b' : 'rgba(245, 158, 11, 0.1)',
			color: isSelected ? '#0f172a' : '#f59e0b',
			padding: '0.2rem 0.6rem',
			borderRadius: '8px',
			fontSize: '0.7rem',
			fontWeight: isSelected ? '600' : '500',
			margin: '0.2rem',
			border: isSelected
				? '1px solid #f59e0b'
				: '1px solid rgba(245, 158, 11, 0.2)',
			cursor: 'pointer',
			transition: 'all 0.2s ease',
		};

		return (
			<span
				style={inlineTagStyle}
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

	return { renderClickableTag };
};
