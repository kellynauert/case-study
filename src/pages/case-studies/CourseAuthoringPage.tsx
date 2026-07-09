import { StudyPage } from '../../components/case-study/StudyPage';
import { StudySection } from '../../components/case-study/StudySection';
import { StudyCapability } from '../../components/case-study/StudyCapability';
import { StudyBody } from '../../components/case-study/StudyBody';
import { StudyBulletList } from '../../components/case-study/StudyBulletList';
import { StudyScreens } from '../../components/case-study/StudyScreens';
import type { StudySectionItem } from '../../lib/caseStudyTypes';

export const courseAuthoringSections: StudySectionItem[] = [
	{ id: 'platform-overview', title: 'Platform Overview' },
	{ id: 'key-capabilities', title: 'Key Capabilities' },
	{ id: 'course-management', title: 'Course Management', level: 2 },
	{ id: 'lesson-authoring', title: 'Lesson Authoring', level: 2 },
	{ id: 'content-types', title: 'Content Types', level: 2 },
	{ id: 'content-reuse', title: 'Content Reuse', level: 2 },
	{ id: 'item-versioning', title: 'Item Versioning', level: 2 },
	{ id: 'technical-notes', title: 'Technical Notes' },
	{ id: 'outcome', title: 'Outcome' },
	{ id: 'screens', title: 'Screens' },
];

export function CourseAuthoringPage() {
	return (
		<StudyPage
			slug='course-authoring'
			title='Course Authoring Platform'
			subtitle='Structured curriculum authoring with a shared content model across every course.'
			intro='MathTrack authors curriculum in a custom authoring environment instead of Canvas. The platform separates instructional content from presentation: authors build from predefined item types, and the system controls layout, navigation, and student-facing interaction patterns across all courses.'
			sections={courseAuthoringSections}>
			<StudySection id='platform-overview' title='Platform Overview'>
				<StudyBody>
					The authoring platform is where subject matter experts create and maintain all MathTrack coursework. Authors manage course
					metadata, organize sections and lessons, configure assessments, and publish content to student enrollments.
				</StudyBody>
				<StudyBody>
					Primary users are curriculum authors and instructional staff. The system exists because Canvas required authors to make layout,
					navigation, and integration decisions alongside writing content. A custom authoring layer lets authors focus on curriculum while
					the platform enforces consistent structure and presentation for students and instructors.
				</StudyBody>
				<StudyBody>
					Authoring connects directly to the student learning experience and grading platform. Course structure defined here drives
					in-course navigation, progress tracking, and assessment configuration used downstream.
				</StudyBody>
			</StudySection>

			<StudySection id='key-capabilities' title='Key Capabilities'>
				<StudyCapability id='course-management' title='Course Management'>
					<StudyBody>
						Each course has metadata (course number, title, images, program associations) and a navigable structure organized into
						sections, lessons, and pages. Authors edit course overviews, reorder content via drag-and-drop, and control which lessons
						appear in student navigation.
					</StudyBody>
					<StudyBody>
						Lessons and sections can be hidden from navigation when numbering should skip—for example, introduction pages at the start of
						a course or feedback pages at the end. Courses can be cloned for variants across states and programs, with explicit choices
						about whether cloned items reuse original IDs or receive new IDs.
					</StudyBody>
				</StudyCapability>

				<StudyCapability id='lesson-authoring' title='Lesson Authoring'>
					<StudyBody>
						Lessons are composed of reusable content items arranged in a hierarchy. Authors add, reorder, and configure items within a
						structured editor that uses the same workflow regardless of item type. The three-layer model—sections, lessons, pages—keeps
						navigation predictable for students while allowing authors to structure courses the way they teach.
					</StudyBody>
					<StudyBody>
						Page-level settings support grading at the page level (one grade for all questions on a page) or per-item grading. Authors set
						point values, completion-only behavior, and item-specific configuration without touching layout or typography.
					</StudyBody>
				</StudyCapability>

				<StudyCapability id='content-types' title='Content Types'>
					<StudyBody>
						All course content is built from a fixed set of item types. Each type has a dedicated editor with type-specific configuration.
					</StudyBody>
					<StudyBulletList
						items={[
							'Display Items — instructional content with tracked read time; pages marked read after three seconds of engagement',
							'Assessments — multiple choice, fill-in-the-blank, and written response; supports checkbox/radio presentation, answer scrambling with preview, and configurable AI grading prompts',
							'Discussions — required interaction rules with peer responses hidden until prerequisites are met',
							'File Uploads — student submission items with instructor review',
							'Reflections — structured written responses attached to apprentice records',
							'Announcements — time-sensitive messaging within course context',
						]}
					/>
				</StudyCapability>

				<StudyCapability id='content-reuse' title='Content Reuse'>
					<StudyBody>
						Content items carry stable IDs and can appear in multiple lessons. When an item is linked, edits propagate to every location
						where it appears. Authors can view all usages from the item editor and disconnect an item to create a new ID when independent
						editing is needed.
					</StudyBody>
					<StudyBody>
						Course cloning follows the same model. Clones that reuse item IDs receive shared updates across linked pages. Clones that
						generate new IDs allow independent curriculum maintenance. This supports both centralized curriculum updates and
						program-specific variants.
					</StudyBody>
				</StudyCapability>

				<StudyCapability id='item-versioning' title='Item Versioning'>
					<StudyBody>
						Every content item carries major and minor version numbers. Major changes create a new version for new submissions; students
						who already completed an item retain the version they originally worked with. Minor changes—typo fixes, formatting
						adjustments, answer-key clarifications—propagate to items already in use.
					</StudyBody>
					<StudyBody>
						The platform auto-classifies edit severity. Authors can override the classification when the edit intent differs from the
						default detection.
					</StudyBody>
				</StudyCapability>
			</StudySection>

			<StudySection id='technical-notes' title='Technical Notes'>
				<StudyBody>
					Content and presentation are decoupled at the data model level. Item types define a schema for author input; the rendering layer
					controls typography, layout, and interaction patterns. This means new item configuration does not require per-course layout work.
				</StudyBody>
				<StudyBody>
					AI-assisted grading is configured per item at authoring time. The grading prompt, item type, and rubric context are stored with
					the item and passed to the grading platform when instructors review submissions.
				</StudyBody>
			</StudySection>

			<StudySection id='outcome' title='Outcome'>
				<StudyBody>
					160+ production courses authored in the platform. Course authors report preferring it over Canvas for curriculum work. Content
					presentation is consistent across all courses without per-author design effort.
				</StudyBody>
			</StudySection>

			<StudySection id='screens' title='Screens'>
				<StudyScreens
					images={[
						{ src: 'course_overview_editing.png', caption: 'Course metadata and overview editing' },
						{ src: 'editing_course_navigation.gif', caption: 'Drag-and-drop course structure editor' },
						{ src: 'reading_page.gif', caption: 'Display item editor with read-time tracking' },
						{ src: 'fill-in-the-blank.png', caption: 'Fill-in-the-blank assessment configuration' },
						{ src: 'linked_item.gif', caption: 'Linked item indicator in the lesson editor' },
						{ src: 'linked_drawer.gif', caption: 'Usage drawer showing all locations for a linked item' },
						{ src: 'versioning.png', caption: 'Major and minor version classification on save' },
					]}
				/>
			</StudySection>
		</StudyPage>
	);
}
