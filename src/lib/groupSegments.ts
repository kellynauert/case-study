import type { ContentSegment } from './parseMarkdown';
import { CHAPTER_MEDIA_COLUMNS, getSegmentColumns } from './mediaLayout';

export type LayoutGroup = { type: 'single'; segment: ContentSegment } | { type: 'split'; markdown: ContentSegment; visuals: ContentSegment[] };

function isMarkdownSegment(segment: ContentSegment): segment is { kind: 'markdown'; content: string } {
	return segment.kind === 'markdown' && segment.content.trim().length > 0;
}

export function isVisualSegment(segment: ContentSegment): boolean {
	return segment.kind === 'block' && (segment.block.type === 'image' || segment.block.type === 'image-row');
}

function collectVisualRun(segments: ContentSegment[], start: number): ContentSegment[] {
	const visuals: ContentSegment[] = [];
	let index = start;

	while (index < segments.length && isVisualSegment(segments[index])) {
		visuals.push(segments[index]);
		index++;
	}

	return visuals;
}

function partitionVisuals(visuals: ContentSegment[]) {
	const paired: ContentSegment[] = [];
	const fullWidth: ContentSegment[] = [];

	for (const visual of visuals) {
		const columns = getSegmentColumns(visual) ?? 1;
		if (columns >= CHAPTER_MEDIA_COLUMNS) {
			fullWidth.push(visual);
		} else {
			paired.push(visual);
		}
	}

	return { paired, fullWidth };
}

function pushFullWidthVisuals(groups: LayoutGroup[], visuals: ContentSegment[]) {
	for (const visual of visuals) {
		groups.push({ type: 'single', segment: visual });
	}
}

export function groupSegmentsForLayout(segments: ContentSegment[]): LayoutGroup[] {
	const groups: LayoutGroup[] = [];
	let index = 0;

	while (index < segments.length) {
		const segment = segments[index];

		if (isMarkdownSegment(segment)) {
			const visuals = collectVisualRun(segments, index + 1);
			if (visuals.length > 0) {
				const { paired, fullWidth } = partitionVisuals(visuals);

				if (paired.length > 0) {
					groups.push({ type: 'split', markdown: segment, visuals: paired });
				} else {
					groups.push({ type: 'single', segment });
				}

				pushFullWidthVisuals(groups, fullWidth);
				index += 1 + visuals.length;
				continue;
			}
		}

		if (isVisualSegment(segment)) {
			const columns = getSegmentColumns(segment) ?? 1;

			if (columns < CHAPTER_MEDIA_COLUMNS && index + 1 < segments.length && isMarkdownSegment(segments[index + 1])) {
				groups.push({ type: 'split', markdown: segments[index + 1], visuals: [segment] });
				index += 2;
				continue;
			}
		}

		groups.push({ type: 'single', segment });
		index++;
	}

	return groups;
}
