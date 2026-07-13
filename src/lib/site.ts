export const author = {
	name: 'Kelly Nauert',
	role: 'Design Engineer',
	title: 'Sole Design Engineer',
} as const;

export const project = {
	name: 'MathTrack',
	fullName: 'The MathTrack App',
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
		'MathTrack Institute is an education startup whose offerings have changed a lot over the years, and I was the sole designer and engineer of our web application. As the company pivoted and introduced new programs, I adapted the platform alongside it, adding, redesigning, and retiring features to match what the business needed.',
		'Today the work is focused on teacher apprenticeship programs: coursework for college credit and licensure, and tools that help mentors evaluate, support, and communicate with apprentices.This site showcases a small selection of features that I have built over the years, with a focus on the systems that support the teacher apprenticeship program.',
	],
	continuation: [] as const,
} as const;

/** Production scale — shown on the landing page */
export const platformStats = [
	{ value: '400+', label: 'Active users on the platform' },
	{ value: '160+', label: 'Courses created' },
	{ value: '250K+', label: 'Activity records per year' },
] as const;

/** Short homepage teasers — system summaries for the platform index */
export const caseStudyTeasers = {
	'course-authoring': 'Curriculum authoring built into the platform—structure, typed items, reuse, and versioning across 160+ courses.',
	'unified-experience': 'Consistent navigation, progress tracking, and grade visibility across every enrollment.',
	grading: 'Assignment-first queue, course and student gradebooks, automatic scoring, and AI-assisted open response review.',
	'apprentice-evaluation': 'Configurable competency evaluations, reflection journals, and apprentice progress tracking.',
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
