// User Types
export interface UserModel {
	id: number;
	name: string;
	email: string;
	age: number;
	city: string;
	createdDate: string;
}

// Legacy User interface for backward compatibility
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

// Portfolio Types
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

// UI Component Props Types
export interface UserManagementProps {
	users: UserModel[];
	loading: boolean;
	selectedUser: UserModel | null;
	onAddUser: (userData: Omit<UserModel, 'id' | 'createdDate'>) => Promise<void>;
	onUpdateUser: (userData: UserModel) => Promise<void>;
	onDeleteUser: (id: number) => Promise<void>;
	onEditUser: (user: UserModel) => void;
	onCancelEdit: () => void;
}
