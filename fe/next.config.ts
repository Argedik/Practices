import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	async headers() {
		return [
			{
				// Apply these headers to all routes
				source: '/(.*)',
				headers: [
					{
						key: 'Content-Security-Policy',
						value:
							process.env.NODE_ENV === 'development'
								? `
                default-src 'self';
                script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: data:;
                style-src 'self' 'unsafe-inline';
                img-src 'self' data: blob: https:;
                font-src 'self' data:;
                connect-src 'self' ws: wss: http://localhost:5000 http://localhost:3000;
                frame-src 'self';
              `
										.replace(/\s+/g, ' ')
										.trim()
								: `
                default-src 'self';
                script-src 'self' 'unsafe-inline';
                style-src 'self' 'unsafe-inline';
                img-src 'self' data: https:;
                font-src 'self' data:;
                connect-src 'self';
                frame-src 'self';
              `
										.replace(/\s+/g, ' ')
										.trim(),
					},
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin',
					},
				],
			},
		];
	},
	/* config options here */
};

export default nextConfig;
