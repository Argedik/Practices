import { NextRequest, NextResponse } from 'next/server';
import { ContentData } from '../../../types/content';

// Basit in-memory storage (demo için)
let contentData: ContentData = {
	heroSection: {
		title: 'Merhaba, Ben [İsminiz]',
		text: 'Full-stack developer olarak modern web teknolojileri ile çalışıyorum.',
		imageUrl:
			'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
		position: 'left',
		areaNumber: 1,
	},
	skills: [
		{ id: '1', name: 'React', proficiency: 90 },
		{ id: '2', name: 'TypeScript', proficiency: 85 },
		{ id: '3', name: 'Next.js', proficiency: 88 },
		{ id: '4', name: 'Node.js', proficiency: 80 },
	],
	career: [
		{
			id: '1',
			company: 'Tech Şirketi',
			position: 'Senior Frontend Developer',
			startDate: '2022',
			endDate: 'Devam ediyor',
			description: 'Modern web uygulamaları geliştirme',
			logoUrl: '',
			location: 'İstanbul',
			workType: 'Hibrit',
			lastUpdated: new Date().toISOString(),
		},
	],
	projects: [],
	socialMedia: [],
	contact: {
		phone: { enabled: true, value: '+90 555 123 4567' },
		email: { enabled: true, value: 'ornek@email.com' },
		whatsapp: true,
		telegram: false,
		position: 'left',
	},
	contactForm: {
		enabled: true,
		recipientEmail: 'ornek@email.com',
		nameRequired: true,
		phoneRequired: false,
		reasonOptions: ['İş için', 'Proje için', 'Genel soru'],
	},
};

export async function GET() {
	return NextResponse.json(contentData);
}

export async function PUT(request: NextRequest) {
	try {
		const updates: Partial<ContentData> = await request.json();

		// Verileri güncelle
		contentData = { ...contentData, ...updates };

		console.log('✅ Content data updated:', updates);

		return NextResponse.json({ success: true, data: contentData });
	} catch (error) {
		console.error('❌ Content update error:', error);
		return NextResponse.json(
			{ success: false, error: 'Update failed' },
			{ status: 500 }
		);
	}
}
