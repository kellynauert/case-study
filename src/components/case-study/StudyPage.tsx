import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { useMarkSectionViewed } from '../../hooks/useViewedSections';
import type { StudySectionItem, TocHeading } from '../../lib/caseStudyTypes';
import { tokens } from '../../theme/theme';
import { useSetPageToc } from '../Layout/PageTocContext';
import { PageShell } from '../Layout/PageShell';
import { OUTLINE_ATTR } from './StudySection';
import { CaseStudyPager } from './CaseStudyPager';

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
	const activeId = useScrollSpy(sectionIds);
	const setPageToc = useSetPageToc();

	useMarkSectionViewed(slug, activeId);

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
	}, [slug, children]);

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
		setPageToc({ slug, headings, activeId });
		return () => setPageToc(null);
	}, [slug, sections, activeId, setPageToc]);

	return (
		<PageShell footer={<CaseStudyPager slug={slug} currentTitle={title} />}>
			<Box ref={contentRef}>
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
			</Box>
		</PageShell>
	);
}
