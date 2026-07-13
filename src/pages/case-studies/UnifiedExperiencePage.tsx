import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { StudyPage } from '../../components/case-study/StudyPage';
import { StudySection } from '../../components/case-study/StudySection';
import { StudyBody } from '../../components/case-study/StudyBody';
import { StudyBulletList } from '../../components/case-study/StudyBulletList';
import { StudyImage } from '../../components/case-study/StudyImage';

type Cols = number;

/** Single column — set `cols` (1–12) for desktop width. */
function Col({ children, cols = 6 }: { children: ReactNode; cols?: Cols }) {
	return (
		<Box
			sx={{
				width: '100%',
				maxWidth: { md: `${(cols / 12) * 100}%` },
				mb: 2,
			}}>
			{children}
		</Box>
	);
}

export function UnifiedExperiencePage() {
	return (
		<StudyPage
			slug='unified-experience'
			title='Student Learning Experience'
			subtitle='A unified learning experience across every course in the program.'
			intro={
				<Col cols={8}>
					<StudyBody>
						Students access every part of the learning experience through a single interface that includes a personalized dashboard,
						course catalog, notifications, progress tracking, grading feedback, and communication with instructors.
					</StudyBody>
					<StudyBody>
						The entire learning experience takes place within the platform, from course navigation and assignment submission to grading,
						feedback, messaging, certificates, and progress tracking. Students never need to switch between separate applications to
						complete coursework, communicate with instructors, or monitor their progress.
					</StudyBody>
					<StudyBody>
						Every course follows the same Course → Section → Lesson → Page hierarchy created during authoring. Because Pages are built
						from configurable Items, instructional content, questions, discussions, file uploads, and other learning activities appear
						together in the order authors intended.
					</StudyBody>
				</Col>
			}>
			<StudySection id='student-dashboard' title='Student Dashboard'>
				<Col cols={8}>
					<StudyBody>The Student Dashboard provides a personalized overview of each student's progress through the program.</StudyBody>
					<StudyBody>
						Rather than serving as a simple landing page, the dashboard brings together announcements, notifications, recent activity,
						upcoming work, and overall program progress so students can immediately see what requires attention.
					</StudyBody>
					<StudyBody>
						Dashboard widgets update automatically as work is submitted, graded, and completed, providing a continuously updated view of
						the student's progress without requiring them to open individual courses.
					</StudyBody>
				</Col>
				<StudyImage src='unified-experience/announcement.jpg' alt='Student dashboard' />
			</StudySection>

			<StudySection id='courses-dashboard' title='Courses Dashboard'>
				<Col cols={8}>
					<StudyBody>The Courses page provides a central view of every active enrollment.</StudyBody>
					<StudyBody>
						Each course displays overall progress, current grade, and completion status, allowing students to quickly understand where
						they stand across multiple courses.
					</StudyBody>
					<StudyBody>
						A Continue card returns students directly to the last Page they were working on, eliminating the need to navigate back through
						the course structure after each session.
					</StudyBody>
					<StudyBody>
						Due dates are calculated from each student's program start date rather than fixed calendar dates. Students following the same
						program receive personalized schedules automatically without requiring manual per-student configuration.
					</StudyBody>
				</Col>
				<StudyImage src='unified-experience/courses.gif' alt='Courses dashboard with Continue card' />
			</StudySection>

			<StudySection id='course-navigation' title='Course Navigation'>
				<Col cols={8}>
					<StudyBody>Course navigation follows the same hierarchy created during authoring.</StudyBody>
					<StudyBody>
						Students move through Sections, Lessons, and Pages exactly as authors arranged them, while the navigation panel provides a
						complete overview of the course.
					</StudyBody>
					<StudyBody>
						When authors hide lessons or numbering, navigation adjusts automatically while preserving a predictable learning experience.
					</StudyBody>
					<StudyBody>
						Navigation always leads directly into the next Page in the learning sequence, allowing students to progress through each
						lesson exactly as it was authored.
					</StudyBody>
				</Col>
				<StudyImage src='unified-experience/course_nav.gif' alt='Course navigation' />
			</StudySection>

			<StudySection id='learning-pages' title='Learning Pages'>
				<Col cols={8}>
					<StudyBody>Pages are where students complete their coursework.</StudyBody>
					<StudyBody>
						Rather than separating reading material, assignments, discussions, and quizzes into different areas of the application, every
						Page presents content exactly as it was assembled during authoring. Display Items, questions, discussions, file uploads, and
						other Item types appear together in a single, continuous learning experience.
					</StudyBody>
					<StudyBody>
						As students work through a Page, they interact directly with each Item in sequence. Reading content, answering questions,
						uploading files, participating in discussions, and submitting written responses all happen without leaving the Page or
						switching between different interfaces.
					</StudyBody>
					<StudyBody>
						After submission, the Page becomes the central location for reviewing work. Students can view page grades, instructor
						feedback, previous submissions, and resubmit Pages when permitted. Keeping every stage of the learning process attached to the
						same Page allows students to revisit work exactly as it was completed while preserving the surrounding context.
					</StudyBody>
					<StudyBody>
						The platform controls rendering for every Item type, producing consistent typography, layout, and interaction patterns
						throughout the application. Whether students are reading content, completing assignments, uploading files, or participating in
						discussions, every interaction follows the same design language.
					</StudyBody>
				</Col>
				<StudyImage src='unified-experience/reading_page.gif' alt='Student view of a learning Page' />
			</StudySection>

			<StudySection id='course-progress' title='Course Progress'>
				<Col cols={8}>
					<StudyBody>Progress is tracked at the Page level and is visible throughout the course.</StudyBody>
					<StudyBody>
						The navigation panel provides a complete overview of the student's progress, allowing them to quickly understand the status of
						every Page without opening each lesson individually.
					</StudyBody>
					<StudyBody>Navigation indicators show when a Page has:</StudyBody>
					<StudyBulletList
						items={[
							'Been completed',
							'Been submitted and is waiting to be graded',
							'Been graded',
							'Failed and requires another attempt',
							'Been locked by prerequisite requirements',
						]}
					/>
					<StudyBody>
						Display Items contribute to Page completion automatically after a short period of engagement, while interactive Items update
						progress as work is submitted and graded.
					</StudyBody>
					<StudyBody>
						Because progress is tied directly to Pages, students can immediately identify where they left off, which work is still waiting
						for instructor review, and which Pages require additional attention.
					</StudyBody>
				</Col>
				<StudyImage src='unified-experience/section-overviews.jpg' alt='Course navigation with Page status indicators' />
			</StudySection>

			<StudySection id='feedback' title='Feedback'>
				<Col cols={8}>
					<StudyBody>
						Students receive feedback throughout the learning experience without leaving the Page where work was completed.
					</StudyBody>
					<StudyBody>
						Automatically graded feedback appears immediately after submission when configured by the author. For manually graded Pages,
						instructor scores and comments appear directly alongside the submitted work.
					</StudyBody>
					<StudyBody>
						Submission confirmations, grading results, completion indicators, and retake messaging all follow the same interaction
						patterns throughout the platform, providing a consistent experience regardless of Item type.
					</StudyBody>
					<StudyBody>
						Because instructors grade entire Pages rather than individual Items, students review feedback in the same context in which the
						work was originally completed.
					</StudyBody>
				</Col>
				<StudyImage src='unified-experience/file-upload.jpg' alt='Grading feedback' />
			</StudySection>

			<StudySection id='communication' title='Communication'>
				<Col cols={8}>
					<StudyBody>Every Page includes a built-in conversation between students and graders.</StudyBody>
					<StudyBody>
						Students can ask questions, respond to grading feedback, and continue discussions without leaving the submitted Page. Keeping
						conversations attached to the Page preserves the context of the work being discussed and eliminates the need to reference
						assignments separately through email or external messaging tools.
					</StudyBody>
					<StudyBody>The messaging system supports:</StudyBody>
					<StudyBulletList
						items={['Conversations between students and graders', '@mentions', 'Emoji reactions', 'Replies to Discussion Items']}
					/>
					<StudyBody>Students also receive notifications when:</StudyBody>
					<StudyBulletList
						items={[
							'A Page has been graded',
							'A graded Page has been updated',
							'They are mentioned in a comment',
							'Someone replies to one of their Discussion Items',
							'A grader comments on one of their submitted Pages',
						]}
					/>
				</Col>
				<StudyImage src='unified-experience/notifications.gif' alt='Page conversation and notifications' />
			</StudySection>
		</StudyPage>
	);
}
