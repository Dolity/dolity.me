/**
 * Product catalog for /products — bilingual copy + Simple Icons slugs
 * @see https://simpleicons.org/ — CDN: https://cdn.simpleicons.org/{slug}
 */

import { FAVICON_PNG_96 } from '../constants/site-assets';

export type Locale = 'th' | 'en';

export type TechBadge = { label: string; slug?: string };

export type ProductCatalogItem = {
	id: string;
	order: number;
	prodUrl: string | null;
	detailPath: string | null;
	/** Public path e.g. `/yorbo-logo.png` */
	logoSrc?: string;
	period: Record<Locale, string>;
	badge: Record<Locale, string>;
	title: Record<Locale, string>;
	summary: Record<Locale, string>;
	highlights: Record<Locale, string[]>;
	tech: TechBadge[];
};

const catalog: ProductCatalogItem[] = [
	{
		id: 'yorbo',
		order: 1,
		prodUrl: 'https://shorturl.dolity.me/',
		detailPath: 'products/url-shortener',
		logoSrc: '/yorbo-logo.png',
		period: { th: 'เม.ย 2568 – ปัจจุบัน', en: 'Apr 2025 – Present' },
		badge: { th: 'Product', en: 'Product' },
		title: { th: 'Yorbo — ย่อลิงก์ & QR', en: 'Yorbo — short links & QR' },
		summary: {
			th: 'บริการย่อลิงก์สมัยใหม่ สร้างลิงก์สั้น QR โค้ด วิเคราะห์การคลิก และแดชบอร์ดจัดการลิงก์ (ไทย/อังกฤษ) บนโดเมน shorturl.dolity.me',
			en: 'A modern URL shortener: short links, QR codes, click analytics, and a localized dashboard—hosted at shorturl.dolity.me.',
		},
		highlights: {
			th: [
				'สร้างลิงก์สั้น โค้ดกำหนดเองได้ เรียกใช้รีไดเร็กต์ระดับรูท',
				'สร้าง QR แบบฟรี (static/trackable) ปรับสี ขนาด โลโก้กลาง',
				'แดชบอร์ด analytics ช่วงวันที่ กราฟ KPI อุปกรณ์/ช่องทาง',
				'หน้า preview ก่อนไปปลายทาง จัดการประวัติ ค้นหา เรียงลำดับ',
				'Deploy บน Cloudflare Workers + D1 (Drizzle)',
			],
			en: [
				'Short links with optional custom codes; root-level redirects.',
				'Free QR generation (trackable options), styling and logo support.',
				'Analytics dashboard with ranges, KPI cards, device/channel breakdowns.',
				'Safety preview pages, searchable/sortable link history.',
				'Shipped on Cloudflare Workers + D1 with Drizzle ORM.',
			],
		},
		tech: [
			{ slug: 'nextdotjs', label: 'Next.js' },
			{ slug: 'react', label: 'React' },
			{ slug: 'typescript', label: 'TypeScript' },
			{ slug: 'tailwindcss', label: 'Tailwind CSS' },
			{ slug: 'radixui', label: 'Radix UI' },
			{ slug: 'drizzle', label: 'Drizzle ORM' },
			{ slug: 'cloudflare', label: 'Cloudflare' },
			{ slug: 'sqlite', label: 'SQLite / D1' },
			{ label: 'Recharts' },
			{ label: 'next-intl' },
		],
	},
	{
		id: 'hanbo',
		order: 2,
		prodUrl: 'https://bill.dolity.me/',
		detailPath: 'products/billing',
		logoSrc: '/hanbo-logo.png',
		period: { th: 'ก.ย. 2568 – ปัจจุบัน', en: 'Sep 2025 – Present' },
		badge: { th: 'Product', en: 'Product' },
		title: { th: 'Hanbo — หารบิล (Bill splitter)', en: 'Hanbo — bill splitter' },
		summary: {
			th: 'แอปหารบิลบนเว็บ: สแกนใบเสร็จ (OCR) สร้าง QR PromptPay แจ้งเตือน FCM รองรับ Service Charge / VAT โฮสต์ที่ bill.dolity.me',
			en: 'Split bills on the web: receipt OCR, PromptPay QR, FCM reminders, optional service charge/VAT—hosted at bill.dolity.me.',
		},
		highlights: {
			th: [
				'สร้างบิลหน้าเดียว รายการสมาชิก แยกค่าแต่ละรายการ',
				'ถ่าย/อัปโหลดใบเสร็จ → Gemini ดึงรายการอัตโนมัติ',
				'สรุปยอดและ QR PromptPay ต่อคน ติดตามจ่าย/ยังไม่จ่าย',
				'แจ้งเตือนแบบ push (Firebase FCM) ภาษาไทย/อังกฤษ',
				'Nuxt 4 + D1 + Drizzle + deploy Cloudflare',
			],
			en: [
				'Single-page bills with line items and member splits.',
				'Receipt photo → Gemini OCR for line extraction.',
				'Per-person settlement + PromptPay QR; paid/unpaid tracking.',
				'FCM push reminders with Thai/English locales.',
				'Nuxt 4, Drizzle on D1, Cloudflare Workers/Pages.',
			],
		},
		tech: [
			{ slug: 'nuxt', label: 'Nuxt 4' },
			{ slug: 'vuedotjs', label: 'Vue' },
			{ slug: 'typescript', label: 'TypeScript' },
			{ slug: 'tailwindcss', label: 'Tailwind CSS' },
			{ slug: 'daisyui', label: 'DaisyUI' },
			{ slug: 'bun', label: 'Bun' },
			{ slug: 'drizzle', label: 'Drizzle ORM' },
			{ slug: 'cloudflare', label: 'Cloudflare' },
			{ slug: 'firebase', label: 'Firebase (FCM)' },
			{ slug: 'pinia', label: 'Pinia' },
			{ slug: 'google', label: 'Gemini (OCR)' },
		],
	},
	{
		id: 'phiboontour',
		order: 3,
		prodUrl: 'https://phiboontour.com/',
		detailPath: null,
		logoSrc: '/phiboon-tour-logo.png',
		period: { th: 'ธ.ค. 2568 – ปัจจุบัน', en: 'Dec 2025 – Present' },
		badge: { th: 'Product', en: 'Product' },
		title: { th: 'Phiboon Tour (ภิบูรณ์ทัวร์)', en: 'Phiboon Tour' },
		summary: {
			th: 'เว็บไซต์โปรโมตบริการรถตู้ สายอุดรธานี–กรุงเทพ–ชลบุรี–ระยอง รองรับผู้โดยสาร ขนส่งมอเตอร์ไซค์ และขนส่งสินค้า',
			en: 'Landing site for Phiboon Tour van routes across Udon Thani, Bangkok, Chonburi, and Rayong—passenger, bike, and cargo.',
		},
		highlights: {
			th: [
				'รับส่งผู้โดยสาย รถตู้ปรับอากาศ',
				'บริการขนส่งมอเตอร์ไซค์และสินค้าทั่วไป',
				'สองภาษาไทย/อังกฤษ โหมดมืด/สว่าง',
				'แกลเลอรีภาพ แบบ carousel และ lightbox',
				'ช่องทางติดต่อ โทร Line QR Facebook',
			],
			en: [
				'Passenger van transport with AC.',
				'Motorcycle and general cargo shipping.',
				'Bilingual Thai/English UI with dark/light themes.',
				'Image gallery with carousel + lightbox.',
				'Phone, Line QR, and Facebook contact points.',
			],
		},
		tech: [
			{ slug: 'nuxt', label: 'Nuxt 4' },
			{ slug: 'vuedotjs', label: 'Vue' },
			{ slug: 'typescript', label: 'TypeScript' },
			{ slug: 'tailwindcss', label: 'Tailwind CSS' },
			{ label: 'Nuxt UI' },
		],
	},
	{
		id: 'dolity',
		order: 4,
		prodUrl: 'https://dolity.me',
		detailPath: null,
		logoSrc: FAVICON_PNG_96,
		period: { th: 'พ.ค. 2569 – ปัจจุบัน', en: 'May 2026 – Present' },
		badge: { th: 'Hub / Portfolio', en: 'Hub / portfolio' },
		title: { th: 'Dolity', en: 'Dolity' },
		summary: {
			th: 'เว็บหลักแบรนด์ Dolity รวมเรซูเม่ แคตตาล็อกผลิตภัณฑ์ หน้าเกี่ยวกับ และช่องสนับสนุน — โหลดเร็ว รองรับสองภาษา',
			en: 'Dolity’s primary site: resume, product catalog, about, and support—fast, bilingual, and Cloudflare-hosted.',
		},
		highlights: {
			th: [
				'หน้าแรก เรซูเม่ (Markdown content) Tech stack & โปรเจกต์',
				'หน้าผลิตภัณฑ์และลิงก์ไปแอปย่อยของแบรนด์',
				'i18n เส้นทาง /th /en',
				'ธีม DaisyUI สลับมืด/สว่าง',
				'สร้างด้วย Astro 6 + deploy Cloudflare',
			],
			en: [
				'Home, resume with Markdown-backed sections and tech stack.',
				'Product catalog with outbound links to subdomains.',
				'Locale-prefixed routing for Thai and English.',
				'DaisyUI themes with light/dark switching.',
				'Astro 6 + Cloudflare adapter.',
			],
		},
		tech: [
			{ slug: 'astro', label: 'Astro' },
			{ slug: 'tailwindcss', label: 'Tailwind CSS' },
			{ slug: 'daisyui', label: 'DaisyUI' },
			{ slug: 'typescript', label: 'TypeScript' },
			{ slug: 'cloudflare', label: 'Cloudflare' },
			{ slug: 'bun', label: 'Bun' },
		],
	},
];

export function getProductCatalogItem(id: string): ProductCatalogItem | undefined {
	return catalog.find((item) => item.id === id);
}

export function getProductsSorted(): ProductCatalogItem[] {
	return [...catalog].sort((a, b) => a.order - b.order);
}
