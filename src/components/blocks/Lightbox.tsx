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
				alignItems: 'center',
				justifyContent: 'center',
				bgcolor: alpha('#000', 0.88),
				backdropFilter: 'blur(8px)',
			}}>
			<IconButton
				onClick={close}
				aria-label='Close viewer'
				sx={{
					position: 'absolute',
					top: 20,
					right: 20,
					color: 'text.primary',
					bgcolor: alpha(tokens.surfaceRaised, 0.8),
					'&:focus-visible': { outline: `2px solid ${tokens.accent}`, outlineOffset: 2 },
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
							position: 'absolute',
							left: 20,
							color: 'text.primary',
							bgcolor: alpha(tokens.surfaceRaised, 0.8),
							'&:focus-visible': { outline: `2px solid ${tokens.accent}`, outlineOffset: 2 },
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
							position: 'absolute',
							right: 60,
							color: 'text.primary',
							bgcolor: alpha(tokens.surfaceRaised, 0.8),
							'&:focus-visible': { outline: `2px solid ${tokens.accent}`, outlineOffset: 2 },
						}}>
						<ChevronRightIcon />
					</IconButton>
				</>
			)}

			<Box onClick={(e) => e.stopPropagation()} sx={{ maxWidth: '90vw', maxHeight: '85vh', textAlign: 'center' }}>
				<Box
					component='img'
					src={current.src}
					alt={current.alt}
					sx={{
						maxWidth: '100%',
						maxHeight: '78vh',
						borderRadius: 1,
						boxShadow: `0 24px 80px ${alpha('#000', 0.5)}`,
						objectFit: 'contain',
					}}
				/>
				{current.caption && (
					<Typography variant='caption' sx={{ display: 'block', mt: 1.25, color: tokens.textMuted }}>
						{current.caption}
					</Typography>
				)}
				{images.length > 1 && (
					<Typography variant='caption' sx={{ display: 'block', mt: 0.5, color: tokens.textMuted }}>
						{currentIndex + 1} of {images.length}
					</Typography>
				)}
			</Box>
		</Box>
	);
}
