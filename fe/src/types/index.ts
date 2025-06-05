export interface User {
	id: number;
	name: string;
	email: string;
	age: number;
	city: string;
}

export interface FormData {
	name: string;
	email: string;
	age: string;
	city: string;
}

export interface AlertData {
	type: 'success' | 'error';
	message: string;
}

export interface PortfolioPersonal {
	fullName: string;
	title: string;
	profileImage: string;
	cvDownloadLink: string;
	welcomeMessage: string;
}

export interface PortfolioContact {
	email: string;
	phone: string;
	location: string;
	social: {
		linkedIn: string;
		gitHub: string;
		twitter: string;
		instagram: string;
		website: string;
	};
}

export interface PortfolioAbout {
	description: string;
	skills: string[];
	yearsExperience: number;
	projectsCompleted: number;
}

export interface PortfolioData {
	personal: PortfolioPersonal;
	contact: PortfolioContact;
	about: PortfolioAbout;
}
