import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getAllCaseStudies } from '../lib/caseStudyRegistry';
import { hero, platformStory, platformStats, sections, allScreenshots } from '../lib/site';
import { bodyTextSx, pagePaddingX, panelHeadingSx, scrollMarginTop, sectionHeadingSx } from '../lib/styles';
import { SiteLayout } from '../components/Layout/SiteLayout';
import { SiteHeroIntro } from '../components/Layout/SiteHeroIntro';
import { FadeIn } from '../components/Layout/FadeIn';
import { FeatureShowcaseList } from '../components/landing/FeatureShowcaseList';
import { Stats } from '../components/blocks/Stats';
import { Gallery } from '../components/blocks/Gallery';
import { tokens } from '../theme/theme';

export function LandingPage() {
	const caseStudies = getAllCaseStudies();

	return (
		<SiteLayout>
			<Box sx={{ display: { xs: 'block', md: 'none' }, pl: 1.5, pr: 2, pt: 1 }}>
				<SiteHeroIntro />
			</Box>

			<Box
				sx={{
					maxWidth: tokens.layout.pageMaxWidth,
					px: pagePaddingX,
					pt: { xs: 0, md: 5 },
					pb: { xs: 2, md: 3 },
				}}>
				<Box aria-labelledby='showcase-heading' sx={{ scrollMarginTop, mb: 0 }}>
					<Typography id='showcase-heading' component='h2' sx={{ ...sectionHeadingSx, mb: { xs: 2, md: 2.5 } }}>
						{hero.title}
					</Typography>

					<Box
						component='section'
						id='case-studies'
						aria-labelledby='platform-story-heading'
						sx={{
							position: 'relative',
							mb: { xs: 2.5, md: 3 },
							bgcolor: tokens.surface,
							border: `1px solid ${tokens.border}`,
							borderRadius: 1.5,
							pl: { xs: 2.5, md: 3.25 },
							pr: { xs: 2.25, md: 3 },
							py: { xs: 2.5, md: 3 },
							scrollMarginTop,
						}}>
						<Typography
							id='platform-story-heading'
							component='h3'
							sx={{
								...panelHeadingSx,
								mb: { xs: 2, md: 2.25 },
							}}>
							{platformStory.heading}
						</Typography>

						<Grid container spacing={3} sx={{ alignItems: 'start' }}>
							{platformStory.paragraphs.map((paragraph) => (
								<Grid key={paragraph.slice(0, 40)} size={{ xs: 12, md: 6 }}>
									<Typography sx={{ m: 0, ...bodyTextSx }}>{paragraph}</Typography>
								</Grid>
							))}
						</Grid>

						<Box sx={{ mt: { xs: 2.5, md: 3 } }}>
							<Stats items={[...platformStats]} compact />
						</Box>

						<Box sx={{ mt: { xs: 3, md: 3.5 } }}>
							<FeatureShowcaseList studies={caseStudies} nested />
						</Box>
					</Box>
				</Box>
			</Box>

			<Box
				sx={{
					maxWidth: tokens.layout.pageMaxWidth,
					px: pagePaddingX,
				}}>
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
			</Box>
		</SiteLayout>
	);
}
