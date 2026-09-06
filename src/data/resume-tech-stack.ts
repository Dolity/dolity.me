/**
 * Resume tech stack section — bilingual headings + tech badges.
 * @see ./tech-icons for the `slug` values a badge may use.
 */
import type { TechBadge } from './products-catalog';

import type { Locale } from '../i18n/path-utils';

export type { Locale };

export type ResumeExpertiseSection = {
	id: string;
	heading: Record<Locale, string>;
	notes?: Record<Locale, string>;
	tech: TechBadge[];
};

const sections: ResumeExpertiseSection[] = [
	{
		id: 'backend',
		heading: { th: 'Backend & APIs', en: 'Backend & APIs' },
		tech: [
			{ slug: 'nodedotjs', label: 'Node.js' },
			{ slug: 'express', label: 'Express.js' },
			{ slug: 'go', label: 'Go (Echo)' },
		],
	},
	{
		id: 'architecture',
		heading: { th: 'Architecture & integrations', en: 'Architecture & integrations' },
		tech: [
			{ slug: 'redis', label: 'Redis' },
			{ slug: 'socketdotio', label: 'WebSockets (Socket.IO)' },
			{ label: 'Webhooks' },
			{ label: 'Bee-Queue' },
			{ label: 'cron' },
			{ label: 'Payment / KYC' },
		],
	},
	{
		id: 'frontend',
		heading: { th: 'Frontend', en: 'Frontend' },
		tech: [
			{ slug: 'vuedotjs', label: 'Vue.js' },
			{ label: 'Vuex' },
			{ slug: 'react', label: 'React' },
			{ slug: 'tailwindcss', label: 'Tailwind CSS' },
			{ slug: 'bootstrap', label: 'Bootstrap' },
		],
	},
	{
		id: 'databases',
		heading: { th: 'Databases', en: 'Databases' },
		tech: [
			{ slug: 'mysql', label: 'MySQL' },
			{ slug: 'postgresql', label: 'PostgreSQL' },
			{ slug: 'mongodb', label: 'MongoDB' },
			{ slug: 'firebase', label: 'Firebase' },
		],
	},
	{
		id: 'devops',
		heading: { th: 'DevOps, tools & automation', en: 'DevOps, tools & automation' },
		notes: {
			th: 'รวม AI-assisted planning และ prompt / agent workflows',
			en: 'Including AI-assisted planning and prompt / agent workflows',
		},
		tech: [
			{ slug: 'docker', label: 'Docker' },
			{ slug: 'kubernetes', label: 'Kubernetes' },
			{ slug: 'linux', label: 'Linux' },
			{ slug: 'git', label: 'Git' },
			{ label: 'Prompt & agents' },
		],
	},
	{
		id: 'explored',
		heading: { th: 'เคยสัมผัส / ขยายต่อ', en: 'Explored / adjacent skills' },
		tech: [
			{ slug: 'flutter', label: 'Flutter' },
			{ slug: 'ethereum', label: 'Web3 / smart contracts' },
			{ slug: 'selenium', label: 'Selenium' },
		],
	},
];

export function getResumeExpertiseSections(): ResumeExpertiseSection[] {
	return sections;
}
