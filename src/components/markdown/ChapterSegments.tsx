import Box from '@mui/material/Box';
import type { Chapter } from '../../lib/parseMarkdown';
import { groupSegmentsForLayout } from '../../lib/groupSegments';
import { CHAPTER_MEDIA_COLUMNS, getSegmentColumns, mediaGridColumnSx } from '../../lib/mediaLayout';
import { MarkdownRenderer } from './MarkdownRenderer';
import { BlockRenderer } from './BlockRenderer';

interface ChapterSegmentsProps {
	chapter: Chapter;
	columnFlow?: boolean;
	wide?: boolean;
	galleryTitle?: string;
	galleryHeaderId?: string;
}

const chapterGridSx = {
	display: 'grid',
	gridTemplateColumns: { xs: '1fr', md: `repeat(${CHAPTER_MEDIA_COLUMNS}, minmax(0, 1fr))` },
	gap: { xs: 2, md: 3 },
	alignItems: 'start',
} as const;

function renderBlockSegment(
	segment: Extract<Chapter['segments'][number], { kind: 'block' }>,
	options: { galleryTitle?: string; galleryHeaderId?: string; inline?: boolean }
) {
	return (
		<BlockRenderer
			block={segment.block}
			inline={options.inline}
			galleryTitle={segment.block.type === 'gallery' ? options.galleryTitle : undefined}
			galleryHeaderId={segment.block.type === 'gallery' ? options.galleryHeaderId : undefined}
		/>
	);
}

export function ChapterSegments({ chapter, columnFlow, wide, galleryTitle, galleryHeaderId }: ChapterSegmentsProps) {
	const groups = groupSegmentsForLayout(chapter.segments);

	return (
		<Box sx={chapterGridSx}>
			{groups.map((group, groupIndex) => {
				if (group.type === 'split') {
					const markdown = group.markdown;
					if (markdown.kind !== 'markdown') return null;

					return (
						<Box
							key={`${chapter.id}-split-${groupIndex}`}
							sx={{
								...mediaGridColumnSx(CHAPTER_MEDIA_COLUMNS),
								display: 'grid',
								gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
								gap: { xs: 2, md: 3 },
								alignItems: 'start',
								my: { xs: 2.5, md: 3 },
							}}>
							<MarkdownRenderer content={markdown.content} wide />
							<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
								{group.visuals.map((segment, visualIndex) =>
									segment.kind === 'block' ?
										<Box key={`${chapter.id}-split-${groupIndex}-visual-${visualIndex}`}>
											{renderBlockSegment(segment, { inline: true })}
										</Box>
									:	null
								)}
							</Box>
						</Box>
					);
				}

				const segment = group.segment;
				const key = `${chapter.id}-single-${groupIndex}`;

				if (segment.kind === 'markdown') {
					return (
						<Box key={key} sx={{ ...mediaGridColumnSx(CHAPTER_MEDIA_COLUMNS), my: { xs: 2.5, md: 3 } }}>
							<MarkdownRenderer content={segment.content} columnFlow={columnFlow} wide={wide} />
						</Box>
					);
				}

				const columns = getSegmentColumns(segment) ?? CHAPTER_MEDIA_COLUMNS;

				return (
					<Box key={key} sx={{ ...mediaGridColumnSx(columns), minWidth: 0, my: columns < CHAPTER_MEDIA_COLUMNS ? 0 : { xs: 2.5, md: 3 } }}>
						{renderBlockSegment(segment, { galleryTitle, galleryHeaderId, inline: columns < CHAPTER_MEDIA_COLUMNS })}
					</Box>
				);
			})}
		</Box>
	);
}
