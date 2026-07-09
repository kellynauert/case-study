import { StudyPage } from '../../components/case-study/StudyPage';
import { StudySection } from '../../components/case-study/StudySection';
import { StudyGrid } from '../../components/case-study/StudyGrid';
import { StudyCell } from '../../components/case-study/StudyCell';
import { StudyBody } from '../../components/case-study/StudyBody';
import { StudyImage } from '../../components/case-study/StudyImage';
import type { StudySectionItem } from '../../lib/caseStudyTypes';

export const apprenticeEvaluationSections: StudySectionItem[] = [
	{ id: 'configurable-evaluation-forms', title: 'Configurable Evaluation Forms' },
	{ id: 'reflection-journals', title: 'Reflection Journals' },
	{ id: 'progress-tracker', title: 'Progress Tracker' },
];

export function ApprenticeEvaluationPage() {
	return (
		<StudyPage
			slug='apprentice-evaluation'
			title='Apprentice Evaluation & Reflection System'
			subtitle='Configurable evaluations, reflections, and mentor progress tracking.'
			sections={apprenticeEvaluationSections}>
			<StudySection id='configurable-evaluation-forms' title='Configurable Evaluation Forms'>
				<StudyBody>
					As MathTrack expanded into teacher apprenticeship programs, mentors needed a structured way to observe apprentices, document
					progress, provide feedback, and verify state-required competencies. Programs differed in competencies, evaluation schedules,
					scoring methods, and documentation, and the platform had to support those variations without custom builds per program.
				</StudyBody>
				<StudyBody>
					Mentors also needed an experience with minimal friction. The evaluation page was designed mobile-first so mentors can complete
					observations and scoring easily from phones or iPads. Where login is not convenient, mentors can access evaluation pages via
					unique links with an optional-auth flow that includes clear warnings and an audit trail. When a mentor is not signed in, the front
					end shows a private-information warning and requires entering their name so rating history can be tied to the correct reviewer.
				</StudyBody>
				<StudyBody>
					Competencies are configured in a competency table that administrators maintain. Each competency can include codes (when relevant
					to standardized lists) and is organized through groups that control what mentors see on the evaluation page.
				</StudyBody>
				<StudyImage src='evaluation.jpg' alt='Evaluation form' />
				<StudyBody>
					Groups also customize language so the experience matches each organization. If a program uses different terminology (for example,
					calling mentors something other than "mentor"), the UI adapts to keep the workflow consistent.
				</StudyBody>
				<StudyBody>
					Evaluation scales support multiple rating levels and can be enabled or disabled per competency so programs only show what they
					need.
				</StudyBody>
			</StudySection>

			<StudySection id='reflection-journals' title='Reflection Journals'>
				<StudyGrid>
					<StudyCell size={{ xs: 12, md: 6 }}>
						<StudyBody>
							Reflections are scheduled across the program. Prompts and instructions can be configured by administrators, and responses
							are attached to each apprentice's record for mentor review.
						</StudyBody>
						<StudyBody>
							The system supports both daily and weekly reflections. Weekly reflections can use micro-narratives: short entries made a
							few times per week that are then included in the weekly comment flow. To keep the daily reflection simple without complex
							automatic detection, mentors see an unlock button reminding them to complete micro-narratives.
						</StudyBody>
						<StudyBody>
							To handle holidays and scheduling realities, "weeks to run" limits how many reflections a learner can submit based on the
							number of reflection entries rather than exact calendar weeks.
						</StudyBody>
					</StudyCell>
					<StudyCell size={{ xs: 12, md: 6 }}>
						<StudyImage src='reflection.gif' alt='Reflection journal' />
					</StudyCell>
				</StudyGrid>
			</StudySection>

			<StudySection id='progress-tracker' title='Progress Tracker'>
				<StudyGrid>
					<StudyCell size={{ xs: 12, md: 6 }}>
						<StudyBody>
							Each apprentice has a centralized progress dashboard that aggregates evaluations, reflections, required observations,
							coursework, and outstanding requirements. It also includes evaluation history so mentors and administrators can see who
							rated changes and when ratings moved from one level to another.
						</StudyBody>
					</StudyCell>
					<StudyCell size={{ xs: 12, md: 6 }}>
						<StudyImage src='evaluation_rating.gif' alt='Evaluation rating history' />
					</StudyCell>
				</StudyGrid>
			</StudySection>
		</StudyPage>
	);
}
