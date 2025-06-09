import React, { useRef } from 'react';
import styles from './SaveSection.module.scss';

interface SaveSectionProps {
	onSave: () => void;
	isLoading: boolean;
	isSaving: boolean;
	showSaveSuccess: boolean;
}

export const SaveSection: React.FC<SaveSectionProps> = ({
	onSave,
	isLoading,
	isSaving,
	showSaveSuccess,
}) => {
	const saveButtonRef = useRef<HTMLButtonElement>(null);

	const handleSave = () => {
		// Kaydet animasyonu
		if (saveButtonRef.current) {
			saveButtonRef.current.style.transform = 'scale(0.95)';
			setTimeout(() => {
				if (saveButtonRef.current) {
					saveButtonRef.current.style.transform = 'scale(1)';
				}
			}, 150);
		}
		onSave();
	};

	return (
		<>
			{/* Loading Overlay */}
			{(isLoading || isSaving) && (
				<div className={styles.loadingOverlay}>
					<div style={{ fontSize: '2rem' }}>⏳</div>
					<span className={styles.loadingText}>
						{isLoading ? 'Yükleniyor...' : 'Kaydediliyor...'}
					</span>
				</div>
			)}

			{/* Success Message */}
			{showSaveSuccess && (
				<div
					className={`${styles.successMessage} ${
						showSaveSuccess
							? styles.successMessageShow
							: styles.successMessageHide
					}`}
				>
					✅ Ayarlar başarıyla kaydedildi!
				</div>
			)}

			{/* Save Button */}
			<div className={styles.saveContainer}>
				<button
					ref={saveButtonRef}
					onClick={handleSave}
					className={`${styles.saveButton} ${
						showSaveSuccess ? styles.saveButtonSuccess : ''
					}`}
					disabled={isSaving}
				>
					{isSaving
						? '⏳ Kaydediliyor...'
						: showSaveSuccess
						? '✅ Kaydedildi!'
						: '💾 Ayarları Kaydet'}
				</button>
			</div>
		</>
	);
};
