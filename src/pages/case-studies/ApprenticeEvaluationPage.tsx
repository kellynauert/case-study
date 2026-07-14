import { StudyPage } from '../../components/case-study/StudyPage';
import { StudySection } from '../../components/case-study/StudySection';
import { StudyBody } from '../../components/case-study/StudyBody';
import { StudyImage } from '../../components/case-study/StudyImage';

export function ApprenticeEvaluationPage() {
	return (
		<StudyPage
			slug='apprentice-evaluation'
			title='Apprenticeship Platform'
			subtitle='Competency evaluations, reflection journals, and progress tracking for teacher apprenticeship programs.'
			intro={
				<>
					<StudyBody size={12}>
						While the Learning Platform manages coursework, grading, and student progress, the Apprenticeship Platform supports the field
						experience required throughout teacher preparation programs.
					</StudyBody>
					<StudyBody size={12}>
						Mentors evaluate apprentices through classroom observations while apprentices complete scheduled reflections documenting their
						experiences and professional growth. Because every organization defines competencies, evaluation schedules, scoring methods,
						and documentation requirements differently, the platform is built around configuration rather than organization-specific
						development.
					</StudyBody>
					<StudyBody size={12}>
						Evaluation results, reflections, and coursework progress are combined into a single apprentice record, giving mentors and
						administrators a complete view of each apprentice's development throughout the program.
					</StudyBody>
				</>
			}>
			<StudySection id='program-configuration' title='Program Configuration' size={12}>
				<StudyBody size={12}>
					Every apprenticeship program defines its own competencies, terminology, evaluation scales, and reflection schedule.
				</StudyBody>
				<StudyBody size={12}>
					Competencies are organized into configurable groups that determine how evaluations are presented to mentors. Groups also customize
					terminology throughout the interface so each organization can use language that matches its existing evaluation process.
				</StudyBody>
				<StudyBody size={12}>
					Evaluation scales support multiple rating levels and can be enabled or disabled for individual competencies. Program configuration
					is stored independently from apprentice records, allowing administrators to update program requirements without affecting
					historical evaluation data.
				</StudyBody>
				<StudyBody size={12}>
					Rather than creating custom implementations for each organization, administrators configure competencies, evaluation schedules,
					terminology, rating scales, and reflection requirements directly within the application.
				</StudyBody>
			</StudySection>

			<StudySection id='mentor-evaluations' title='Competency Tracker' size={4}>
				<StudyBody size={12}>
					The tracker presents an organizations custom competencies, terminology, and rating scales, with an easy-to-use interface for
					mentors to rate apprentices.
				</StudyBody>
				<StudyBody size={12}>
					The tracker can be accessed through unique links, allowing mentors to complete observations without creating an account. When
					accessing the tracker while signed out, mentors acknowledge a privacy notice and identify themselves before submitting ratings.
					Every submission is recorded in an audit trail to preserve reviewer history.
				</StudyBody>
			</StudySection>
			<StudyImage size={8} src='apprentice-evaluation/evaluation_rating.gif' alt='Apprentice progress dashboard' maxWidth={1107} />
			<StudySection id='reflection-journals' title='Reflection Journals' size={12}>
				<StudyBody size={4}>
					Reflection journals guide apprentices through structured self-reflection throughout the program. Reflection prompts and
					instructions are configurable with support for both daily and weekly reflection schedules. Some organizations may require
					micro-narratives to be completed throughout the week, with the final weekly reflection being the sum of the micro-narratives.
					Apprentices must aknowledge they've completed their micro-narratives before they can work on the reflection. This system allows
					organizations to set their own micro-narratives and reflection requirements without changing the core platform or locking
					apprentices out of the reflection.
					<br />
					<br />
					Reflections can be limited by the number of required entries rather than calendar weeks, allowing programs to accommodate
					holidays, school breaks, and other scheduling variations without changing reflection requirements.
				</StudyBody>
				<StudyImage size={8} src='apprentice-evaluation/reflection.gif' alt='Apprentice reflection journal' maxWidth={1107} />
			</StudySection>
		</StudyPage>
	);
}
