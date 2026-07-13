export const author = {
	name: 'Kelly Nauert',
	role: 'Design Engineer',
	title: 'Sole Design Engineer',
} as const;

export const project = {
	name: 'MathTrack',
	fullName: 'An Education Operations Platform',
	years: '2020-2026',
	disciplines: ['UX Design', 'Product Design', 'React', 'TypeScript', 'Node.js', 'PostgreSQL'],
} as const;

export const resumeFilename = 'KellyNauert_Resume.pdf';

export const links = {
	github: 'https://github.com/kellynauert',
	resume: `${import.meta.env.BASE_URL}${resumeFilename}`,
} as const;

export const hero = {
	headline: author.name,
	title: 'Systems',
	roleLine: `${author.role}`,
	primaryCta: 'View Systems',
	secondaryCta: 'Download Resume',
} as const;

export const platformStory = {
	heading: project.fullName,
	paragraphs: [
		'MathTrack Institute is an education startup where I spent five years as the sole designer and engineer of its education operations platform. As the company evolved, I evolved the platform alongside it, creating, adapting, and retiring systems to support changing business needs.',
	],
	timelineIntro: 'The platform has evolved through several major phases:',
	timelineRange: { start: 2020, end: 2027 },
	timeline: [
		{
			title: 'Student assessment analytics',
			detail: 'Data importing and interactive visualizations of standardized assessment data',
			start: 2020,
			end: 2021,
			phase: false,
		},
		{
			title: 'Student Information System',
			detail: 'Student and school mass data importing, attendance tracking, SIS integrations, school admin dashboards',
			start: 2021,
			end: 2022,
			phase: true,
		},

		{
			title: 'Employee Management System',
			detail: 'Scheduling, time tracking, advisor assignments, and staff workflows',
			start: 2022,
			end: 2023,
			phase: true,
		},
		{
			title: 'Learning Management Platform',
			detail: 'Curriculum authoring, enrollment, student learning, grading, and transcript generation',
			start: 2024,
			end: null,
			phase: true,
		},
		{
			title: 'Apprenticeship Platform',
			detail: 'Mentor evaluations, reflection journals, competency tracking, and apprentice progress',
			start: 2026,
			end: null,
			phase: true,
		},
	],
	closing: ['This site highlights the two active systems: the Learning Management Platform and the Apprenticeship Platform.'],
	continuation: [] as const,
} as const;

/** Production scale — shown on the landing page */
export const platformStats = [
	{ value: '5', label: 'Years of continuous development' },
	{ value: '160+', label: 'Courses created' },
	{ value: '250K+', label: 'Activity records processed each year' },
	{ value: '400+', label: 'Active users' },
] as const;

/** Short homepage teasers — system summaries for the platform index */
export const caseStudyTeasers = {
	'course-authoring': 'An integrated curriculum authoring system for creating, organizing, and maintaining college-credit courses.',
	'unified-experience': 'A unified learning experience built around Page-based coursework, progress tracking, feedback, and communication.',
	grading: 'Submission review, Page-based grading, AI-assisted evaluation, and instructor workflows.',
	'apprentice-evaluation': 'Competency evaluations, reflection journals, and progress tracking for teacher apprenticeship programs.',
} as const;

export const site = {
	headline: 'Platform',
	tagline: 'Production systems from MathTrack',
	intro: platformStory.paragraphs[0].trim(),
} as const;

/** @deprecated Use author, project, or story instead */
export const platform = {
	name: project.name,
	headline: `${project.name} ${site.headline}`,
	tagline: site.tagline,
	role: author.role,
	years: project.years,
	intro: site.intro,
} as const;
