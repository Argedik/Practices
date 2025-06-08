'use client';

import './globals.scss';
import { ReactNode, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { Sidebar } from '../components/navigation/Sidebar';
import { HoverDetector } from '../components/navigation/HoverDetector';

interface RootLayoutProps {
	children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	const [sidebarVisible, setSidebarVisible] = useState(true);

	const handleToggleSidebar = () => {
		setSidebarVisible(!sidebarVisible);
	};

	const handleShowSidebar = () => {
		setSidebarVisible(true);
	};

	const mainStyle: React.CSSProperties = {
		marginLeft: sidebarVisible ? '17%' : '0',
		transition: 'margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
		minHeight: '100vh',
		background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
	};

	const contentStyle: React.CSSProperties = {
		width: '100%',
	};

	return (
		<html lang="tr">
			<head>
				<title>Portfolio CMS - Modern İçerik Yönetimi</title>
				<meta
					name="description"
					content="Modern portfolio ve içerik yönetim sistemi"
				/>
			</head>
			<body suppressHydrationWarning={true}>
				<Provider store={store}>
					{/* Sidebar */}
					<Sidebar isVisible={sidebarVisible} onToggle={handleToggleSidebar} />

					{/* Hover Detector */}
					<HoverDetector
						isVisible={sidebarVisible}
						onShow={handleShowSidebar}
					/>

					{/* Main Content */}
					<main style={mainStyle}>
						<div style={contentStyle}>{children}</div>
					</main>
				</Provider>
			</body>
		</html>
	);
}
