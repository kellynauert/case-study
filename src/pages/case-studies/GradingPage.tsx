import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { StudyPage } from '../../components/case-study/StudyPage';
import { StudySection } from '../../components/case-study/StudySection';
import { StudySubsection } from '../../components/case-study/StudySubsection';
import { StudyBody } from '../../components/case-study/StudyBody';
import { StudyBulletList } from '../../components/case-study/StudyBulletList';
import { StudyImage } from '../../components/case-study/StudyImage';
import { scrollMarginTop } from '../../lib/styles';

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

function DetailTitle({ title, first = false }: { title: string; first?: boolean }) {
	return (
		<Typography
			variant='detailHeading'
			sx={{
				m: 0,
				mt: first ? 0 : { xs: 2, md: 2.5 },
				mb: 1,
				scrollMarginTop,
			}}>
			{title}
		</Typography>
	);
}

export function GradingPage() {
	return (
		<StudyPage
			slug='grading'
			title='Grading'
			subtitle='Submission review, gradebooks, and scoring for instructor workflows.'
			intro={
				<Col cols={8}>
					<StudyBody>
						Every interactive Item submitted by students flows through the grading system. Grading behavior is defined during authoring
						and stored with each Item, including point values, grading mode, feedback, grader notes, AI prompts, and version information.
					</StudyBody>
					<StudyBody>Although grading behavior belongs to individual Items, students submit and instructors grade entire Pages.</StudyBody>
					<StudyBody>
						If a Page contains only automatically graded Items, grading is completed immediately when the Page is submitted. If any Item
						on the Page requires manual grading, the entire Page enters the grading queue. Automatically graded Items retain their
						calculated scores, while manually graded Items remain ready for instructor review.
					</StudyBody>
					<StudyBody>
						Grading entire Pages preserves the context surrounding each response. Instructors can review Display Items, embedded content,
						previous questions, uploaded files, and other supporting material exactly as the student experienced them, rather than grading
						individual responses in isolation.
					</StudyBody>
					<StudyBody>
						Scores are written back to the student's record immediately, updating progress, gradebooks, transcripts, certificates, and
						reporting throughout the platform.
					</StudyBody>
				</Col>
			}>
			<StudySection id='grading-queue' title='Grading Queue'>
				<Col cols={8}>
					<StudyBody>The grading queue is the primary workspace for reviewing student submissions.</StudyBody>
					<StudyBody>
						Rather than grouping work by student, submissions are grouped by Page. This allows graders reviewing a large volume of work to
						remain in a single grading workflow instead of constantly switching between different Page layouts and grading criteria.
					</StudyBody>
					<StudyBody>
						Submissions are ordered chronologically by default, with the oldest work appearing first. Frequently graded Pages can be
						starred to pin them to the top of the queue.
					</StudyBody>
					<StudyBody>
						A live indicator shows when another grader currently has a submission open. Opening the same submission displays a warning
						before grading begins, helping prevent conflicting edits without locking submissions unnecessarily. The queue can also be
						filtered by assigned Courses or by program.
					</StudyBody>
				</Col>
				<StudyImage src='grading/grading-queue.jpg' alt='Grading queue grouped by Page with program filters' />
			</StudySection>

			<StudySection id='gradebooks' title='Gradebooks'>
				<Col cols={6}>
					<StudyBody>The platform provides two gradebook views designed around different grading workflows.</StudyBody>
				</Col>

				<StudySubsection id='course-gradebook' title='Course Gradebook' first />
				<Col cols={6}>
					<StudyBody>
						The Course Gradebook displays every student enrolled in a single course along with grades and submission status. Guest
						instructors typically use this view when managing one or two assigned courses.
					</StudyBody>
				</Col>
				<StudyImage src='grading/course_gradebook.gif' alt='Course gradebook' />

				<StudySubsection id='student-gradebook' title='Student Gradebook' />
				<Col cols={6}>
					<StudyBody>
						The Student Gradebook displays one student's grades and submissions across every enrolled course. Internal graders use this
						view when following an individual student's progress across multiple enrollments, such as when a student completes a large
						volume of work before a deadline.
					</StudyBody>
					<StudyBody>
						Both gradebooks automatically respect staff permissions, limiting visibility to assigned Courses and students.
					</StudyBody>
				</Col>
				<StudyImage src='grading/student_gradebook.gif' alt='Student gradebook' />
			</StudySection>

			<StudySection id='scoring' title='Scoring'>
				<Col cols={6}>
					<StudyBody>Scoring behavior is configured during Item authoring and requires no additional setup during grading.</StudyBody>
					<StudyBody>Pages can be graded in one of two ways.</StudyBody>
				</Col>

				<DetailTitle title='Item Grading' first />
				<Col cols={6}>
					<StudyBody>Each interactive Item receives its own score.</StudyBody>
					<StudyBody>
						Automatically graded Items are scored immediately when the Page is submitted. Manually graded Items remain blank until
						reviewed by an instructor. Once grading is complete, the overall Page score is calculated automatically from the combined Item
						scores.
					</StudyBody>
				</Col>

				<DetailTitle title='Page Grading' />
				<Col cols={6}>
					<StudyBody>Some Pages are evaluated as a single assignment rather than individual Items.</StudyBody>
					<StudyBody>
						When Page Grading is enabled, Item points are ignored and the instructor assigns one overall score for the entire Page.
					</StudyBody>
					<StudyBody>Zero-point Items continue tracking completion without affecting the student's overall course grade.</StudyBody>
				</Col>
			</StudySection>

			<StudySection id='automatic-and-manual-grading' title='Automatic and Manual Grading'>
				<Col cols={6}>
					<StudyBody>Whether an Item requires manual grading is determined during authoring.</StudyBody>
				</Col>
				<DetailTitle title='Automatically graded' first />
				<Col cols={6}>
					<StudyBulletList items={['Multiple Choice', 'True / False', 'Fill in the Blank']} />
				</Col>
				<DetailTitle title='Manually graded' />
				<Col cols={6}>
					<StudyBulletList items={['Open Response', 'File Upload', 'Discussion', 'Date Input (when configured for grading)']} />
					<StudyBody>
						Display Items complete through read-time engagement, while Certificate Items are issued automatically after completion
						requirements have been met.
					</StudyBody>
					<StudyBody>
						If every graded Item on a Page is automatically graded, the Page never enters the grading queue. If any Item requires manual
						grading, the entire Page is queued so instructors can review the submission in its full context.
					</StudyBody>
				</Col>
			</StudySection>

			<StudySection id='ai-assisted-grading' title='AI-Assisted Grading'>
				<Col cols={8}>
					<StudyBody>Open Response Items support AI-assisted grading.</StudyBody>
					<StudyBody>
						During authoring, curriculum authors can configure a custom grading prompt for each Item. During grading, instructors can
						generate suggestions for individual Items or use Generate All to evaluate every AI-enabled Item on the current Page in a
						single request.
					</StudyBody>
					<StudyBody>
						The GPT API is called only when an instructor requests suggestions. The student's response, Item content, and configured
						grading prompt are sent at grading time rather than submission time.
					</StudyBody>
					<StudyBody>
						Suggestions include color-coded highlights showing which portions of the student's response the model referenced. Mismatched
						highlight colors indicate the model introduced unsupported information or failed to reference relevant source text.
					</StudyBody>
					<StudyBody>AI suggestions assist with evaluation, but final scoring always remains with the instructor.</StudyBody>
				</Col>
				<StudyImage src='grading/ai_grading.gif' alt='AI-assisted grading with color-coded text grounding' />
			</StudySection>

			<StudySection id='grader-notes' title='Grader Notes'>
				<Col cols={6}>
					<StudyBody>Grader Notes are configured during Item authoring and displayed only to instructors during grading.</StudyBody>
					<StudyBody>
						Because Grader Notes are stored with the Item itself, grading guidance follows that Item wherever it is used. Authors use
						Grader Notes to document rubric interpretation, scoring reminders, and edge cases that should not be visible to students.
					</StudyBody>
				</Col>
			</StudySection>
		</StudyPage>
	);
}
