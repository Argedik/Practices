'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './InlineEditor.module.scss';

interface InlineEditorProps {
	initialValue: string;
	onSave: (value: string) => void;
	onDelete?: () => void;
	type?: 'text' | 'textarea' | 'image';
	className?: string;
	style?: React.CSSProperties;
	children?: React.ReactNode;
}

export const InlineEditor: React.FC<InlineEditorProps> = ({
	initialValue,
	onSave,
	onDelete,
	type = 'text',
	className = '',
	style = {},
	children,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [value, setValue] = useState(initialValue);
	const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus();
			inputRef.current.select();
		}
	}, [isEditing]);

	const handleSave = () => {
		onSave(value);
		setIsEditing(false);
	};

	const handleCancel = () => {
		setValue(initialValue);
		setIsEditing(false);
	};

	const handleDelete = () => {
		const confirmed = window.confirm('Bu işlem geri alınamaz. Emin misiniz?');
		if (confirmed && onDelete) {
			onDelete();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && type !== 'textarea') {
			handleSave();
		} else if (e.key === 'Escape') {
			handleCancel();
		}
	};

	if (isEditing) {
		return (
			<div className={`${styles.editMode} ${className}`} style={style}>
				{type === 'textarea' ? (
					<textarea
						ref={inputRef as React.RefObject<HTMLTextAreaElement>}
						value={value}
						onChange={(e) => setValue(e.target.value)}
						onKeyDown={handleKeyDown}
						className={styles.textarea}
					/>
				) : type === 'image' ? (
					<div>
						<input
							ref={inputRef as React.RefObject<HTMLInputElement>}
							value={value}
							onChange={(e) => setValue(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder="Görsel URL'si girin..."
							className={styles.imageInput}
						/>
						{value && (
							<img src={value} alt="Preview" className={styles.imagePreview} />
						)}
					</div>
				) : (
					<input
						ref={inputRef as React.RefObject<HTMLInputElement>}
						value={value}
						onChange={(e) => setValue(e.target.value)}
						onKeyDown={handleKeyDown}
						className={styles.textInput}
					/>
				)}

				{/* Edit modunda butonlar */}
				<div className={styles.actionButtons}>
					<button
						onClick={handleSave}
						className={styles.saveButton}
						title="Kaydet"
					>
						💾
					</button>
					{onDelete && (
						<button
							onClick={handleDelete}
							className={styles.deleteButton}
							title="Sil"
						>
							🗑️
						</button>
					)}
					<button
						onClick={handleCancel}
						className={styles.cancelButton}
						title="İptal"
					>
						❌
					</button>
				</div>
			</div>
		);
	}

	// Normal görünüm - sadece tıklayabilir alan
	return (
		<div
			className={`${styles.container} ${className}`}
			style={style}
			onClick={() => setIsEditing(true)}
			title="Düzenlemek için tıklayın"
		>
			{type === 'image' ? (
				value ? (
					<img src={value} alt="Content" className={styles.image} />
				) : (
					<div className={styles.imagePlaceholder}>
						Görsel eklemek için tıklayın
					</div>
				)
			) : (
				children || value || 'Düzenlemek için tıklayın'
			)}
		</div>
	);
};
