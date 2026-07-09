import { StudyPage } from '../../components/case-study/StudyPage';
import { StudySection } from '../../components/case-study/StudySection';
import { StudyCapability } from '../../components/case-study/StudyCapability';
import { StudyBody } from '../../components/case-study/StudyBody';
import { StudyScreens } from '../../components/case-study/StudyScreens';
import type { StudySectionItem } from '../../lib/caseStudyTypes';

export const unifiedExperienceSections: StudySectionItem[] = [
	{ id: 'platform-overview', title: 'Platform Overview' },
	{ id: 'key-capabilities', title: 'Key Capabilities' },
	{ id: 'courses-dashboard', title: 'Courses Dashboard', level: 2 },
	{ id: 'course-navigation', title: 'Course Navigation', level: 2 },
	{ id: 'progress-and-milestones', title: 'Progress and Milestones', level: 2 },
	{ id: 'unified-presentation', title: 'Unified Presentation', level: 2 },
	{ id: 'outcome', title: 'Outcome' },
	{ id: 'screens', title: 'Screens' },
];

export function UnifiedExperiencePage() {
	return (
		<StudyPage
			slug='unified-experience'
			title='Student Learning Experience'
			subtitle='One student interface for course navigation, progress, and grades across the program.'
			intro='The student learning experience is the primary interface for enrolled learners. It provides a single entry point for all courses, consistent in-course navigation, and visible progress and grade status—regardless of which course a student opens.'
			sections={unifiedExperienceSections}>
			<StudySection id='platform-overview' title='Platform Overview'>
				<StudyBody>
					The student experience layer renders authored course content for enrolled learners. Students access courses, complete assignments,
					track progress, and view grades through one interface shared across every course in the program.
				</StudyBody>
				<StudyBody>
					Students and instructors are the primary users. The system was built because Canvas treated each course as an isolated site with
					its own navigation and organization. MathTrack needed every course to follow the same structure so students could answer "what do
					I do next?" without relearning the interface.
				</StudyBody>
				<StudyBody>
					This layer consumes course structure and content from the authoring platform and reports completion data to the grading and admin
					systems. Presentation is controlled by the platform, not by individual authors.
				</StudyBody>
			</StudySection>

			<StudySection id='key-capabilities' title='Key Capabilities'>
				<StudyCapability id='courses-dashboard' title='Courses Dashboard'>
					<StudyBody>
						The courses page lists all active enrollments with progress and grade summaries. A Continue card returns students to their
						current position in the learning path without requiring them to remember which course or lesson they left off.
					</StudyBody>
					<StudyBody>
						Due dates are calculated relative to each student's program start date, producing personalized timelines from a shared program
						schedule. Students with different start dates see appropriate deadlines without manual per-student configuration.
					</StudyBody>
				</StudyCapability>

				<StudyCapability id='course-navigation' title='Course Navigation'>
					<StudyBody>
						In-course navigation follows the section/lesson/page model defined in authoring. The navigation bar shows the full course
						structure at once: pending assignments, locked items, failed work, and the student's last position.
					</StudyBody>
					<StudyBody>
						When authors hide lessons or sections from navigation, numbering skips predictably so introduction and feedback pages do not
						disrupt the course flow. Assignments appear in context with the lesson they belong to—not in a separate assignments area.
					</StudyBody>
				</StudyCapability>

				<StudyCapability id='progress-and-milestones' title='Progress and Milestones'>
					<StudyBody>
						Reading pages are tracked without grading. A page is marked read after three seconds of engagement, allowing progress to
						reflect reviewed content and making it possible to identify students who skip readings before attempting assessments.
					</StudyBody>
					<StudyBody>
						Milestones are keystone assignments that gate what a student can do next. Assignments can be locked behind other courses or
						behind specific completion requirements. Managers configure milestone triggers based on page completion, item completion, or
						other completion signals using trigger IDs.
					</StudyBody>
					<StudyBody>
						Completion feedback is shown inline when work is finished, so students know immediately when an item is complete.
					</StudyBody>
				</StudyCapability>

				<StudyCapability id='unified-presentation' title='Unified Presentation'>
					<StudyBody>
						Typography, layout, and interaction patterns are consistent across all courses because the platform controls rendering. Course
						content is organized in the order students work through it, not split across separate areas for pages, assignments, and
						downloads.
					</StudyBody>
					<StudyBody>
						This consistency extends to assessment presentation: quiz feedback, retake behavior, and submission confirmation use the same
						patterns in every course.
					</StudyBody>
				</StudyCapability>
			</StudySection>

			<StudySection id='outcome' title='Outcome'>
				<StudyBody>
					All enrolled students use this interface for coursework. Instructors report fewer navigation questions from students compared to
					the previous Canvas-based workflow. Progress and grade visibility from the courses page reduced the need for students to dig into
					individual courses to find their status.
				</StudyBody>
			</StudySection>

			<StudySection id='screens' title='Screens'>
				<StudyScreens
					images={[
						{ src: 'courses.gif', caption: 'Courses page with progress summaries and Continue card' },
						{ src: 'course_nav.gif', caption: 'In-course navigation with status indicators' },
						{ src: 'reading_page.gif', caption: 'Reading page with engagement tracking' },
						{ src: 'quiz_retake.gif', caption: 'Inline quiz completion feedback' },
					]}
				/>
			</StudySection>
		</StudyPage>
	);
}
