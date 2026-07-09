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
	{ id: 'gradebooks', title: 'Gradebooks' },
	{ id: 'ai-assisted-grading', title: 'AI-Assisted Grading' },
	{ id: 'grader-notes', title: 'Grader Notes' },
];

export function GradingPage() {
	return (
		<StudyPage
			slug='grading'
			title='Grading'
			subtitle='Submission review, gradebooks, and scoring for instructor workflows.'
			intro='Instructors and grading staff review submissions, assign scores, and manage gradebooks for all MathTrack courses. The platform reads item configuration from authoring (point values, grading mode, AI prompts, grader notes) and writes scores back to student records used by the learning experience and admin reporting.'
			sections={gradingSections}>
			<StudySection id='grading-queue' title='Grading Queue'>
				<StudyBody>
					The grading queue groups pending submissions by assignment rather than by student. Instructors grading a batch of similar work can
					remain in one evaluation mode instead of switching between item types. Default ordering is chronological, oldest first. Starred
					assignments appear at the top.
				</StudyBody>
				<StudyBody>
					A live indicator shows when another grader has a submission open, based on activity signals rather than pessimistic locking on
					every page load. Opening a submission another grader is actively reviewing displays a warning banner to prevent overwriting
					unsaved grade data. The queue can be filtered by assigned courses or by program.
				</StudyBody>
				<StudyImage src='grading-queue.jpg' alt='Grading queue grouped by assignment with program filters' />
			</StudySection>

			<StudySection id='gradebooks' title='Gradebooks'>
				<StudyBody>
					The course gradebook shows all students in a single course with grades and submission status. Guest instructors with one or two
					classes use it to review and grade work within a single course view.
				</StudyBody>
				<StudyBody>
					The student gradebook shows one student's grades and submissions across every enrolled course. Internal graders use it when
					following an individual student across multiple enrollments, such as when a student completes a large volume of work before a
					deadline.
				</StudyBody>
				<StudyBody>Both gradebooks restrict visibility to courses and students within each staff member's assigned access.</StudyBody>
				<StudyImageRow
					images={[
						{
							src: 'course_gradebook.gif',
							alt: 'Course gradebook with submission status per student',
							size: { xs: 12, md: 5 },
						},
						{
							src: 'student_gradebook.gif',
							alt: 'Student gradebook across multiple course enrollments',
							size: { xs: 12, md: 7 },
						},
					]}
				/>
			</StudySection>

			<StudySection id='ai-assisted-grading' title='AI-Assisted Grading'>
				<StudyGrid>
					<StudyCell size={{ xs: 12, md: 4 }}>
						<StudyBody>
							For items requiring manual evaluation, authors configure an AI grading prompt at item creation time. Graders can generate
							suggestions in bulk or per item type. A Generate All action sends all AI-gradable items to the GPT API with the configured
							prompt and returns suggestions in one pass. The API is called at review time, not at submission; prompts and item content
							are sent on demand when a grader requests suggestions.
						</StudyBody>
						<StudyBody>
							AI suggestions include color-coded highlights showing which portions of the student's response the model referenced.
							Mismatched highlight colors indicate the model added unsupported content or missed source text. Final scores remain with
							the instructor. Objective assessments grade automatically; AI suggestions reduced time on written response review across
							all MathTrack programs.
						</StudyBody>
					</StudyCell>
					<StudyCell size={{ xs: 12, md: 8 }}>
						<StudyImage src='ai_grading.gif' alt='AI-assisted grading with color-coded text grounding' />
					</StudyCell>
				</StudyGrid>
			</StudySection>

			<StudySection id='grader-notes' title='Grader Notes'>
				<StudyBody>
					Authors attach grader notes during item authoring. Notes are visible to graders during review but not to students. They preserve
					rubric context, edge cases, and scoring guidance that should not appear in the student-facing item.
				</StudyBody>
			</StudySection>
		</StudyPage>
	);
}
