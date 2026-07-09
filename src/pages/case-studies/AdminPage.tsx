import { StudyPage } from '../../components/case-study/StudyPage';
import { StudySection } from '../../components/case-study/StudySection';
import { StudyCapability } from '../../components/case-study/StudyCapability';
import { StudyBody } from '../../components/case-study/StudyBody';
import { StudyScreens } from '../../components/case-study/StudyScreens';
import type { StudySectionItem } from '../../lib/caseStudyTypes';

export const adminSections: StudySectionItem[] = [
	{ id: 'platform-overview', title: 'Platform Overview' },
	{ id: 'key-capabilities', title: 'Key Capabilities' },
	{ id: 'user-and-enrollment-management', title: 'User and Enrollment Management', level: 2 },
	{ id: 'documents-and-communications', title: 'Documents and Communications', level: 2 },
	{ id: 'organizational-structure', title: 'Organizational Structure', level: 2 },
	{ id: 'operational-tooling', title: 'Operational Tooling', level: 2 },
	{ id: 'outcome', title: 'Outcome' },
	{ id: 'screens', title: 'Screens' },
];

export function AdminPage() {
	return (
		<StudyPage
			slug='admin'
			title='Administrative Platform'
			subtitle='Staff interfaces for admissions, enrollment, transcripts, reporting, and operational workflows.'
			intro='The administrative platform provides staff-facing tools for the operational work that surrounds student-facing features. Each admin interface was built alongside the student or instructor feature it supports, so staff can manage enrollment, documents, reporting, and organizational configuration without engineering changes.'
			sections={adminSections}>
			<StudySection id='platform-overview' title='Platform Overview'>
				<StudyBody>
					The admin platform covers admissions, enrollment, transcript management, state reporting, user administration, and operational
					debugging. Administrative staff use these interfaces to manage the data and workflows that student-facing features depend on.
				</StudyBody>
				<StudyBody>
					Primary users are program managers, admissions staff, and operations teams. The system was built incrementally: when a new student
					feature created recurring operational work, the corresponding admin interface shipped with it rather than leaving staff to use
					spreadsheets or request code changes.
				</StudyBody>
				<StudyBody>
					Admin tools share patterns where related workflows overlap—table layouts, filtering, role-based access—but were not designed as a
					single unified suite upfront. The collection reflects operational needs as they appeared across six years of platform growth.
				</StudyBody>
			</StudySection>

			<StudySection id='key-capabilities' title='Key Capabilities'>
				<StudyCapability id='user-and-enrollment-management' title='User and Enrollment Management'>
					<StudyBody>
						User management provides program-specific table layouts with default columns tailored to each program's operational needs.
						Managers save local column presets per user so view customizations do not affect other staff members.
					</StudyBody>
					<StudyBody>
						Enrollment tools let staff manage cohort moves and course assignments directly. Manual and rule-based enrollment flows support
						assigning students to courses without database access or engineering intervention.
					</StudyBody>
				</StudyCapability>

				<StudyCapability id='documents-and-communications' title='Documents and Communications'>
					<StudyBody>
						The documents system lets staff upload required files, name them, and organize them into groups created on the fly. Students
						access documents from their documents page, reducing one-off file requests to instructors.
					</StudyBody>
					<StudyBody>
						Announcements centralize time-sensitive messaging. Staff create banner-style notifications or longer dashboard messages,
						target specific roles or cohorts, and optionally replace the close button with a link to ensure users complete the requested
						action.
					</StudyBody>
				</StudyCapability>

				<StudyCapability id='organizational-structure' title='Organizational Structure'>
					<StudyBody>
						The departments page groups roles and programs into department-level units. Departments can automatically enroll relevant
						roles or programs into standard courses, reducing manual updates when programs change.
					</StudyBody>
					<StudyBody>
						Departments support accessible color grouping so staff can visually distinguish related program variants. Color palettes are
						selected to meet contrast requirements for staff identification workflows.
					</StudyBody>
				</StudyCapability>

				<StudyCapability id='operational-tooling' title='Operational Tooling'>
					<StudyBody>
						The workflow area includes an activity report showing each user's path through the application. Staff use this to validate
						reported student interactions and reconstruct routing steps when debugging support tickets.
					</StudyBody>
					<StudyBody>
						Import tooling creates and updates schools and districts from source spreadsheets, syncs with HubSpot, and provides
						district/school grouping usable as cohorts for analytics. Course and program editing tools grew alongside student-facing
						features as operational needs appeared.
					</StudyBody>
				</StudyCapability>
			</StudySection>

			<StudySection id='outcome' title='Outcome'>
				<StudyBody>
					Administrative staff manage admissions, enrollment, and reporting through platform interfaces rather than spreadsheets or direct
					database access. Operational tasks that previously required engineering changes are handled through admin tools built alongside
					the features they support.
				</StudyBody>
			</StudySection>

			<StudySection id='screens' title='Screens'>
				<StudyScreens
					images={[
						{ src: 'notifications.gif', caption: 'Targeted announcements with banner and dashboard message types' },
						{ src: 'ada_colors.gif', caption: 'Accessible color grouping for department program variants' },
						{ src: 'course_overview_editing.png', caption: 'Course and program editing interface' },
						{ src: 'student_gradebook.gif', caption: 'Student records view with program-specific columns' },
					]}
				/>
			</StudySection>
		</StudyPage>
	);
}
