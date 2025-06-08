// Content Management Types - SOLID: Interface Segregation

export interface HeroSectionData {
	title: string;
	text: string;
	imageUrl: string;
	position: 'left' | 'right';
	areaNumber: number;
}

export interface SkillData {
	id: string;
	name: string;
	proficiency: number;
}

export interface CareerData {
	id: string;
	company: string;
	position: string;
	startDate: string;
	endDate: string;
	description: string;
	logoUrl: string;
	location: string;
	workType: string;
	lastUpdated: string;
}

export interface ProjectData {
	id: string;
	name: string;
	startDate: string;
	endDate: string;
	description: string;
	logoUrl: string;
}

export interface SocialMediaData {
	id: string;
	platform: string;
	url: string;
}

export interface ContactData {
	phone: { enabled: boolean; value: string };
	email: { enabled: boolean; value: string };
	whatsapp: boolean;
	telegram: boolean;
	position: 'left' | 'right';
}

export interface ContactFormData {
	enabled: boolean;
	recipientEmail: string;
	nameRequired: boolean;
	phoneRequired: boolean;
	reasonOptions: string[];
}

// Main ContentData interface - composition of smaller interfaces
export interface ContentData {
	heroSection: HeroSectionData;
	skills: SkillData[];
	career: CareerData[];
	projects: ProjectData[];
	socialMedia: SocialMediaData[];
	contact: ContactData;
	contactForm: ContactFormData;
}
