import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { about, howIWork } from '../lib/site';
import { SiteLayout } from '../components/Layout/SiteLayout';
import { FadeIn } from '../components/Layout/FadeIn';
import { tokens } from '../theme/theme';

function SectionShell({ children, narrow }: { children: React.ReactNode; narrow?: boolean }) {
	return (
		<Box
			sx={{
				maxWidth: narrow ? tokens.layout.contentMaxWidth : tokens.layout.pageMaxWidth,
				mx: 'auto',
				px: { xs: 2, sm: 3 },
			}}>
			{children}
		</Box>
	);
}

export function AboutPage() {
	return (
		<SiteLayout>
			<SectionShell narrow>
				<FadeIn>
					<Box
						component='section'
						aria-labelledby='how-i-work-heading'
						sx={{
							pt: { xs: 6, md: 10 },
							pb: { xs: 8, md: 12 },
						}}>
						<Typography id='how-i-work-heading' variant='h2' component='h1' sx={{ mb: 3, fontSize: { xs: '1.375rem', md: '1.5rem' } }}>
							{howIWork.heading}
						</Typography>

						<Box
							sx={{
								'& p': {
									m: 0,
									fontSize: '1.0625rem',
									lineHeight: 1.75,
									color: tokens.textSecondary,
									'&:not(:last-child)': { mb: 2 },
								},
							}}>
							{howIWork.paragraphs.map((paragraph) => (
								<Typography key={paragraph} component='p'>
									{paragraph}
								</Typography>
							))}
						</Box>
					</Box>
				</FadeIn>
			</SectionShell>

			<SectionShell narrow>
				<FadeIn delay={60}>
					<Box
						component='section'
						aria-labelledby='about-heading'
						sx={{
							pb: { xs: 4, md: 6 },
						}}>
						<Typography id='about-heading' variant='h2' component='h2' sx={{ mb: 4, fontSize: { xs: '1.375rem', md: '1.5rem' } }}>
							{about.heading}
						</Typography>

						<Box
							sx={{
								display: 'grid',
								gridTemplateColumns: { xs: 'auto 1fr', md: '140px 1fr' },
								gap: { xs: 2.5, md: 4 },
								alignItems: 'start',
							}}>
							<Box
								sx={{
									width: { xs: 96, md: 140 },
									aspectRatio: '4 / 5',
									borderRadius: 2,
									overflow: 'hidden',
									border: `1px solid ${tokens.border}`,
									bgcolor: tokens.surfaceRaised,
									flexShrink: 0,
								}}>
								<Box
									component='img'
									src={about.portrait}
									alt=''
									sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
								/>
							</Box>

							<Box
								sx={{
									'& p': {
										m: 0,
										fontSize: '1.0625rem',
										lineHeight: 1.75,
										color: tokens.textSecondary,
										'&:not(:last-child)': { mb: 2 },
									},
								}}>
								{about.paragraphs.map((paragraph) => (
									<Typography key={paragraph} component='p'>
										{paragraph}
									</Typography>
								))}
							</Box>
						</Box>
					</Box>
				</FadeIn>
			</SectionShell>
		</SiteLayout>
	);
}
