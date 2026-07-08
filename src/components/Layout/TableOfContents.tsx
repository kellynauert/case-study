import { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import type { HeadingItem } from '../../lib/parseMarkdown';
import { tokens } from '../../theme/theme';

interface TableOfContentsProps {
	headings: HeadingItem[];
	activeId: string;
	studyTitle?: string;
}

function scrollToSection(id: string) {
	const el = document.getElementById(id);
	if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function NavLinks({ headings, activeId, onNavigate }: { headings: HeadingItem[]; activeId: string; onNavigate?: () => void }) {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
			{headings.map((item) => {
				const isActive = activeId === item.id;
				return (
					<Box
						key={item.id}
						component='a'
						href={`#${item.id}`}
						onClick={(e) => {
							e.preventDefault();
							scrollToSection(item.id);
							onNavigate?.();
						}}
						aria-current={isActive ? 'location' : undefined}
						sx={{
							display: 'block',
							py: 0.625,
							pl: item.level === 2 ? 2 : 1,
							pr: 1,
							textDecoration: 'none',
							borderLeft: `2px solid ${isActive ? tokens.accent : 'transparent'}`,
							fontSize: item.level === 2 ? '0.75rem' : '0.8125rem',
							fontWeight: isActive ? 600 : 400,
							color: isActive ? tokens.accent : tokens.textNav,
							lineHeight: 1.45,
							transition: 'color 200ms ease',
							'&:hover': { color: tokens.accent },
							'&:focus-visible': {
								outline: `2px solid ${tokens.accent}`,
								outlineOffset: 2,
							},
						}}>
						{item.title}
					</Box>
				);
			})}
		</Box>
	);
}

export function TableOfContents({ headings, activeId, studyTitle }: TableOfContentsProps) {
	const [mobileOpen, setMobileOpen] = useState(false);

	const navContent = (
		<Box component='nav' aria-label='Showcase sections' sx={{ px: 1.5, py: 2 }}>
			<Box
				component={Link}
				to='/#case-studies'
				onClick={() => setMobileOpen(false)}
				sx={{
					display: 'block',
					px: 1,
					mb: 2,
					fontSize: '0.8125rem',
					color: tokens.textNav,
					textDecoration: 'none',
					'&:hover': { color: tokens.textPrimary },
					'&:focus-visible': {
						outline: `2px solid ${tokens.accent}`,
						outlineOffset: 2,
					},
				}}>
				← Showcase
			</Box>
			{studyTitle && (
				<Typography
					sx={{
						display: 'block',
						px: 1,
						mb: 2,
						fontSize: '0.8125rem',
						fontWeight: 500,
						color: tokens.textPrimary,
						lineHeight: 1.4,
					}}>
					{studyTitle}
				</Typography>
			)}
			<NavLinks headings={headings} activeId={activeId} onNavigate={() => setMobileOpen(false)} />
		</Box>
	);

	return (
		<>
			<IconButton
				onClick={() => setMobileOpen(true)}
				aria-label='Open navigation'
				sx={{
					display: { md: 'none' },
					position: 'fixed',
					top: 72,
					right: 16,
					zIndex: 1200,
					bgcolor: tokens.surface,
					border: `1px solid ${tokens.border}`,
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
							width: 280,
							bgcolor: tokens.surface,
							borderRight: `1px solid ${tokens.border}`,
						},
					},
				}}>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
					<IconButton onClick={() => setMobileOpen(false)} aria-label='Close navigation'>
						<CloseIcon fontSize='small' />
					</IconButton>
				</Box>
				{navContent}
			</Drawer>

			<Box
				aria-label='Showcase navigation'
				sx={{
					display: { xs: 'none', md: 'block' },
					position: 'sticky',
					top: '4rem',
					height: 'calc(100vh - 4rem)',
					width: tokens.layout.navWidth,
					flexShrink: 0,
					borderRight: `1px solid ${tokens.border}`,
					overflowY: 'auto',
					alignSelf: 'flex-start',
				}}>
				{navContent}
			</Box>
		</>
	);
}
