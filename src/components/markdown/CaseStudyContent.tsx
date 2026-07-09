import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';
import { splitDocument, extractHeadings, type Chapter } from '../../lib/parseMarkdown';
import { contentGridGap, displayTitleSx, secondaryTextSx } from '../../lib/styles';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { PageShell } from '../Layout/PageShell';
import { TableOfContents } from '../Layout/TableOfContents';
import { Section } from '../blocks/Section';
import { ChapterHeading } from '../blocks/ChapterHeading';
import { ChapterSegments } from '../markdown/ChapterSegments';
import { MarkdownRenderer } from '../markdown/MarkdownRenderer';
import { BlockRenderer } from '../markdown/BlockRenderer';
import { CaseStudyPager } from '../markdown/CaseStudyPager';
import { tokens } from '../../theme/theme';

interface CaseStudyContentProps {
	raw: string;
	slug: string;
}

function chapterContainsVisual(chapter: Chapter): boolean {
	return chapter.segments.some(
		(segment) =>
			segment.kind === 'block' && (segment.block.type === 'image' || segment.block.type === 'image-row' || segment.block.type === 'gallery')
	);
}

function chapterSpansFullWidth(chapter: Chapter): boolean {
	if (chapter.segments.length > 0 && chapter.segments.every((segment) => segment.kind === 'block')) {
		return true;
	}
	return chapterContainsVisual(chapter);
}

function isGalleryOnlyChapter(chapter: Chapter): boolean {
	return (
		chapter.title === 'Gallery' &&
		chapter.segments.length === 1 &&
		chapter.segments[0].kind === 'block' &&
		chapter.segments[0].block.type === 'gallery'
	);
}

function renderChapterSegments(chapter: Chapter, options: { columnFlow?: boolean; wide?: boolean; galleryTitle?: string; galleryHeaderId?: string }) {
	return (
		<ChapterSegments
			chapter={chapter}
			columnFlow={options.columnFlow}
			wide={options.wide}
			galleryTitle={options.galleryTitle}
			galleryHeaderId={options.galleryHeaderId}
		/>
	);
}

export function CaseStudyContent({ raw, slug }: CaseStudyContentProps) {
	const { frontmatter, heroSegments, chapters } = useMemo(() => splitDocument(raw), [raw]);
	const headings = useMemo(() => extractHeadings(chapters), [chapters]);
	const sectionIds = useMemo(() => headings.map((heading) => heading.id), [headings]);
	const activeId = useScrollSpy(sectionIds);
	const bodyChapters = chapters;

	const title = frontmatter?.title ?? 'Showcase';
	const subtitle = frontmatter?.subtitle ?? '';

	return (
		<>
			<TableOfContents headings={headings} activeId={activeId} studyTitle={title} mobileOnly />
			<PageShell footer={<CaseStudyPager slug={slug} currentTitle={title} />}>
				<Box sx={{ mb: { xs: 2.5, md: 3 } }}>
					<Typography component='h1' sx={{ ...displayTitleSx, mb: subtitle ? 1.25 : 0 }}>
						{title}
					</Typography>
					{subtitle && <Typography sx={{ maxWidth: tokens.layout.readableWidth, ...secondaryTextSx }}>{subtitle}</Typography>}
				</Box>

				{heroSegments.length > 0 && (
					<Section>
						{heroSegments.map((segment, index) =>
							segment.kind === 'block' ?
								<BlockRenderer key={`intro-block-${index}`} block={segment.block} />
							:	<MarkdownRenderer key={`intro-md-${index}`} content={segment.content} columnFlow />
						)}
					</Section>
				)}

				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
						gap: contentGridGap,
						alignItems: 'start',
					}}>
					{bodyChapters.map((chapter) => {
						const galleryOnly = isGalleryOnlyChapter(chapter);

						return (
							<Box key={chapter.id} sx={chapterSpansFullWidth(chapter) ? { gridColumn: '1 / -1' } : undefined}>
								<Section>
									{!galleryOnly && <ChapterHeading id={chapter.id} title={chapter.title} />}
									{renderChapterSegments(chapter, {
										wide: true,
										galleryTitle: galleryOnly ? chapter.title : undefined,
										galleryHeaderId: galleryOnly ? chapter.id : undefined,
									})}
								</Section>
							</Box>
						);
					})}
				</Box>
			</PageShell>
		</>
	);
}
