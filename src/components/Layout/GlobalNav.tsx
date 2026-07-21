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
import { getCaseStudiesBySystemGroup, getCaseStudyNavTitle } from '../../lib/caseStudyRegistry';
import type { TocHeading } from '../../lib/caseStudyTypes';
import { hero } from '../../lib/site';
import { isShowcaseViewed } from '../../lib/viewedShowcases';
import { useViewedShowcases } from '../../hooks/useViewedShowcases';
import { useViewedSections } from '../../hooks/useViewedSections';
import { mobileHeaderHeight } from '../../lib/styles';
import { usePageToc } from './PageTocContext';
import { SiteHeroIntro } from './SiteHeroIntro';
import { ResumeDownloadLink } from './ResumeDownloadLink';
import { tokens } from '../../theme/theme';

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

function scrollToSection(id: string) {
	const el = document.getElementById(id);
	if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * reading-first / reading-again — active (pink filled circle)
 * read — marked read, not active (check)
 * unread — not read, not active (no mark)
 */
type ReadStatus = 'unread' | 'reading-first' | 'reading-again' | 'read';

/** Systems page rows — indicator column + title. */
const studyItemGridSx = {
	display: 'grid',
	gridTemplateColumns: '1.25rem 1fr',
	columnGap: 0.75,
	pl: 2,
	pr: 1,
} as const;

function ProgressDot({ size = 5, color = tokens.accent }: { size?: number; color?: string }) {
	return (
		<Box
			sx={{
				width: size,
				height: size,
				borderRadius: '50%',
				bgcolor: color,
				flexShrink: 0,
			}}
		/>
	);
}

function ReadCheck({ size = '1rem', color = tokens.accentPink }: { size?: string; color?: string }) {
	return (
		<CheckIcon
			sx={{
				fontSize: size,
				color,
				'& path': {
					stroke: 'currentColor',
					strokeWidth: 0.75,
					paintOrder: 'stroke fill',
				},
			}}
		/>
	);
}

function StudyReadIndicator({ read, active }: { read: boolean; active?: boolean }) {
	return (
		<Box
			aria-hidden
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				height: '1.25rem',
				flexShrink: 0,
			}}>
			{read ?
				<ReadCheck color={active ? tokens.accent : tokens.accentPink} />
			:	null}
		</Box>
	);
}

function SectionReadIndicator({ status }: { status: ReadStatus }) {
	return (
		<Box
			aria-hidden
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				height: '0.95em',
				flexShrink: 0,
			}}>
			{status === 'read' ?
				<ProgressDot size={2} />
			: status === 'reading-again' ?
				<ProgressDot size={2} />
			: status === 'reading-first' ?
				<ProgressDot size={2} />
			:	null}
		</Box>
	);
}

function groupHeadings(headings: TocHeading[]) {
	const groups: { section: TocHeading; children: TocHeading[] }[] = [];
	for (const heading of headings) {
		if ((heading.level ?? 1) === 2) {
			if (groups.length === 0) {
				groups.push({ section: heading, children: [] });
			} else {
				groups[groups.length - 1].children.push(heading);
			}
		} else {
			groups.push({ section: heading, children: [] });
		}
	}
	return groups;
}

/** Section is active while the section or any of its subsections is on screen. Multiple may be active. */
function sectionReadStatus(sectionId: string, children: TocHeading[], activeIds: ReadonlySet<string>, readIds: ReadonlySet<string>): ReadStatus {
	const isActive = activeIds.has(sectionId) || children.some((child) => activeIds.has(child.id));
	const isRead = readIds.has(sectionId);
	if (isActive && !isRead) return 'reading-first';
	if (isActive && isRead) return 'reading-again';
	if (isRead) return 'read';
	return 'unread';
}

const systemSubgroupLabelSx = {
	display: 'block',
	px: 1,
	mb: 0.5,
	mt: 1.25,
	fontFamily: tokens.fontBody,
	fontSize: '0.8125rem',
	fontWeight: 600,
	letterSpacing: '0.04em',
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
		transition: 'color 200ms ease, border-color 200ms ease',
		'&:hover': { color: tokens.accent },
		'&:focus-visible': {
			outline: `2px solid ${tokens.accent}`,
			outlineOffset: 2,
		},
	};
}

function PageSectionLinks({
	slug,
	headings,
	activeIds,
	onNavigate,
}: {
	slug: string;
	headings: TocHeading[];
	activeIds: string[];
	onNavigate?: () => void;
}) {
	const viewed = useViewedSections(slug);
	const readIds = new Set(viewed);
	const activeIdSet = new Set(activeIds);
	const groups = groupHeadings(headings);

	return (
		<Box
			component='nav'
			aria-label='On this page'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 0,
				ml: 6,
				pl: 1.5,
				pr: 0.5,
				mt: -0.15,
			}}>
			{groups.map((group, index) => {
				const status = sectionReadStatus(group.section.id, group.children, activeIdSet, readIds);
				const isActive = status === 'reading-first' || status === 'reading-again';
				return (
					<Box
						key={group.section.id}
						component='a'
						href={`#${group.section.id}`}
						onClick={(e) => {
							e.preventDefault();
							scrollToSection(group.section.id);
							onNavigate?.();
						}}
						aria-current={isActive ? 'location' : undefined}
						aria-label={`${group.section.title}${
							status === 'read' ? ', read'
							: status === 'reading-first' ? ', reading'
							: status === 'reading-again' ? ', reading again'
							: ''
						}`}
						sx={{
							display: 'grid',
							gridTemplateColumns: '0.55rem 1fr',
							columnGap: 0.4,
							alignItems: 'start',
							py: 0.35,
							mt: index > 0 ? 0.55 : 0,
							pl: 0.75,
							pr: 1,
							textDecoration: 'none',
							borderLeft: `1px solid ${isActive ? tokens.accent : 'transparent'}`,
							transition: 'border-color 160ms ease',
							'&:hover .page-toc-label': { color: tokens.accent },
							'&:focus-visible': {
								outline: `2px solid ${tokens.accent}`,
								outlineOffset: 1,
							},
						}}>
						<SectionReadIndicator status={status} />
						<Box
							className='page-toc-label'
							sx={{
								fontFamily: tokens.fontBody,
								fontSize: '0.75rem',
								fontWeight: isActive ? 600 : 400,
								letterSpacing: '0.01em',
								lineHeight: 1.35,
								color: isActive ? tokens.accent : tokens.textNav,
								transition: 'color 160ms ease',
							}}>
							{group.section.title}
						</Box>
					</Box>
				);
			})}
		</Box>
	);
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
	const pageToc = usePageToc();
	const systemGroups = getCaseStudiesBySystemGroup();
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

			{systemGroups.map(({ group, studies }) => (
				<Box key={group} sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
					<Typography component='p' sx={{ ...systemSubgroupLabelSx, mt: group === systemGroups[0]?.group ? 0.5 : 1.75 }}>
						{group}
					</Typography>

					{studies.map((study) => {
						const href = `/case-studies/${study.slug}`;
						const isActive = location.pathname === href;
						const read = isShowcaseViewed(study.slug, viewed);
						const showPageToc = isActive && pageToc && pageToc.headings.length > 0;
						const navTitle = getCaseStudyNavTitle(study);

						return (
							<Box key={study.slug}>
								<Box
									component={Link}
									to={href}
									onClick={onNavigate}
									aria-current={isActive ? 'page' : undefined}
									aria-label={`${navTitle}${read ? ', read' : ', unread'}`}
									sx={{
										...studyItemGridSx,
										alignItems: 'center',
										py: showPageToc ? 0.75 : 1,
										minHeight: showPageToc ? 36 : 44,
										textDecoration: 'none',
										borderLeft: `2px solid ${isActive ? tokens.accent : 'transparent'}`,
										transition: 'color 200ms ease, border-color 200ms ease',
										'&:hover': { '& .global-nav-title': { color: tokens.accent } },
										'&:focus-visible': {
											outline: `2px solid ${tokens.accent}`,
											outlineOffset: 2,
										},
									}}>
									<StudyReadIndicator read={read} active={isActive} />
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
										{navTitle}
									</Typography>
								</Box>
								{showPageToc ?
									<PageSectionLinks
										slug={pageToc.slug}
										headings={pageToc.headings}
										activeIds={pageToc.activeIds}
										onNavigate={onNavigate}
									/>
								:	null}
							</Box>
						);
					})}
				</Box>
			))}
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

			setHeroScrolledPast(isHeroScrolledPast(heroEl));
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

	const bar = (
		<Box
			sx={{
				display: { xs: 'flex', md: 'none' },
				position: isLanding ? 'fixed' : 'sticky',
				top: 0,
				left: isLanding ? 0 : undefined,
				right: isLanding ? 0 : undefined,
				zIndex: 1200,
				alignItems: 'center',
				height: `calc(${mobileHeaderHeight}px + env(safe-area-inset-top, 0px))`,
				pt: 'env(safe-area-inset-top, 0px)',
				px: 0.5,
				pr: 1,
				flexShrink: 0,
				bgcolor: alpha(tokens.background, isLanding && !heroScrolledPast ? 0.72 : 0.92),
				backdropFilter: 'blur(10px)',
				borderBottom: `1px solid ${isLanding && !heroScrolledPast ? 'transparent' : tokens.border}`,
				transition: 'background-color 200ms ease, border-color 200ms ease',
				'@media (prefers-reduced-motion: reduce)': {
					transition: 'none',
				},
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
					pr: 1,
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
			<ResumeDownloadLink
				sx={{
					flexShrink: 0,
					px: 0.75,
					fontSize: '0.8125rem',
					gap: 0.5,
				}}
			/>
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
