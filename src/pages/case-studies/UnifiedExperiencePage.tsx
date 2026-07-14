import { StudyPage } from '../../components/case-study/StudyPage';
import { StudySection } from '../../components/case-study/StudySection';
import { StudyBody } from '../../components/case-study/StudyBody';
import { StudyBulletList } from '../../components/case-study/StudyBulletList';
import { StudyImage } from '../../components/case-study/StudyImage';

export function UnifiedExperiencePage() {
	return (
		<StudyPage
			slug='unified-experience'
			title='Student Learning Experience'
			subtitle='A unified learning experience across every course in the program.'
			intro={
				<>
					<StudyBody size={12}>
						Students access every part of the learning experience through a single interface that includes a personalized dashboard,
						course catalog, notifications, progress tracking, grading feedback, and communication with instructors.
					</StudyBody>
					<StudyBody size={12}>
						The entire learning experience takes place within the platform, from course navigation and assignment submission to grading,
						feedback, messaging, certificates, and progress tracking. Students never need to switch between separate applications to
						complete coursework, communicate with instructors, or monitor their progress.
					</StudyBody>
					<StudyBody size={12}>
						Every course follows the same Course → Section → Lesson → Page hierarchy created during authoring. Because Pages are built
						from configurable Items, instructional content, questions, discussions, file uploads, and other learning activities appear
						together in the order authors intended.
					</StudyBody>
				</>
			}>
			<StudySection id='student-dashboard' title='Student Dashboard' size={12}>
				<StudyBody size={12}>
					The Student Dashboard provides a personalized overview of each student's progress through the program.
				</StudyBody>
				<StudyBody size={12}>
					Rather than serving as a simple landing page, the dashboard brings together announcements, notifications, recent activity,
					upcoming work, and overall program progress so students can immediately see what requires attention.
				</StudyBody>
				<StudyBody size={12}>
					Dashboard widgets update automatically as work is submitted, graded, and completed, providing a continuously updated view of the
					student's progress without requiring them to open individual courses.
				</StudyBody>
			</StudySection>

			<StudySection id='courses-dashboard' title='Courses Dashboard' size={12}>
				<StudyBody size={12}>The Courses page provides a central view of every active enrollment.</StudyBody>
				<StudyBody size={12}>
					Each course displays overall progress, current grade, and completion status, allowing students to quickly understand where they
					stand across multiple courses.
				</StudyBody>
				<StudyBody size={12}>
					A Continue card returns students directly to the last Page they were working on, eliminating the need to navigate back through the
					course structure after each session.
				</StudyBody>
				<StudyBody size={12}>
					Due dates are calculated from each student's program start date rather than fixed calendar dates. Students following the same
					program receive personalized schedules automatically without requiring manual per-student configuration.
				</StudyBody>
				<StudyImage size={12} src='unified-experience/courses.gif' alt='Courses dashboard with Continue card' maxWidth={1280} />
			</StudySection>

			<StudySection id='course-navigation' title='Course Navigation' size={8}>
				<StudyBody size={12}>Course navigation follows the same hierarchy created during authoring.</StudyBody>
				<StudyBody size={12}>
					Students move through Sections, Lessons, and Pages exactly as authors arranged them, while the navigation panel provides a
					complete overview of the course.
				</StudyBody>
				<StudyBody size={12}>
					When authors hide lessons or numbering, navigation adjusts automatically while preserving a predictable learning experience.
				</StudyBody>
				<StudyBody size={12}>
					Navigation always leads directly into the next Page in the learning sequence, allowing students to progress through each lesson
					exactly as it was authored.
				</StudyBody>

				<StudySection id='course-progress' title='Course Progress' size={12}>
					<StudyBody size={12}>Progress is tracked at the Page level and is visible throughout the course.</StudyBody>
					<StudyBody size={12}>
						The navigation panel provides a complete overview of the student's progress, allowing them to quickly understand the status of
						every Page without opening each lesson individually.
					</StudyBody>
					<StudyBody size={12}>Navigation indicators show when a Page has:</StudyBody>
					<StudyBulletList
						size={12}
						items={[
							'Been completed',
							'Been submitted and is waiting to be graded',
							'Been graded',
							'Failed and requires another attempt',
							'Been locked by prerequisite requirements',
						]}
					/>
					<StudyBody size={12}>
						Display Items contribute to Page completion automatically after a short period of engagement, while interactive Items update
						progress as work is submitted and graded.
					</StudyBody>
					<StudyBody size={12}>
						Because progress is tied directly to Pages, students can immediately identify where they left off, which work is still waiting
						for instructor review, and which Pages require additional attention.
					</StudyBody>
				</StudySection>
			</StudySection>
			<StudyImage size={4} src='unified-experience/course_nav.gif' alt='Course navigation' maxWidth={250} />
			<StudyImage size={12} src='unified-experience/section-overviews.jpg' alt='Course navigation with Page status indicators' />
			<StudySection id='learning-pages' title='Learning Pages' size={12}>
				<StudyBody size={12}>Pages are where students complete their coursework.</StudyBody>
				<StudyBody size={12}>
					Rather than separating reading material, assignments, discussions, and quizzes into different areas of the application, every Page
					presents content exactly as it was assembled during authoring. Display Items, questions, discussions, file uploads, and other Item
					types appear together in a single, continuous learning experience.
				</StudyBody>
				<StudyBody size={12}>
					As students work through a Page, they interact directly with each Item in sequence. Reading content, answering questions,
					uploading files, participating in discussions, and submitting written responses all happen without leaving the Page or switching
					between different interfaces.
				</StudyBody>
				<StudyBody size={12}>
					After submission, the Page becomes the central location for reviewing work. Students can view page grades, instructor feedback,
					previous submissions, and resubmit Pages when permitted. Keeping every stage of the learning process attached to the same Page
					allows students to revisit work exactly as it was completed while preserving the surrounding context.
				</StudyBody>
				<StudyBody size={12}>
					The platform controls rendering for every Item type, producing consistent typography, layout, and interaction patterns throughout
					the application. Whether students are reading content, completing assignments, uploading files, or participating in discussions,
					every interaction follows the same design language.
				</StudyBody>
				<StudyImage size={12} src='unified-experience/file-upload.jpg' alt='Grading feedback' />
			</StudySection>

			<StudySection id='feedback' title='Feedback' size={6}>
				<StudyBody size={12}>
					Students receive feedback throughout the learning experience without leaving the Page where work was completed.
				</StudyBody>
				<StudyBody size={12}>
					Automatically graded feedback appears immediately after submission when configured by the author. For manually graded Pages,
					instructor scores and comments appear directly alongside the submitted work.
				</StudyBody>
				<StudyBody size={12}>
					Submission confirmations, grading results, completion indicators, and retake messaging all follow the same interaction patterns
					throughout the platform, providing a consistent experience regardless of Item type.
				</StudyBody>
				<StudyBody size={12}>
					Because instructors grade entire Pages rather than individual Items, students review feedback in the same context in which the
					work was originally completed.
				</StudyBody>
			</StudySection>

			<StudySection id='communication' title='Communication' size={6}>
				<StudyBody size={12}>Every Page includes a built-in conversation between students and graders.</StudyBody>
				<StudyBody size={12}>
					Students can ask questions, respond to grading feedback, and continue discussions without leaving the submitted Page. Keeping
					conversations attached to the Page preserves the context of the work being discussed and eliminates the need to reference
					assignments separately through email or external messaging tools.
				</StudyBody>
				<StudyBody size={12}>The messaging system supports:</StudyBody>
				<StudyBulletList
					size={12}
					items={['Conversations between students and graders', '@mentions', 'Emoji reactions', 'Replies to Discussion Items']}
				/>
				<StudyBody size={12}>Students also receive notifications when:</StudyBody>
				<StudyBulletList
					size={12}
					items={[
						'A Page has been graded',
						'A graded Page has been updated',
						'They are mentioned in a comment',
						'Someone replies to one of their Discussion Items',
						'A grader comments on one of their submitted Pages',
					]}
				/>
				<StudyImage size={12} src='unified-experience/notifications.gif' alt='Page conversation and notifications' maxWidth={441} />
			</StudySection>
		</StudyPage>
	);
}
