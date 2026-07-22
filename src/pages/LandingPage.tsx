import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getCaseStudiesBySystemGroup } from '../lib/caseStudyRegistry';
import { platformStory } from '../lib/site';
import { mobileHeaderHeight, scrollMarginTop } from '../lib/styles';
import { SiteLayout } from '../components/Layout/SiteLayout';
import { PageShell } from '../components/Layout/PageShell';
import { StudyGrid } from '../components/case-study/StudyGrid';
import { StudyCell } from '../components/case-study/StudyCell';
import { FeatureShowcaseList } from '../components/landing/FeatureShowcaseList';
import { LandingHero } from '../components/landing/LandingHero';
import { PlatformTimeline } from '../components/landing/PlatformTimeline';
import { Accent } from '../components/Accent';

export function LandingPage() {
	const systemGroups = getCaseStudiesBySystemGroup();
	const groupStartIndexes: number[] = [];
	let nextIndex = 1;
	for (const { studies } of systemGroups) {
		groupStartIndexes.push(nextIndex);
		nextIndex += studies.length;
	}

	return (
		<SiteLayout>
			{/* Mobile top bar is fixed — reserve space so the hero sits below it. */}
			<Box
				aria-hidden
				sx={{
					display: { xs: 'block', md: 'none' },
					height: `calc(${mobileHeaderHeight}px + env(safe-area-inset-top, 0px))`,
					flexShrink: 0,
				}}
			/>

			<LandingHero />

			<PageShell>
				<Box
					component='section'
					id='case-studies'
					aria-labelledby='platform-story-heading'
					sx={{
						position: 'relative',
						scrollMarginTop,
					}}>
					<StudyGrid spacing={3} sx={{ mb: 0 }}>
						<StudyCell size={{ xs: 12 }}>
							<Typography id='platform-story-heading' variant='pageTitle' sx={{ mb: { xs: 2, md: 2.5 } }}>
								{platformStory.heading}
							</Typography>

							<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
								<Typography variant='body1' sx={{ m: 0 }}>
									MathTrack Institute is an education startup where I spent{' '}
									<Accent>five years as the sole designer and engineer</Accent> of its education operations platform. During that
									time, I <Accent>created, adapted, and retired entire systems</Accent> within this platform{' '}
									<Accent>to support the company as it evolved</Accent>.
								</Typography>
							</Box>

							<PlatformTimeline />
						</StudyCell>
					</StudyGrid>

					<StudyGrid spacing={3} sx={{ mt: { xs: 3, md: 3.5 }, mb: 0 }}>
						{systemGroups.map(({ group, studies }, groupIndex) => (
							<StudyCell key={group} size={{ xs: 12 }}>
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
							</StudyCell>
						))}
					</StudyGrid>
				</Box>
			</PageShell>
		</SiteLayout>
	);
}
