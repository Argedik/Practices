'use client';

import React from 'react';
import { ContentData } from '../../types/content';
import { ContentManagementLayout } from './ContentManagementLayout';

interface ContentManagementProps {
	contentData: ContentData;
	onUpdateContent: (newData: Partial<ContentData>) => void;
}

/**
 * Content Management Orchestrator - SOLID Prensipleri:
 * - Single Responsibility: Sadece layout component'ini wrap eder
 * - Open/Closed: Props ile genişletilebilir
 * - Dependency Inversion: Layout component'e delegate eder
 */
export const ContentManagement: React.FC<ContentManagementProps> = ({
	contentData,
	onUpdateContent,
}) => {
	return (
		<ContentManagementLayout
			contentData={contentData}
			onUpdateContent={onUpdateContent}
		/>
	);
};
