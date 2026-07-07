import Box from '@mui/material/Box';
import type { ContentSegment, CustomBlock } from '../../lib/parseMarkdown';
import { MarkdownRenderer, caseStudyColumnSx } from '../markdown/MarkdownRenderer';
import { BlockRenderer } from '../markdown/BlockRenderer';

interface SectionRow {
	images: CustomBlock[];
	texts: string[];
}

interface SectionContentProps {
	segments: ContentSegment[];
	sectionId: string;
}

function isVisualBlock(block: CustomBlock): boolean {
	return block.type === 'image' || block.type === 'gallery' || block.type === 'screenshot';
}

function buildRows(segments: ContentSegment[]): { rows: SectionRow[]; fullWidthBlocks: CustomBlock[] } {
	const rows: SectionRow[] = [];
	const fullWidthBlocks: CustomBlock[] = [];
	let imageBuffer: CustomBlock[] = [];
	let textBuffer: string[] = [];

	const flushRow = () => {
		if (imageBuffer.length === 0 && textBuffer.length === 0) return;
		rows.push({ images: [...imageBuffer], texts: [...textBuffer] });
		imageBuffer = [];
		textBuffer = [];
	};

	for (const segment of segments) {
		if (segment.kind === 'markdown') {
			textBuffer.push(segment.content);
			continue;
		}

		if (isVisualBlock(segment.block)) {
			if (textBuffer.length > 0) {
				rows.push({ images: [], texts: [...textBuffer] });
				textBuffer = [];
			}
			imageBuffer.push(segment.block);
			continue;
		}

		flushRow();
		fullWidthBlocks.push(segment.block);
	}

	flushRow();
	return { rows, fullWidthBlocks };
}

function SectionRowLayout({ row, rowKey }: { row: SectionRow; rowKey: string }) {
	const hasImages = row.images.length > 0;
	const hasText = row.texts.length > 0;

	if (!hasImages && !hasText) return null;

	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: { xs: '1fr', md: hasImages ? 'minmax(200px, 300px) 1fr' : '1fr' },
				gap: { xs: 3, md: 4 },
				mb: { xs: 4, md: 5 },
				alignItems: 'start',
			}}>
			{hasImages && (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 3,
						position: { md: 'sticky' },
						top: { md: '5rem' },
					}}>
					{row.images.map((block, index) => (
						<BlockRenderer key={`${rowKey}-img-${index}`} block={block} compact />
					))}
				</Box>
			)}

			{hasText && (
				<Box sx={caseStudyColumnSx}>
					{row.texts.map((content, index) => (
						<MarkdownRenderer key={`${rowKey}-md-${index}`} content={content} columns />
					))}
				</Box>
			)}
		</Box>
	);
}

export function SectionContent({ segments, sectionId }: SectionContentProps) {
	const { rows, fullWidthBlocks } = buildRows(segments);

	return (
		<Box>
			{rows.map((row, index) => (
				<SectionRowLayout key={`${sectionId}-row-${index}`} row={row} rowKey={`${sectionId}-row-${index}`} />
			))}

			{fullWidthBlocks.map((block, index) => (
				<Box key={`${sectionId}-full-${index}`} sx={{ mb: 4 }}>
					<BlockRenderer block={block} />
				</Box>
			))}
		</Box>
	);
}
