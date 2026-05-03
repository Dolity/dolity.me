import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const experience = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
	schema: z.object({
		title: z.string(),
		company: z.string(),
		period: z.string(),
		location: z.string().optional(),
		order: z.number().default(0),
	}),
});

const education = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/education' }),
	schema: z.object({
		institution: z.string(),
		degree: z.string(),
		period: z.string(),
		grade: z.string().optional(),
		order: z.number().default(0),
	}),
});

const certifications = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/certifications' }),
	schema: z.object({
		title: z.string(),
		issuer: z.string(),
		issued: z.string(),
		credentialId: z.string().optional(),
		credentialUrl: z.string().url().optional(),
		order: z.number().default(0),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: z.object({
		title: z.string(),
		role: z.string().optional(),
		period: z.string().optional(),
		order: z.number().default(0),
		externalUrl: z.url().optional(),
	}),
});

export const collections = { experience, education, certifications, projects };
