'use client';

import React from 'react';
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
	const addProject = () => {
		const newProject: ProjectItem = {
			id: Date.now().toString(),
			name: 'Yeni Proje',
			startDate: new Date().toISOString().split('T')[0],
			endDate: new Date().toISOString().split('T')[0],
			description: 'Proje açıklaması buraya gelecek',
			logoUrl:
				'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
		};
		onUpdate([...data, newProject]);
	};

	const updateProject = (
		id: string,
		field: keyof ProjectItem,
		value: string
	) => {
		const updatedProjects = data.map((project) =>
			project.id === id ? { ...project, [field]: value } : project
		);
		onUpdate(updatedProjects);
	};

	const removeProject = (id: string) => {
		const updatedProjects = data.filter((project) => project.id !== id);
		onUpdate(updatedProjects);
	};

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

	return (
		<div style={sectionStyle}>
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
					style={{
						backgroundColor: '#28a745',
						color: 'white',
						border: 'none',
						borderRadius: '20px',
						padding: '8px 16px',
						cursor: 'pointer',
						fontSize: '14px',
					}}
				>
					➕ Proje Ekle
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
						style={{
							backgroundColor: '#007bff',
							color: 'white',
							border: 'none',
							borderRadius: '20px',
							padding: '10px 20px',
							cursor: 'pointer',
							fontSize: '16px',
						}}
					>
						İlk Projenizi Ekleyin
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
							<InlineEditor
								initialValue={project.startDate}
								onSave={(value) =>
									updateProject(project.id, 'startDate', value)
								}
								style={{ display: 'inline-block' }}
							>
								<span>{formatDate(project.startDate)}</span>
							</InlineEditor>
							<span>-</span>
							<InlineEditor
								initialValue={project.endDate}
								onSave={(value) => updateProject(project.id, 'endDate', value)}
								style={{ display: 'inline-block' }}
							>
								<span>{formatDate(project.endDate)}</span>
							</InlineEditor>
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
