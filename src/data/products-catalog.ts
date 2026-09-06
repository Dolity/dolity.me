/**
 * Product catalog for /products — bilingual copy + tech badges.
 * @see ./tech-icons for the `slug` values a badge may use.
 */

import {
	FAVICON_PNG_96,
	HANBO_LOGO_SRC,
	PHIBOON_TOUR_LOGO_SRC,
	YORBO_LOGO_SRC,
} from '../constants/site-assets';
import type { TechIconSlug } from './tech-icons';
import type { Locale } from '../i18n/path-utils';

export type { Locale };

export type TechBadge = { label: string; slug?: TechIconSlug };

export type ProductCatalogItem = {
	/** Anchor target on the catalog page (`#product-<id>`). Stable — do not rename. */
	id: string;
	/** URL segment for the detail page: /{loc}/products/<slug>. Stable — do not rename. */
	slug: string;
	order: number;
	prodUrl: string | null;
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
		slug: 'url-shortener',
		logoSrc: YORBO_LOGO_SRC,
		period: { th: 'เม.ย. 2568 – ปัจจุบัน', en: 'Apr 2025 – Present' },
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
		slug: 'billing',
		logoSrc: HANBO_LOGO_SRC,
		period: { th: 'ก.ย. 2568 – ปัจจุบัน', en: 'Sep 2025 – Present' },
		badge: { th: 'Product', en: 'Product' },
		title: { th: 'Hanbo — หารบิล', en: 'Hanbo — bill splitter' },
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
			{ slug: 'vuedotjs', label: 'Vue.js' },
			{ slug: 'typescript', label: 'TypeScript' },
			{ slug: 'tailwindcss', label: 'Tailwind CSS' },
			{ slug: 'daisyui', label: 'daisyUI' },
			{ slug: 'bun', label: 'Bun' },
			{ slug: 'drizzle', label: 'Drizzle ORM' },
			{ slug: 'cloudflare', label: 'Cloudflare' },
			{ slug: 'firebase', label: 'Firebase (FCM)' },
			{ slug: 'pinia', label: 'Pinia' },
			{ slug: 'googlegemini', label: 'Gemini (OCR)' },
		],
	},
	{
		id: 'phiboontour',
		slug: 'phiboon-tour',
		order: 3,
		prodUrl: 'https://phiboontour.com/',
		logoSrc: PHIBOON_TOUR_LOGO_SRC,
		period: { th: 'ธ.ค. 2568 – ปัจจุบัน', en: 'Dec 2025 – Present' },
		badge: { th: 'Product', en: 'Product' },
		title: { th: 'ภิบูรณ์ทัวร์', en: 'Phiboon Tour' },
		summary: {
			th: 'เว็บไซต์โปรโมตบริการรถตู้ สายอุดรธานี–กรุงเทพ–ชลบุรี–ระยอง รองรับผู้โดยสาร ขนส่งมอเตอร์ไซค์ และขนส่งสินค้า',
			en: 'Landing site for Phiboon Tour van routes across Udon Thani, Bangkok, Chonburi, and Rayong—passenger, bike, and cargo.',
		},
		highlights: {
			th: [
				'รับส่งผู้โดยสาร รถตู้ปรับอากาศ',
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
			{ slug: 'vuedotjs', label: 'Vue.js' },
			{ slug: 'typescript', label: 'TypeScript' },
			{ slug: 'tailwindcss', label: 'Tailwind CSS' },
			{ label: 'Nuxt UI' },
		],
	},
	{
		id: 'dolity',
		slug: 'dolity',
		order: 4,
		prodUrl: 'https://dolity.me',
		logoSrc: FAVICON_PNG_96,
		period: { th: 'พ.ค. 2569 – ปัจจุบัน', en: 'May 2026 – Present' },
		badge: { th: 'Hub / Portfolio', en: 'Hub / Portfolio' },
		title: { th: 'Dolity', en: 'Dolity' },
		summary: {
			th: 'เว็บที่คุณกำลังอ่านอยู่ รวมเรซูเม่ ผลงาน หน้าเกี่ยวกับ และช่องทางสนับสนุน — โหลดเร็ว สองภาษา',
			en: 'The site you are on: resume, work, about, and support — fast, bilingual, and hosted on Cloudflare.',
		},
		highlights: {
			th: [
				'เรซูเม่ที่แก้ได้จากไฟล์ Markdown ไม่ต้องแตะโค้ด',
				'หน้าผลงานที่ลิงก์ไปแอปจริงบนโดเมนย่อย',
				'สองภาษาเต็มรูปแบบ /th กับ /en',
				'ธีมสว่าง/มืด กับ command palette กด ⌘K',
				'prerender ทุกหน้า เสิร์ฟจาก Cloudflare edge',
			],
			en: [
				'A resume you edit as Markdown, without touching components.',
				'Work pages that link straight out to the live apps.',
				'Fully bilingual under /th and /en.',
				'Light and dark themes, plus a ⌘K command palette.',
				'Every page prerendered and served from the Cloudflare edge.',
			],
		},
		tech: [
			{ slug: 'astro', label: 'Astro' },
			{ slug: 'tailwindcss', label: 'Tailwind CSS' },
			{ slug: 'typescript', label: 'TypeScript' },
			{ slug: 'cloudflare', label: 'Cloudflare' },
			{ slug: 'bun', label: 'Bun' },
		],
	},
];

export function getProductsSorted(): ProductCatalogItem[] {
	return [...catalog].sort((a, b) => a.order - b.order);
}
