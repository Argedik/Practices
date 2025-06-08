'use client';

import { useState } from 'react';
import { ContentData } from '../../types/content';
import { ContentManagement } from '../layout/ContentManagement';

/**
 * Container Component - SOLID Prensipleri:
 * - Single Responsibility: Sadece state management
 * - Dependency Inversion: UI component'e data inject eder
 * - Open/Closed: Props interface ile genişletilebilir
 */
export const ContentManagementContainer = () => {
	// Initial state with default values
	const [contentData, setContentData] = useState<ContentData>({
		heroSection: {
			title: '',
			text: '',
			imageUrl: '',
			position: 'left',
			areaNumber: 1,
		},
		skills: [],
		career: [],
		projects: [],
		socialMedia: [],
		contact: {
			phone: { enabled: false, value: '' },
			email: { enabled: false, value: '' },
			whatsapp: false,
			telegram: false,
			position: 'left',
		},
		contactForm: {
			enabled: false,
			recipientEmail: '',
			nameRequired: true,
			phoneRequired: false,
			reasonOptions: [
				'İş için',
				'Teklif için',
				'Dertleşmek için',
				'Muhabbet için',
				'Soru sormak için',
				'Öylesine',
				'Kızdırmak için',
			],
		},
	});

	// Single responsibility: data update logic
	const updateContentData = (newData: Partial<ContentData>) => {
		setContentData((prev) => ({ ...prev, ...newData }));
	};

	// Dependency injection to UI component
	return (
		<ContentManagement
			contentData={contentData}
			onUpdateContent={updateContentData}
		/>
	);
};
