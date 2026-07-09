import { StudyPage } from '../../components/case-study/StudyPage';
import { StudySection } from '../../components/case-study/StudySection';
import { StudyCapability } from '../../components/case-study/StudyCapability';
import { StudyGrid } from '../../components/case-study/StudyGrid';
import { StudyCell } from '../../components/case-study/StudyCell';
import { StudyBody } from '../../components/case-study/StudyBody';
import { StudyImage } from '../../components/case-study/StudyImage';
import type { StudySectionItem } from '../../lib/caseStudyTypes';

export const apprenticeEvaluationSections: StudySectionItem[] = [
	{ id: 'platform-overview', title: 'Platform Overview' },
	{ id: 'key-capabilities', title: 'Key Capabilities' },
	{ id: 'evaluation-forms', title: 'Evaluation Forms', level: 2 },
	{ id: 'reflection-journals', title: 'Reflection Journals', level: 2 },
	{ id: 'progress-tracker', title: 'Progress Tracker', level: 2 },
	{ id: 'technical-notes', title: 'Technical Notes' },
	{ id: 'outcome', title: 'Outcome' },
];

export function ApprenticeEvaluationPage() {
	return (
		<StudyPage
			slug='apprentice-evaluation'
			title='Apprentice Evaluation & Reflection System'
			subtitle='Configurable evaluations, reflection journals, and mentor progress tracking for teacher apprenticeship programs.'
			intro='The apprentice evaluation system supports teacher apprenticeship programs where mentors observe apprentices, document competency progress, and verify state-required qualifications. Evaluations, reflections, and progress tracking operate as one connected workflow configurable per program without custom builds.'
			sections={apprenticeEvaluationSections}>
			<StudySection id='platform-overview' title='Platform Overview'>
				<StudyBody>
					This system handles mentor evaluations, apprentice reflection journals, and centralized progress tracking for teacher
					apprenticeship programs. It connects observation workflows, competency verification, and longitudinal apprentice records.
				</StudyBody>
				<StudyBody>
					Mentors, program administrators, and apprentices are the primary users. The system was built when MathTrack expanded into teacher
					apprenticeship offerings. Programs differ in competencies, evaluation schedules, scoring methods, and documentation
					requirements—the platform needed to support those variations through configuration.
				</StudyBody>
				<StudyBody>
					Evaluations and reflections feed into the apprentice progress tracker alongside coursework completion from the student learning
					experience. Administrative staff configure competencies, reflection schedules, and program-specific terminology.
				</StudyBody>
			</StudySection>

			<StudySection id='key-capabilities' title='Key Capabilities'>
				<StudyCapability id='evaluation-forms' title='Evaluation Forms'>
					<StudyBody>
						Competencies are maintained in a configurable competency table. Each competency can include standardized codes and is
						organized into groups that control what mentors see on the evaluation page. Groups also customize terminology so the UI
						matches each organization's language.
					</StudyBody>
					<StudyBody>
						Evaluation scales support multiple rating levels and can be enabled or disabled per competency. The evaluation page is
						mobile-first so mentors can complete observations from phones or tablets. Mentors can access evaluation pages via unique links
						with an optional-auth flow that includes audit trail logging and a name-entry requirement for unrated sessions.
					</StudyBody>
				</StudyCapability>

				<StudyCapability id='reflection-journals' title='Reflection Journals'>
					<StudyGrid>
						<StudyCell size={{ xs: 12, md: 6 }}>
							<StudyBody>
								Reflections are scheduled across the program with administrator-configured prompts and instructions. Responses attach
								to each apprentice's record for mentor review. The system supports daily and weekly reflection schedules.
							</StudyBody>
							<StudyBody>
								Weekly reflections support micro-narratives: short entries made several times per week that roll into the weekly
								comment flow. Mentors see an unlock button reminding them to complete micro-narratives before the weekly reflection
								opens. A "weeks to run" setting limits submissions based on reflection entry count rather than exact calendar weeks,
								accommodating holidays and scheduling gaps.
							</StudyBody>
						</StudyCell>
						<StudyCell size={{ xs: 12, md: 6 }}>
							<StudyImage
								src='reflection.gif'
								alt='Apprentice reflection journal with scheduled prompts'
								caption='Apprentice reflection journal with scheduled prompts'
							/>
						</StudyCell>
					</StudyGrid>
				</StudyCapability>

				<StudyCapability id='progress-tracker' title='Progress Tracker'>
					<StudyGrid>
						<StudyCell size={{ xs: 12, md: 6 }}>
							<StudyBody>
								Each apprentice has a centralized progress dashboard aggregating evaluations, reflections, required observations,
								coursework, and outstanding requirements. Evaluation history shows who rated changes and when ratings moved between
								levels.
							</StudyBody>
						</StudyCell>
						<StudyCell size={{ xs: 12, md: 6 }}>
							<StudyImage
								src='evaluation_rating.gif'
								alt='Evaluation rating history with level-change tracking'
								caption='Evaluation rating history with level-change tracking'
							/>
						</StudyCell>
					</StudyGrid>
				</StudyCapability>
			</StudySection>

			<StudySection id='technical-notes' title='Technical Notes'>
				<StudyBody>
					The optional-auth evaluation flow uses unique links with audit logging rather than requiring mentor login for every observation.
					The front end displays a private-information warning and requires name entry when the mentor is not signed in, tying ratings to
					the correct reviewer in the audit trail.
				</StudyBody>
				<StudyBody>
					Program configuration (competencies, groups, terminology, reflection schedules) is stored separately from apprentice records,
					allowing administrators to adjust program requirements without migrating existing evaluation data.
				</StudyBody>
			</StudySection>

			<StudySection id='outcome' title='Outcome'>
				<StudyBody>
					Currently used across MathTrack teacher apprenticeship programs. Mentors complete field observations from mobile devices. Program
					administrators configure competencies and reflection schedules per organization without custom development.
				</StudyBody>
			</StudySection>
		</StudyPage>
	);
}
