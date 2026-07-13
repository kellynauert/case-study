import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getCaseStudiesBySystemGroup } from '../lib/caseStudyRegistry';
import { platformStory } from '../lib/site';
import { pagePaddingX, scrollMarginTop } from '../lib/styles';
import { SiteLayout } from '../components/Layout/SiteLayout';
import { SiteHeroIntro } from '../components/Layout/SiteHeroIntro';
import { FeatureShowcaseList } from '../components/landing/FeatureShowcaseList';
import { PlatformTimeline } from '../components/landing/PlatformTimeline';
import { tokens } from '../theme/theme';

export function LandingPage() {
	const systemGroups = getCaseStudiesBySystemGroup();
	const groupStartIndexes = systemGroups.reduce<number[]>((indexes, group, i) => {
		const start = i === 0 ? 1 : indexes[i - 1] + systemGroups[i - 1].studies.length;
		indexes.push(start);
		return indexes;
	}, []);

	return (
		<SiteLayout>
			<Box id='landing-hero' sx={{ display: { xs: 'block', md: 'none' }, pl: 1.5, pr: 2, pt: 2 }}>
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

					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
						{platformStory.paragraphs.map((paragraph) => (
							<Typography key={paragraph.slice(0, 40)} variant='body1' sx={{ m: 0 }}>
								{paragraph}
							</Typography>
						))}
					</Box>

					<PlatformTimeline />

					{platformStory.closing.map((paragraph) => (
						<Typography key={paragraph.slice(0, 40)} variant='body1' sx={{ m: 0, mt: 2 }}>
							{paragraph}
						</Typography>
					))}

					<Box sx={{ mt: { xs: 3, md: 3.5 }, display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 3.5 } }}>
						{systemGroups.map(({ group, studies }, groupIndex) => (
							<Box key={group}>
								<Typography
									component='h2'
									variant='subsectionHeading'
									sx={{
										m: 0,
										mb: { xs: 1.5, md: 1.75 },
									}}>
									{group}
								</Typography>
								<FeatureShowcaseList studies={studies} startIndex={groupStartIndexes[groupIndex]} />
							</Box>
						))}
					</Box>
				</Box>
			</Box>
		</SiteLayout>
	);
}
