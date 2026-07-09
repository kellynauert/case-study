import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getAllCaseStudies } from '../lib/caseStudyRegistry';
import { platformStory, platformStats } from '../lib/site';
import { pagePaddingX, scrollMarginTop } from '../lib/styles';
import { SiteLayout } from '../components/Layout/SiteLayout';
import { SiteHeroIntro } from '../components/Layout/SiteHeroIntro';
import { FeatureShowcaseList } from '../components/landing/FeatureShowcaseList';
import { Stats } from '../components/blocks/Stats';
import { tokens } from '../theme/theme';

export function LandingPage() {
	const caseStudies = getAllCaseStudies();

	return (
		<SiteLayout>
			<Box
				id='landing-hero'
				sx={{ display: { xs: 'block', md: 'none' }, pl: 1.5, pr: 2, pt: 2 }}>
				<SiteHeroIntro />
			</Box>

			<Box
				sx={{
					maxWidth: tokens.layout.pageMaxWidth,
					px: pagePaddingX,
					pt: { xs: 0, md: 5 },
				}}>
				<Box
					component='section'
					id='case-studies'
					aria-labelledby='platform-story-heading'
					sx={{
						position: 'relative',
						scrollMarginTop,
					}}>
					<Typography id='platform-story-heading' variant='pageTitle' sx={{ mb: { xs: 2, md: 2.5 } }}>
						{platformStory.heading}
					</Typography>

					<Grid container spacing={3} sx={{ alignItems: 'start' }}>
						{platformStory.paragraphs.map((paragraph) => (
							<Grid key={paragraph.slice(0, 40)} size={{ xs: 12, md: 6 }}>
								<Typography variant='body1' sx={{ m: 0 }}>
									{paragraph}
								</Typography>
							</Grid>
						))}
					</Grid>

					<Box sx={{ mt: { xs: 2.5, md: 3 } }}>
						<Stats items={[...platformStats]} compact />
					</Box>

					<Box sx={{ mt: { xs: 3, md: 3.5 } }}>
						<FeatureShowcaseList studies={caseStudies} />
					</Box>
				</Box>
			</Box>
		</SiteLayout>
	);
}
