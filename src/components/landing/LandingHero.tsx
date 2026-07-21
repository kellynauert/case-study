import Box from '@mui/material/Box';
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

export function LandingHero() {
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
						lineHeight: 1.12,
						fontSize: { xs: 'clamp(2.125rem, 8vw, 2.75rem)', md: 'clamp(2.5rem, 4vw, 3.25rem)' },
						color: tokens.textPrimary,
					}}>
					<Box component='span' sx={{ display: 'block' }}>
						{hero.heroLineOne}
					</Box>
					<Box component='span' sx={{ display: 'block' }}>
						{hero.heroLineTwo}
					</Box>
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
