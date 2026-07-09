import { StudyPage } from '../../components/case-study/StudyPage';
import { StudySection } from '../../components/case-study/StudySection';
import { StudyGrid } from '../../components/case-study/StudyGrid';
import { StudyCell } from '../../components/case-study/StudyCell';
import { StudyBody } from '../../components/case-study/StudyBody';
import { StudyBulletList } from '../../components/case-study/StudyBulletList';
import { StudyImage } from '../../components/case-study/StudyImage';
import { StudyImageRow } from '../../components/case-study/StudyImageRow';
import type { StudySectionItem } from '../../lib/caseStudyTypes';

export const courseAuthoringSections: StudySectionItem[] = [
	{ id: 'course-management', title: 'Course Management' },
	{ id: 'lesson-authoring', title: 'Lesson Authoring' },
	{ id: 'content-types', title: 'Content Types' },
	{ id: 'content-reuse', title: 'Content Reuse' },
	{ id: 'item-versioning', title: 'Item Versioning' },
];

export function CourseAuthoringPage() {
	return (
		<StudyPage
			slug='course-authoring'
			title='Course Authoring'
			subtitle='Custom curriculum authoring with typed content blocks and shared presentation.'
			intro='Curriculum authoring runs in a dedicated editor. Authors work with typed content blocks while the platform controls layout, navigation, and student presentation. Course structure defined here drives in-course navigation, progress tracking, and assessment configuration in the student and grading systems. Authors previously had to make layout and navigation decisions while writing curriculum. The authoring layer separates content from presentation so authors can focus on instructional material while the platform enforces consistent structure across courses. '
			sections={courseAuthoringSections}>
			<StudySection id='course-management' title='Course Management'>
				<StudyGrid>
					<StudyCell size={{ xs: 12 }}>
						<StudyImage src='courses-editor.jpg' alt='Courses editor selection with drag-and-drop course structure' />
					</StudyCell>
					<StudyCell size={{ xs: 12, md: 6 }}>
						<StudyBody>
							Each course has a structure of sections, lessons, and pages. Authors reorder content with drag-and-drop and control what
							appears in student navigation.
						</StudyBody>
						<StudyBody>The overview editor configures the course landing page students see before entering content.</StudyBody>
						<StudyBulletList
							items={[
								'Course number, title, and header image',
								'Departments, category, assigned professor, credit hours, and group PD hours',
								'Overview description, syllabus link, and companion guide',
								'Tags and prerequisite or related course associations',
								'Published status',
							]}
						/>
					</StudyCell>
					<StudyCell size={{ xs: 12, md: 6 }}>
						<StudyImage src='course_overview_editing.png' alt='Course metadata and overview editing' />
					</StudyCell>
				</StudyGrid>
			</StudySection>

			<StudySection id='lesson-authoring' title='Lesson Authoring'>
				<StudyBody>
					Lessons are built from reusable content items in a section, lesson, and page hierarchy. Authors add, reorder, and configure items
					through a single editor workflow regardless of item type.
				</StudyBody>
				<StudyBody>
					Lessons and sections can be hidden from navigation when numbering should skip, such as introduction pages at the start or feedback
					pages at the end. Courses can be cloned for variants across states and programs, with a choice about whether cloned items retain
					their original IDs or receive new ones.
				</StudyBody>
				<StudyBody>
					Page-level settings support grading an entire page at once or grading each item individually. Authors set point values,
					completion-only behavior, and item-specific options without modifying layout or typography. Content and presentation are decoupled
					at the data model level: item types define author input, and the rendering layer controls layout and interaction. New item
					configuration does not require per-course layout work.
				</StudyBody>
				<StudyImage src='editing_course_navigation.gif' alt='Drag-and-drop course structure editor' />
			</StudySection>

			<StudySection id='content-types' title='Content Types'>
				<StudyBody>Every page is built from a fixed set of item types, each with a dedicated editor.</StudyBody>
				<StudyGrid>
					<StudyCell size={{ xs: 12, md: 6 }}>
						<StudyBulletList
							items={[
								'Display items — instructional rich content with in-app word editing, embeds, and optional read-time completion tracking',
								'Fill in the blank — students select text from a list matched against author-configured answer keys',
								'Open response — free-text submissions reviewed by instructors; supports configurable AI grading prompts.',
								'True/false — single-selection questions scored automatically against the correct answer.',
								'Multiple choice — radio or checkbox selections with answer scrambling and forced checkbox option.',
								'Date input — students submit a date; can carry points for manual review or track completion only.	',
								'File upload — student file submissions with instructor review. Supports file type restrictions, maximum size, and enabling multiple file uploads.',
								"Discussion — students submit a response and lock it before viewing peer submissions. Students within the same cohort can view each other's responses.",
								'Certificate — issued automatically when course completion criteria are met.',
							]}
						/>
					</StudyCell>
					<StudyCell size={{ xs: 12, md: 6 }}>
						<StudyImage src='fill-in-the-blank.png' alt='Fill-in-the-blank assessment configuration' />
					</StudyCell>
				</StudyGrid>
				<StudyBody>
					AI grading prompts are configured per item at authoring time. The prompt, item type, and rubric context are stored with the item
					and passed to the grading platform when instructors review submissions.
				</StudyBody>
			</StudySection>

			<StudySection id='content-reuse' title='Content Reuse'>
				<StudyBody>
					Content items carry stable IDs and can appear in multiple lessons. Editing a linked item updates every location where it appears.
					Authors can view all usages from the item editor and disconnect an item to create an independent copy.
				</StudyBody>
				<StudyBody>
					Course cloning follows the same model. Clones that reuse IDs receive shared updates. Clones with new IDs can diverge for
					program-specific curriculum maintenance.
				</StudyBody>
				<StudyImageRow
					images={[
						{ src: 'linked_item.gif', alt: 'Linked item indicator in the lesson editor', size: { xs: 12, md: 7 } },
						{ src: 'linked_drawer.gif', alt: 'Usage drawer showing all locations for a linked item', size: { xs: 12, md: 5 } },
					]}
				/>
			</StudySection>

			<StudySection id='item-versioning' title='Item Versioning'>
				<StudyBody>
					Every item carries major and minor version numbers. Minor changes, such as typo fixes, propagate to students who already completed
					the item. Major changes create a new version; students retain the version they originally completed.
				</StudyBody>
				<StudyBody>
					The platform classifies edit severity on save. Authors can override the classification when the edit intent differs from the
					default.
				</StudyBody>
				<StudyImage src='versioning.png' alt='Major and minor version classification on save' fullWidth />
			</StudySection>
		</StudyPage>
	);
}
