'use client';

import { useState, useRef, useEffect } from 'react';

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
	const [showDeleteButton, setShowDeleteButton] = useState(false);
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
			<div style={{ position: 'relative', ...style }} className={className}>
				{type === 'textarea' ? (
					<textarea
						ref={inputRef as React.RefObject<HTMLTextAreaElement>}
						value={value}
						onChange={(e) => setValue(e.target.value)}
						onKeyDown={handleKeyDown}
						onBlur={handleSave}
						style={{
							width: '100%',
							minHeight: '100px',
							border: '2px solid #007bff',
							borderRadius: '4px',
							padding: '8px',
							fontSize: 'inherit',
							fontFamily: 'inherit',
							backgroundColor: '#1a202c',
							color: '#e2e8f0',
						}}
					/>
				) : type === 'image' ? (
					<div>
						<input
							ref={inputRef as React.RefObject<HTMLInputElement>}
							value={value}
							onChange={(e) => setValue(e.target.value)}
							onKeyDown={handleKeyDown}
							onBlur={handleSave}
							placeholder="Görsel URL'si girin..."
							style={{
								width: '100%',
								border: '2px solid #007bff',
								borderRadius: '4px',
								padding: '8px',
								fontSize: 'inherit',
								fontFamily: 'inherit',
								backgroundColor: '#1a202c',
								color: '#e2e8f0',
							}}
						/>
						{value && (
							<img
								src={value}
								alt="Preview"
								style={{
									maxWidth: '200px',
									maxHeight: '200px',
									marginTop: '8px',
									border: '1px solid #ddd',
									borderRadius: '4px',
								}}
							/>
						)}
					</div>
				) : (
					<input
						ref={inputRef as React.RefObject<HTMLInputElement>}
						value={value}
						onChange={(e) => setValue(e.target.value)}
						onKeyDown={handleKeyDown}
						onBlur={handleSave}
						style={{
							width: '100%',
							border: '2px solid #007bff',
							borderRadius: '4px',
							padding: '8px',
							fontSize: 'inherit',
							fontFamily: 'inherit',
							backgroundColor: '#1a202c',
							color: '#e2e8f0',
						}}
					/>
				)}
				<div
					style={{
						position: 'absolute',
						top: '-10px',
						right: '-10px',
						display: 'flex',
						gap: '4px',
					}}
				>
					<button
						onClick={handleSave}
						style={{
							backgroundColor: '#28a745',
							color: 'white',
							border: 'none',
							borderRadius: '50%',
							width: '24px',
							height: '24px',
							cursor: 'pointer',
							fontSize: '12px',
						}}
						title="Kaydet"
					>
						✓
					</button>
					<button
						onClick={handleCancel}
						style={{
							backgroundColor: '#6c757d',
							color: 'white',
							border: 'none',
							borderRadius: '50%',
							width: '24px',
							height: '24px',
							cursor: 'pointer',
							fontSize: '12px',
						}}
						title="İptal"
					>
						✕
					</button>
				</div>
			</div>
		);
	}

	return (
		<div
			style={{
				position: 'relative',
				cursor: 'pointer',
				...style,
			}}
			className={className}
			onClick={() => setIsEditing(true)}
			onMouseEnter={() => setShowDeleteButton(true)}
			onMouseLeave={() => setShowDeleteButton(false)}
		>
			{type === 'image' ? (
				value ? (
					<img
						src={value}
						alt="Content"
						style={{ maxWidth: '100%', height: 'auto' }}
					/>
				) : (
					<div
						style={{
							border: '2px dashed #4a5568',
							padding: '2rem',
							textAlign: 'center',
							color: '#a0aec0',
							backgroundColor: '#1a202c',
						}}
					>
						Görsel eklemek için tıklayın
					</div>
				)
			) : (
				children || value || 'Düzenlemek için tıklayın'
			)}

			{/* Düzenleme ve Silme butonları */}
			<div
				style={{
					position: 'absolute',
					top: '8px',
					right: '8px',
					display: showDeleteButton ? 'flex' : 'none',
					gap: '4px',
				}}
			>
				<button
					onClick={(e) => {
						e.stopPropagation();
						setIsEditing(true);
					}}
					style={{
						backgroundColor: '#007bff',
						color: 'white',
						border: 'none',
						borderRadius: '50%',
						width: '28px',
						height: '28px',
						cursor: 'pointer',
						fontSize: '14px',
					}}
					title="Düzenle"
				>
					✏️
				</button>
				{onDelete && (
					<button
						onClick={(e) => {
							e.stopPropagation();
							handleDelete();
						}}
						style={{
							backgroundColor: '#dc3545',
							color: 'white',
							border: 'none',
							borderRadius: '50%',
							width: '28px',
							height: '28px',
							cursor: 'pointer',
							fontSize: '14px',
						}}
						title="Sil"
					>
						🗑️
					</button>
				)}
			</div>
		</div>
	);
};
