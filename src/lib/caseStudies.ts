import { parseFrontmatter, extractSectionParagraph } from './parseMarkdown';

const caseStudyFiles = import.meta.glob('../../content/case-studies/*.md', {
	eager: true,
	query: '?raw',
	import: 'default',
}) as Record<string, string>;

const WORDS_PER_MINUTE = 220;

export interface CaseStudyMeta {
	slug: string;
	title: string;
	subtitle: string;
	summary: string;
	problem: string;
	outcome: string;
	years: string;
	hero?: string;
	theme?: string;
	order: number;
	readingMinutes: number;
}

function slugFromPath(path: string): string {
	const match = path.match(/\/([^/]+)\.md$/);
	return match?.[1] ?? '';
}

function parseOrder(value: string | undefined): number {
	if (!value) return 100;
	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : 100;
}

function estimateReadingMinutes(markdown: string): number {
	const plain = markdown
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/:::[\s\S]*?:::/g, ' ')
		.replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
		.replace(/\[[^\]]*]\([^)]*\)/g, ' ')
		.replace(/[#>*_`~\-|]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

	const words = plain ? plain.split(' ').length : 0;
	return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

function buildMeta(slug: string, raw: string): CaseStudyMeta {
	const { frontmatter, content } = parseFrontmatter(raw);

	return {
		slug,
		title: frontmatter?.title ?? slug,
		subtitle: frontmatter?.subtitle ?? '',
		years: frontmatter?.years ?? '',
		hero: frontmatter?.hero,
		theme: frontmatter?.theme,
		summary: frontmatter?.summary ?? frontmatter?.subtitle ?? '',
		problem: frontmatter?.problem ?? extractSectionParagraph(content, 'The Problem'),
		outcome: frontmatter?.outcome ?? extractSectionParagraph(content, 'Outcome'),
		order: parseOrder(frontmatter?.order),
		readingMinutes: estimateReadingMinutes(content),
	};
}

export function getAllCaseStudies(): CaseStudyMeta[] {
	return Object.entries(caseStudyFiles)
		.filter(([path]) => !path.endsWith('/README.md'))
		.map(([path, raw]) => buildMeta(slugFromPath(path), raw))
		.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getCaseStudyBySlug(slug: string): { meta: CaseStudyMeta; raw: string } | null {
	const entry = Object.entries(caseStudyFiles).find(([path]) => !path.endsWith('/README.md') && slugFromPath(path) === slug);
	if (!entry) return null;

	const [, raw] = entry;
	return { meta: buildMeta(slug, raw), raw };
}

export function getAdjacentCaseStudies(slug: string): {
	previous: CaseStudyMeta | null;
	next: CaseStudyMeta | null;
} {
	const studies = getAllCaseStudies();
	const index = studies.findIndex((study) => study.slug === slug);
	if (index === -1) return { previous: null, next: null };

	return {
		previous: index > 0 ? studies[index - 1] : null,
		next: index < studies.length - 1 ? studies[index + 1] : null,
	};
}

export function formatReadingTime(minutes: number): string {
	return `${minutes} min read`;
}
