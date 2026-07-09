import type { GridProps } from '@mui/material/Grid';
import { StudyGrid } from './StudyGrid';
import { StudyCell } from './StudyCell';
import { StudyImage } from './StudyImage';
import { imageSrc } from '../../lib/images';
import type { LightboxImage } from '../../context/LightboxContext';

interface StudyImageRowProps {
	images: { src: string; alt?: string; size?: GridProps['size'] }[];
	defaultSize?: GridProps['size'];
}

export function StudyImageRow({ images, defaultSize = { xs: 12, md: 6 } }: StudyImageRowProps) {
	const gallery: LightboxImage[] = images.map((image) => ({
		src: imageSrc(image.src),
		alt: image.alt ?? image.src,
	}));

	return (
		<StudyGrid spacing={2} sx={{ alignItems: 'flex-start' }}>
			{images.map((image, index) => (
				<StudyCell key={`${image.src}-${index}`} size={image.size ?? defaultSize}>
					<StudyImage src={image.src} alt={image.alt} gallery={gallery} galleryIndex={index} />
				</StudyCell>
			))}
		</StudyGrid>
	);
}
