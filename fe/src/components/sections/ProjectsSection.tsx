'use client';

import React, { useState, useEffect } from 'react';
import { InlineEditor } from '../ui/InlineEditor';

interface ProjectItem {
	id: string;
	name: string;
	startDate: string;
	endDate: string;
	description: string;
	logoUrl: string;
}

interface ProjectsSectionProps {
	data: ProjectItem[];
	onUpdate: (data: ProjectItem[]) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
	data,
	onUpdate,
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');

	// Proje ekle - Backend'e kaydet
	const addProject = async () => {
		console.log('➕ Proje Ekleme Başlatıldı');
		setIsLoading(true);

		try {
			const newProject = {
				title: 'Yeni Proje',
				description: 'Proje açıklaması buraya gelecek',
				imageUrl: 'https://picsum.photos/200/300',
				projectUrl: '',
				githubUrl: '',
				technologies: [],
				isActive: true,
			};

			console.log('🌐 Backend API\'ye POST isteği gönderiliyor...');
			console.log('📤 Gönderilen Veri:', newProject);

			const response = await fetch('http://localhost:5000/api/portfolio/projects', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newProject),
			});

			console.log('📥 API Yanıtı:', { status: response.status, ok: response.ok });

			if (!response.ok) {
				throw new Error('Proje eklenemedi');
			}

			const addedProject = await response.json();
			console.log('✅ API Başarılı Yanıt:', addedProject);

			// Güncel projeleri çek
			await refreshProjects();
			setSuccessMessage('➕ Proje başarıyla eklendi!');

		} catch (error) {
			console.error('❌ Proje Ekleme Hatası:', error);
			setSuccessMessage('❌ Proje eklenemedi!');
		} finally {
			setIsLoading(false);
		}
	};

	// Proje güncelle - Backend'e kaydet
	const updateProject = async (id: string, field: keyof ProjectItem, value: string) => {
		console.log('✏️ Proje Güncelleme:', { id, field, value });
		setIsLoading(true);

		try {
			// Önce mevcut projeyi bul
			const currentProject = data.find(p => p.id === id);
			if (!currentProject) {
				throw new Error('Proje bulunamadı');
			}

			// Güncellenmiş proje objesi
			const updatedProject = {
				...currentProject,
				[field]: value,
			};

			// Backend formatına çevir
			const backendProject = {
				title: updatedProject.name,
				description: updatedProject.description,
				imageUrl: updatedProject.logoUrl,
				projectUrl: '',
				githubUrl: '',
				technologies: [],
				isActive: true,
			};

			console.log('🌐 Backend API\'ye PUT isteği gönderiliyor...');
			console.log('📤 Gönderilen Veri:', backendProject);

			const response = await fetch(`http://localhost:5000/api/portfolio/projects/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(backendProject),
			});

			console.log('📥 API Yanıtı:', { status: response.status, ok: response.ok });

			if (!response.ok) {
				throw new Error('Proje güncellenemedi');
			}

			console.log('✅ API Başarılı Yanıt');

			// Güncel projeleri çek
			await refreshProjects();
			setSuccessMessage('💾 Proje başarıyla güncellendi!');

		} catch (error) {
			console.error('❌ Proje Güncelleme Hatası:', error);
			setSuccessMessage('❌ Proje güncellenemedi!');
		} finally {
			setIsLoading(false);
		}
	};

	// Proje sil - Backend'den sil
	const removeProject = async (id: string) => {
		console.log('🗑️ Proje Silme:', { id });
		setIsLoading(true);

		try {
			console.log('🌐 Backend API\'ye DELETE isteği gönderiliyor...');

			const response = await fetch(`http://localhost:5000/api/portfolio/projects/${id}`, {
				method: 'DELETE',
			});

			console.log('📥 API Yanıtı:', { status: response.status, ok: response.ok });

			if (!response.ok) {
				throw new Error('Proje silinemedi');
			}

			console.log('✅ API Başarılı Yanıt');

			// Güncel projeleri çek
			await refreshProjects();
			setSuccessMessage('🗑️ Proje başarıyla silindi!');

		} catch (error) {
			console.error('❌ Proje Silme Hatası:', error);
			setSuccessMessage('❌ Proje silinemedi!');
		} finally {
			setIsLoading(false);
		}
	};

	// Güncel projeleri backend'den çek
	const refreshProjects = async () => {
		try {
			console.log('🔄 Güncel projeler çekiliyor...');
			const response = await fetch('http://localhost:5000/api/portfolio/projects');
			
			if (!response.ok) {
				throw new Error('Projeler çekilemedi');
			}

			const backendProjects = await response.json();
			console.log('📦 Backend Projeler:', backendProjects);

			// Backend formatını frontend formatına çevir
			const frontendProjects = backendProjects.map((project: any) => ({
				id: project.id.toString(),
				name: project.title,
				startDate: project.createdDate ? new Date(project.createdDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
				endDate: project.createdDate ? new Date(project.createdDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
				description: project.description,
				logoUrl: project.imageUrl || '',
			}));

			console.log('🔄 Frontend Projeler:', frontendProjects);
			onUpdate(frontendProjects);

		} catch (error) {
			console.error('❌ Projeler Çekme Hatası:', error);
		}
	};

	// Success mesajını otomatik temizle
	useEffect(() => {
		if (successMessage) {
			const timer = setTimeout(() => {
				setSuccessMessage('');
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [successMessage]);

	const sectionStyle: React.CSSProperties = {
		padding: '2rem',
		backgroundColor: '#2d3748',
		borderRadius: '12px',
		margin: '1rem 0',
		boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
		border: '1px solid #4a5568',
	};

	const projectCardStyle: React.CSSProperties = {
		display: 'flex',
		marginBottom: '2rem',
		backgroundColor: '#1a202c',
		borderRadius: '12px',
		overflow: 'hidden',
		border: '1px solid #4a5568',
		boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
	};

	const projectImageStyle: React.CSSProperties = {
		width: '250px',
		height: '180px',
		objectFit: 'cover',
		borderRadius: '8px 0 0 8px',
	};

	const projectContentStyle: React.CSSProperties = {
		flex: 1,
		padding: '1.5rem',
		display: 'flex',
		flexDirection: 'column',
		gap: '1rem',
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('tr-TR', {
			year: 'numeric',
			month: 'long',
		});
	};

	// Tarih seçici component
	const DatePicker = ({ value, onChange, label }: { value: string, onChange: (value: string) => void, label: string }) => {
		const [isEditing, setIsEditing] = useState(false);
		const [tempValue, setTempValue] = useState(value);

		const handleSave = () => {
			onChange(tempValue);
			setIsEditing(false);
		};

		const handleCancel = () => {
			setTempValue(value);
			setIsEditing(false);
		};

		if (isEditing) {
			return (
				<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
					<input
						type="date"
						value={tempValue}
						onChange={(e) => setTempValue(e.target.value)}
						style={{
							padding: '0.25rem 0.5rem',
							border: '1px solid #4a5568',
							borderRadius: '4px',
							backgroundColor: '#2d3748',
							color: '#e2e8f0',
							fontSize: '0.9rem',
						}}
					/>
					<button
						onClick={handleSave}
						style={{
							backgroundColor: '#28a745',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							padding: '0.25rem 0.5rem',
							cursor: 'pointer',
							fontSize: '0.8rem',
						}}
					>
						💾
					</button>
					<button
						onClick={handleCancel}
						style={{
							backgroundColor: '#dc3545',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							padding: '0.25rem 0.5rem',
							cursor: 'pointer',
							fontSize: '0.8rem',
						}}
					>
						❌
					</button>
				</div>
			);
		}

		return (
			<span
				onClick={() => setIsEditing(true)}
				style={{
					cursor: 'pointer',
					padding: '0.25rem 0.5rem',
					borderRadius: '4px',
					backgroundColor: '#374151',
					color: '#e2e8f0',
					fontSize: '0.9rem',
				}}
				title="Tarihi değiştirmek için tıklayın"
			>
				{formatDate(value)}
			</span>
		);
	};

	return (
		<div style={sectionStyle}>
			{/* Success Message */}
			{successMessage && (
				<div
					style={{
						position: 'fixed',
						top: '20px',
						right: '20px',
						backgroundColor: successMessage.includes('❌') ? '#dc3545' : '#28a745',
						color: 'white',
						padding: '1rem 1.5rem',
						borderRadius: '8px',
						boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
						zIndex: 1000,
						fontSize: '0.9rem',
					}}
				>
					{successMessage}
				</div>
			)}

			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: '2rem',
				}}
			>
				<h3 style={{ margin: 0, color: '#e2e8f0', fontSize: '1.8rem' }}>
					🚀 Projeler
				</h3>
				<button
					onClick={addProject}
					disabled={isLoading}
					style={{
						backgroundColor: isLoading ? '#6c757d' : '#28a745',
						color: 'white',
						border: 'none',
						borderRadius: '20px',
						padding: '8px 16px',
						cursor: isLoading ? 'not-allowed' : 'pointer',
						fontSize: '14px',
						opacity: isLoading ? 0.7 : 1,
					}}
				>
					{isLoading ? '⏳ Ekleniyor...' : '➕ Proje Ekle'}
				</button>
			</div>

			{data.length === 0 && (
				<div
					style={{
						textAlign: 'center',
						padding: '3rem',
						color: '#a0aec0',
						border: '2px dashed #4a5568',
						borderRadius: '8px',
						backgroundColor: '#1a202c',
					}}
				>
					<p style={{ fontSize: '1.1rem', margin: '0 0 1rem 0' }}>
						Henüz proje eklenmedi
					</p>
					<button
						onClick={addProject}
						disabled={isLoading}
						style={{
							backgroundColor: isLoading ? '#6c757d' : '#007bff',
							color: 'white',
							border: 'none',
							borderRadius: '20px',
							padding: '10px 20px',
							cursor: isLoading ? 'not-allowed' : 'pointer',
							fontSize: '16px',
							opacity: isLoading ? 0.7 : 1,
						}}
					>
						{isLoading ? '⏳ Ekleniyor...' : 'İlk Projenizi Ekleyin'}
					</button>
				</div>
			)}

			{data.map((project) => (
				<div key={project.id} style={projectCardStyle}>
					{/* Proje Görseli */}
					<div style={{ flexShrink: 0 }}>
						<InlineEditor
							initialValue={project.logoUrl}
							onSave={(value) => updateProject(project.id, 'logoUrl', value)}
							type="image"
							style={{
								width: '250px',
								height: '180px',
								borderRadius: '8px 0 0 8px',
							}}
						>
							<img
								src={project.logoUrl}
								alt={project.name}
								style={projectImageStyle}
							/>
						</InlineEditor>
					</div>

					{/* Proje İçeriği */}
					<div style={projectContentStyle}>
						{/* Proje Adı */}
						<InlineEditor
							initialValue={project.name}
							onSave={(value) => updateProject(project.id, 'name', value)}
							onDelete={() => removeProject(project.id)}
							style={{
								fontSize: '1.5rem',
								fontWeight: 'bold',
								color: '#e2e8f0',
							}}
						>
							<h4
								style={{
									fontSize: '1.5rem',
									fontWeight: 'bold',
									color: '#e2e8f0',
									margin: 0,
								}}
							>
								{project.name}
							</h4>
						</InlineEditor>

						{/* Tarih Aralığı */}
						<div
							style={{
								display: 'flex',
								gap: '1rem',
								alignItems: 'center',
								color: '#a0aec0',
								fontSize: '0.9rem',
							}}
						>
							<span>📅</span>
							<DatePicker
								value={project.startDate}
								onChange={(value) => updateProject(project.id, 'startDate', value)}
								label="Başlangıç"
							/>
							<span>-</span>
							<DatePicker
								value={project.endDate}
								onChange={(value) => updateProject(project.id, 'endDate', value)}
								label="Bitiş"
							/>
						</div>

						{/* Proje Açıklaması */}
						<InlineEditor
							initialValue={project.description}
							onSave={(value) =>
								updateProject(project.id, 'description', value)
							}
							type="textarea"
							style={{
								color: '#cbd5e1',
								lineHeight: '1.6',
								flex: 1,
							}}
						>
							<p
								style={{
									color: '#cbd5e1',
									lineHeight: '1.6',
									margin: 0,
								}}
							>
								{project.description}
							</p>
						</InlineEditor>
					</div>
				</div>
			))}
		</div>
	);
};
