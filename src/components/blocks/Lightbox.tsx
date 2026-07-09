import { useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { alpha } from '@mui/material/styles';
import { useLightbox } from '../../context/LightboxContext';
import { tokens } from '../../theme/theme';

const lightboxControlSx = {
	color: 'text.primary',
	bgcolor: alpha(tokens.surfaceRaised, 0.8),
	width: 44,
	height: 44,
	'&:focus-visible': { outline: `2px solid ${tokens.accent}`, outlineOffset: 2 },
} as const;

export function Lightbox() {
	const { images, currentIndex, isOpen, close, next, prev } = useLightbox();

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (!isOpen) return;
			switch (e.key) {
				case 'Escape':
					close();
					break;
				case 'ArrowRight':
					if (images.length > 1) next();
					break;
				case 'ArrowLeft':
					if (images.length > 1) prev();
					break;
			}
		},
		[isOpen, close, next, prev, images.length]
	);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [handleKeyDown]);

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	if (!isOpen || images.length === 0) return null;

	const current = images[currentIndex];

	return (
		<Box
			role='dialog'
			aria-modal='true'
			aria-label='Image viewer'
			onClick={close}
			sx={{
				position: 'fixed',
				inset: 0,
				zIndex: 1400,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				bgcolor: alpha('#000', 0.88),
				backdropFilter: 'blur(8px)',
				p: { xs: 2, sm: 3 },
			}}>
			<IconButton
				onClick={close}
				aria-label='Close viewer'
				sx={{
					position: 'absolute',
					top: { xs: 'max(12px, env(safe-area-inset-top))', sm: 20 },
					right: { xs: 'max(12px, env(safe-area-inset-right))', sm: 20 },
					...lightboxControlSx,
				}}>
				<CloseIcon />
			</IconButton>

			{images.length > 1 && (
				<>
					<IconButton
						onClick={(e) => {
							e.stopPropagation();
							prev();
						}}
						aria-label='Previous image'
						sx={{
							display: { xs: 'none', sm: 'inline-flex' },
							position: 'absolute',
							left: 20,
							...lightboxControlSx,
						}}>
						<ChevronLeftIcon />
					</IconButton>
					<IconButton
						onClick={(e) => {
							e.stopPropagation();
							next();
						}}
						aria-label='Next image'
						sx={{
							display: { xs: 'none', sm: 'inline-flex' },
							position: 'absolute',
							right: 20,
							...lightboxControlSx,
						}}>
						<ChevronRightIcon />
					</IconButton>
				</>
			)}

			<Box
				onClick={(e) => e.stopPropagation()}
				sx={{
					width: '100%',
					maxWidth: { xs: '100%', sm: '90vw' },
					maxHeight: { xs: 'calc(100vh - 120px)', sm: '85vh' },
					textAlign: 'center',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Box
					component='img'
					src={current.src}
					alt={current.alt}
					sx={{
						maxWidth: '100%',
						maxHeight: { xs: 'calc(100vh - 160px)', sm: '78vh' },
						borderRadius: 1,
						objectFit: 'contain',
					}}
				/>
				{current.caption && (
					<Typography variant='caption' sx={{ display: 'block', mt: 1.25, color: tokens.textMuted, px: 1 }}>
						{current.caption}
					</Typography>
				)}
				{images.length > 1 && (
					<Box
						sx={{
							display: { xs: 'flex', sm: 'none' },
							alignItems: 'center',
							justifyContent: 'center',
							gap: 1,
							mt: 2,
							width: '100%',
						}}>
						<IconButton
							onClick={(e) => {
								e.stopPropagation();
								prev();
							}}
							aria-label='Previous image'
							sx={lightboxControlSx}>
							<ChevronLeftIcon />
						</IconButton>
						<Typography variant='caption' sx={{ color: tokens.textMuted, minWidth: '4rem', textAlign: 'center' }}>
							{currentIndex + 1} of {images.length}
						</Typography>
						<IconButton
							onClick={(e) => {
								e.stopPropagation();
								next();
							}}
							aria-label='Next image'
							sx={lightboxControlSx}>
							<ChevronRightIcon />
						</IconButton>
					</Box>
				)}
				{images.length > 1 && (
					<Typography variant='caption' sx={{ display: { xs: 'none', sm: 'block' }, mt: 0.5, color: tokens.textMuted }}>
						{currentIndex + 1} of {images.length}
					</Typography>
				)}
			</Box>
		</Box>
	);
}
