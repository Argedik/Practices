'use client';

import React from 'react';
import { InlineEditor } from '../ui/InlineEditor';
import styles from './SkillsSection.module.scss';

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

	const getScoreClass = (proficiency: number) => {
		if (proficiency >= 80) return styles.high;
		if (proficiency >= 60) return styles.medium;
		return styles.low;
	};

	return (
		<div className={styles.section}>
			<div className={styles.header}>
				<h3 className={styles.title}>💪 Yetenekler</h3>
				<button onClick={addSkill} className={styles.addButton}>
					➕ Yetenek Ekle
				</button>
			</div>

			{data.length === 0 && (
				<div className={styles.emptyState}>
					<div className={styles.emptyIcon}>🎯</div>
					<p className={styles.emptyText}>Henüz yetenek eklenmedi</p>
					<button onClick={addSkill} className={styles.emptyButton}>
						İlk Yeteneğinizi Ekleyin
					</button>
				</div>
			)}

			{data.map((skill) => (
				<div key={skill.id} className={styles.skillItem}>
					<div className={styles.skillContent}>
						{/* Yetenek Adı */}
						<InlineEditor
							initialValue={skill.name}
							onSave={(value) => updateSkill(skill.id, 'name', value)}
							onDelete={() => removeSkill(skill.id)}
							className={styles.skillName}
						>
							<div className={styles.skillName}>{skill.name}</div>
						</InlineEditor>

						{/* Yetkinlik Çubuğu */}
						<div className={styles.skillBar}>
							<div
								className={styles.skillProgress}
								style={{
									width: `${skill.proficiency}%`,
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
							className={styles.skillProficiency}
						>
							<span className={styles.skillProficiency}>
								{skill.proficiency}% yetkinlik
							</span>
						</InlineEditor>
					</div>

					{/* Yetkinlik Skoru */}
					<div className={styles.skillScore}>
						<div
							className={`${styles.scoreValue} ${getScoreClass(
								skill.proficiency
							)}`}
						>
							{skill.proficiency}
						</div>
						<div className={styles.scoreLabel}>/ 100</div>
					</div>
				</div>
			))}
		</div>
	);
};
