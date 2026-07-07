import { useMemo } from 'react';
import { splitDocument, extractHeadings } from '../../lib/parseMarkdown';
import { author, project } from '../../lib/site';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { PageShell } from '../Layout/PageShell';
import { TableOfContents } from '../Layout/TableOfContents';
import { Hero } from '../blocks/Hero';
import { Section } from '../blocks/Section';
import { ChapterHeading } from '../blocks/ChapterHeading';
import { MarkdownRenderer } from '../markdown/MarkdownRenderer';
import { BlockRenderer } from '../markdown/BlockRenderer';
import { SectionContent } from '../markdown/SectionContent';

interface CaseStudyContentProps {
	raw: string;
}

export function CaseStudyContent({ raw }: CaseStudyContentProps) {
	const { frontmatter, heroSegments, chapters } = useMemo(() => splitDocument(raw), [raw]);
	const headings = useMemo(() => extractHeadings(chapters), [chapters]);

	const sectionIds = useMemo(() => ['hero', ...headings.map((h) => h.id)], [headings]);
	const activeId = useScrollSpy(sectionIds);

	const title = frontmatter?.title ?? 'Case Study';
	const subtitle = frontmatter?.subtitle ?? '';
	const years = frontmatter?.years ?? '';
	const heroImage = frontmatter?.hero;

	return (
		<PageShell
			navigation={<TableOfContents headings={headings} activeId={activeId} studyTitle={title} />}
			footer={`${author.name} · ${project.name} — ${title}`}>
			<Hero title={title} subtitle={subtitle} years={years} heroImage={heroImage}>
				{heroSegments.map((segment, index) =>
					segment.kind === 'block' ?
						<BlockRenderer key={`hero-block-${index}`} block={segment.block} />
					:	<MarkdownRenderer key={`hero-md-${index}`} content={segment.content} isHero />
				)}
			</Hero>

			{chapters.map((chapter) => (
				<Section key={chapter.id}>
					<ChapterHeading id={chapter.id} title={chapter.title} />
					<SectionContent segments={chapter.segments} sectionId={chapter.id} />
				</Section>
			))}
		</PageShell>
	);
}
