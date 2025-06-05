import { PortfolioData, User } from '../types';

const API_BASE_URL = 'http://localhost:5152/api';

export class ApiService {
	static async fetchPortfolioData(): Promise<PortfolioData> {
		const response = await fetch(`${API_BASE_URL}/portfolio`);
		if (!response.ok) {
			throw new Error('Portfolio verileri alınamadı');
		}
		return response.json();
	}

	static async fetchUsers(): Promise<User[]> {
		try {
			const portfolioData = await this.fetchPortfolioData();

			// Portfolio verilerini User formatına dönüştür
			const mockUsers: User[] = [
				{
					id: 1,
					name: portfolioData.personal?.fullName || 'No Name',
					email: portfolioData.contact?.email || 'No Email',
					age: portfolioData.about?.yearsExperience || 0,
					city: portfolioData.contact?.location || 'No Location',
				},
			];

			return mockUsers;
		} catch (error) {
			throw new Error('Kullanıcı verileri alınamadı');
		}
	}

	static async createUser(
		_userData: Omit<User, 'id'>
	): Promise<{ success: boolean; message: string }> {
		// Mock implementation - gerçek API'ye göre güncellenecek
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({ success: true, message: 'Kullanıcı başarıyla eklendi' });
			}, 1000);
		});
	}

	static async updateUser(
		_userData: User
	): Promise<{ success: boolean; message: string }> {
		// Mock implementation - gerçek API'ye göre güncellenecek
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({ success: true, message: 'Kullanıcı başarıyla güncellendi' });
			}, 1000);
		});
	}

	static async deleteUser(
		_id: number
	): Promise<{ success: boolean; message: string }> {
		// Mock implementation - gerçek API'ye göre güncellenecek
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({ success: true, message: 'Kullanıcı başarıyla silindi' });
			}, 1000);
		});
	}
}
