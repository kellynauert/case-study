import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useLightbox, type LightboxImage } from '../../context/LightboxContext';
import { imageSrc } from '../../lib/parseMarkdown';
import { captionTextSx } from '../../lib/styles';
import { tokens } from '../../theme/theme';

interface ImageBlockProps {
	file: string;
	caption?: string;
	alt?: string;
	gallery?: LightboxImage[];
	galleryIndex?: number;
	compact?: boolean;
}

export function ImageBlock({ file, caption, alt, gallery, galleryIndex = 0, compact = false }: ImageBlockProps) {
	const { open } = useLightbox();
	const src = imageSrc(file);
	const label = alt ?? caption ?? file;

	const handleOpen = () => {
		const images = gallery ?? [{ src, alt: label, caption }];
		open(images, gallery ? galleryIndex : 0);
	};

	return (
		<Box
			sx={{
				my: compact ? 0 : 4,
				width: '100%',
				maxWidth: '100%',
			}}>
			<Box
				component='button'
				type='button'
				onClick={handleOpen}
				aria-label={`View fullscreen: ${label}`}
				sx={{
					display: 'block',
					width: '100%',
					m: 0,
					p: 0,
					border: `1px solid ${tokens.border}`,
					borderRadius: 2,
					overflow: 'hidden',
					cursor: 'zoom-in',
					bgcolor: tokens.surfaceRaised,
					boxShadow: tokens.shadowImage,
					font: 'inherit',
					textAlign: 'inherit',
					transition: 'box-shadow 200ms ease',
					'&:hover': { boxShadow: tokens.shadowElevated },
					'&:focus-visible': {
						outline: `2px solid ${tokens.accent}`,
						outlineOffset: 3,
					},
				}}>
				<Box component='img' src={src} alt={label} loading='lazy' decoding='async' sx={{ display: 'block', width: '100%', height: 'auto' }} />
			</Box>
			{caption && <Typography sx={{ display: 'block', mt: 1.25, ...captionTextSx }}>{caption}</Typography>}
		</Box>
	);
}
