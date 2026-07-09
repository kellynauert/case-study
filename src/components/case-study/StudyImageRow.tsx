import { StudyGrid } from './StudyGrid';
import { StudyCell } from './StudyCell';
import { StudyImage } from './StudyImage';
import { imageSrc } from '../../lib/images';
import type { LightboxImage } from '../../context/LightboxContext';

interface StudyImageRowProps {
	images: { src: string; alt?: string }[];
}

export function StudyImageRow({ images }: StudyImageRowProps) {
	const gallery: LightboxImage[] = images.map((image) => ({
		src: imageSrc(image.src),
		alt: image.alt ?? image.src,
	}));

	return (
		<StudyGrid spacing={2}>
			{images.map((image, index) => (
				<StudyCell key={`${image.src}-${index}`} size={{ xs: 12, md: 6 }}>
					<StudyImage src={image.src} alt={image.alt} gallery={gallery} galleryIndex={index} />
				</StudyCell>
			))}
		</StudyGrid>
	);
}
