import { StudyPage } from '../../components/case-study/StudyPage';
import { StudySection } from '../../components/case-study/StudySection';
import { StudyGrid } from '../../components/case-study/StudyGrid';
import { StudyCell } from '../../components/case-study/StudyCell';
import { StudyBody } from '../../components/case-study/StudyBody';
import { StudyImage } from '../../components/case-study/StudyImage';
import type { StudySectionItem } from '../../lib/caseStudyTypes';

export const unifiedExperienceSections: StudySectionItem[] = [
	{ id: 'courses-dashboard', title: 'Courses Dashboard' },
	{ id: 'course-navigation', title: 'Course Navigation' },
	{ id: 'progress', title: 'Progress' },
	{ id: 'unified-presentation', title: 'Unified Presentation' },
];

export function UnifiedExperiencePage() {
	return (
		<StudyPage
			slug='unified-experience'
			title='Student Learning Experience'
			subtitle='A single student interface for every enrollment in the program.'
			intro='Enrolled students access courses, complete assignments, track progress, and view grades through one interface shared across the program. Every course uses the same section, lesson, and page structure so students can move between courses without relearning the interface.'
			sections={unifiedExperienceSections}>
			<StudySection id='courses-dashboard' title='Courses Dashboard'>
				<StudyBody>
					The courses page lists active enrollments with progress and grade summaries. A Continue card returns students to their current
					position without requiring them to locate a specific course or lesson.
				</StudyBody>
				<StudyBody>
					Due dates are calculated from each student's program start date, producing personalized timelines from a shared program schedule.
					Students with different start dates receive appropriate deadlines without manual per-student configuration.
				</StudyBody>
				<StudyImage src='courses.gif' alt='Courses page with progress summaries and Continue card' />
			</StudySection>

			<StudyGrid sx={{ alignItems: 'flex-start' }}>
				<StudyCell size={{ xs: 12, md: 8 }}>
					<StudySection id='course-navigation' title='Course Navigation'>
						<StudyBody>
							In-course navigation follows the section, lesson, and page model defined in authoring. The navigation bar shows the full
							course structure, including pending assignments, locked items, failed work, and the student's last position.
						</StudyBody>
						<StudyBody>
							When authors hide lessons from navigation, numbering skips predictably. Assignments appear in context with the lesson they
							belong to rather than in a separate assignments area.
						</StudyBody>
					</StudySection>

					<StudySection id='progress' title='Progress'>
						<StudyBody>
							Reading pages are marked complete after three seconds of engagement, allowing progress to reflect reviewed content without
							an additional confirmation step.
						</StudyBody>
						<StudyBody>Completion feedback appears inline when work is finished.</StudyBody>
					</StudySection>
				</StudyCell>
				<StudyCell size={{ xs: 6, md: 4, lg: 2 }}>
					<StudyImage src='course_nav.gif' alt='In-course navigation with progress and status indicators' />
				</StudyCell>
			</StudyGrid>

			<StudySection id='unified-presentation' title='Unified Presentation'>
				<StudyBody>
					Typography, layout, and interaction patterns are consistent across courses because the platform controls rendering. Content is
					organized in the order students work through it, not split across separate pages, assignments, and downloads areas.
				</StudyBody>
				<StudyBody>
					Quiz feedback, retake behavior, and submission confirmation use the same patterns in every course. Progress and grade visibility
					on the courses page reduced the need for students to open individual courses to check their status. Instructors report fewer
					navigation questions from students.
				</StudyBody>
			</StudySection>
		</StudyPage>
	);
}
