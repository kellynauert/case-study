import { StudyPage } from '../../components/case-study/StudyPage';
import { StudySection } from '../../components/case-study/StudySection';
import { StudyCapability } from '../../components/case-study/StudyCapability';
import { StudyBody } from '../../components/case-study/StudyBody';
import { StudyScreens } from '../../components/case-study/StudyScreens';
import type { StudySectionItem } from '../../lib/caseStudyTypes';

export const gradingSections: StudySectionItem[] = [
	{ id: 'platform-overview', title: 'Platform Overview' },
	{ id: 'key-capabilities', title: 'Key Capabilities' },
	{ id: 'grading-queue', title: 'Grading Queue', level: 2 },
	{ id: 'gradebooks', title: 'Gradebooks', level: 2 },
	{ id: 'scoring-and-automatic-grading', title: 'Scoring and Automatic Grading', level: 2 },
	{ id: 'ai-assisted-grading', title: 'AI-Assisted Grading', level: 2 },
	{ id: 'grader-notes', title: 'Grader Notes', level: 2 },
	{ id: 'technical-notes', title: 'Technical Notes' },
	{ id: 'outcome', title: 'Outcome' },
	{ id: 'screens', title: 'Screens' },
];

export function GradingPage() {
	return (
		<StudyPage
			slug='grading'
			title='Assessment & Grading Platform'
			subtitle='Queue, gradebooks, scoring configuration, and AI-assisted review for instructor workflows.'
			intro='The grading platform is where instructors and staff review student submissions, assign scores, and manage gradebooks. It supports multiple entry points—working through a queue, grading by course, or reviewing one student across courses—and combines automatic grading for objective items with AI-assisted suggestions for written responses.'
			sections={gradingSections}>
			<StudySection id='platform-overview' title='Platform Overview'>
				<StudyBody>
					The grading platform handles submission review, score assignment, and gradebook management for all MathTrack courses. It surfaces
					pending work, supports bulk and individual grading flows, and connects assessment configuration from the authoring platform to
					instructor review interfaces.
				</StudyBody>
				<StudyBody>
					Instructors, teaching assistants, and grading staff are the primary users. The system was built because grading is the most
					time-intensive instructor activity, and different grading tasks require different entry points—working through everything pending,
					focusing on one course, or following one student across multiple enrollments.
				</StudyBody>
				<StudyBody>
					Grading consumes item configuration (point values, grading mode, AI prompts, grader notes) from authoring and writes scores back
					to student records used by the student experience and admin reporting.
				</StudyBody>
			</StudySection>

			<StudySection id='key-capabilities' title='Key Capabilities'>
				<StudyCapability id='grading-queue' title='Grading Queue'>
					<StudyBody>
						The grading queue surfaces all pending submissions grouped by assignment rather than by student, so graders can stay in one
						evaluation mode and build momentum across similar work. Default ordering is chronological (oldest first). Starred assignments
						appear at the top of the queue.
					</StudyBody>
					<StudyBody>
						To prevent overwrite conflicts, the UI indicates when another grader is actively reviewing a submission. When a second grader
						opens a page while another is active, a warning banner prevents accidental overwrites of unsaved grade data. The queue can be
						filtered by assigned courses or by program.
					</StudyBody>
				</StudyCapability>

				<StudyCapability id='gradebooks' title='Gradebooks'>
					<StudyBody>
						The course gradebook shows all students in a single course with grades and submission status. It is used by guest instructors
						with one or two classes who want to grade everything in one view.
					</StudyBody>
					<StudyBody>
						The student gradebook shows one student's grades and submissions across every enrolled course. It is used when graders need to
						follow an individual student across multiple courses—for example, when a student completes a large volume of work at once and
						requests follow-up before the next deadline.
					</StudyBody>
					<StudyBody>
						Both gradebooks restrict visibility to courses and students relevant to the current staff member's assigned access.
					</StudyBody>
				</StudyCapability>

				<StudyCapability id='scoring-and-automatic-grading' title='Scoring and Automatic Grading'>
					<StudyBody>
						Authors configure point values per item, supporting weighted grading. Items can be set to zero points for completion-only
						behavior. Page-level grading assigns one grade for every question on a page instead of grading each item individually.
					</StudyBody>
					<StudyBody>
						Objective question types (multiple choice, fill-in-the-blank) are graded automatically. Manual grading remains available for
						written responses and other item types that require instructor judgment.
					</StudyBody>
				</StudyCapability>

				<StudyCapability id='ai-assisted-grading' title='AI-Assisted Grading'>
					<StudyBody>
						For items requiring manual evaluation, authors configure an AI grading prompt at item creation time. During review, graders
						can generate AI suggestions in bulk or per item type. A Generate All action sends all AI-gradable items to the GPT API with
						the configured prompt and returns suggestions in one pass.
					</StudyBody>
					<StudyBody>
						AI suggestions include color-coded highlights showing which parts of the original text the model used and where it responds.
						Extra or missing highlight colors indicate the model added unsupported content or missed source text—grounding designed to
						surface hallucinations before graders accept a suggestion.
					</StudyBody>
				</StudyCapability>

				<StudyCapability id='grader-notes' title='Grader Notes'>
					<StudyBody>
						Authors attach grader notes during item authoring. Notes are visible to graders during review but never shown to students.
						They preserve rubric context, edge cases, and scoring guidance that should not appear in the student-facing item.
					</StudyBody>
				</StudyCapability>
			</StudySection>

			<StudySection id='technical-notes' title='Technical Notes'>
				<StudyBody>
					AI grading integrates with the GPT API at review time, not at submission time. Prompts and item content are sent on demand when a
					grader requests suggestions, keeping grading decisions with the instructor rather than auto-applying model output.
				</StudyBody>
				<StudyBody>
					Concurrent grading detection uses activity signals to show when another grader is actively working on a submission, reducing data
					loss from simultaneous edits without requiring pessimistic locking on every page load.
				</StudyBody>
			</StudySection>

			<StudySection id='outcome' title='Outcome'>
				<StudyBody>
					Used by all instructors and grading staff across MathTrack programs. Automatic grading handles objective assessments without
					instructor intervention. AI-assisted grading reduced time on written response review while keeping final scoring decisions with
					instructors.
				</StudyBody>
			</StudySection>

			<StudySection id='screens' title='Screens'>
				<StudyScreens
					images={[
						{ src: 'ai_grading.gif', caption: 'AI-assisted grading with color-coded text grounding' },
						{ src: 'course_gradebook.gif', caption: 'Course gradebook with submission status per student' },
						{ src: 'student_gradebook.gif', caption: 'Student gradebook across multiple course enrollments' },
					]}
				/>
			</StudySection>
		</StudyPage>
	);
}
