import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { useSectionReadTracker } from '../../hooks/useViewedSections';
import type { StudySectionItem, TocHeading } from '../../lib/caseStudyTypes';
import { scrollMarginTop } from '../../lib/styles';
import { SECTION_COMPLETE_ATTR } from '../../lib/viewedSections';
import { useSetPageToc } from '../Layout/PageTocContext';
import { PageShell } from '../Layout/PageShell';
import { OUTLINE_ATTR } from './StudySection';
import { CaseStudyPager } from './CaseStudyPager';
import { StudyGrid } from './StudyGrid';

const INTRO_SECTION_ID = 'intro';
const INTRO_OUTLINE_TITLE = 'Intro';

interface StudyPageProps {
	slug: string;
	title: string;
	subtitle: string;
	intro: ReactNode;
	children: ReactNode;
}

function collectOutline(root: HTMLElement): StudySectionItem[] {
	const nodes = root.querySelectorAll<HTMLElement>(`[${OUTLINE_ATTR}]`);
	const items: StudySectionItem[] = [];
	const seen = new Set<string>();

	nodes.forEach((node) => {
		const id = node.id;
		if (!id || seen.has(id)) return;
		const levelAttr = node.getAttribute(OUTLINE_ATTR);
		const level = levelAttr === '2' ? 2 : 1;
		const outlineTitle = node.getAttribute('data-outline-title')?.trim();
		const title = outlineTitle || node.textContent?.trim() || id;
		seen.add(id);
		items.push({ id, title, level });
	});

	return items;
}

export function StudyPage({ slug, title, subtitle, intro, children }: StudyPageProps) {
	const contentRef = useRef<HTMLDivElement>(null);
	const [sections, setSections] = useState<StudySectionItem[]>([]);
	const sectionIds = useMemo(() => sections.map((section) => section.id), [sections]);
	const activeIds = useScrollSpy(sectionIds);
	const setPageToc = useSetPageToc();

	useSectionReadTracker(slug, contentRef, sections.length);

	useLayoutEffect(() => {
		const root = contentRef.current;
		if (!root) return;

		const sync = () => setSections(collectOutline(root));
		sync();

		const observer = new MutationObserver(sync);
		observer.observe(root, {
			subtree: true,
			childList: true,
			attributes: true,
			attributeFilter: ['id', OUTLINE_ATTR, 'data-outline-title'],
		});
		return () => observer.disconnect();
	}, [slug, intro, children]);

	useEffect(() => {
		if (sections.length === 0) {
			setPageToc(null);
			return;
		}
		const headings: TocHeading[] = sections.map((section) => ({
			id: section.id,
			title: section.title,
			level: section.level ?? 1,
		}));
		setPageToc({ slug, headings, activeIds });
		return () => setPageToc(null);
	}, [slug, sections, activeIds, setPageToc]);

	return (
		<PageShell footer={<CaseStudyPager slug={slug} />}>
			<Box ref={contentRef}>
				<Box sx={{ mb: { xs: 2.5, md: 3 } }}>
					<Typography variant='pageTitle' sx={{ mb: subtitle ? 0.75 : 0 }}>
						{title}
					</Typography>
					{subtitle && (
						<Typography variant='pageSubtitle' sx={{ mb: intro ? 1.5 : 0 }}>
							{subtitle}
						</Typography>
					)}
					{intro ?
						<Box
							id={INTRO_SECTION_ID}
							{...{
								[OUTLINE_ATTR]: '1',
								'data-outline-title': INTRO_OUTLINE_TITLE,
							}}
							sx={{ scrollMarginTop, width: '100%' }}>
							{typeof intro === 'string' ?
								<Typography variant='body1'>{intro}</Typography>
							:	<StudyGrid spacing={2} sx={{ mb: 0 }}>
									{intro}
								</StudyGrid>
							}
							<Box
								component='span'
								aria-hidden
								{...{ [SECTION_COMPLETE_ATTR]: INTRO_SECTION_ID }}
								sx={{
									display: 'block',
									width: '100%',
									height: 1,
									mt: 0,
									pointerEvents: 'none',
								}}
							/>
						</Box>
					:	null}
				</Box>
				<StudyGrid spacing={0} columnSpacing={{ xs: 3, md: 5 }} sx={{ mb: 0 }}>
					{children}
				</StudyGrid>
			</Box>
		</PageShell>
	);
}
