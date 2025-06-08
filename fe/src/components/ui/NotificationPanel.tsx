'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeNotification } from '../../store/slices/uiSlice';
import styles from './NotificationPanel.module.scss';

// Simple typed interface
interface AppState {
	ui: {
		notifications: Array<{
			id: string;
			message: string;
			type: 'success' | 'error' | 'warning' | 'info';
		}>;
	};
}

export const NotificationPanel = () => {
	const dispatch = useDispatch();
	const notifications = useSelector(
		(state: AppState) => state.ui?.notifications || []
	);

	useEffect(() => {
		// Auto-remove notifications after 5 seconds
		const timers = notifications.map((notification) =>
			setTimeout(() => {
				dispatch(removeNotification(notification.id));
			}, 5000)
		);

		return () => {
			timers.forEach((timer: NodeJS.Timeout) => clearTimeout(timer));
		};
	}, [notifications, dispatch]);

	if (notifications.length === 0) return null;

	return (
		<div className={styles.notificationPanel}>
			{notifications.map((notification) => (
				<div
					key={notification.id}
					className={`${styles.notification} ${styles[notification.type]}`}
				>
					<div className={styles.message}>{notification.message}</div>
					<button
						className={styles.closeButton}
						onClick={() => dispatch(removeNotification(notification.id))}
					>
						×
					</button>
				</div>
			))}
		</div>
	);
};
