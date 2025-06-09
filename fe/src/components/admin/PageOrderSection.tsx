import React from 'react';
import { SiteSettings } from '../../types/admin';
import styles from './PageOrderSection.module.scss';

interface PageOrderSectionProps {
	settings: SiteSettings;
	onSettingsChange: (newSettings: Partial<SiteSettings>) => void;
	clickedStates: {
		clickedRadio: string | null;
		clickedGridItem: number | null;
		clickedOrderButton: string | null;
	};
	renderClickableTag: (
		text: string,
		section: string,
		sectionId: string
	) => React.ReactNode;
	onOrderChange: (direction: 'up' | 'down', index: number) => void;
}

export const PageOrderSection: React.FC<PageOrderSectionProps> = ({
	settings,
	onSettingsChange,
	clickedStates,
	renderClickableTag,
	onOrderChange,
}) => {
	const handleOrderClick = (direction: 'up' | 'down', index: number) => {
		onOrderChange(direction, index);

		const newOrder = [...settings.pageOrder];
		if (direction === 'up' && index > 0) {
			[newOrder[index], newOrder[index - 1]] = [
				newOrder[index - 1],
				newOrder[index],
			];
		} else if (direction === 'down' && index < settings.pageOrder.length - 1) {
			[newOrder[index], newOrder[index + 1]] = [
				newOrder[index + 1],
				newOrder[index],
			];
		}

		onSettingsChange({ pageOrder: newOrder });
	};

	return (
		<div className={styles.section}>
			<div className={styles.affectedBadge}>Sıralama</div>
			<h3 className={styles.sectionTitle}>
				<span style={{ fontSize: '1.5rem' }}>📋</span>
				Sayfa Sıralaması
			</h3>

			<div className={styles.tagsContainer}>
				Etkilenen inline editing parçaları:
				{renderClickableTag('Bölüm Sırası', 'hero', 'pageOrder')}
				{renderClickableTag('Navigation Order', 'skills', 'pageOrder')}
				{renderClickableTag('Scroll Priority', 'contact', 'pageOrder')}
			</div>

			<div>
				{settings.pageOrder.map((page, index) => (
					<div key={page} className={styles.pageOrderItem}>
						<div className={styles.pageInfo}>
							<span className={styles.pageNumber}>{index + 1}.</span>
							<span className={styles.pageName}>{page}</span>
						</div>

						<div className={styles.buttonGroup}>
							<button
								onClick={() => handleOrderClick('up', index)}
								disabled={index === 0}
								className={`${styles.orderButton} ${
									clickedStates.clickedOrderButton === `up-${index}`
										? styles.upClicked
										: ''
								}`}
							>
								↑
							</button>
							<button
								onClick={() => handleOrderClick('down', index)}
								disabled={index === settings.pageOrder.length - 1}
								className={`${styles.orderButton} ${
									clickedStates.clickedOrderButton === `down-${index}`
										? styles.downClicked
										: ''
								}`}
							>
								↓
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
