'use client';

import { ContentManagement } from '../layout/ContentManagement';

/**
 * Container Component - Basit wrapper
 */
export const ContentManagementContainer = () => {
	// ContentManagement artık kendi verilerini yükler
	return <ContentManagement />;
};
