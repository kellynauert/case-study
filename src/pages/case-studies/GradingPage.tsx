import { StudyPage } from '../../components/case-study/StudyPage';
import { StudySection } from '../../components/case-study/StudySection';
import { StudyGrid } from '../../components/case-study/StudyGrid';
import { StudyCell } from '../../components/case-study/StudyCell';
import { StudyBody } from '../../components/case-study/StudyBody';
import { StudyImage } from '../../components/case-study/StudyImage';
import { StudyImageRow } from '../../components/case-study/StudyImageRow';
import type { StudySectionItem } from '../../lib/caseStudyTypes';

export const gradingSections: StudySectionItem[] = [
	{ id: 'grading-queue', title: 'Grading Queue' },
	{ id: 'course-and-student-gradebooks', title: 'Course and Student Gradebooks' },
	{ id: 'scoring-and-automatic-grading', title: 'Scoring and Automatic Grading' },
	{ id: 'ai-assisted-grading', title: 'AI-Assisted Grading' },
	{ id: 'grader-notes', title: 'Grader Notes' },
];

export function GradingPage() {
	return (
		<StudyPage
			slug='grading'
			title='Assessment & Grading Platform'
			subtitle='Queue, gradebooks, scoring options, and AI-assisted review.'
			sections={gradingSections}>
			<StudySection id='grading-queue' title='Grading Queue'>
				<StudyBody>
					Grading is the most time-consuming part of teaching. At MathTrack, instructors and staff grade multiple courses while balancing
					other responsibilities, and every extra click compounds over hundreds or thousands of submissions.
				</StudyBody>
				<StudyBody>
					Different grading tasks require different entry points. Sometimes the priority is working through everything that needs attention,
					sometimes it is reviewing one course, and sometimes it is following one student across courses. No single view handled all of
					those on its own.
				</StudyBody>
				<StudyBody>
					I built grading workflows that support these modes, including automated paths for objective question types and an AI-assisted flow
					that provides suggestions instructors review before anything is final.
				</StudyBody>
				<StudyGrid>
					<StudyCell size={{ xs: 12, md: 6 }}>
						<StudyBody>
							The grading queue is for working through all pending submissions without deciding what to open first. Submissions are
							grouped by assignment rather than by student, so graders can stay in one evaluation mode and build momentum across similar
							work.
						</StudyBody>
					</StudyCell>
					<StudyCell size={{ xs: 12, md: 6 }}>
						<StudyImage src='grading-queue.jpg' alt='Grading queue' />
					</StudyCell>
				</StudyGrid>
				<StudyBody>
					The default ordering is chronological (oldest submissions first). Starred assignments are always placed at the top of the queue so
					graders can unblock critical work quickly.
				</StudyBody>
				<StudyBody>
					To reduce overwrite risk, the UI shows when another grader is already working. If someone else is grading an assignment, graders
					see an icon next to the assignment name, and when that grader is idling the entry is grayed out. When a second grader opens the
					page while another grader is active, a warning banner is displayed to prevent accidental overwrites of unsaved grade data.
				</StudyBody>
				<StudyBody>
					The queue can be filtered. A main toggle switches between viewing all courses and viewing only courses assigned to the current
					grader. A program selector chip lets graders focus on the specific programs they need to grade right now.
				</StudyBody>
			</StudySection>

			<StudySection id='course-and-student-gradebooks' title='Course and Student Gradebooks'>
				<StudyBody>
					The course gradebook shows all students in a single course with grades and submission status. It is especially helpful for guest
					instructors who have only one or two classes and want to grade everything in one place.
				</StudyBody>
				<StudyBody>
					The student gradebook shows one student's grades and submissions across every enrolled course. It is used when graders need to
					focus on an individual student across multiple courses, including situations where a student completes a large amount of work at
					once and requests follow-up before the next deadline.
				</StudyBody>
				<StudyImageRow images={[{ src: 'course_gradebook.gif' }, { src: 'student_gradebook.gif' }]} />
				<StudyBody>
					Both gradebooks restrict visibility to courses and students that are relevant to the current staff member, typically limited to
					assigned access.
				</StudyBody>
			</StudySection>

			<StudySection id='scoring-and-automatic-grading' title='Scoring and Automatic Grading'>
				<StudyGrid>
					<StudyCell size={{ xs: 12, md: 6 }}>
						<StudyBody>
							Authors set how many points each item is worth, supporting weighted grading. Items can also be set to zero points for
							completion-only behavior. Page-level grading assigns one grade for every question on a page instead of grading each item
							individually.
						</StudyBody>
						<StudyBody>
							Automatically graded question types handle work with clear right and wrong answers. Manual grading remains for responses
							that benefit from instructor feedback.
						</StudyBody>
					</StudyCell>
					<StudyCell size={{ xs: 12, md: 6 }}>
						<StudyImage src='test-creation.jpg' alt='Test creation scoring options' />
					</StudyCell>
				</StudyGrid>
			</StudySection>

			<StudySection id='ai-assisted-grading' title='AI-Assisted Grading'>
				<StudyGrid>
					<StudyCell size={{ xs: 12, md: 6 }}>
						<StudyBody>
							For assignments that need manual evaluation, authors configure how the AI should grade at item creation time. When
							grading, the UI provides a way to generate AI suggestions in bulk and review them alongside the original content.
						</StudyBody>
					</StudyCell>
					<StudyCell size={{ xs: 12, md: 6 }}>
						<StudyImage src='ai_grading.gif' alt='AI-assisted grading' />
					</StudyCell>
				</StudyGrid>
				<StudyBody>
					A Generate All action sends AI-gradable item types to the GPT API along with the AI grading prompt and returns all suggestions in
					one pass. Graders can also toggle a single item type when they only need to review one part.
				</StudyBody>
				<StudyBody>
					AI suggestions include color-coded highlights that show what parts of the original text the AI used and where it responds. This
					grounding is intentionally included to reduce hallucinations. If you see extra colors or missing colors, it indicates the AI
					missed something or is adding something that is not supported by the source text.
				</StudyBody>
			</StudySection>

			<StudySection id='grader-notes' title='Grader Notes'>
				<StudyBody>
					Authors can attach grader notes during authoring. Notes are visible to graders during review but never shown to students, which
					helps preserve rubric context, edge cases, and information that should not appear to learners.
				</StudyBody>
			</StudySection>
		</StudyPage>
	);
}
