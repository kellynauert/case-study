import type { ContentSegment, CustomBlock } from './parseMarkdown';

export const CHAPTER_MEDIA_COLUMNS = 2;

export function parseMediaColumns(value: string | undefined): number {
	if (!value) return 1;

	const parsed = Number.parseInt(value, 10);
	if (!Number.isFinite(parsed)) return 1;

	return Math.min(CHAPTER_MEDIA_COLUMNS, Math.max(1, parsed));
}

export function getBlockColumns(block: CustomBlock): number | null {
	if (block.type === 'image') return block.data.columns ?? 1;
	if (block.type === 'image-row') return block.columns ?? 1;
	return null;
}

export function getSegmentColumns(segment: ContentSegment): number | null {
	return segment.kind === 'block' ? getBlockColumns(segment.block) : null;
}

export function mediaGridColumnSx(columns: number) {
	if (columns >= CHAPTER_MEDIA_COLUMNS) {
		return { gridColumn: '1 / -1' };
	}

	return {
		gridColumn: { xs: '1 / -1', md: `span ${columns}` },
	};
}
