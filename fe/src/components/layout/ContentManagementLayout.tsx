'use client';

import React, { useState, useEffect } from 'react';
import { ContentData, SkillData, CareerData } from '../../types/content';
import styles from './ContentManagement.module.scss';

interface ContentManagementLayoutProps {
	contentData: ContentData;
	onUpdateContent: (newData: Partial<ContentData>) => void;
}

/**
 * Layout Component - SOLID Prensipleri:
 * - Single Responsibility: Sadece 5 grid layout ve UI rendering
 * - Open/Closed: Props ile genişletilebilir
 * - Dependency Inversion: Container'dan data alır
 */
export const ContentManagementLayout: React.FC<
	ContentManagementLayoutProps
> = ({ contentData, onUpdateContent }) => {
	const [heroForm, setHeroForm] = useState(contentData.heroSection);
	const [newSkill, setNewSkill] = useState({ name: '', proficiency: 50 });
	const [editingSkill, setEditingSkill] = useState<string | null>(null);
	const [editingCareer, setEditingCareer] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState<string>('');

	// contentData değiştiğinde heroForm'u senkronize et
	useEffect(() => {
		setHeroForm(contentData.heroSection);
	}, [contentData.heroSection]);

	// Success mesajını otomatik temizle
	useEffect(() => {
		if (successMessage) {
			const timer = setTimeout(() => {
				setSuccessMessage('');
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [successMessage]);

	// Hero kaydet
	const handleHeroSave = async () => {
		setIsLoading(true);
		try {
			await onUpdateContent({ heroSection: heroForm });
			setSuccessMessage('🎯 Hero kaydedildi!');
		} catch (error) {
			console.error('❌ Hata:', error);
		} finally {
			setIsLoading(false);
		}
	};

	// Skill kaydet
	const handleSkillSave = async (
		skillId: string,
		updatedSkill: Partial<SkillData>
	) => {
		setIsLoading(true);
		try {
			const updatedSkills = contentData.skills.map((skill) =>
				skill.id === skillId ? { ...skill, ...updatedSkill } : skill
			);
			await onUpdateContent({ skills: updatedSkills });
			setSuccessMessage('💪 Skill kaydedildi!');
			setEditingSkill(null);
		} catch (error) {
			console.error('❌ Hata:', error);
		} finally {
			setIsLoading(false);
		}
	};

	// Skill sil
	const handleSkillDelete = async (skillId: string) => {
		setIsLoading(true);
		try {
			const updatedSkills = contentData.skills.filter(
				(skill) => skill.id !== skillId
			);
			await onUpdateContent({ skills: updatedSkills });
			setSuccessMessage('🗑️ Skill silindi!');
			setEditingSkill(null);
		} catch (error) {
			console.error('❌ Hata:', error);
		} finally {
			setIsLoading(false);
		}
	};

	// Yeni skill ekle
	const handleAddSkill = async () => {
		if (!newSkill.name.trim()) return;

		setIsLoading(true);
		try {
			const skill = {
				id: `skill-${Date.now()}`,
				name: newSkill.name,
				proficiency: newSkill.proficiency,
			};
			const updatedSkills = [...contentData.skills, skill];
			await onUpdateContent({ skills: updatedSkills });
			setNewSkill({ name: '', proficiency: 50 });
			setSuccessMessage('➕ Yeni skill eklendi!');
		} catch (error) {
			console.error('❌ Hata:', error);
		} finally {
			setIsLoading(false);
		}
	};

	// Career kaydet
	const handleCareerSave = async (
		careerId: string,
		updatedCareer: Partial<CareerData>
	) => {
		setIsLoading(true);
		try {
			const updatedCareers = contentData.career.map((career) =>
				career.id === careerId ? { ...career, ...updatedCareer } : career
			);
			await onUpdateContent({ career: updatedCareers });
			setSuccessMessage('💼 Kariyer kaydedildi!');
			setEditingCareer(null);
		} catch (error) {
			console.error('❌ Hata:', error);
		} finally {
			setIsLoading(false);
		}
	};

	// Career sil
	const handleCareerDelete = async (careerId: string) => {
		setIsLoading(true);
		try {
			const updatedCareers = contentData.career.filter(
				(career) => career.id !== careerId
			);
			await onUpdateContent({ career: updatedCareers });
			setSuccessMessage('🗑️ Kariyer silindi!');
			setEditingCareer(null);
		} catch (error) {
			console.error('❌ Hata:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={styles.contentManagement}>
			{/* Success Message */}
			{successMessage && (
				<div className={`${styles.successMessage} slideInRight`}>
					{successMessage}
				</div>
			)}

			<div className={styles.gridContainer}>
				{/* Hero Section */}
				<div className={`${styles.section} ${styles.heroContentSection}`}>
					<h3>🎯 Hero Bölümü</h3>

					<div className="form-group">
						<label>Başlık:</label>
						<input
							type="text"
							className="form-input"
							value={heroForm.title}
							onChange={(e) =>
								setHeroForm({ ...heroForm, title: e.target.value })
							}
						/>
					</div>

					<div className="form-group">
						<label>Açıklama:</label>
						<textarea
							className="form-textarea"
							value={heroForm.text}
							onChange={(e) =>
								setHeroForm({ ...heroForm, text: e.target.value })
							}
							rows={3}
						/>
					</div>

					<div className="form-group">
						<label>Resim URL:</label>
						<input
							type="url"
							className="form-input"
							value={heroForm.imageUrl}
							onChange={(e) =>
								setHeroForm({ ...heroForm, imageUrl: e.target.value })
							}
						/>
					</div>

					<div className="form-group">
						<label>Pozisyon:</label>
						<select
							className="form-select"
							value={heroForm.position}
							onChange={(e) =>
								setHeroForm({
									...heroForm,
									position: e.target.value as 'left' | 'right',
								})
							}
						>
							<option value="left">Sol</option>
							<option value="right">Sağ</option>
						</select>
					</div>

					<button
						type="button"
						className="btn btn--primary"
						onClick={handleHeroSave}
						disabled={isLoading}
					>
						{isLoading ? '⏳ Kaydediliyor...' : '💾 Kaydet'}
					</button>
				</div>

				{/* Skills Section */}
				<div className={`${styles.section} ${styles.skillsContentSection}`}>
					<h3>💪 Yetenekler</h3>

					{/* Yeni Skill Ekleme */}
					<div
						style={{
							marginBottom: '2rem',
							padding: '1rem',
							background: '#f8f9fa',
							borderRadius: '8px',
						}}
					>
						<h4>Yeni Yetenek Ekle</h4>
						<div className="form-group">
							<input
								type="text"
								className="form-input"
								value={newSkill.name}
								onChange={(e) =>
									setNewSkill({ ...newSkill, name: e.target.value })
								}
								placeholder="Yetenek adı..."
							/>
						</div>
						<div className="form-group">
							<label>Yetkinlik: {newSkill.proficiency}%</label>
							<input
								type="range"
								min="0"
								max="100"
								value={newSkill.proficiency}
								onChange={(e) =>
									setNewSkill({
										...newSkill,
										proficiency: parseInt(e.target.value),
									})
								}
								style={{ width: '100%' }}
							/>
						</div>
						<button
							type="button"
							className="btn btn--success"
							onClick={handleAddSkill}
							disabled={isLoading || !newSkill.name.trim()}
						>
							{isLoading ? '⏳ Ekleniyor...' : '➕ Ekle'}
						</button>
					</div>

					{/* Mevcut Skills */}
					<div>
						<h4>Mevcut Yetenekler</h4>
						{contentData.skills.map((skill) => (
							<SkillItem
								key={skill.id}
								skill={skill}
								isEditing={editingSkill === skill.id}
								onEdit={() => setEditingSkill(skill.id)}
								onCancel={() => setEditingSkill(null)}
								onSave={(updatedSkill) =>
									handleSkillSave(skill.id, updatedSkill)
								}
								onDelete={() => handleSkillDelete(skill.id)}
								isLoading={isLoading}
							/>
						))}
					</div>
				</div>

				{/* Career Section */}
				<div className={`${styles.section} ${styles.careerContentSection}`}>
					<h3>💼 Kariyer</h3>
					{contentData.career.map((career) => (
						<CareerItem
							key={career.id}
							career={career}
							isEditing={editingCareer === career.id}
							onEdit={() => setEditingCareer(career.id)}
							onCancel={() => setEditingCareer(null)}
							onSave={(updatedCareer) =>
								handleCareerSave(career.id, updatedCareer)
							}
							onDelete={() => handleCareerDelete(career.id)}
							isLoading={isLoading}
						/>
					))}
				</div>

				{/* Projects Section */}
				<div className={`${styles.section} ${styles.projectsContentSection}`}>
					<h3>🚀 Projeler</h3>
					<p>Proje yönetimi burada olacak</p>
				</div>

				{/* Contact Section */}
				<div className={`${styles.section} ${styles.contactContentSection}`}>
					<h3>📞 İletişim</h3>
					<p>İletişim yönetimi burada olacak</p>
				</div>
			</div>
		</div>
	);
};

// Skill Item Component
const SkillItem: React.FC<{
	skill: SkillData;
	isEditing: boolean;
	onEdit: () => void;
	onCancel: () => void;
	onSave: (skill: Partial<SkillData>) => void;
	onDelete: () => void;
	isLoading: boolean;
}> = ({ skill, isEditing, onEdit, onCancel, onSave, onDelete, isLoading }) => {
	const [editForm, setEditForm] = useState({
		name: skill.name,
		proficiency: skill.proficiency,
	});

	if (isEditing) {
		return (
			<div
				className="card"
				style={{
					margin: '0.5rem 0',
					padding: '1rem',
					border: '2px solid #007bff',
				}}
			>
				<div className="form-group">
					<input
						type="text"
						className="form-input"
						value={editForm.name}
						onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
					/>
				</div>
				<div className="form-group">
					<label>Yetkinlik: {editForm.proficiency}%</label>
					<input
						type="range"
						min="0"
						max="100"
						value={editForm.proficiency}
						onChange={(e) =>
							setEditForm({
								...editForm,
								proficiency: parseInt(e.target.value),
							})
						}
						style={{ width: '100%' }}
					/>
				</div>
				<div style={{ display: 'flex', gap: '0.5rem' }}>
					<button
						type="button"
						className="btn btn--primary btn--small"
						onClick={() => onSave(editForm)}
						disabled={isLoading}
					>
						{isLoading ? '⏳' : '💾'} Kaydet
					</button>
					<button
						type="button"
						className="btn btn--danger btn--small"
						onClick={onDelete}
						disabled={isLoading}
					>
						{isLoading ? '⏳' : '🗑️'} Sil
					</button>
					<button
						type="button"
						className="btn btn--secondary btn--small"
						onClick={onCancel}
						disabled={isLoading}
					>
						❌ İptal
					</button>
				</div>
			</div>
		);
	}

	return (
		<div
			className="card"
			style={{ margin: '0.5rem 0', padding: '1rem', cursor: 'pointer' }}
			onClick={onEdit}
		>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<div>
					<strong>{skill.name}</strong>
					<div style={{ color: 'var(--text-secondary)' }}>
						Yetkinlik: {skill.proficiency}%
					</div>
				</div>
				<div style={{ color: '#007bff', fontSize: '0.8rem' }}>
					👆 Düzenlemek için tıklayın
				</div>
			</div>
		</div>
	);
};

// Career Item Component
const CareerItem: React.FC<{
	career: CareerData;
	isEditing: boolean;
	onEdit: () => void;
	onCancel: () => void;
	onSave: (career: Partial<CareerData>) => void;
	onDelete: () => void;
	isLoading: boolean;
}> = ({ career, isEditing, onEdit, onCancel, onSave, onDelete, isLoading }) => {
	const [editForm, setEditForm] = useState({
		company: career.company,
		position: career.position,
		startDate: career.startDate,
		endDate: career.endDate,
		description: career.description,
		location: career.location,
		workType: career.workType,
	});

	if (isEditing) {
		return (
			<div
				className="card"
				style={{
					margin: '0.5rem 0',
					padding: '1rem',
					border: '2px solid #007bff',
				}}
			>
				<div className="form-group">
					<label>Şirket:</label>
					<input
						type="text"
						className="form-input"
						value={editForm.company}
						onChange={(e) =>
							setEditForm({ ...editForm, company: e.target.value })
						}
					/>
				</div>
				<div className="form-group">
					<label>Pozisyon:</label>
					<input
						type="text"
						className="form-input"
						value={editForm.position}
						onChange={(e) =>
							setEditForm({ ...editForm, position: e.target.value })
						}
					/>
				</div>
				<div style={{ display: 'flex', gap: '1rem' }}>
					<div className="form-group" style={{ flex: 1 }}>
						<label>Başlangıç:</label>
						<input
							type="text"
							className="form-input"
							value={editForm.startDate}
							onChange={(e) =>
								setEditForm({ ...editForm, startDate: e.target.value })
							}
						/>
					</div>
					<div className="form-group" style={{ flex: 1 }}>
						<label>Bitiş:</label>
						<input
							type="text"
							className="form-input"
							value={editForm.endDate}
							onChange={(e) =>
								setEditForm({ ...editForm, endDate: e.target.value })
							}
						/>
					</div>
				</div>
				<div className="form-group">
					<label>Açıklama:</label>
					<textarea
						className="form-textarea"
						value={editForm.description}
						onChange={(e) =>
							setEditForm({ ...editForm, description: e.target.value })
						}
						rows={3}
					/>
				</div>
				<div style={{ display: 'flex', gap: '0.5rem' }}>
					<button
						type="button"
						className="btn btn--primary btn--small"
						onClick={() => onSave(editForm)}
						disabled={isLoading}
					>
						{isLoading ? '⏳' : '💾'} Kaydet
					</button>
					<button
						type="button"
						className="btn btn--danger btn--small"
						onClick={onDelete}
						disabled={isLoading}
					>
						{isLoading ? '⏳' : '🗑️'} Sil
					</button>
					<button
						type="button"
						className="btn btn--secondary btn--small"
						onClick={onCancel}
						disabled={isLoading}
					>
						❌ İptal
					</button>
				</div>
			</div>
		);
	}

	return (
		<div
			className="card"
			style={{ margin: '0.5rem 0', padding: '1rem', cursor: 'pointer' }}
			onClick={onEdit}
		>
			<div style={{ position: 'relative' }}>
				<strong>{career.position}</strong>
				<div style={{ color: 'var(--accent-orange)', fontWeight: 'bold' }}>
					{career.company}
				</div>
				<div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
					📅 {career.startDate} - {career.endDate}
				</div>
				<div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
					📍 {career.location} • {career.workType}
				</div>
				<p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
					{career.description}
				</p>
				<div
					style={{
						position: 'absolute',
						top: '0',
						right: '0',
						color: '#007bff',
						fontSize: '0.8rem',
					}}
				>
					👆 Düzenlemek için tıklayın
				</div>
			</div>
		</div>
	);
};
