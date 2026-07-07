import { parseFrontmatter, extractSectionParagraph } from './parseMarkdown';

const caseStudyFiles = import.meta.glob('../../content/case-studies/*.md', {
	eager: true,
	query: '?raw',
	import: 'default',
}) as Record<string, string>;

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
