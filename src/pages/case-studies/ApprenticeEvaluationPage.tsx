import { StudyPage } from '../../components/case-study/StudyPage';
import { StudySection } from '../../components/case-study/StudySection';
import { StudyGrid } from '../../components/case-study/StudyGrid';
import { StudyCell } from '../../components/case-study/StudyCell';
import { StudyBody } from '../../components/case-study/StudyBody';
import { StudyImage } from '../../components/case-study/StudyImage';

export function ApprenticeEvaluationPage() {
	return (
		<StudyPage
			slug='apprentice-evaluation'
			title='Apprentice Evaluation & Reflection System'
			subtitle='Competency evaluations, reflection journals, and progress tracking for teacher apprenticeship programs.'
			intro='This system supports mentor evaluations, apprentice reflection journals, and progress tracking for teacher apprenticeship programs. Programs differ in competencies, evaluation schedules, scoring methods, and documentation requirements; the platform handles those variations through configuration rather than custom builds per organization.'>
			<StudySection id='evaluation-forms' title='Evaluation Forms'>
				<StudyBody>
					Competencies are maintained in a configurable table with standardized codes, organized into groups that control what mentors see
					on the evaluation page. Groups also customize terminology so the interface matches each organization's language. Program
					configuration is stored separately from apprentice records, so administrators can adjust requirements without migrating existing
					evaluation data.
				</StudyBody>
				<StudyBody>
					Evaluation scales support multiple rating levels and can be enabled or disabled per competency. The evaluation page is
					mobile-first so mentors can complete observations from phones or tablets. Mentors can access evaluation pages via unique links
					with an optional-auth flow: a private-information warning and name entry when the mentor is not signed in, with audit trail
					logging tying ratings to the correct reviewer.
				</StudyBody>
			</StudySection>

			<StudySection id='reflection-journals' title='Reflection Journals'>
				<StudyGrid>
					<StudyCell size={{ xs: 12, md: 'grow' }}>
						<StudyBody>
							Reflections are scheduled across the program with administrator-configured prompts and instructions. Responses attach to
							each apprentice's record for mentor review. The system supports daily and weekly reflection schedules.
						</StudyBody>
						<StudyBody>
							Weekly reflections support micro-narratives: short entries made several times per week that roll into the weekly comment
							flow. Mentors see an unlock button reminding them to complete micro-narratives before the weekly reflection opens. A
							weeks-to-run setting limits submissions based on reflection entry count rather than exact calendar weeks, accommodating
							holidays and scheduling gaps.
						</StudyBody>
					</StudyCell>
					<StudyCell size={{ xs: 12, md: 'auto' }}>
						<StudyImage src='apprentice-evaluation/reflection.gif' alt='Apprentice reflection journal with scheduled prompts' />
					</StudyCell>
				</StudyGrid>
			</StudySection>

			<StudySection id='progress-tracker' title='Progress Tracker'>
				<StudyGrid>
					<StudyCell size={{ xs: 12 }}>
						<StudyBody>
							Each apprentice has a progress dashboard aggregating evaluations, reflections, required observations, coursework, and
							outstanding requirements. Evaluation history shows who rated changes and when ratings moved between levels. Evaluations
							and reflections feed into this tracker alongside coursework completion from the student learning experience.
						</StudyBody>
						<StudyBody>
							The system is in use across MathTrack teacher apprenticeship programs. Program administrators configure competencies and
							reflection schedules per organization without custom development.
						</StudyBody>
					</StudyCell>
					<StudyCell size={{ xs: 12, md: 'auto' }}>
						<StudyImage src='apprentice-evaluation/evaluation_rating.gif' alt='Evaluation rating history with level-change tracking' />
					</StudyCell>
				</StudyGrid>
			</StudySection>
		</StudyPage>
	);
}
