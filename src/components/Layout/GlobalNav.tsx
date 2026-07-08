import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import DownloadIcon from '@mui/icons-material/Download';
import { alpha } from '@mui/material/styles';
import { getAllCaseStudies } from '../../lib/caseStudies';
import { isShowcaseViewed } from '../../lib/viewedShowcases';
import { useViewedShowcases } from '../../hooks/useViewedShowcases';
import { hero, links } from '../../lib/site';
import { tokens } from '../../theme/theme';

const studies = getAllCaseStudies();

function ReadIndicator({ read, active }: { read: boolean; active?: boolean }) {
	return (
		<Box
			aria-hidden
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '1.25rem',
				height: '1.25rem',
				mt: '0.05em',
				flexShrink: 0,
			}}>
			{read && (
				<CheckIcon
					sx={{
						fontSize: '1rem',
						color: active ? tokens.accent : alpha(tokens.accentPink, 0.65),
						'& path': {
							stroke: 'currentColor',
							strokeWidth: 0.75,
							paintOrder: 'stroke fill',
						},
					}}
				/>
			)}
		</Box>
	);
}

const secondaryButtonSx = {
	display: 'inline-flex',
	alignItems: 'center',
	gap: 0.75,
	p: 0,
	m: 0,
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

const navGroupLabelSx = {
	display: 'block',
	px: 1,
	mb: 0.75,
	mt: 0.25,
	fontFamily: tokens.fontBody,
	fontSize: '0.6875rem',
	fontWeight: 600,
	letterSpacing: '0.1em',
	textTransform: 'uppercase',
	color: tokens.textMuted,
	lineHeight: 1.4,
} as const;

function navLinkSx(active: boolean, level: 'primary' | 'sub' = 'primary') {
	return {
		display: 'block',
		py: 0.625,
		pl: level === 'sub' ? 2 : 1,
		pr: 1,
		textDecoration: 'none',
		borderLeft: `2px solid ${active ? tokens.accent : 'transparent'}`,
		fontSize: level === 'sub' ? '0.75rem' : '0.8125rem',
		fontWeight:
			active ? 600
			: level === 'primary' ? 500
			: 400,
		color: active ? tokens.accent : tokens.textNav,
		lineHeight: 1.45,
		transition: 'color 200ms ease',
		'&:hover': { color: tokens.accent },
		'&:focus-visible': {
			outline: `2px solid ${tokens.accent}`,
			outlineOffset: 2,
		},
	};
}

function NavContent({ onNavigate }: { onNavigate?: () => void }) {
	const location = useLocation();
	const viewed = useViewedShowcases();
	const isHomeActive = location.pathname === '/';

	return (
		<Box
			component='nav'
			aria-label='Site navigation'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				pl: 1.5,
				pr: 5,
				py: 2,
			}}>
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
						flexWrap: 'nowrap',
						alignItems: 'center',
						columnGap: 2,
						mb: 0,
					}}>
					<Typography
						component='p'
						sx={{
							m: 0,
							flexShrink: 0,
							whiteSpace: 'nowrap',
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
						download
						aria-label='Download resume PDF'
						sx={{ ...secondaryButtonSx, flexShrink: 0, whiteSpace: 'nowrap' }}>
						<DownloadIcon className='global-nav-resume-icon' sx={{ fontSize: '1rem', transition: 'transform 180ms ease' }} />
						{hero.secondaryCta}
					</Box>
				</Box>
			</Box>

			<Box sx={{ mb: 1.5 }}>
				<Box
					component={Link}
					to='/'
					onClick={onNavigate}
					aria-current={isHomeActive ? 'page' : undefined}
					sx={navLinkSx(isHomeActive, 'primary')}>
					Home
				</Box>
			</Box>

			<Typography component='p' sx={{ ...navGroupLabelSx, mt: 0.5 }}>
				Showcases
			</Typography>

			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
				{studies.map((study) => {
					const href = `/case-studies/${study.slug}`;
					const isActive = location.pathname === href;
					const read = isShowcaseViewed(study.slug, viewed);

					return (
						<Box
							key={study.slug}
							component={Link}
							to={href}
							onClick={onNavigate}
							aria-current={isActive ? 'page' : undefined}
							aria-label={`${study.title}${read ? ', read' : ', unread'}`}
							sx={{
								display: 'grid',
								gridTemplateColumns: '1.25rem 1fr',
								gap: 0.75,
								alignItems: 'start',
								py: 0.625,
								pl: 2,
								pr: 1,
								textDecoration: 'none',
								borderLeft: `2px solid ${isActive ? tokens.accent : 'transparent'}`,
								transition: 'color 200ms ease',
								'&:hover': { '& .global-nav-title': { color: tokens.accent } },
								'&:focus-visible': {
									outline: `2px solid ${tokens.accent}`,
									outlineOffset: 2,
								},
							}}>
							<ReadIndicator read={read} active={isActive} />
							<Typography
								className='global-nav-title'
								sx={{
									m: 0,
									fontSize: '0.75rem',
									fontWeight: isActive ? 600 : 400,
									lineHeight: 1.45,
									color: isActive ? tokens.accent : tokens.textNav,
									transition: 'color 200ms ease',
								}}>
								{study.title}
							</Typography>
						</Box>
					);
				})}
			</Box>
		</Box>
	);
}

const shellMaxWidth = tokens.layout.navWidth + 1320;

export function GlobalNav() {
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<>
			<IconButton
				onClick={() => setMobileOpen(true)}
				aria-label='Open site navigation'
				sx={{
					display: { md: 'none' },
					position: 'fixed',
					top: 12,
					left: 16,
					zIndex: 1200,
					color: tokens.textSecondary,
					bgcolor: 'transparent',
					'&:hover': { color: tokens.accent, bgcolor: 'transparent' },
					'&:focus-visible': { outline: `2px solid ${tokens.accent}`, outlineOffset: 2 },
				}}>
				<MenuIcon fontSize='small' />
			</IconButton>

			<Drawer
				open={mobileOpen}
				onClose={() => setMobileOpen(false)}
				sx={{ display: { md: 'none' } }}
				slotProps={{
					paper: {
						sx: {
							width: tokens.layout.navWidth,
							bgcolor: alpha(tokens.background, 0.94),
							backdropFilter: 'blur(10px)',
							boxShadow: `4px 0 20px ${alpha(tokens.accent, 0.05)}`,
						},
					},
				}}>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
					<IconButton onClick={() => setMobileOpen(false)} aria-label='Close site navigation'>
						<CloseIcon fontSize='small' />
					</IconButton>
				</Box>
				<NavContent onNavigate={() => setMobileOpen(false)} />
			</Drawer>

			<Box
				component='aside'
				sx={{
					display: { xs: 'none', md: 'block' },
					position: 'fixed',
					top: 0,
					left: { md: `max(0px, calc((100vw - ${shellMaxWidth}px) / 2))` },
					width: tokens.layout.navWidth,
					height: '100vh',
					overflowY: 'auto',
					zIndex: 2,
					bgcolor: 'transparent',
					'&::after': {
						content: '""',
						position: 'absolute',
						top: 32,
						bottom: 32,
						right: 0,
						width: '1px',
						bgcolor: tokens.border,
						pointerEvents: 'none',
					},
				}}>
				<NavContent />
			</Box>
		</>
	);
}
