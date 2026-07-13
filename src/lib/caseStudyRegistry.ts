import { CourseAuthoringPage } from '../pages/case-studies/CourseAuthoringPage';
import { UnifiedExperiencePage } from '../pages/case-studies/UnifiedExperiencePage';
import { GradingPage } from '../pages/case-studies/GradingPage';
import { ApprenticeEvaluationPage } from '../pages/case-studies/ApprenticeEvaluationPage';
import type { CaseStudyEntry, CaseStudyMeta } from './caseStudyTypes';

export const caseStudies = [
	{
		slug: 'course-authoring',
		title: 'Course Authoring',
		systemGroup: 'Learning Management Platform',
		subtitle: 'The app contains an integrated curriculum authoring system for creating, organizing, and maintaining college-credit courses.',
		summary:
			'Integrated curriculum authoring for college-credit courses: structure, item types, reuse, versioning, and locking across 160+ courses.',
		years: '2020–Present',
		order: 1,
		readingMinutes: 4,
		component: CourseAuthoringPage,
	},
	{
		slug: 'unified-experience',
		title: 'Student Learning Experience',
		navTitle: 'Student Learning',
		systemGroup: 'Learning Management Platform',
		subtitle: 'A unified learning experience across every course in the program.',
		summary: 'Consistent navigation, progress tracking, and grade visibility across every enrollment.',
		years: '2020–Present',
		order: 2,
		readingMinutes: 2,
		component: UnifiedExperiencePage,
	},
	{
		slug: 'grading',
		title: 'Grading',
		systemGroup: 'Learning Management Platform',
		subtitle: 'Submission review, gradebooks, and scoring for instructor workflows.',
		summary:
			'Assignment-first grading queue, course and student gradebooks, automatic scoring, and AI-assisted review with instructor-controlled final grades.',
		years: '2020–Present',
		order: 3,
		readingMinutes: 3,
		component: GradingPage,
	},
	{
		slug: 'apprentice-evaluation',
		title: 'Evaluation & Reflection',
		systemGroup: 'Apprenticeship Platform',
		subtitle: 'Competency evaluations, reflection journals, and progress tracking for teacher apprenticeship programs.',
		summary: 'Configurable competency evaluations, reflection journals, and apprentice progress tracking for teacher apprenticeship programs.',
		years: '2022–Present',
		order: 4,
		readingMinutes: 2,
		component: ApprenticeEvaluationPage,
	},
] as const satisfies readonly CaseStudyEntry[];

export const systemGroupOrder = ['Learning Management Platform', 'Apprenticeship Platform'] as const;

export function getCaseStudyNavTitle(study: Pick<CaseStudyMeta, 'title' | 'navTitle'>): string {
	return study.navTitle ?? study.title;
}

export function getAllCaseStudies(): CaseStudyMeta[] {
	return [...caseStudies].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title)).map(({ component: _component, ...meta }) => meta);
}

export function getCaseStudiesBySystemGroup(): { group: (typeof systemGroupOrder)[number]; studies: CaseStudyMeta[] }[] {
	const studies = getAllCaseStudies();
	return systemGroupOrder.map((group) => ({
		group,
		studies: studies.filter((study) => study.systemGroup === group),
	}));
}

export function getCaseStudyBySlug(slug: string): CaseStudyEntry | null {
	return caseStudies.find((study) => study.slug === slug) ?? null;
}

export function getAdjacentCaseStudies(slug: string): {
	previous: CaseStudyMeta | null;
	next: CaseStudyMeta | null;
} {
	const studies = getAllCaseStudies();
	const index = studies.findIndex((study) => study.slug === slug);
	if (index === -1) return { previous: null, next: null };

	return {
		previous: index > 0 ? studies[index - 1] : null,
		next: index < studies.length - 1 ? studies[index + 1] : null,
	};
}
