import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { author, links, nav } from '../../lib/site';
import { useScrollShrink } from '../../hooks/useScrollShrink';
import { tokens } from '../../theme/theme';

function NavLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
	const location = useLocation();
	const isHash = href.startsWith('#');
	const isHomeHash = href.startsWith('/#');
	const hashTarget = isHomeHash ? href.slice(2) : href.slice(1);

	const isActive =
		!external &&
		(isHash ? location.pathname === '/' && location.hash === href
		: isHomeHash ? location.pathname === '/' && location.hash === `#${hashTarget}`
		: location.pathname === href);

	const sx = {
		fontSize: '0.875rem',
		fontWeight: isActive ? 600 : 400,
		color: isActive ? tokens.accent : tokens.textMuted,
		textDecoration: 'none',
		transition: 'color 200ms ease',
		'&:hover': { color: tokens.accent },
		'&:focus-visible': {
			outline: `2px solid ${tokens.accent}`,
			outlineOffset: 2,
			borderRadius: '2px',
		},
	};

	if (external) {
		return (
			<Box component='a' href={href} target='_blank' rel='noopener noreferrer' sx={sx}>
				{children}
			</Box>
		);
	}

	if (isHomeHash) {
		return (
			<Box component={Link} to={href} sx={sx}>
				{children}
			</Box>
		);
	}

	if (isHash) {
		return (
			<Box component='a' href={href} sx={sx}>
				{children}
			</Box>
		);
	}

	return (
		<Box component={Link} to={href} sx={sx}>
			{children}
		</Box>
	);
}

export function Nav() {
	const shrunk = useScrollShrink();

	return (
		<Box
			component='header'
			sx={{
				position: 'sticky',
				top: 0,
				zIndex: 100,
				bgcolor: alpha(tokens.surface, 0.88),
				borderBottom: `1px solid ${shrunk ? tokens.border : 'transparent'}`,
				backdropFilter: 'saturate(180%) blur(12px)',
				transition: 'border-color 200ms ease, padding 200ms ease',
			}}>
			<Box
				sx={{
					maxWidth: tokens.layout.pageMaxWidth,
					mx: 'auto',
					px: { xs: 2, sm: 3 },
					py: shrunk ? 1.25 : 2,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					gap: 2,
					transition: 'padding 200ms ease',
				}}>
				<Box
					component={Link}
					to='/'
					sx={{
						textDecoration: 'none',
						fontSize: shrunk ? '0.9375rem' : '1rem',
						fontWeight: 600,
						fontFamily: tokens.fontDisplay,
						color: tokens.textPrimary,
						letterSpacing: '-0.02em',
						transition: 'font-size 200ms ease',
						'&:focus-visible': {
							outline: `2px solid ${tokens.accent}`,
							outlineOffset: 2,
							borderRadius: '2px',
						},
					}}>
					<Typography component='span' sx={{ font: 'inherit' }}>
						{author.name}
					</Typography>
				</Box>

				<Box
					component='nav'
					aria-label='Primary'
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: { xs: 2, sm: 3 },
					}}>
					<NavLink href='/#case-studies'>{nav.caseStudies}</NavLink>
					<NavLink href='/about'>{nav.about}</NavLink>
					<NavLink href={links.resume} external>
						{nav.resume}
					</NavLink>
					<NavLink href={links.github} external>
						{nav.github}
					</NavLink>
				</Box>
			</Box>
		</Box>
	);
}
