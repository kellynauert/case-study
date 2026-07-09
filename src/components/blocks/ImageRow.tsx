import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useLightbox, type LightboxImage } from '../../context/LightboxContext';
import { imageSrc, type ImageBlockData } from '../../lib/parseMarkdown';
import { captionTextSx } from '../../lib/styles';
import { tokens } from '../../theme/theme';

interface ImageRowProps {
	items: ImageBlockData[];
	compact?: boolean;
	inline?: boolean;
}

const imageButtonSx = {
	display: 'block',
	width: 'fit-content',
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
} as const;

const imageSx = {
	display: 'block',
	width: 'auto',
	maxWidth: '100%',
	height: 'auto',
} as const;

export function ImageRow({ items, compact = false, inline = false }: ImageRowProps) {
	const { open } = useLightbox();

	const gallery: LightboxImage[] = items.map((item) => {
		const label = item.alt ?? item.caption ?? item.file;
		return { src: imageSrc(item.file), alt: label, caption: item.caption };
	});

	return (
		<Box
			sx={{
				my: compact || inline ? 0 : 4,
				width: '100%',
				display: 'grid',
				gridTemplateColumns: {
					xs: '1fr',
					md: inline ? '1fr' : `repeat(${Math.min(items.length, 2)}, minmax(0, 1fr))`,
				},
				gap: { xs: 2, md: inline ? 2 : 2.5 },
				alignItems: 'start',
			}}>
			{items.map((item, index) => {
				const label = item.alt ?? item.caption ?? item.file;
				const src = imageSrc(item.file);

				return (
					<Box key={`${item.file}-${index}`} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 0 }}>
						<Box
							component='button'
							type='button'
							onClick={() => open(gallery, index)}
							aria-label={`View fullscreen: ${label}`}
							sx={imageButtonSx}>
							<Box component='img' src={src} alt={label} loading='lazy' decoding='async' sx={imageSx} />
						</Box>
						{item.caption && <Typography sx={{ display: 'block', mt: 1.25, width: '100%', ...captionTextSx }}>{item.caption}</Typography>}
					</Box>
				);
			})}
		</Box>
	);
}
