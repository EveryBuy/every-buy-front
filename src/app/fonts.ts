import { Inter } from 'next/font/google';

export const myFont = Inter({
	weight: ['400', '500', '600', '700'],
	style: ['normal'],
	subsets: ['latin'],
	display: 'swap',
});

// import localFont from 'next/font/local';

// export const myFont = localFont({
// 	src: [
// 		{
// 			path: '../../public/fonts/Inter-Regular.woff2',
// 			weight: '400',
// 			style: 'normal',
// 		},
// 		{
// 			path: '../../public/fonts/Inter-SemiBold.woff2',
// 			weight: '600',
// 			style: 'normal',
// 		},
// 		{
// 			path: '../../public/fonts/Inter-Bold.woff2',
// 			weight: '700',
// 			style: 'normal',
// 		},
// 	],
// });