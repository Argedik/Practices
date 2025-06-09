export interface SiteSettings {
	isOnePageSite: boolean;
	pageOrder: string[];
	navigationStyle: 'scroll' | 'click';
	layoutOptions: {
		imagePosition: 'background' | 'left' | 'right' | 'top' | 'bottom';
		textPosition: 'center' | 'left' | 'right' | 'top' | 'middle' | 'bottom';
		gridMode: boolean;
		fixedAreaEnabled: boolean;
		fixedAreaPosition: number;
	};
}

export interface SelectedTags {
	[sectionId: string]: Set<string>;
}

export interface AdminPanelProps {
	settings: SiteSettings;
	onSettingsChange: (settings: Partial<SiteSettings>) => void;
}

export interface SectionProps {
	settings: SiteSettings;
	onSettingsChange: (settings: Partial<SiteSettings>) => void;
	selectedTags: SelectedTags;
	onTagsChange: (tags: SelectedTags) => void;
	clickedStates?: {
		clickedRadio: string | null;
		clickedGridItem: number | null;
		clickedOrderButton: string | null;
	};
}
