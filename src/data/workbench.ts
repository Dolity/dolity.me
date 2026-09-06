/**
 * What is actually open on my machine — the /uses page.
 *
 * Languages and frameworks come from `resume-tech-stack.ts` instead of being
 * repeated here; this file is only the things that page adds: the editor, the
 * terminal, the hardware, the hosting.
 */

import type { Locale } from '../i18n/path-utils';

export type WorkbenchItem = {
	name: string;
	note: Record<Locale, string>;
	url?: string;
};

export type WorkbenchGroup = {
	id: string;
	heading: Record<Locale, string>;
	items: WorkbenchItem[];
};

export const workbench: WorkbenchGroup[] = [
	{
		id: 'editor',
		heading: { th: 'เขียนโค้ด', en: 'Writing code' },
		items: [
			{
				name: 'VS Code',
				url: 'https://code.visualstudio.com/',
				note: {
					th: 'ตัวหลัก ลง extension เท่าที่จำเป็นจริง ๆ ไม่งั้นเปิดช้า',
					en: 'The main one. I keep the extension list short so it still starts fast.',
				},
			},
			{
				name: 'Claude Code',
				url: 'https://claude.com/claude-code',
				note: {
					th: 'ใช้ช่วยงานซ้ำ ๆ กับตอนอ่านโค้ดที่ไม่คุ้น',
					en: 'For the repetitive parts, and for reading code I did not write.',
				},
			},
			{
				name: 'Git + GitHub',
				url: 'https://github.com/dolity',
				note: {
					th: 'ทุกโปรเจกต์อยู่บนนี้ รวมถึงเว็บที่คุณกำลังอ่าน',
					en: 'Everything lives here, including the site you are reading.',
				},
			},
		],
	},
	{
		id: 'terminal',
		heading: { th: 'เทอร์มินัล', en: 'Terminal' },
		items: [
			{
				name: 'WSL2 (Ubuntu)',
				note: {
					th: 'ทำงานบน Windows แต่ทุกอย่างรันใน Linux',
					en: 'I work on Windows, but everything actually runs in Linux.',
				},
			},
			{
				name: 'Bun',
				url: 'https://bun.sh',
				note: {
					th: 'ใช้แทน npm เกือบทั้งหมดแล้ว เร็วกว่าเยอะ',
					en: 'Replaced npm almost everywhere. The speed difference is not subtle.',
				},
			},
		],
	},
	{
		id: 'hosting',
		heading: { th: 'ที่รันของจริง', en: 'Where it runs' },
		items: [
			{
				name: 'Cloudflare Workers',
				url: 'https://workers.cloudflare.com/',
				note: {
					th: 'เว็บนี้กับ Yorbo อยู่บนนี้ พร้อม D1 เป็นฐานข้อมูล',
					en: 'This site and Yorbo, with D1 as the database.',
				},
			},
			{
				name: 'VPS + home server',
				note: {
					th: 'ของที่อยาก self-host เอง จะได้เห็นทั้ง stack ตั้งแต่ต้นจนจบ',
					en: 'For the things I want to self-host, so I see the whole stack end to end.',
				},
			},
		],
	},
];
