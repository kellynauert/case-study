import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { hero } from '../../lib/site';
import { tokens } from '../../theme/theme';
import { ResumeDownloadLink } from './ResumeDownloadLink';

interface SiteHeroIntroProps {
	/** Called when the name link is clicked — e.g. close mobile drawer */
	onNavigate?: () => void;
}

export function SiteHeroIntro({ onNavigate }: SiteHeroIntroProps) {
	return (
		<Box sx={{ px: 1, pt: 2, mb: 5.5 }}>
			<Typography
				variant='h1'
				component={Link}
				to='/'
				onClick={onNavigate}
				sx={{
					display: 'block',
					m: 0,
					mb: 0.75,
					lineHeight: '36px',
					fontSize: { xs: '2.5rem', md: '3rem' },
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
					flexWrap: 'nowrap',
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
						whiteSpace: 'nowrap',
						fontSize: { xs: '0.9375rem', md: '1rem' },
						lineHeight: 1.4,
						fontWeight: 500,
						color: tokens.textSecondary,
					}}>
					{hero.roleLine}
				</Typography>

				<ResumeDownloadLink sx={{ flexShrink: 0 }} />
			</Box>
		</Box>
	);
}
