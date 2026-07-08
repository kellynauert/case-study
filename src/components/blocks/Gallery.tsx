import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { alpha } from '@mui/material/styles';
import { imageSrc } from '../../lib/parseMarkdown';
import { captionTextSx, sectionHeadingSx } from '../../lib/styles';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { tokens } from '../../theme/theme';

interface GalleryProps {
	images: string[];
	compact?: boolean;
	/** Section label rendered inline with controls — matches landing Gallery header */
	title?: string;
	header?: ReactNode;
	headerId?: string;
}

const AUTO_PLAY_MS = 12000;

const imageEnterKeyframes = {
	'@keyframes gallery-image-enter': {
		from: { opacity: 0, transform: 'scale(0.992)' },
		to: { opacity: 1, transform: 'scale(1)' },
	},
} as const;

const controlButtonSx = {
	width: 28,
	height: 28,
	color: tokens.textNav,
	border: `1px solid ${tokens.border}`,
	borderRadius: 1,
	bgcolor: 'transparent',
	'&:hover': { color: tokens.accent, bgcolor: alpha(tokens.surfaceRaised, 0.9) },
	'&:focus-visible': { outline: `2px solid ${tokens.accent}`, outlineOffset: 2 },
} as const;

function imageLabel(file: string): string {
	return file.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
}

export function Gallery({ images, compact = false, title, header, headerId }: GalleryProps) {
	const [index, setIndex] = useState(0);
	const [playing, setPlaying] = useState(true);
	const [hoverPaused, setHoverPaused] = useState(false);
	const reducedMotion = useReducedMotion();
	const containerRef = useRef<HTMLDivElement>(null);
	const [inView, setInView] = useState(false);

	const count = images.length;
	const current = images[index];
	const src = imageSrc(current);
	const label = imageLabel(current);

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
			<Typography id={headerId} component='h2' sx={{ ...sectionHeadingSx, mb: 0 }}>
				{title}
			</Typography>
		:	null);

	const controls =
		count > 1 ?
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: 1.5,
					flexShrink: 0,
				}}>
				<Box sx={{ display: 'flex', gap: 0.75 }}>
					{images.map((file, dotIndex) => (
						<Box
							key={file}
							component='button'
							type='button'
							aria-label={`Go to screenshot ${dotIndex + 1}`}
							aria-current={dotIndex === index ? 'true' : undefined}
							onClick={() => goTo(dotIndex)}
							sx={{
								width: 8,
								height: 8,
								p: 0,
								border: 'none',
								borderRadius: '50%',
								cursor: 'pointer',
								bgcolor: dotIndex === index ? tokens.accent : alpha(tokens.textMuted, 0.45),
								transition: 'background-color 200ms ease',
								'&:focus-visible': {
									outline: `2px solid ${tokens.accent}`,
									outlineOffset: 2,
								},
							}}
						/>
					))}
				</Box>
				<Typography sx={{ ...captionTextSx, flexShrink: 0 }}>
					{index + 1} / {count}
				</Typography>
				<IconButton onClick={prev} aria-label='Previous screenshot' size='small' sx={controlButtonSx}>
					<ChevronLeftIcon sx={{ fontSize: '1rem' }} />
				</IconButton>
				<IconButton
					onClick={() => setPlaying((current) => !current)}
					aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
					size='small'
					sx={controlButtonSx}>
					{playing ?
						<PauseIcon sx={{ fontSize: '1rem' }} />
					:	<PlayArrowIcon sx={{ fontSize: '1rem' }} />}
				</IconButton>
				<IconButton onClick={next} aria-label='Next screenshot' size='small' sx={controlButtonSx}>
					<ChevronRightIcon sx={{ fontSize: '1rem' }} />
				</IconButton>
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
						alignItems: 'center',
						justifyContent: heading ? 'space-between' : 'flex-end',
						gap: 2,
						mb: { xs: 2.5, md: 3 },
						flexWrap: 'wrap',
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
			</Box>
		</Box>
	);
}
