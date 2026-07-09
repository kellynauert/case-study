import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import { hero, links, resumeFilename } from '../../lib/site';
import { tokens } from '../../theme/theme';

const secondaryButtonSx = {
	display: 'inline-flex',
	alignItems: 'center',
	gap: 0.75,
	px: 1,
	py: 0.75,
	m: 0,
	minHeight: 44,
	fontSize: '0.8125rem',
	fontWeight: 600,
	letterSpacing: '0.02em',
	color: tokens.accentPink,
	bgcolor: 'transparent',
	border: 'none',
	textDecoration: 'none',
	cursor: 'pointer',
	transition: 'color 180ms ease, opacity 180ms ease',
	'&:hover': {
		color: tokens.accent,
		'& .global-nav-resume-icon': { transform: 'translateY(1px)' },
	},
	'&:focus-visible': {
		outline: `2px solid ${tokens.accentPink}`,
		outlineOffset: 3,
		borderRadius: 0.5,
	},
} as const;

interface SiteHeroIntroProps {
	/** Called when the name link is clicked — e.g. close mobile drawer */
	onNavigate?: () => void;
}

export function SiteHeroIntro({ onNavigate }: SiteHeroIntroProps) {
	return (
		<Box sx={{ px: 1, mb: 5.5 }}>
			<Typography
				variant='h1'
				component={Link}
				to='/'
				onClick={onNavigate}
				sx={{
					display: 'block',
					m: 0,
					mb: 0.75,
					fontSize: { xs: '2.25rem', md: '2.75rem' },
					color: tokens.textPrimary,
					textDecoration: 'none',
					'&:focus-visible': {
						outline: `2px solid ${tokens.accent}`,
						outlineOffset: 2,
					},
				}}>
				{hero.headline}
			</Typography>

			<Box
				sx={{
					display: 'flex',
					flexWrap: { xs: 'wrap', md: 'nowrap' },
					alignItems: 'center',
					columnGap: 2,
					rowGap: 1,
					mb: 0,
				}}>
				<Typography
					component='p'
					sx={{
						m: 0,
						flexShrink: 0,
						whiteSpace: { xs: 'normal', md: 'nowrap' },
						fontSize: { xs: '0.8125rem', md: '0.875rem' },
						lineHeight: 1.4,
						fontWeight: 500,
						color: tokens.textSecondary,
					}}>
					{hero.roleLine}
				</Typography>

				<Box
					component='a'
					href={links.resume}
					download={resumeFilename}
					target='_blank'
					rel='noopener noreferrer'
					aria-label='Download resume PDF'
					sx={{ ...secondaryButtonSx, flexShrink: 0, whiteSpace: 'nowrap' }}>
					<DownloadIcon className='global-nav-resume-icon' sx={{ fontSize: '1rem', transition: 'transform 180ms ease' }} />
					{hero.secondaryCta}
				</Box>
			</Box>
		</Box>
	);
}
