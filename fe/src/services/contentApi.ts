// ================================
// BACKEND API SERVİSİ
// ================================
// ASP.NET Core backend ile iletişim için API servisleri

// API Base URL
const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// API Response types (future use için tanımlandı)

// Hero Data Interface
export interface HeroData {
	id: string;
	title: string;
	text: string;
	imageUrl: string;
	position: 'left' | 'right';
	areaNumber: number;
	lastUpdated?: string;
}

// Skill Data Interface
export interface SkillData {
	id: string;
	name: string;
	proficiency: number;
	category: string;
	lastUpdated?: string;
}

// Career Data Interface
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
	lastUpdated?: string;
}

// Admin Settings Interface
export interface AdminSettings {
	id: string;
	siteName: string;
	siteDescription: string;
	contactEmail: string;
	socialLinks: {
		github?: string;
		linkedin?: string;
		twitter?: string;
		instagram?: string;
	};
	lastUpdated?: string;
}

// All Content Data Interface
export interface AllContentData {
	hero: HeroData;
	skills: SkillData[];
	career: CareerData[];
	adminSettings: AdminSettings;
}

class ContentApiService {
	private async fetchApi<T>(
		endpoint: string,
		options?: RequestInit
	): Promise<T> {
		try {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 saniye timeout

			const response = await fetch(`${API_BASE_URL}${endpoint}`, {
				headers: {
					'Content-Type': 'application/json',
					...options?.headers,
				},
				signal: controller.signal,
				...options,
			});

			clearTimeout(timeoutId);

			if (!response.ok) {
				throw new Error(`API Error: ${response.status} ${response.statusText}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			if (error instanceof Error && error.name === 'AbortError') {
				console.warn(`API Request timeout for ${endpoint}`);
				throw new Error('Request timeout');
			}
			console.error(`API Request failed for ${endpoint}:`, error);
			throw error;
		}
	}

	// ================================
	// HERO METHODS
	// ================================

	async getHero(): Promise<HeroData> {
		return this.fetchApi<HeroData>('/content/hero');
	}

	async updateHero(hero: HeroData): Promise<HeroData> {
		return this.fetchApi<HeroData>('/content/hero', {
			method: 'PUT',
			body: JSON.stringify(hero),
		});
	}

	// ================================
	// SKILLS METHODS
	// ================================

	async getSkills(): Promise<SkillData[]> {
		return this.fetchApi<SkillData[]>('/content/skills');
	}

	async addSkill(skill: Omit<SkillData, 'id'>): Promise<SkillData> {
		return this.fetchApi<SkillData>('/content/skills', {
			method: 'POST',
			body: JSON.stringify(skill),
		});
	}

	async updateSkill(id: string, skill: SkillData): Promise<SkillData> {
		return this.fetchApi<SkillData>(`/content/skills/${id}`, {
			method: 'PUT',
			body: JSON.stringify(skill),
		});
	}

	async deleteSkill(id: string): Promise<void> {
		await this.fetchApi<void>(`/content/skills/${id}`, {
			method: 'DELETE',
		});
	}

	// ================================
	// CAREER METHODS
	// ================================

	async getCareer(): Promise<CareerData[]> {
		return this.fetchApi<CareerData[]>('/content/career');
	}

	async addCareer(career: Omit<CareerData, 'id'>): Promise<CareerData> {
		return this.fetchApi<CareerData>('/content/career', {
			method: 'POST',
			body: JSON.stringify(career),
		});
	}

	async updateCareer(id: string, career: CareerData): Promise<CareerData> {
		return this.fetchApi<CareerData>(`/content/career/${id}`, {
			method: 'PUT',
			body: JSON.stringify(career),
		});
	}

	async deleteCareer(id: string): Promise<void> {
		await this.fetchApi<void>(`/content/career/${id}`, {
			method: 'DELETE',
		});
	}

	// ================================
	// ADMIN SETTINGS METHODS
	// ================================

	async getAdminSettings(): Promise<AdminSettings> {
		return this.fetchApi<AdminSettings>('/content/admin-settings');
	}

	async updateAdminSettings(
		adminSettings: AdminSettings
	): Promise<AdminSettings> {
		return this.fetchApi<AdminSettings>('/content/admin-settings', {
			method: 'PUT',
			body: JSON.stringify(adminSettings),
		});
	}

	// ================================
	// ALL CONTENT METHOD
	// ================================

	async getAllContent(): Promise<AllContentData> {
		return this.fetchApi<AllContentData>('/content');
	}
}

// Singleton instance
export const contentApi = new ContentApiService();
