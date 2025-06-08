'use client';

import Link from 'next/link';
import { useAppSelector } from '../../store/hooks';
import styles from './Dashboard.module.scss';

export const Dashboard = () => {
	const { users } = useAppSelector((state) => state.users);

	const dashboardItems = [
		{
			id: 1,
			title: 'Kullanıcı Yönetimi',
			description: 'Kullanıcı ekleme, düzenleme ve silme işlemleri',
			icon: '👥',
			href: '/users',
			count: users.length,
			color: 'blue',
		},
		{
			id: 2,
			title: 'İçerik Yönetimi',
			description: 'Blog yazıları ve sayfaları yönetimi',
			icon: '📝',
			href: '/content',
			count: 0,
			color: 'green',
		},
		{
			id: 3,
			title: 'Medya Galerisi',
			description: 'Resim ve dosya yükleme ve yönetimi',
			icon: '📸',
			href: '/media',
			count: 0,
			color: 'purple',
		},
		{
			id: 4,
			title: 'Analitik',
			description: 'Site istatistikleri ve raporlar',
			icon: '📊',
			href: '/analytics',
			count: 0,
			color: 'orange',
		},
		{
			id: 5,
			title: 'Ayarlar',
			description: 'Sistem ayarları ve konfigürasyon',
			icon: '⚙️',
			href: '/settings',
			count: 0,
			color: 'gray',
		},
	];

	return (
		<div className={styles.dashboard}>
			<div className={styles.header}>
				<h1>Dashboard</h1>
				<p>CMS yönetim paneline hoş geldiniz</p>
			</div>

			<div className={styles.grid}>
				{dashboardItems.map((item) => (
					<Link
						key={item.id}
						href={item.href}
						className={`${styles.card} ${styles[item.color]}`}
					>
						<div className={styles.cardIcon}>{item.icon}</div>
						<div className={styles.cardContent}>
							<h3>{item.title}</h3>
							<p>{item.description}</p>
							{item.count > 0 && (
								<div className={styles.cardCount}>{item.count} öğe</div>
							)}
						</div>
						<div className={styles.cardArrow}>→</div>
					</Link>
				))}
			</div>

			<div className={styles.quickStats}>
				<div className={styles.stat}>
					<span className={styles.statValue}>{users.length}</span>
					<span className={styles.statLabel}>Toplam Kullanıcı</span>
				</div>
				<div className={styles.stat}>
					<span className={styles.statValue}>0</span>
					<span className={styles.statLabel}>İçerik</span>
				</div>
				<div className={styles.stat}>
					<span className={styles.statValue}>0</span>
					<span className={styles.statLabel}>Medya</span>
				</div>
			</div>
		</div>
	);
};
