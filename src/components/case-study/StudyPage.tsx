import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, type ReactNode } from 'react';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import type { StudySectionItem, TocHeading } from '../../lib/caseStudyTypes';
import { tokens } from '../../theme/theme';
import { useSetPageToc } from '../Layout/GlobalNav';
import { PageShell } from '../Layout/PageShell';
import { CaseStudyPager } from './CaseStudyPager';

interface StudyPageProps {
	slug: string;
	title: string;
	subtitle: string;
	intro: ReactNode;
	sections: StudySectionItem[];
	children: ReactNode;
}

export function StudyPage({ slug, title, subtitle, intro, sections, children }: StudyPageProps) {
	const sectionIds = sections.map((section) => section.id);
	const activeId = useScrollSpy(sectionIds);
	const setPageToc = useSetPageToc();

	useEffect(() => {
		const headings: TocHeading[] = sections.map((section) => ({
			id: section.id,
			title: section.title,
			level: section.level ?? 1,
		}));
		setPageToc({ headings, activeId });
		return () => setPageToc(null);
	}, [sections, activeId, setPageToc]);

	return (
		<PageShell footer={<CaseStudyPager slug={slug} currentTitle={title} />}>
			<Box sx={{ mb: { xs: 2.5, md: 3 } }}>
				<Typography variant='pageTitle' sx={{ mb: subtitle ? 0.75 : 0 }}>
					{title}
				</Typography>
				{subtitle && (
					<Typography variant='pageSubtitle' sx={{ maxWidth: tokens.layout.readableWidth, mb: intro ? 1.5 : 0 }}>
						{subtitle}
					</Typography>
				)}
				{intro &&
					(typeof intro === 'string' ?
						<Typography variant='body1' sx={{ maxWidth: tokens.layout.readableWidth }}>
							{intro}
						</Typography>
					:	<Box sx={{ width: '100%', '& > p': { m: 0 } }}>{intro}</Box>)}
			</Box>
			{children}
		</PageShell>
	);
}
