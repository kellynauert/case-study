import { slugify } from './slugify';

const BLOCK_REGEX = /:::(\w[\w-]*)\s*\n([\s\S]*?):::/g;
const FRONTMATTER_REGEX = /^---\s*\n([\s\S]*?)\n---\s*\n/;

export interface Frontmatter {
	title: string;
	subtitle: string;
	years: string;
	summary?: string;
	problem?: string;
	outcome?: string;
	hero?: string;
	theme?: string;
	order?: string;
}

export interface StatItem {
	value: string;
	label: string;
}

export interface MetricItem {
	value: string;
	label: string;
	description: string;
}

export interface CardItem {
	title: string;
	description: string;
}

export interface ImageBlockData {
	file: string;
	caption?: string;
	alt?: string;
}

export interface Chapter {
	title: string;
	id: string;
	segments: ContentSegment[];
}

export type CustomBlock =
	| { type: 'stats'; items: StatItem[] }
	| { type: 'metrics'; items: MetricItem[] }
	| { type: 'highlights'; items: string[] }
	| { type: 'cards'; items: CardItem[] }
	| { type: 'results'; items: string[] }
	| { type: 'quote'; text: string }
	| { type: 'callout'; text: string }
	| { type: 'deep-dive'; title: string; body: string }
	| { type: 'screenshot'; label: string }
	| { type: 'image'; data: ImageBlockData }
	| { type: 'gallery'; images: string[] };

export type ContentSegment = { kind: 'markdown'; content: string } | { kind: 'block'; block: CustomBlock };

function parseKeyValueLines(body: string): Record<string, string> {
	const result: Record<string, string> = {};
	for (const line of body.trim().split('\n')) {
		const colonIndex = line.indexOf(':');
		if (colonIndex === -1) continue;
		const key = line.slice(0, colonIndex).trim().toLowerCase();
		const value = line.slice(colonIndex + 1).trim();
		result[key] = value;
	}
	return result;
}

function parsePipeLines(body: string): { left: string; right: string }[] {
	return body
		.trim()
		.split('\n')
		.map((line) => line.trim())
		.filter(Boolean)
		.map((line) => {
			const [left, ...rest] = line.split('|');
			return { left: left.trim(), right: rest.join('|').trim() };
		});
}

function parseMetrics(body: string): MetricItem[] {
	return body
		.split(/^---\s*$/m)
		.map((chunk) => chunk.trim())
		.filter(Boolean)
		.map((chunk) => {
			const lines = chunk
				.split('\n')
				.map((line) => line.trim())
				.filter(Boolean);
			const value = lines[0]?.replace(/^###\s*/, '') ?? '';
			const label = lines[1] ?? '';
			const description = lines.slice(2).join(' ');
			return { value, label, description };
		});
}

function parseDeepDive(body: string): { title: string; body: string } {
	const lines = body.trim().split('\n');
	const titleLine = lines.find((line) => line.startsWith('### '));
	const title = titleLine?.replace(/^###\s*/, '') ?? '';
	const bodyStart = titleLine ? lines.indexOf(titleLine) + 1 : 0;
	const diveBody = lines.slice(bodyStart).join('\n').trim();
	return { title, body: diveBody };
}

function preprocessMarkdown(content: string): string {
	return content.replace(/<!--\s*Screenshot:\s*(.+?)\s*-->/gi, (_, label: string) => `:::screenshot\n${label.trim()}\n:::`);
}

function parseBlock(type: string, body: string): CustomBlock {
	switch (type) {
		case 'stats':
			return {
				type: 'stats',
				items: parsePipeLines(body).map(({ left, right }) => ({
					value: left,
					label: right,
				})),
			};
		case 'metrics':
			return { type: 'metrics', items: parseMetrics(body) };
		case 'highlights':
			return {
				type: 'highlights',
				items: body
					.trim()
					.split('\n')
					.map((line) => line.replace(/^-\s*/, '').trim())
					.filter(Boolean),
			};
		case 'cards':
			return {
				type: 'cards',
				items: parsePipeLines(body).map(({ left, right }) => ({
					title: left,
					description: right,
				})),
			};
		case 'results':
			return {
				type: 'results',
				items: body
					.trim()
					.split('\n')
					.map((line) => line.replace(/^✓\s*/, '').trim())
					.filter(Boolean),
			};
		case 'callout':
			return { type: 'callout', text: body.trim() };
		case 'deep-dive': {
			const dive = parseDeepDive(body);
			return { type: 'deep-dive', title: dive.title, body: dive.body };
		}
		case 'screenshot':
			return { type: 'screenshot', label: body.trim() };
		case 'quote':
			return { type: 'quote', text: body.trim() };
		case 'image': {
			const fields = parseKeyValueLines(body);
			return {
				type: 'image',
				data: {
					file: fields.file ?? '',
					caption: fields.caption,
					alt: fields.alt ?? fields.caption,
				},
			};
		}
		case 'gallery':
			return {
				type: 'gallery',
				images: body
					.trim()
					.split('\n')
					.map((line) => line.trim())
					.filter(Boolean),
			};
		default:
			return { type: 'quote', text: body.trim() };
	}
}

export function parseMarkdown(raw: string): ContentSegment[] {
	const content = preprocessMarkdown(raw);
	const segments: ContentSegment[] = [];
	let lastIndex = 0;

	for (const match of content.matchAll(BLOCK_REGEX)) {
		const index = match.index ?? 0;
		const before = content.slice(lastIndex, index).trim();
		if (before) segments.push({ kind: 'markdown', content: before });

		segments.push({
			kind: 'block',
			block: parseBlock(match[1], match[2]),
		});

		lastIndex = index + match[0].length;
	}

	const remaining = content.slice(lastIndex).trim();
	if (remaining) segments.push({ kind: 'markdown', content: remaining });

	return segments;
}

export function parseFrontmatter(raw: string): { frontmatter: Frontmatter | null; content: string } {
	const match = raw.match(FRONTMATTER_REGEX);
	if (!match) return { frontmatter: null, content: raw };

	const fields = parseKeyValueLines(match[1]);
	const frontmatter: Frontmatter = {
		title: fields.title ?? '',
		subtitle: fields.subtitle ?? '',
		years: fields.years ?? '',
		summary: fields.summary,
		problem: fields.problem,
		outcome: fields.outcome,
		hero: fields.hero,
		theme: fields.theme,
		order: fields.order,
	};

	return {
		frontmatter,
		content: raw.slice(match[0].length).trim(),
	};
}

export function extractSectionParagraph(content: string, heading: string): string {
	const sections = content.split(/^## /m);

	for (const section of sections) {
		const newlineIndex = section.indexOf('\n');
		const title = (newlineIndex === -1 ? section : section.slice(0, newlineIndex)).trim();
		if (title !== heading) continue;

		const body = (newlineIndex === -1 ? '' : section.slice(newlineIndex + 1)).trim();
		const blocks = body.split(/\n\n+/);

		for (const block of blocks) {
			const trimmed = block.trim();
			if (!trimmed || trimmed.startsWith('>') || trimmed === '---' || trimmed.startsWith('###')) continue;
			return trimmed.replace(/\s+/g, ' ');
		}
	}

	return '';
}

export interface HeadingItem {
	id: string;
	title: string;
	level: number;
}

export function extractHeadings(chapters: Chapter[]): HeadingItem[] {
	const headings: HeadingItem[] = [];

	for (const chapter of chapters) {
		headings.push({ id: chapter.id, title: chapter.title, level: 1 });

		for (const segment of chapter.segments) {
			if (segment.kind !== 'markdown') continue;
			const h3Regex = /^### (.+)$/gm;
			for (const match of segment.content.matchAll(h3Regex)) {
				const title = match[1].trim();
				headings.push({ id: slugify(title), title, level: 2 });
			}
		}
	}

	return headings;
}

function splitH1Chapters(content: string): { heroIntro: string; chapters: Chapter[] } | null {
	const parts = content.split(/^# /m).filter(Boolean);
	if (parts.length <= 1) return null;

	const heroIntro = parts[0].replace(/^[^\n]+\n*/, '').trim();
	const chapters = parts.slice(1).map((chunk) => {
		const newlineIndex = chunk.indexOf('\n');
		const title = (newlineIndex === -1 ? chunk : chunk.slice(0, newlineIndex)).trim();
		const body = (newlineIndex === -1 ? '' : chunk.slice(newlineIndex + 1)).trim();
		return {
			title,
			id: slugify(title),
			segments: parseMarkdown(body),
		};
	});

	return { heroIntro, chapters };
}

function splitH2Chapters(content: string): { heroIntro: string; chapters: Chapter[] } {
	const withoutTitle = content.replace(/^#\s+.+\n+/, '');
	const sections = withoutTitle
		.split(/^## /m)
		.map((section) => section.trim())
		.filter(Boolean);

	const startsWithSection = /^##\s+/m.test(withoutTitle.trim());
	const heroIntro =
		startsWithSection ? '' : (
			(sections[0]
				?.replace(/^[^\n]+\n+/, '')
				.replace(/\n---\s*$/, '')
				.trim() ?? '')
		);
	const chapterSections = startsWithSection ? sections : sections.slice(1);

	const chapters = chapterSections.map((chunk) => {
		const newlineIndex = chunk.indexOf('\n');
		const title = (newlineIndex === -1 ? chunk : chunk.slice(0, newlineIndex)).trim();
		const body = (newlineIndex === -1 ? '' : chunk.slice(newlineIndex + 1)).trim();
		return {
			title,
			id: slugify(title),
			segments: parseMarkdown(body),
		};
	});

	return { heroIntro, chapters };
}

export function splitDocument(raw: string): {
	frontmatter: Frontmatter | null;
	heroSegments: ContentSegment[];
	chapters: Chapter[];
} {
	const { frontmatter, content } = parseFrontmatter(raw);
	const h1Split = splitH1Chapters(content);
	const { heroIntro, chapters } = h1Split ?? splitH2Chapters(content);

	return {
		frontmatter,
		heroSegments: parseMarkdown(heroIntro),
		chapters,
	};
}

export function imageSrc(filename: string): string {
	let clean = filename.trim().replace(/^\//, '');
	if (clean.startsWith('images/')) return `/${clean}`;
	return `/images/${clean}`;
}
