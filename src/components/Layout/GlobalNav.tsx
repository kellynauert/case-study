import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { alpha } from '@mui/material/styles';
import { getAllCaseStudies } from '../../lib/caseStudyRegistry';
import { hero } from '../../lib/site';
import { isShowcaseViewed } from '../../lib/viewedShowcases';
import { useViewedShowcases } from '../../hooks/useViewedShowcases';
import { mobileHeaderHeight } from '../../lib/styles';
import { SiteHeroIntro } from './SiteHeroIntro';
import { tokens } from '../../theme/theme';

const studies = getAllCaseStudies();

interface NavDrawerContextValue {
	openDrawer: () => void;
	closeDrawer: () => void;
}

const NavDrawerContext = createContext<NavDrawerContextValue | null>(null);

function useNavDrawer() {
	const ctx = useContext(NavDrawerContext);
	if (!ctx) throw new Error('useNavDrawer must be used within NavDrawerProvider');
	return ctx;
}

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

const navGroupLabelSx = {
	display: 'block',
	px: 1,
	mb: 0.75,
	mt: 0.25,
	fontFamily: tokens.fontBody,
	fontSize: '0.75rem',
	fontWeight: 600,
	letterSpacing: '0.1em',
	textTransform: 'uppercase',
	color: tokens.textMuted,
	lineHeight: 1.4,
} as const;

function navLinkSx(active: boolean, level: 'primary' | 'sub' = 'primary') {
	return {
		display: 'block',
		py: 1,
		pl: level === 'sub' ? 2 : 1,
		pr: 1,
		minHeight: 44,
		textDecoration: 'none',
		borderLeft: `2px solid ${active ? tokens.accent : 'transparent'}`,
		fontSize: level === 'sub' ? '0.8125rem' : '0.9375rem',
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

function NavContent({
	onNavigate,
	showHeroIntro = true,
	inDrawer = false,
}: {
	onNavigate?: () => void;
	showHeroIntro?: boolean;
	/** Mobile slide-out drawer — show hero on landing page (hidden in desktop sidebar on xs home to avoid duplicating in-page hero). */
	inDrawer?: boolean;
}) {
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
				pt: 3,
				pb: 2,
			}}>
			{showHeroIntro && (
				<Box sx={{ display: { xs: isHomeActive && !inDrawer ? 'none' : 'block', md: 'block' } }}>
					<SiteHeroIntro onNavigate={onNavigate} />
				</Box>
			)}

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
				Systems
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
								alignItems: 'center',
								py: 1,
								pl: 2,
								pr: 1,
								minHeight: 44,
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
									fontSize: '0.8125rem',
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

const shellMaxWidth = tokens.layout.shellMaxWidth;

function isHeroScrolledPast(heroEl: HTMLElement) {
	return heroEl.getBoundingClientRect().bottom <= 0;
}

export function MobileStickyNavBar() {
	const { openDrawer } = useNavDrawer();
	const location = useLocation();
	const isLanding = location.pathname === '/';
	const [heroScrolledPast, setHeroScrolledPast] = useState(() => location.pathname !== '/');

	useEffect(() => {
		if (!isLanding) {
			setHeroScrolledPast(true);
			return;
		}

		let cancelled = false;
		let heroEl: HTMLElement | null = null;
		let observer: IntersectionObserver | null = null;
		let retryId = 0;

		const update = () => {
			if (!cancelled && heroEl) {
				setHeroScrolledPast(isHeroScrolledPast(heroEl));
			}
		};

		const attach = () => {
			heroEl = document.getElementById('landing-hero');
			if (!heroEl) return false;

			setHeroScrolledPast(false);
			update();

			observer = new IntersectionObserver(update, { threshold: [0] });
			observer.observe(heroEl);

			window.addEventListener('scroll', update, { passive: true });
			window.addEventListener('resize', update, { passive: true });
			return true;
		};

		const tryAttach = () => {
			if (cancelled) return;
			if (attach()) return;
			retryId = requestAnimationFrame(tryAttach);
		};

		tryAttach();

		return () => {
			cancelled = true;
			cancelAnimationFrame(retryId);
			observer?.disconnect();
			window.removeEventListener('scroll', update);
			window.removeEventListener('resize', update);
		};
	}, [isLanding, location.pathname]);

	const showBar = !isLanding || heroScrolledPast;
	const hiddenTop = `calc(-1 * (${mobileHeaderHeight}px + env(safe-area-inset-top, 0px)))`;

	const bar = (
		<Box
			sx={{
				display: { xs: 'flex', md: 'none' },
				position: isLanding ? 'fixed' : 'sticky',
				top: isLanding ? (showBar ? 0 : hiddenTop) : 0,
				left: isLanding ? 0 : undefined,
				right: isLanding ? 0 : undefined,
				zIndex: 1200,
				alignItems: 'center',
				height: `calc(${mobileHeaderHeight}px + env(safe-area-inset-top, 0px))`,
				pt: 'env(safe-area-inset-top, 0px)',
				px: 0.5,
				flexShrink: 0,
				bgcolor: alpha(tokens.background, 0.92),
				backdropFilter: 'blur(10px)',
				borderBottom: `1px solid ${tokens.border}`,
				...(isLanding && {
					transition: 'top 200ms ease',
					pointerEvents: showBar ? 'auto' : 'none',
					'@media (prefers-reduced-motion: reduce)': {
						transition: 'none',
					},
				}),
			}}>
			<IconButton
				onClick={openDrawer}
				aria-label='Open site navigation'
				sx={{
					width: 44,
					height: 44,
					flexShrink: 0,
					color: tokens.textSecondary,
					'&:hover': { color: tokens.accent, bgcolor: 'transparent' },
					'&:focus-visible': { outline: `2px solid ${tokens.accent}`, outlineOffset: 2 },
				}}>
				<MenuIcon />
			</IconButton>
			<Typography
				component={Link}
				to='/'
				sx={{
					flex: 1,
					minWidth: 0,
					m: 0,
					pl: 0.25,
					pr: 1.5,
					fontFamily: tokens.fontDisplay,
					fontSize: '1.125rem',
					fontWeight: 600,
					letterSpacing: '-0.02em',
					lineHeight: 1.2,
					color: tokens.textPrimary,
					textDecoration: 'none',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					whiteSpace: 'nowrap',
					'&:focus-visible': {
						outline: `2px solid ${tokens.accent}`,
						outlineOffset: 2,
					},
				}}>
				{hero.headline}
			</Typography>
		</Box>
	);

	if (isLanding) {
		return createPortal(bar, document.body);
	}

	return bar;
}

function NavDrawerInternals({ open, onClose }: { open: boolean; onClose: () => void }) {
	return (
		<>
			<Drawer
				open={open}
				onClose={onClose}
				sx={{ display: { md: 'none' } }}
				slotProps={{
					paper: {
						sx: {
							width: { xs: 'min(100vw, 360px)', sm: 360 },
							maxWidth: '100vw',
							bgcolor: alpha(tokens.background, 0.94),
							backdropFilter: 'blur(10px)',
						},
					},
				}}>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
					<IconButton onClick={onClose} aria-label='Close site navigation' sx={{ width: 44, height: 44 }}>
						<CloseIcon />
					</IconButton>
				</Box>
				<NavContent onNavigate={onClose} inDrawer />
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

export function NavDrawerProvider({ children }: { children: ReactNode }) {
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<NavDrawerContext.Provider
			value={{
				openDrawer: () => setMobileOpen(true),
				closeDrawer: () => setMobileOpen(false),
			}}>
			{children}
			<NavDrawerInternals open={mobileOpen} onClose={() => setMobileOpen(false)} />
		</NavDrawerContext.Provider>
	);
}
