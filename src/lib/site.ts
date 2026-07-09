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
	title: 'Platform Systems',
	roleLine: `${author.role}`,
	primaryCta: 'View Systems',
	secondaryCta: 'Download Resume',
} as const;

export const platformStory = {
	heading: project.fullName,
	paragraphs: [
		'MathTrack is a production learning platform I designed, architected, and built over six years. It includes course authoring, student learning, grading, administration, and apprentice evaluation—each as a distinct system within a shared platform.',
		'The platform currently supports teacher apprenticeship programs: coursework for college credit and licensure, plus tools for mentors to evaluate, support, and track apprentices through state-required competencies.',
	],
	continuation: [] as const,
} as const;

/** Production scale — shown on the landing page */
export const platformStats = [
	{ value: '400+', label: 'Active users on the platform' },
	{ value: '160+', label: 'Content courses in the library' },
	{ value: '250K+', label: 'Activity records per year' },
	{ value: '4+', label: 'CMS, SIS, EMS, and evaluations in one LMS' },
] as const;

/** Short homepage teasers — system summaries for the platform index */
export const caseStudyTeasers = {
	'course-authoring': 'Structured curriculum authoring with a shared content model, item versioning, and linked content across 160+ courses.',
	'unified-experience': 'Single student interface for course navigation, progress tracking, milestones, and grades across every enrollment.',
	grading: 'Grading queue, course and student gradebooks, automatic scoring, and AI-assisted review with instructor-controlled final grades.',
	admin: 'Staff interfaces for enrollment, documents, announcements, organizational structure, and operational debugging.',
	'apprentice-evaluation': 'Configurable competency evaluations, reflection journals, and apprentice progress tracking for mentor programs.',
} as const;

export const sections = {
	caseStudies: 'Systems',
	screens: 'Gallery',
} as const;

/** Every product screenshot available in public/images */
export const allScreenshots = [
	{ src: 'courses.gif', caption: 'Courses page with progress summaries' },
	{ src: 'course_nav.gif', caption: 'In-course navigation with status indicators' },
	{ src: 'editing_course_navigation.gif', caption: 'Drag-and-drop course structure editor' },
	{ src: 'course_overview_editing.png', caption: 'Course metadata and overview editing' },
	{ src: 'ai_grading.gif', caption: 'AI-assisted grading with text grounding' },
	{ src: 'course_gradebook.gif', caption: 'Course gradebook view' },
	{ src: 'student_gradebook.gif', caption: 'Student gradebook across enrollments' },
	{ src: 'notifications.gif', caption: 'Targeted announcements' },
	{ src: 'reflection.gif', caption: 'Apprentice reflection journal' },
	{ src: 'evaluation_rating.gif', caption: 'Evaluation rating history' },
	{ src: 'versioning.png', caption: 'Item version classification' },
	{ src: 'linked_item.gif', caption: 'Linked content indicator' },
] as const;

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
