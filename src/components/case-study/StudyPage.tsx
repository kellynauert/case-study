import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { PageShell } from '../Layout/PageShell';
import { TableOfContents } from '../Layout/TableOfContents';
import type { StudySectionItem, TocHeading } from '../../lib/caseStudyTypes';
import { displayTitleSx, secondaryTextSx } from '../../lib/styles';
import { tokens } from '../../theme/theme';
import { CaseStudyPager } from './CaseStudyPager';

interface StudyPageProps {
	slug: string;
	title: string;
	subtitle: string;
	sections: StudySectionItem[];
	children: ReactNode;
}

export function StudyPage({ slug, title, subtitle, sections, children }: StudyPageProps) {
	const sectionIds = sections.map((section) => section.id);
	const activeId = useScrollSpy(sectionIds);
	const headings: TocHeading[] = sections.map((section) => ({ id: section.id, title: section.title, level: 1 }));

	return (
		<>
			<TableOfContents headings={headings} activeId={activeId} studyTitle={title} mobileOnly />
			<PageShell footer={<CaseStudyPager slug={slug} currentTitle={title} />}>
				<Box sx={{ mb: { xs: 2.5, md: 3 } }}>
					<Typography component='h1' sx={{ ...displayTitleSx, mb: subtitle ? 1.25 : 0 }}>
						{title}
					</Typography>
					{subtitle && <Typography sx={{ maxWidth: tokens.layout.readableWidth, ...secondaryTextSx }}>{subtitle}</Typography>}
				</Box>
				{children}
			</PageShell>
		</>
	);
}
