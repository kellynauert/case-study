import Box from '@mui/material/Box';
import type { GridProps } from '@mui/material/Grid';
import { useLightbox, type LightboxImage } from '../../context/LightboxContext';
import { imageSrc } from '../../lib/images';
import { tokens } from '../../theme/theme';
import { StudyCell } from './StudyCell';

interface StudyImageProps {
	src: string;
	alt?: string;
	gallery?: LightboxImage[];
	galleryIndex?: number;
	align?: 'start' | 'center';
	/** Cap rendered width so smaller source assets are not upscaled past native resolution. */
	maxWidth?: number | string;
	/**
	 * Desktop column span within the image cell (1–12). Full-page screenshots should use 12 (default).
	 * Partial UI shots should pass `maxWidth` (usually the asset’s native width) so they are not stretched.
	 */
	cols?: number;
	/** Grid column size for the surrounding cell. Omit when already wrapped (e.g. StudyImageRow). */
	size?: GridProps['size'];
}

export function StudyImage({
	src,
	alt,
	gallery,
	galleryIndex = 0,
	align = 'start',
	maxWidth,
	cols = 12,
	size,
}: StudyImageProps) {
	const { open } = useLightbox();
	const resolved = imageSrc(src);
	const label = alt ?? src;
	const fill = maxWidth == null && cols >= 12;
	const columnWidth = `${(cols / 12) * 100}%`;

	const handleOpen = () => {
		const images = gallery ?? [{ src: resolved, alt: label }];
		open(images, gallery ? galleryIndex : 0);
	};

	const content = (
		<Box
			sx={{
				width: '100%',
				maxWidth: {
					xs: '100%',
					md: maxWidth ?? columnWidth,
				},
				display: 'flex',
				flexDirection: 'column',
				alignItems: fill || align === 'center' ? 'stretch' : 'flex-start',
				alignSelf: align === 'center' ? 'center' : 'flex-start',
				mx: align === 'center' ? 'auto' : 0,
			}}>
			<Box
				component='button'
				type='button'
				onClick={handleOpen}
				aria-label={`View fullscreen: ${label}`}
				sx={{
					display: 'block',
					width: fill ? '100%' : 'fit-content',
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
						width: fill ? '100%' : 'auto',
						height: 'auto',
						maxWidth: '100%',
					}}
				/>
			</Box>
		</Box>
	);

	if (size == null) return content;
	return <StudyCell size={size}>{content}</StudyCell>;
}
