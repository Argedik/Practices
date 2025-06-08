import { UserModel } from '../types';
import { HeroSectionData, CareerData } from '../types/content';

const API_BASE_URL = 'http://localhost:5000/api';

// Admin Panel Settings Types
export interface AdminSettings {
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
	selectedTags: {
		siteType: string[];
		navigation: string[];
		layout: string[];
		pageOrder: string[];
	};
	lastUpdated: string;
}

export class ApiService {
	// User Management (eski fonksiyonlar - uyumluluk için)
	static async fetchUsers(): Promise<UserModel[]> {
		const response = await fetch(`${API_BASE_URL}/users`);
		if (!response.ok) throw new Error('Failed to fetch users');
		return response.json();
	}

	static async createUser(
		userData: Omit<UserModel, 'id' | 'createdDate'>
	): Promise<UserModel> {
		const response = await fetch(`${API_BASE_URL}/users`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userData),
		});
		if (!response.ok) throw new Error('Failed to create user');
		return response.json();
	}

	static async updateUser(userData: UserModel): Promise<UserModel> {
		const response = await fetch(`${API_BASE_URL}/users/${userData.id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userData),
		});
		if (!response.ok) throw new Error('Failed to update user');
		return response.json();
	}

	static async deleteUser(id: number): Promise<void> {
		const response = await fetch(`${API_BASE_URL}/users/${id}`, {
			method: 'DELETE',
		});
		if (!response.ok) throw new Error('Failed to delete user');
	}

	// Content Management (yeni C# backend)
	static async fetchContent() {
		const response = await fetch(`${API_BASE_URL}/content`);
		if (!response.ok) throw new Error('Failed to fetch content');
		return response.json();
	}

	static async updateHero(heroData: Partial<HeroSectionData>) {
		const response = await fetch(`${API_BASE_URL}/content/hero`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(heroData),
		});
		if (!response.ok) throw new Error('Failed to update hero');
		return response.json();
	}

	static async fetchCareer() {
		const response = await fetch(`${API_BASE_URL}/content/career`);
		if (!response.ok) throw new Error('Failed to fetch career');
		return response.json();
	}

	static async addCareer(careerData: Omit<CareerData, 'id' | 'lastUpdated'>) {
		const response = await fetch(`${API_BASE_URL}/content/career`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(careerData),
		});
		if (!response.ok) throw new Error('Failed to add career');
		return response.json();
	}

	static async updateCareer(id: string, careerData: Partial<CareerData>) {
		const response = await fetch(`${API_BASE_URL}/content/career/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(careerData),
		});
		if (!response.ok) throw new Error('Failed to update career');
		return response.json();
	}

	static async deleteCareer(id: string) {
		const response = await fetch(`${API_BASE_URL}/content/career/${id}`, {
			method: 'DELETE',
		});
		if (!response.ok) throw new Error('Failed to delete career');
		return response.json();
	}

	// Admin Settings
	static async fetchAdminSettings(): Promise<AdminSettings> {
		const response = await fetch(`${API_BASE_URL}/content/admin-settings`);
		if (!response.ok) throw new Error('Failed to fetch admin settings');
		return response.json();
	}

	static async updateAdminSettings(
		settings: Partial<AdminSettings>
	): Promise<AdminSettings> {
		const response = await fetch(`${API_BASE_URL}/content/admin-settings`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(settings),
		});
		if (!response.ok) throw new Error('Failed to update admin settings');
		return response.json();
	}
}
