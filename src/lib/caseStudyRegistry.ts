import { CourseAuthoringPage, courseAuthoringSections } from '../pages/case-studies/CourseAuthoringPage';
import { UnifiedExperiencePage, unifiedExperienceSections } from '../pages/case-studies/UnifiedExperiencePage';
import { GradingPage, gradingSections } from '../pages/case-studies/GradingPage';
import { AdminPage, adminSections } from '../pages/case-studies/AdminPage';
import { ApprenticeEvaluationPage, apprenticeEvaluationSections } from '../pages/case-studies/ApprenticeEvaluationPage';
import type { CaseStudyEntry, CaseStudyMeta } from './caseStudyTypes';

export const caseStudies = [
	{
		slug: 'course-authoring',
		title: 'Course Authoring Platform',
		subtitle: 'Structured curriculum authoring with a shared content model across every course.',
		summary:
			'Custom authoring environment where authors build courses from predefined item types. The platform controls layout, navigation, and presentation across 160+ production courses.',
		years: '2020–Present',
		order: 2,
		readingMinutes: 7,
		sections: courseAuthoringSections,
		component: CourseAuthoringPage,
	},
	{
		slug: 'unified-experience',
		title: 'Student Learning Experience',
		subtitle: 'One student interface for course navigation, progress, and grades across the program.',
		summary:
			'Single student interface for all enrollments with consistent navigation, progress tracking, milestones, and inline completion feedback.',
		years: '2020–Present',
		order: 3,
		readingMinutes: 5,
		sections: unifiedExperienceSections,
		component: UnifiedExperiencePage,
	},
	{
		slug: 'grading',
		title: 'Assessment & Grading Platform',
		subtitle: 'Queue, gradebooks, scoring configuration, and AI-assisted review for instructor workflows.',
		summary:
			'Grading queue, course and student gradebooks, automatic scoring for objective items, and AI-assisted suggestions with instructor-controlled final grades.',
		years: '2020–Present',
		order: 4,
		readingMinutes: 6,
		sections: gradingSections,
		component: GradingPage,
	},
	{
		slug: 'admin',
		title: 'Administrative Platform',
		subtitle: 'Staff interfaces for admissions, enrollment, transcripts, reporting, and operational workflows.',
		summary:
			'Staff-facing tools for enrollment, documents, announcements, organizational structure, and operational debugging—built alongside the student features they support.',
		years: '2020–Present',
		order: 5,
		readingMinutes: 5,
		sections: adminSections,
		component: AdminPage,
	},
	{
		slug: 'apprentice-evaluation',
		title: 'Apprentice Evaluation & Reflection System',
		subtitle: 'Configurable evaluations, reflection journals, and mentor progress tracking for teacher apprenticeship programs.',
		summary: 'Configurable competency evaluations, reflection journals, and apprentice progress tracking for teacher apprenticeship programs.',
		years: '2022–Present',
		order: 6,
		readingMinutes: 5,
		sections: apprenticeEvaluationSections,
		component: ApprenticeEvaluationPage,
	},
] as const satisfies readonly CaseStudyEntry[];

export function getAllCaseStudies(): CaseStudyMeta[] {
	return [...caseStudies].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title)).map(({ component: _component, ...meta }) => meta);
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
