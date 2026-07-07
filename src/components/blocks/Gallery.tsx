import Box from '@mui/material/Box';
import { imageSrc } from '../../lib/parseMarkdown';
import { ImageBlock } from './ImageBlock';
import type { LightboxImage } from '../../context/LightboxContext';

interface GalleryProps {
	images: string[];
	compact?: boolean;
}

export function Gallery({ images, compact = false }: GalleryProps) {
	const gallery: LightboxImage[] = images.map((file) => ({
		src: imageSrc(file),
		alt: file.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
	}));

	if (images.length === 1) {
		return <ImageBlock file={images[0]} gallery={gallery} compact={compact} />;
	}

	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: '1fr',
				gap: 2,
				my: compact ? 0 : 3,
			}}>
			{images.map((file, i) => (
				<ImageBlock key={file} file={file} gallery={gallery} galleryIndex={i} compact={compact} />
			))}
		</Box>
	);
}
