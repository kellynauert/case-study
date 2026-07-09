import { StudyPage } from '../../components/case-study/StudyPage';
import { StudySection } from '../../components/case-study/StudySection';
import { StudyGrid } from '../../components/case-study/StudyGrid';
import { StudyCell } from '../../components/case-study/StudyCell';
import { StudyBody } from '../../components/case-study/StudyBody';
import { StudyImage } from '../../components/case-study/StudyImage';
import type { StudySectionItem } from '../../lib/caseStudyTypes';

export const adminSections: StudySectionItem[] = [
	{ id: 'admin-with-each-feature', title: 'Admin With Each Feature' },
	{ id: 'what-accumulated-over-time', title: 'What Accumulated Over Time' },
];

export function AdminPage() {
	return (
		<StudyPage
			slug='admin'
			title='Administrative Platform'
			subtitle='Admin tools for admissions, enrollment, transcripts, and reporting.'
			sections={adminSections}>
			<StudySection id='admin-with-each-feature' title='Admin With Each Feature'>
				<StudyBody>
					As MathTrack grew, operational work scaled faster than tooling. Admissions, enrollment, transcript requests, and reporting
					obligations introduced repeated manual processes. Without an interface for staff, the work either stayed in spreadsheets or
					required engineering changes.
				</StudyBody>
				<StudyBody>
					Administrative staff handle applications, enrollment, cohort moves, transcripts, and state reporting. Information flows through
					multiple systems, but the key constraint was always the same: staff needed a way to manage operational tasks without waiting for
					code changes.
				</StudyBody>
				<StudyBody>
					The pattern was consistent: when a student feature created operational work that had to be handled repeatedly, the admin interface
					shipped alongside it.
				</StudyBody>
				<StudyBody>
					User management started with a practical request: managers needed different table layouts for different programs. The solution was
					a set of program-specific tables with default columns tailored to each use case, plus local column presets saved per user so
					managers could adjust views without affecting everyone else.
				</StudyBody>
				<StudyImage src='studentgradebook.jpg' alt='Student gradebook admin view' />
				<StudyBody>
					Documents were another recurring need. The documents flow lets staff upload required files, name them, and organize them into
					groups that can be created on the fly. Students can then view or download documents directly from their documents page, reducing
					the number of one-off file requests sent to teachers.
				</StudyBody>
				<StudyBody>
					Support and debugging also drove tooling. The workflow area includes an activity report that shows each user's path through the
					app. This makes it possible to validate whether a student interacted with the system as reported and to reconstruct routing steps
					when a bug report is filed.
				</StudyBody>
				<StudyBody>
					For organization, the departments page groups roles and programs into department-level units. Departments can automatically enroll
					relevant roles or programs into standard courses, which reduces manual updates when programs change. Departments also support
					accessible color grouping so staff can quickly visually identify related program variants.
				</StudyBody>
				<StudyImage src='ada_colors.gif' alt='Accessible color grouping' />
				<StudyBody>Enrollment tools let staff manage cohort moves and course assignments without engineering changes.</StudyBody>
				<StudyImage src='course-enrollment-manual.jpg' alt='Manual course enrollment' />
				<StudyBody>
					Operational data ingestion became part of the admin toolset as well. Import tooling creates and updates schools and districts from
					source spreadsheets, syncs with HubSpot, and provides district/school grouping that can be used as cohorts for analytics.
				</StudyBody>
				<StudyBody>
					Finally, announcements centralize time-sensitive messaging. Staff can create banner-style notifications or longer dashboard
					messages, target specific roles or cohorts, and (for banners) optionally replace the close button with a link to ensure users take
					the requested action.
				</StudyBody>
				<StudyImage src='notifications.gif' alt='Announcements and notifications' />
				<StudyBody>Course and program editing tools grew alongside student-facing features as operational needs appeared.</StudyBody>
				<StudyImage src='courses-editor.jpg' alt='Courses editor' />
			</StudySection>

			<StudySection id='what-accumulated-over-time' title='What Accumulated Over Time'>
				<StudyGrid>
					<StudyCell size={{ xs: 12, md: 6 }}>
						<StudyBody>
							The result is a collection of admin tools shaped by the features they support rather than a single unified suite designed
							upfront. Related interfaces share patterns where it made sense, but the collection was built incrementally based on
							operational problems as they appeared.
						</StudyBody>
					</StudyCell>
					<StudyCell size={{ xs: 12, md: 6 }}>
						<StudyImage src='grading-queue.jpg' alt='Grading queue admin view' />
					</StudyCell>
				</StudyGrid>
			</StudySection>
		</StudyPage>
	);
}
