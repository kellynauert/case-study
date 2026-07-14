import type { GridProps } from '@mui/material/Grid';
import { StudyGrid } from './StudyGrid';
import { StudyCell } from './StudyCell';
import { StudyImage } from './StudyImage';
import { imageSrc } from '../../lib/images';
import type { LightboxImage } from '../../context/LightboxContext';

interface StudyImageRowProps {
	images: { src: string; alt?: string; size?: GridProps['size']; maxWidth?: number | string; cols?: number }[];
	defaultSize?: GridProps['size'];
	size?: GridProps['size'];
}

export function StudyImageRow({ images, defaultSize = { xs: 12, md: 6 }, size = 12 }: StudyImageRowProps) {
	const gallery: LightboxImage[] = images.map((image) => ({
		src: imageSrc(image.src),
		alt: image.alt ?? image.src,
	}));

	return (
		<StudyCell size={size}>
			<StudyGrid spacing={2} columnSpacing={{ xs: 3, md: 5 }} sx={{ mb: 0, alignItems: 'flex-start' }}>
				{images.map((image, index) => (
					<StudyCell key={`${image.src}-${index}`} size={image.size ?? defaultSize}>
						<StudyImage
							src={image.src}
							alt={image.alt}
							gallery={gallery}
							galleryIndex={index}
							maxWidth={image.maxWidth}
							cols={image.cols}
						/>
					</StudyCell>
				))}
			</StudyGrid>
		</StudyCell>
	);
}
