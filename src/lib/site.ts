export const author = {
	name: 'Kelly Nauert',
	role: 'Design Engineer',
} as const;

export const resumeFilename = 'KellyNauert_Resume.pdf';

export const links = {
	resume: `${import.meta.env.BASE_URL}${resumeFilename}`,
} as const;

export const hero = {
	headline: author.name,
	roleLine: `${author.role}`,
	/** Spinning title blanks — each reel has its own list. */
	heroCompareLeftOptions: ['UI/UX', 'Design', 'Product', 'Full-Stack', 'Systems'] as const,
	heroCompareRightOptions: ['Engineer', 'Developer', 'Architect'] as const,
	heroComparePrefix: 'Sole',
	heroCompareSuffix: 'of an Evolving SaaS Platform',
	supportingBefore: `I enjoy working across `,
	supportingAccent: 'UX and engineering',
	supportingAfter: ' and am looking for a role where I can utilize a variety of my skills.',
	secondaryCta: 'Download Resume',
	capabilities: [
		{
			label: 'UX Design',
			detail: 'Anticipating and responding to real-world behavior.',
			icon: 'ui',
		},
		{
			label: 'UI Design',
			detail: 'Balancing beauty, hierarchy, and usability.',
			icon: 'ux',
		},
		{
			label: 'Frontend Engineering',
			detail: 'Design brought to life through code, interaction, and polish.',
			icon: 'frontend',
		},
		{
			label: 'Backend Engineering',
			detail: 'APIs, data models, and services that hold the product together.',
			icon: 'backend',
		},
		{
			label: 'Systems Architecture',
			detail: 'Planning for change, organizing complexity, and enabling evolution.',
			icon: 'architecture',
		},
	],
} as const;

export const platformStory = {
	heading: 'One Platform, Many Systems',
	paragraphs: [
		'MathTrack Institute is an education startup where I spent five years as the sole designer and engineer of its education operations platform. During that time, I created, adapted, and retired entire systems within this platform to support the company as it evolved.',
	],
	timelineIntro:
		"In an effort to show the scale of the platform, I've put together a rough timeline of how it was used and where my development efforts were focused over the years. This website will focus on just the two most recent systems that are still in production.",
	timelineRange: { start: 2021, end: 2026 },
	timeline: [
		{
			title: 'Student Assessment Analytics',
			detail: 'Data importing and interactive visualizations of standardized assessment data',
			start: 2021,
			end: 2022,
		},
		{
			title: 'Student Information System',
			detail: 'Student and school mass data importing, attendance tracking, SIS integrations, school admin dashboards',
			start: 2022,
			end: 2024,
		},
		{
			title: 'Employee Management System',
			detail: 'Scheduling, time tracking, advisor assignments, and staff workflows',
			start: 2023,
			end: 2024,
		},
		{
			title: 'Learning Management Platform',
			detail: 'Curriculum authoring, enrollment, student learning, grading, and transcript generation',
			start: 2024,
			end: 2026,
		},
		{
			title: 'Apprenticeship Platform',
			detail: 'Mentor evaluations, reflection journals, competency tracking, and apprentice progress',
			start: 2026,
			end: 2026,
		},
	],
	closing: [] as string[],
} as const;

/** Short homepage teasers — system summaries for the platform index */
export const caseStudyTeasers = {
	'course-authoring': 'An integrated curriculum authoring system for creating, organizing, and maintaining college-credit courses.',
	'unified-experience': 'A unified learning experience built around Page-based coursework, progress tracking, feedback, and communication.',
	grading: 'Submission review, Page-based grading, AI-assisted evaluation, and instructor workflows.',
	'apprentice-evaluation': 'Competency evaluations, reflection journals, and progress tracking for teacher apprenticeship programs.',
} as const;

/** Tongue-in-cheek personal status note below the case study cards */
export const devNotes = {
	introTitle: 'Personal Status Update',
	items: [
		{
			status: 'info',
			icon: 'gaming',
			summary: 'Gaming backlog reduction is progressing well.',
			notes: ['Recent schedule changes have improved throughput.'],
		},
		{
			status: 'info',
			icon: 'cat',
			summary: 'Legacy cat naming convention remains in production.',
			notes: ['Original architecture assumed coat color was a unique identifier.'],
		},
		{
			status: 'warn',
			icon: 'teacup',
			summary: 'Teacup collection is scaling uncontrollably.',
			notes: ['Issue acknowledged. No mitigation planned.'],
		},
	],
} as const;
