import { useId, useState } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import { FadeIn } from '../Layout/FadeIn';
import { hero } from '../../lib/site';
import { tokens } from '../../theme/theme';

const capabilityIcons = {
	strategy: DesktopWindowsOutlinedIcon,
	engineering: CodeOutlinedIcon,
	architecture: StorageOutlinedIcon,
	devops: CloudOutlinedIcon,
} as const;

type HeroVerb = (typeof hero.heroVerbOptions)[number];

function RoundedChevronIcon({ open }: { open: boolean }) {
	return (
		<Box
			aria-hidden
			className='hero-verb-chevron'
			component='svg'
			viewBox='0 0 24 24'
			sx={{
				width: '0.72em',
				height: '0.72em',
				display: 'block',
				flexShrink: 0,
				color: tokens.accentPink,
				position: 'relative',
				top: '0.06em',
				ml: '-0.08em',
				transition: 'transform 180ms ease, color 180ms ease',
				transform: open ? 'rotate(180deg)' : 'none',
			}}>
			<path
				d='M6.5 9.25 L12 14.75 L17.5 9.25'
				fill='none'
				stroke='currentColor'
				strokeWidth='2.4'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Box>
	);
}

function TimelineJumpLink({ children }: { children: React.ReactNode }) {
	return (
		<Box
			component='a'
			href='#platform-timeline'
			onClick={(event) => {
				const el = document.getElementById('platform-timeline');
				if (!el) return;
				event.preventDefault();
				el.scrollIntoView({ behavior: 'smooth', block: 'start' });
				history.replaceState(null, '', '#platform-timeline');
			}}
			sx={{
				color: tokens.accentPink,
				textDecoration: 'underline',
				textDecorationColor: 'transparent',
				textUnderlineOffset: '0.18em',
				transition: 'color 180ms ease, text-decoration-color 180ms ease',
				'&:hover': {
					color: tokens.accent,
					textDecorationColor: tokens.accent,
				},
				'&:focus-visible': {
					outline: `2px solid ${tokens.accentPink}`,
					outlineOffset: 2,
					borderRadius: 0.5,
				},
			}}>
			{children}
		</Box>
	);
}

function HeroVerbDropdown({
	value,
	label,
	onChange,
}: {
	value: HeroVerb;
	label: string;
	onChange: (next: HeroVerb) => void;
}) {
	const buttonId = useId();
	const menuId = useId();
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const open = Boolean(anchorEl);

	return (
		<>
			<Box
				component='button'
				type='button'
				id={buttonId}
				aria-haspopup='listbox'
				aria-expanded={open}
				aria-controls={open ? menuId : undefined}
				aria-label={label}
				onClick={(event) => setAnchorEl(event.currentTarget)}
				sx={{
					display: 'inline-flex',
					alignItems: 'baseline',
					gap: 0,
					m: 0,
					p: 0,
					pb: '0.02em',
					border: 'none',
					borderBottom: `3px solid ${tokens.accentPink}`,
					borderRadius: 0,
					bgcolor: 'transparent',
					color: 'inherit',
					font: 'inherit',
					letterSpacing: 'inherit',
					lineHeight: 'inherit',
					cursor: 'pointer',
					verticalAlign: 'baseline',
					transition: 'border-color 180ms ease, color 180ms ease',
					'&:hover': {
						color: tokens.accentPink,
						borderBottomColor: tokens.accent,
						'& .hero-verb-chevron': {
							color: tokens.accent,
						},
					},
					'&:focus-visible': {
						outline: `2px solid ${tokens.accentPink}`,
						outlineOffset: 3,
					},
				}}>
				{value}
				<RoundedChevronIcon open={open} />
			</Box>
			<Menu
				id={menuId}
				anchorEl={anchorEl}
				open={open}
				onClose={() => setAnchorEl(null)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
				transformOrigin={{ vertical: 'top', horizontal: 'left' }}
				slotProps={{
					list: {
						'aria-labelledby': buttonId,
						role: 'listbox',
						dense: true,
					},
					paper: {
						sx: {
							mt: 0.75,
							minWidth: 160,
							borderRadius: 1.5,
							border: `1px solid ${tokens.border}`,
							boxShadow: '0 10px 28px rgba(30, 16, 51, 0.1)',
							bgcolor: tokens.surface,
						},
					},
				}}>
				{hero.heroVerbOptions.map((option) => {
					const selected = option === value;
					return (
						<MenuItem
							key={option}
							selected={selected}
							role='option'
							aria-selected={selected}
							onClick={() => {
								onChange(option);
								setAnchorEl(null);
							}}
							sx={{
								fontFamily: tokens.fontDisplay,
								fontWeight: selected ? 600 : 500,
								fontSize: '1.05rem',
								color: selected ? tokens.accentPink : tokens.textPrimary,
								py: 1.1,
								'&:hover': { bgcolor: tokens.surfaceRaised },
								'&.Mui-selected': {
									bgcolor: tokens.surfaceRaised,
									'&:hover': { bgcolor: tokens.surfaceRaised },
								},
							}}>
							{option}
						</MenuItem>
					);
				})}
			</Menu>
		</>
	);
}

export function LandingHero() {
	const [firstVerb, setFirstVerb] = useState<HeroVerb>('design');
	const [secondVerb, setSecondVerb] = useState<HeroVerb>('build');

	const otherVerb = (verb: HeroVerb): HeroVerb => (verb === 'design' ? 'build' : 'design');

	const chooseFirst = (next: HeroVerb) => {
		setFirstVerb(next);
		if (next === secondVerb) setSecondVerb(otherVerb(next));
	};

	const chooseSecond = (next: HeroVerb) => {
		setSecondVerb(next);
		if (next === firstVerb) setFirstVerb(otherVerb(next));
	};

	return (
		<Box
			id='landing-hero'
			component='header'
			sx={{
				px: { xs: 2, sm: 3 },
				pt: { xs: 1.5, md: 1 },
				pb: { xs: 3, md: 4 },
			}}>
			<FadeIn>
				<Typography
					component='h1'
					sx={{
						m: 0,
						mb: { xs: 1.25, md: 1.5 },
						fontFamily: tokens.fontDisplay,
						fontWeight: 600,
						letterSpacing: '-0.03em',
						lineHeight: 1.2,
						fontSize: { xs: 'clamp(2.125rem, 8vw, 2.75rem)', md: 'clamp(2.5rem, 4vw, 3.25rem)' },
						color: tokens.textPrimary,
					}}>
					{hero.heroLinePrefix}
					<HeroVerbDropdown value={firstVerb} label='Choose first headline verb' onChange={chooseFirst} />
					{hero.heroLineMiddle}
					<HeroVerbDropdown value={secondVerb} label='Choose second headline verb' onChange={chooseSecond} />
					{hero.heroLineSuffix}
				</Typography>
			</FadeIn>

			<FadeIn delay={80}>
				<Typography
					component='p'
					sx={{
						m: 0,
						mb: { xs: 3, md: 3.5 },
						maxWidth: '38rem',
						fontFamily: tokens.fontBody,
						fontSize: { xs: '0.9375rem', md: '1.0625rem' },
						fontWeight: 500,
						lineHeight: 1.65,
						color: tokens.textPrimary,
					}}>
					{hero.supportingBefore}
					<TimelineJumpLink>{hero.supportingAccent}</TimelineJumpLink>
					{hero.supportingAfter}
				</Typography>
			</FadeIn>

			<FadeIn delay={160}>
				<Box
					component='ul'
					aria-label='Core capabilities'
					sx={{
						m: 0,
						p: 0,
						listStyle: 'none',
						display: 'grid',
						gridTemplateColumns: {
							xs: 'repeat(2, minmax(0, 1fr))',
							sm: 'repeat(4, minmax(0, 1fr))',
						},
						gap: { xs: 2, sm: 1.5, md: 2 },
					}}>
					{hero.capabilities.map((capability) => {
						const Icon = capabilityIcons[capability.icon];
						return (
							<Box
								component='li'
								key={capability.label}
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'flex-start',
									gap: 1,
									minWidth: 0,
								}}>
								<Icon
									aria-hidden
									sx={{
										fontSize: { xs: '1.5rem', md: '1.625rem' },
										color: tokens.accent,
									}}
								/>
								<Typography
									component='span'
									sx={{
										m: 0,
										fontFamily: tokens.fontBody,
										fontSize: { xs: '0.75rem', sm: '0.8125rem' },
										fontWeight: 500,
										lineHeight: 1.35,
										color: tokens.textPrimary,
									}}>
									{capability.label}
								</Typography>
							</Box>
						);
					})}
				</Box>
			</FadeIn>
		</Box>
	);
}
