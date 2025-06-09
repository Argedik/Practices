import React from 'react';
import styles from './AdminPanelHeader.module.scss';

export const AdminPanelHeader: React.FC = () => {
	return (
		<div className={styles.header}>
			<h1 className={styles.title}>⚙️ Admin Panel</h1>
		</div>
	);
};
