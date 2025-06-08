'use client';

import { Homepage } from '../components/layout/Homepage';

/**
 * Next.js Page Component - SOLID Prensipleri:
 * - Single Responsibility: Sadece routing ve component mounting
 * - Dependency Inversion: Concrete Homepage component'e depend eder
 */
export default function Home() {
	return <Homepage />;
}
