import { CourseAuthoringPage, courseAuthoringSections } from '../pages/case-studies/CourseAuthoringPage';
import { UnifiedExperiencePage, unifiedExperienceSections } from '../pages/case-studies/UnifiedExperiencePage';
import { GradingPage, gradingSections } from '../pages/case-studies/GradingPage';
import { ApprenticeEvaluationPage, apprenticeEvaluationSections } from '../pages/case-studies/ApprenticeEvaluationPage';
import type { CaseStudyEntry, CaseStudyMeta } from './caseStudyTypes';

export const caseStudies = [
	{
		slug: 'course-authoring',
		title: 'Course Authoring',
		subtitle: 'Custom curriculum authoring with typed content blocks and shared presentation.',
		summary: 'Dedicated authoring environment with reusable content blocks, linked items, and versioning across 160+ courses created.',
		years: '2020–Present',
		order: 2,
		readingMinutes: 3,
		sections: courseAuthoringSections,
		component: CourseAuthoringPage,
	},
	{
		slug: 'grading',
		title: 'Grading',
		subtitle: 'Submission review, gradebooks, and scoring for instructor workflows.',
		summary:
			'Assignment-first grading queue, course and student gradebooks, automatic scoring, and AI-assisted review with instructor-controlled final grades.',
		years: '2020–Present',
		order: 3,
		readingMinutes: 2,
		sections: gradingSections,
		component: GradingPage,
	},
	{
		slug: 'unified-experience',
		title: 'Student Learning Experience',
		subtitle: 'A single student interface for every enrollment in the program.',
		summary: 'Consistent navigation, progress tracking, and grade visibility across every enrollment.',
		years: '2020–Present',
		order: 4,
		readingMinutes: 2,
		sections: unifiedExperienceSections,
		component: UnifiedExperiencePage,
	},
	{
		slug: 'apprentice-evaluation',
		title: 'Apprentice Evaluation & Reflection System',
		subtitle: 'Competency evaluations, reflection journals, and progress tracking for teacher apprenticeship programs.',
		summary: 'Configurable competency evaluations, reflection schedules, and apprentice progress tracking for teacher apprenticeship programs.',
		years: '2022–Present',
		order: 5,
		readingMinutes: 2,
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
