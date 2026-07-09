import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getAllCaseStudies } from '../lib/caseStudies';
import { hero, sections, allScreenshots } from '../lib/site';
import { pagePaddingX, scrollMarginTop, sectionHeadingSx } from '../lib/styles';
import { SiteLayout } from '../components/Layout/SiteLayout';
import { SiteHeroIntro } from '../components/Layout/SiteHeroIntro';
import { FadeIn } from '../components/Layout/FadeIn';
import { ContextPanel } from '../components/landing/ContextPanel';
import { Gallery } from '../components/blocks/Gallery';
import { tokens } from '../theme/theme';

function SectionShell({ children, narrow }: { children: React.ReactNode; narrow?: boolean }) {
	return (
		<Box
			sx={{
				maxWidth: narrow ? tokens.layout.contentMaxWidth : tokens.layout.pageMaxWidth,
				px: pagePaddingX,
			}}>
			{children}
		</Box>
	);
}

export function LandingPage() {
	const caseStudies = getAllCaseStudies();

	return (
		<SiteLayout>
			<Box sx={{ display: { xs: 'block', md: 'none' }, pl: 1.5, pr: 2, pt: 1 }}>
				<SiteHeroIntro />
			</Box>

			<SectionShell>
				<Box
					sx={{
						pt: { xs: 0, md: 5 },
						pb: { xs: 2, md: 3 },
					}}>
					<Box
						aria-labelledby='showcase-heading'
						sx={{
							scrollMarginTop,
							mb: 0,
						}}>
						<Typography id='showcase-heading' component='h2' sx={{ ...sectionHeadingSx, mb: { xs: 2, md: 2.5 } }}>
							{hero.title}
						</Typography>

						<ContextPanel studies={caseStudies} />
					</Box>
				</Box>
			</SectionShell>

			<SectionShell>
				<Box
					component='section'
					id='screens'
					aria-labelledby='screens-heading'
					sx={{
						pt: { xs: 2, md: 3 },
						pb: { xs: 4, md: 6 },
						scrollMarginTop,
					}}>
					<FadeIn delay={80}>
						<Gallery images={[...allScreenshots]} title={sections.screens} headerId='screens-heading' />
					</FadeIn>
				</Box>
			</SectionShell>
		</SiteLayout>
	);
}
