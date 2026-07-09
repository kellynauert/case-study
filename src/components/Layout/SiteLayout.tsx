import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import { Footer } from './Footer';
import { MobileStickyNavBar, NavDrawerProvider } from './GlobalNav';
import { tokens } from '../../theme/theme';

interface SiteLayoutProps {
	children: React.ReactNode;
	showFooter?: boolean;
}

export function SiteLayout({ children, showFooter = true }: SiteLayoutProps) {
	return (
		<NavDrawerProvider>
			<Box sx={{ minHeight: '100vh', position: 'relative' }}>
				<Box
					aria-hidden
					sx={{
						position: 'fixed',
						inset: 0,
						zIndex: 0,
						pointerEvents: 'none',
						background: `
						radial-gradient(ellipse 70% 50% at 5% -5%, ${alpha(tokens.accentPink, 0.12)} 0%, transparent 55%),
						radial-gradient(ellipse 60% 45% at 95% 0%, ${alpha(tokens.accent, 0.1)} 0%, transparent 50%),
						radial-gradient(ellipse 50% 35% at 50% 100%, ${alpha(tokens.accentLight, 0.08)} 0%, transparent 50%),
						${tokens.background}
					`,
					}}
				/>

				<Grid
					container
					wrap='nowrap'
					sx={{
						position: 'relative',
						zIndex: 1,
						minHeight: '100vh',
						width: '100%',
						maxWidth: { md: tokens.layout.shellMaxWidth },
						mx: { md: 'auto' },
						columnGap: { md: 5 },
					}}>
					<Grid
						aria-hidden
						sx={{
							display: { xs: 'none', md: 'block' },
							width: tokens.layout.navWidth,
							minWidth: tokens.layout.navWidth,
							maxWidth: tokens.layout.navWidth,
							flexShrink: 0,
						}}
					/>

					<Grid
						sx={{
							flex: 1,
							minWidth: 0,
							width: { xs: '100%', md: 'auto' },
							display: 'flex',
							flexDirection: 'column',
							overflowX: 'clip',
						}}>
						<MobileStickyNavBar />

						<Box
							component='a'
							href='#main-content'
							sx={{
								position: 'absolute',
								left: -9999,
								zIndex: 9999,
								p: 2,
								bgcolor: tokens.accent,
								color: '#fff',
								textDecoration: 'none',
								borderRadius: 1,
								fontWeight: 600,
								'&:focus': { left: 16, top: 16 },
							}}>
							Skip to content
						</Box>

						<Box component='main' id='main-content' sx={{ flex: 1 }}>
							{children}
						</Box>

						{showFooter && <Footer />}
					</Grid>
				</Grid>
			</Box>
		</NavDrawerProvider>
	);
}
