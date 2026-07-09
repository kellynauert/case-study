import { useCallback, useEffect, useRef, useState, type ReactNode, type TouchEvent } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { alpha } from '@mui/material/styles';
import { imageSrc } from '../../lib/images';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { tokens } from '../../theme/theme';

export type GalleryImage = string | { src: string; caption?: string };

interface GalleryProps {
	images: GalleryImage[];
	compact?: boolean;
	/** Section label rendered inline with controls — matches landing Gallery header */
	title?: string;
	header?: ReactNode;
	headerId?: string;
}

function resolveImage(image: GalleryImage): { src: string; caption: string } {
	if (typeof image === 'string') {
		return { src: image, caption: imageLabel(image) };
	}

	return {
		src: image.src,
		caption: image.caption ?? imageLabel(image.src),
	};
}

const AUTO_PLAY_MS = 12000;

const imageEnterKeyframes = {
	'@keyframes gallery-image-enter': {
		from: { opacity: 0, transform: 'scale(0.992)' },
		to: { opacity: 1, transform: 'scale(1)' },
	},
} as const;

const controlButtonSx = {
	width: { xs: 44, md: 36 },
	height: { xs: 44, md: 36 },
	color: tokens.textNav,
	border: `1px solid ${tokens.border}`,
	borderRadius: 1,
	bgcolor: 'transparent',
	'&:hover': { color: tokens.accent, bgcolor: alpha(tokens.surfaceRaised, 0.9) },
	'&:focus-visible': { outline: `2px solid ${tokens.accent}`, outlineOffset: 2 },
} as const;

const SWIPE_THRESHOLD = 48;

function imageLabel(file: string): string {
	return file.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
}

export function Gallery({ images, compact = false, title, header, headerId }: GalleryProps) {
	const [index, setIndex] = useState(0);
	const [playing, setPlaying] = useState(true);
	const [hoverPaused, setHoverPaused] = useState(false);
	const reducedMotion = useReducedMotion();
	const containerRef = useRef<HTMLDivElement>(null);
	const touchStartX = useRef(0);
	const [inView, setInView] = useState(false);

	const count = images.length;
	const current = resolveImage(images[index]);
	const src = imageSrc(current.src);
	const label = current.caption;

	const goTo = useCallback(
		(nextIndex: number) => {
			setIndex((nextIndex + count) % count);
		},
		[count]
	);

	const next = useCallback(() => goTo(index + 1), [goTo, index]);
	const prev = useCallback(() => goTo(index - 1), [goTo, index]);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });

		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (count <= 1 || !playing || hoverPaused || reducedMotion || !inView) return;

		const timer = window.setInterval(() => {
			setIndex((currentIndex) => (currentIndex + 1) % count);
		}, AUTO_PLAY_MS);

		return () => window.clearInterval(timer);
	}, [count, playing, hoverPaused, reducedMotion, inView]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (count <= 1 || !containerRef.current?.contains(document.activeElement)) return;

			if (event.key === 'ArrowRight') {
				event.preventDefault();
				next();
			}
			if (event.key === 'ArrowLeft') {
				event.preventDefault();
				prev();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [count, next, prev]);

	if (count === 0) return null;

	const heading =
		header ??
		(title ?
			<Typography id={headerId} variant='sectionHeading' sx={{ mb: 0 }}>
				{title}
			</Typography>
		:	null);

	const showDotStrip = count <= 12;

	const handleTouchStart = useCallback((event: TouchEvent) => {
		touchStartX.current = event.touches[0]?.clientX ?? 0;
	}, []);

	const handleTouchEnd = useCallback(
		(event: TouchEvent) => {
			if (count <= 1) return;
			const endX = event.changedTouches[0]?.clientX ?? 0;
			const delta = endX - touchStartX.current;
			if (Math.abs(delta) < SWIPE_THRESHOLD) return;
			if (delta > 0) prev();
			else next();
		},
		[count, next, prev]
	);

	const controls =
		count > 1 ?
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: { xs: 'space-between', sm: 'flex-start' },
					gap: 1,
					flexShrink: 0,
					width: { xs: '100%', sm: 'auto' },
				}}>
				{showDotStrip && (
					<Box
						sx={{
							display: { xs: 'none', sm: 'flex' },
							gap: 0.75,
							maxWidth: { sm: 200, md: 320 },
							overflowX: 'auto',
							flexShrink: 1,
							WebkitOverflowScrolling: 'touch',
							scrollbarWidth: 'none',
							'&::-webkit-scrollbar': { display: 'none' },
						}}>
						{images.map((file, dotIndex) => (
							<Box
								key={typeof file === 'string' ? file : file.src}
								component='button'
								type='button'
								aria-label={`Go to screenshot ${dotIndex + 1}`}
								aria-current={dotIndex === index ? 'true' : undefined}
								onClick={() => goTo(dotIndex)}
								sx={{
									flexShrink: 0,
									width: 44,
									height: 44,
									p: 0,
									border: 'none',
									bgcolor: 'transparent',
									cursor: 'pointer',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									'&:focus-visible': {
										outline: `2px solid ${tokens.accent}`,
										outlineOffset: 2,
										borderRadius: 1,
									},
								}}>
								<Box
									sx={{
										width: 8,
										height: 8,
										borderRadius: '50%',
										bgcolor: dotIndex === index ? tokens.accent : alpha(tokens.textMuted, 0.45),
										transition: 'background-color 200ms ease',
									}}
								/>
							</Box>
						))}
					</Box>
				)}
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexShrink: 0 }}>
					<Typography variant='caption' sx={{ flexShrink: 0, minWidth: '3.5rem', textAlign: 'center' }}>
						{index + 1} / {count}
					</Typography>
					<IconButton onClick={prev} aria-label='Previous screenshot' sx={controlButtonSx}>
						<ChevronLeftIcon sx={{ fontSize: '1.125rem' }} />
					</IconButton>
					<IconButton
						onClick={() => setPlaying((current) => !current)}
						aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
						sx={controlButtonSx}>
						{playing ?
							<PauseIcon sx={{ fontSize: '1.125rem' }} />
						:	<PlayArrowIcon sx={{ fontSize: '1.125rem' }} />}
					</IconButton>
					<IconButton onClick={next} aria-label='Next screenshot' sx={controlButtonSx}>
						<ChevronRightIcon sx={{ fontSize: '1.125rem' }} />
					</IconButton>
				</Box>
			</Box>
		:	null;

	return (
		<Box
			ref={containerRef}
			onMouseEnter={() => setHoverPaused(true)}
			onMouseLeave={() => setHoverPaused(false)}
			onFocus={() => setHoverPaused(true)}
			onBlur={(event) => {
				if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
					setHoverPaused(false);
				}
			}}
			sx={{
				my: compact ? 0 : undefined,
				width: '100%',
			}}>
			{(heading || controls) && (
				<Box
					sx={{
						display: 'flex',
						flexDirection: { xs: 'column', sm: 'row' },
						alignItems: { xs: 'stretch', sm: 'center' },
						justifyContent: heading ? 'space-between' : 'flex-end',
						gap: { xs: 1.5, sm: 2 },
						mb: { xs: 2.5, md: 3 },
					}}>
					{heading && <Box sx={{ minWidth: 0 }}>{heading}</Box>}
					{controls}
				</Box>
			)}

			<Box
				role='region'
				aria-roledescription='carousel'
				aria-label={title ? `${title} gallery` : 'Screenshot gallery'}
				tabIndex={count > 1 ? 0 : undefined}
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
				sx={{
					position: 'relative',
					width: '100%',
					overflow: 'hidden',
					height: 'auto',
					minHeight: 0,
					display: 'block',
					border: 'none',
					borderRadius: 0,
					bgcolor: 'transparent',
					'&:focus-visible': {
						outline: `2px solid ${tokens.accent}`,
						outlineOffset: 3,
					},
				}}>
				<Box
					key={index}
					component='img'
					src={src}
					alt={label}
					decoding='async'
					sx={{
						...imageEnterKeyframes,
						display: 'block',
						width: '100%',
						height: 'auto',
						borderRadius: 0.75,
						animation: reducedMotion ? 'none' : 'gallery-image-enter 1100ms ease-out',
					}}
				/>
				<Typography variant='caption' sx={{ display: 'block', mt: 1.25 }}>{label}</Typography>
			</Box>
		</Box>
	);
}
