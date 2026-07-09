import Box from '@mui/material/Box';
import { useLightbox, type LightboxImage } from '../../context/LightboxContext';
import { imageSrc } from '../../lib/images';
import { tokens } from '../../theme/theme';

interface StudyImageProps {
	src: string;
	alt?: string;
	gallery?: LightboxImage[];
	galleryIndex?: number;
	fullWidth?: boolean;
}

export function StudyImage({ src, alt, gallery, galleryIndex = 0, fullWidth = false }: StudyImageProps) {
	const { open } = useLightbox();
	const resolved = imageSrc(src);
	const label = alt ?? src;

	const handleOpen = () => {
		const images = gallery ?? [{ src: resolved, alt: label }];
		open(images, gallery ? galleryIndex : 0);
	};

	return (
		<Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: fullWidth ? 'center' : 'stretch' }}>
			<Box
				component='button'
				type='button'
				onClick={handleOpen}
				aria-label={`View fullscreen: ${label}`}
				sx={{
					display: 'block',
					width: fullWidth ? 'fit-content' : '100%',
					maxWidth: '100%',
					m: 0,
					p: 0,
					border: `1px solid ${tokens.border}`,
					borderRadius: 2,
					overflow: 'hidden',
					cursor: 'zoom-in',
					bgcolor: tokens.surfaceRaised,
					font: 'inherit',
					textAlign: 'inherit',
					'&:focus-visible': {
						outline: `2px solid ${tokens.accent}`,
						outlineOffset: 3,
					},
				}}>
				<Box
					component='img'
					src={resolved}
					alt={label}
					loading='lazy'
					decoding='async'
					sx={{
						display: 'block',
						width: fullWidth ? 'auto' : '100%',
						maxWidth: '100%',
						height: 'auto',
					}}
				/>
			</Box>
		</Box>
	);
}
