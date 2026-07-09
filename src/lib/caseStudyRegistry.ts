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
		subtitle: 'Custom authoring tools built around our curriculum and content model.',
		summary:
			'I designed and built the platform MathTrack uses to author every course, replacing Canvas with a structured workflow for content authors, instructors, and students.',
		years: '2020–Present',
		order: 2,
		readingMinutes: 6,
		sections: courseAuthoringSections,
		component: CourseAuthoringPage,
	},
	{
		slug: 'unified-experience',
		title: 'Student Learning Experience',
		subtitle: 'One student interface for course navigation, progress, and grades.',
		summary:
			'Traditional learning management systems organize around courses with inconsistent structure. I designed a consistent student experience where progress, grades, and course content are visible at a glance without relearning the interface for every class.',
		years: '2020–Present',
		order: 3,
		readingMinutes: 5,
		sections: unifiedExperienceSections,
		component: UnifiedExperiencePage,
	},
	{
		slug: 'grading',
		title: 'Assessment & Grading Platform',
		subtitle: 'Queue, gradebooks, scoring options, and AI-assisted review.',
		summary:
			'Grading is where instructors spend most of their time. I designed assessment and grading workflows that surface what needs review, reduce repetitive work through automatic grading, and use AI as a starting point without taking judgment away from instructors.',
		years: '2020–Present',
		order: 4,
		readingMinutes: 5,
		sections: gradingSections,
		component: GradingPage,
	},
	{
		slug: 'admin',
		title: 'Administrative Platform',
		subtitle: 'Admin tools for admissions, enrollment, transcripts, and reporting.',
		summary:
			'As the platform grew, more operational work landed on me. I built admin interfaces alongside new features so staff could manage admissions, enrollment, transcripts, reporting, and student records without spreadsheets or hard-coded fixes.',
		years: '2020–Present',
		order: 5,
		readingMinutes: 4,
		sections: adminSections,
		component: AdminPage,
	},
	{
		slug: 'apprentice-evaluation',
		title: 'Apprentice Evaluation & Reflection System',
		subtitle: 'Configurable evaluations, reflections, and mentor progress tracking.',
		summary:
			'As the organization expanded into teacher apprenticeship programs, mentors needed a structured way to observe apprentices, document progress, and verify state-required competencies. I designed evaluations, reflections, and progress tracking as one connected workflow.',
		years: '2022–Present',
		order: 6,
		readingMinutes: 4,
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
