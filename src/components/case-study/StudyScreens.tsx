import { Gallery, type GalleryImage } from '../blocks/Gallery';

interface StudyScreensProps {
	images: GalleryImage[];
}

export function StudyScreens({ images }: StudyScreensProps) {
	return <Gallery images={images} title='Screens' />;
}
