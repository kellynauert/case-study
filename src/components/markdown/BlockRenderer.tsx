import type { CustomBlock } from '../../lib/parseMarkdown';
import { sections } from '../../lib/site';
import { Stats } from '../blocks/Stats';
import { Metrics } from '../blocks/Metrics';
import { HighlightGrid } from '../blocks/HighlightGrid';
import { ArchitectureCards } from '../blocks/ArchitectureCards';
import { ResultsGrid } from '../blocks/ResultsGrid';
import { QuoteBlock } from '../blocks/QuoteBlock';
import { Callout } from '../blocks/Callout';
import { DeepDive } from '../blocks/DeepDive';
import { ScreenshotPlaceholder } from '../blocks/ScreenshotPlaceholder';
import { ImageBlock } from '../blocks/ImageBlock';
import { Gallery } from '../blocks/Gallery';

interface BlockRendererProps {
	block: CustomBlock;
	compact?: boolean;
	galleryTitle?: string;
	galleryHeaderId?: string;
}

export function BlockRenderer({ block, compact, galleryTitle, galleryHeaderId }: BlockRendererProps) {
	switch (block.type) {
		case 'stats':
			return <Stats items={block.items} />;
		case 'metrics':
			return <Metrics items={block.items} />;
		case 'highlights':
			return <HighlightGrid items={block.items} />;
		case 'cards':
			return <ArchitectureCards items={block.items} />;
		case 'results':
			return <ResultsGrid items={block.items} />;
		case 'quote':
			return <QuoteBlock text={block.text} />;
		case 'callout':
			return <Callout text={block.text} />;
		case 'deep-dive':
			return <DeepDive title={block.title} body={block.body} />;
		case 'screenshot':
			return <ScreenshotPlaceholder label={block.label} compact={compact} />;
		case 'image':
			return <ImageBlock file={block.data.file} caption={block.data.caption} alt={block.data.alt} compact={compact} />;
		case 'gallery':
			return <Gallery images={block.images} compact={compact} title={galleryTitle ?? sections.screens} headerId={galleryHeaderId} />;
		default:
			return null;
	}
}
