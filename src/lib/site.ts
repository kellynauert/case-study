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

export const links = {
	github: 'https://github.com/kellynauert',
	resume: '/resume.pdf',
} as const;

export const hero = {
	headline: author.name,
	title: 'Feature Showcase',
	roleLine: `${author.role}`,
	primaryCta: 'View Showcase',
	secondaryCta: 'Download Resume',
} as const;

export const platformStory = {
	heading: project.fullName,
	paragraphs: [
		'MathTrack Institute is an education startup whose offerings have evolved significantly over the years. As the company pivoted and introduced new programs, the MathTrack app adapted alongside it, continuously adding, redesigning, and retiring features to support changing business needs.',
		'Today that work is focused on teacher apprenticeship programs: coursework for college credit and licensure, and tools that help mentors evaluate, support, and communicate with apprentices.',
	],
	continuation: [] as const,
} as const;

/** Short homepage teasers — not full feature showcase summaries */
export const caseStudyTeasers = {
	'course-authoring': 'Custom authoring tools that replaced a generic LMS, with a shared content model for every course.',
	'unified-experience': 'One student interface for course navigation, progress, and grades across the program.',
	grading: 'Grading queue, gradebooks, scoring options, and AI-assisted review for instructor workflows.',
	admin: 'Admin tools for admissions, enrollment, transcripts, and reporting, built as those needs appeared.',
	'apprentice-evaluation': 'Configurable evaluations, reflection journals, and progress tracking for mentor workflows.',
} as const;

export const sections = {
	caseStudies: 'Showcase',
	screens: 'Gallery',
} as const;

/** Every product screenshot available in public/images */
export const allScreenshots = [
	'announcement.jpg',
	'course-enrollment-automatic.jpg',
	'course-enrollment-manual.jpg',
	'course-structure.jpg',
	'courses-editor.jpg',
	'courses.jpg',
	'departments.jpg',
	'evaluation.jpg',
	'file-upload.jpg',
	'grading-queue.jpg',
	'grading.jpg',
	'item-creation-1.jpg',
	'item-creation.jpg',
	'notifications.jpg',
	'overidden.jpg',
	'passed-quiz.jpg',
	'quiz-submission.jpg',
	'reflection.jpg',
	'section-overviews.jpg',
	'studentgradebook.jpg',
	'submission-issues.jpg',
	'test-creation.jpg',
] as const;

export const site = {
	headline: 'Showcase',
	tagline: 'Work from MathTrack',
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
