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

export function ApprenticeEvaluationPage() {
	return (
		<StudyPage
			slug='apprentice-evaluation'
			title='Apprenticeship Platform'
			subtitle='Competency evaluations, reflection journals, and progress tracking for teacher apprenticeship programs.'
			intro={
				<Col cols={8}>
					<StudyBody>
						While the Learning Platform manages coursework, grading, and student progress, the Apprenticeship Platform supports the field
						experience required throughout teacher preparation programs.
					</StudyBody>
					<StudyBody>
						Mentors evaluate apprentices through classroom observations while apprentices complete scheduled reflections documenting their
						experiences and professional growth. Because every organization defines competencies, evaluation schedules, scoring methods,
						and documentation requirements differently, the platform is built around configuration rather than organization-specific
						development.
					</StudyBody>
					<StudyBody>
						Evaluation results, reflections, and coursework progress are combined into a single apprentice record, giving mentors and
						administrators a complete view of each apprentice's development throughout the program.
					</StudyBody>
				</Col>
			}>
			<StudySection id='program-configuration' title='Program Configuration'>
				<Col cols={8}>
					<StudyBody>
						Every apprenticeship program defines its own competencies, terminology, evaluation scales, and reflection schedule.
					</StudyBody>
					<StudyBody>
						Competencies are organized into configurable groups that determine how evaluations are presented to mentors. Groups also
						customize terminology throughout the interface so each organization can use language that matches its existing evaluation
						process.
					</StudyBody>
					<StudyBody>
						Evaluation scales support multiple rating levels and can be enabled or disabled for individual competencies. Program
						configuration is stored independently from apprentice records, allowing administrators to update program requirements without
						affecting historical evaluation data.
					</StudyBody>
					<StudyBody>
						Rather than creating custom implementations for each organization, administrators configure competencies, evaluation
						schedules, terminology, rating scales, and reflection requirements directly within the application.
					</StudyBody>
				</Col>
				<StudyImage src='apprentice-evaluation/evaluation.jpg' alt='Program configuration' />
			</StudySection>

			<StudySection id='mentor-evaluations' title='Mentor Evaluations'>
				<Col cols={8}>
					<StudyBody>
						Mentors complete classroom observations using mobile-friendly evaluation forms designed for use on phones, tablets, and
						desktop devices.
					</StudyBody>
					<StudyBody>
						Evaluations can be accessed through unique links, allowing mentors to complete observations without creating an account. When
						accessing an evaluation while signed out, mentors acknowledge a privacy notice and identify themselves before submitting
						ratings. Every submission is recorded in an audit trail to preserve reviewer history.
					</StudyBody>
					<StudyBody>
						Evaluation forms present competencies using the organization's configured terminology and rating scales, providing a
						consistent experience across different apprenticeship programs.
					</StudyBody>
				</Col>
			</StudySection>

			<StudySection id='reflection-journals' title='Reflection Journals'>
				<Col cols={8}>
					<StudyBody>Reflection journals guide apprentices through structured self-reflection throughout the program.</StudyBody>
					<StudyBody>
						Administrators schedule reflection prompts and instructions in advance, with support for both daily and weekly reflection
						schedules.
					</StudyBody>
					<StudyBody>
						Weekly reflections also support micro-narratives—short entries completed throughout the week that are collected into the final
						weekly reflection. Mentors receive reminders when required micro-narratives have not yet been completed, encouraging
						apprentices to reflect consistently instead of writing everything at the end of the week.
					</StudyBody>
					<StudyBody>
						Reflection schedules can also be limited by the number of required entries rather than calendar weeks, allowing programs to
						accommodate holidays, school breaks, and other scheduling variations without changing reflection requirements.
					</StudyBody>
				</Col>
				<StudyImage src='apprentice-evaluation/reflection.gif' alt='Apprentice reflection journal' />
			</StudySection>

			<StudySection id='apprentice-progress' title='Apprentice Progress'>
				<Col cols={8}>
					<StudyBody>Each apprentice has a centralized progress dashboard combining every part of the apprenticeship experience.</StudyBody>
					<StudyBody>The dashboard brings together:</StudyBody>
					<StudyBulletList
						items={[
							'Coursework progress from the Learning Platform',
							'Mentor evaluations',
							'Reflection journals',
							'Required classroom observations',
							'Outstanding program requirements',
						]}
					/>
					<StudyBody>
						Evaluation history records how competency ratings change over time, including who submitted each evaluation and when rating
						levels changed. This provides mentors and program administrators with a complete record of each apprentice's professional
						growth throughout the program.
					</StudyBody>
					<StudyBody>
						Because coursework, evaluations, and reflections all contribute to the same apprentice record, administrators can monitor
						progress across the entire teacher preparation program from a single interface.
					</StudyBody>
				</Col>
				<StudyImage src='apprentice-evaluation/evaluation_rating.gif' alt='Apprentice progress dashboard' />
			</StudySection>
		</StudyPage>
	);
}
