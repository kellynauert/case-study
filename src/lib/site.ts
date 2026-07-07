export const author = {
	name: 'Kelly Nauert',
	role: 'Design Engineer',
	title: 'Sole Design Engineer',
} as const;

export const project = {
	name: 'MathTrack',
	fullName: 'The MathTrack App',
	years: '2020–Present',
	disciplines: ['UX Design', 'Product Design', 'React', 'TypeScript', 'Node.js', 'PostgreSQL'],
} as const;

export const links = {
	github: 'https://github.com/kellynauert',
	resume: '/resume.pdf',
} as const;

export const hero = {
	headline: 'Design Engineer',
	subheading:
		"I spent nearly a decade as a UX designer before teaching myself software engineering while building a production learning platform. Over the last six years I've designed, architected, and built software used every day by students, instructors, and administrators.",
	primaryCta: 'View Case Studies',
	secondaryCta: 'Resume',
} as const;

export const howIWork = {
	heading: 'How I Work',
	paragraphs: [
		"Before learning to build software, I spent years working as a UX designer. One of the most valuable lessons I carried into engineering is that people often propose solutions without fully understanding the problem they're trying to solve. More commonly, they underestimate what's actually possible.",
		"I don't build anything without understanding the underlying pain point first. Sometimes the proposed solution is exactly the right one. Often there's a simpler approach that achieves the same outcome with far less development effort. Other times, I'll recommend something that's significantly more complex because it solves the underlying problem better or creates a stronger foundation for future changes.",
		'Regardless of the outcome, I want people to feel like they were heard. Sometimes the answer really is "no", but that should never be the end of the conversation. I always explain why and look for alternatives whenever they\'re available.',
	],
} as const;

/** Short homepage teasers — not full case study summaries */
export const caseStudyTeasers = {
	'course-authoring':
		'Canvas gave instructors unlimited flexibility, but that flexibility came at the cost of consistency. I designed a platform that standardized presentation, simplified authoring, and let educators focus on teaching instead of formatting.',
	'unified-experience':
		'Every course felt like its own website. I redesigned the experience around the student instead — one navigation model, one place to see what needs attention.',
	grading:
		'Instructors were spending more time managing grading than doing it. I built workflows that surface what needs review and reduce the repetitive parts without taking judgment away.',
	admin: "Operational work kept routing through engineering because the interface didn't exist. I built the tools our team needed to manage students, enrollments, and reporting on their own.",
	growth: 'One production application, six years, three major shifts in what the business needed. This is what maintaining software through that actually looked like.',
} as const;

export const about = {
	heading: 'About',
	paragraphs: [
		"I didn't become an engineer through a traditional computer science background.",
		'I learned software engineering while building one production application over six years. Nearly every major feature required learning something new, whether that meant rich text editing, AI, database design, accessibility, deployment, or infrastructure.',
		"What I enjoy most is understanding difficult product problems, designing practical solutions, and then building them myself. I don't think of design and engineering as separate disciplines—they're different parts of solving the same problem.",
	],
	portrait: '/images/portrait.svg',
} as const;

export const sections = {
	caseStudies: 'Case Studies',
	about: 'About',
} as const;

export const nav = {
	caseStudies: 'Case Studies',
	about: 'About',
	resume: 'Resume',
	github: 'GitHub',
} as const;

export const site = {
	headline: 'Case Studies',
	tagline: 'Work from MathTrack',
	intro: howIWork.paragraphs[0],
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

/** @deprecated Use howIWork instead */
export const intro = howIWork;
