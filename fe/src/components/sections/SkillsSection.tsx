'use client';

import React from 'react';
import { InlineEditor } from '../ui/InlineEditor';

interface Skill {
	id: string;
	name: string;
	proficiency: number;
}

interface SkillsSectionProps {
	data: Skill[];
	onUpdate: (data: Skill[]) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
	data,
	onUpdate,
}) => {
	const addSkill = () => {
		const newSkill: Skill = {
			id: Date.now().toString(),
			name: 'Yeni Yetenek',
			proficiency: 70,
		};
		onUpdate([...data, newSkill]);
	};

	const updateSkill = (
		id: string,
		field: keyof Skill,
		value: string | number
	) => {
		const updatedSkills = data.map((skill) =>
			skill.id === id ? { ...skill, [field]: value } : skill
		);
		onUpdate(updatedSkills);
	};

	const removeSkill = (id: string) => {
		const updatedSkills = data.filter((skill) => skill.id !== id);
		onUpdate(updatedSkills);
	};

	const sectionStyle: React.CSSProperties = {
		padding: '2rem',
		backgroundColor: '#2d3748',
		borderRadius: '12px',
		margin: '1rem 0',
		boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
		border: '1px solid #4a5568',
	};

	const skillItemStyle: React.CSSProperties = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '1.5rem',
		marginBottom: '1rem',
		backgroundColor: '#1a202c',
		borderRadius: '8px',
		border: '1px solid #4a5568',
		position: 'relative',
	};

	const skillBarStyle: React.CSSProperties = {
		width: '100%',
		height: '8px',
		backgroundColor: '#4a5568',
		borderRadius: '4px',
		overflow: 'hidden',
		margin: '0.5rem 0',
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
					💪 Yetenekler
				</h3>
				<button
					onClick={addSkill}
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
					➕ Yetenek Ekle
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
						Henüz yetenek eklenmedi
					</p>
					<button
						onClick={addSkill}
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
						İlk Yeteneğinizi Ekleyin
					</button>
				</div>
			)}

			{data.map((skill) => (
				<div key={skill.id} style={skillItemStyle}>
					<div style={{ flex: 1 }}>
						{/* Yetenek Adı */}
						<InlineEditor
							initialValue={skill.name}
							onSave={(value) => updateSkill(skill.id, 'name', value)}
							onDelete={() => removeSkill(skill.id)}
							style={{
								fontSize: '1.3rem',
								fontWeight: 'bold',
								color: '#e2e8f0',
								marginBottom: '0.5rem',
							}}
						>
							<div
								style={{
									fontSize: '1.3rem',
									fontWeight: 'bold',
									color: '#e2e8f0',
									marginBottom: '0.5rem',
								}}
							>
								{skill.name}
							</div>
						</InlineEditor>

						{/* Yetkinlik Çubuğu */}
						<div style={skillBarStyle}>
							<div
								style={{
									width: `${skill.proficiency}%`,
									height: '100%',
									backgroundColor: '#007bff',
									borderRadius: '4px',
									transition: 'width 0.3s ease',
								}}
							/>
						</div>

						{/* Yetkinlik Yüzdesi */}
						<InlineEditor
							initialValue={skill.proficiency.toString()}
							onSave={(value) => {
								const numValue = parseInt(value);
								if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
									updateSkill(skill.id, 'proficiency', numValue);
								}
							}}
							style={{
								fontSize: '0.9rem',
								color: '#a0aec0',
								display: 'inline-block',
							}}
						>
							<span style={{ fontSize: '0.9rem', color: '#a0aec0' }}>
								{skill.proficiency}% yetkinlik
							</span>
						</InlineEditor>
					</div>

					{/* Yetkinlik Skoru */}
					<div
						style={{
							textAlign: 'center',
							marginLeft: '1rem',
							minWidth: '60px',
						}}
					>
						<div
							style={{
								fontSize: '1.8rem',
								fontWeight: 'bold',
								color:
									skill.proficiency >= 80
										? '#28a745'
										: skill.proficiency >= 60
										? '#ffc107'
										: '#6c757d',
							}}
						>
							{skill.proficiency}
						</div>
						<div style={{ fontSize: '0.8rem', color: '#a0aec0' }}>/ 100</div>
					</div>
				</div>
			))}
		</div>
	);
};
