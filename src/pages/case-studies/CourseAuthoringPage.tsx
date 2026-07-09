import { StudyPage } from '../../components/case-study/StudyPage';
import { StudySection } from '../../components/case-study/StudySection';
import { StudyGrid } from '../../components/case-study/StudyGrid';
import { StudyCell } from '../../components/case-study/StudyCell';
import { StudyBody } from '../../components/case-study/StudyBody';
import { StudyImage } from '../../components/case-study/StudyImage';
import { StudyImageRow } from '../../components/case-study/StudyImageRow';
import type { StudySectionItem } from '../../lib/caseStudyTypes';

export const courseAuthoringSections: StudySectionItem[] = [
	{ id: 'content-model', title: 'Content Model' },
	{ id: 'course-structure-and-editing', title: 'Course Structure and Editing' },
	{ id: 'linked-content', title: 'Linked Content' },
	{ id: 'item-versioning', title: 'Item Versioning' },
];

export function CourseAuthoringPage() {
	return (
		<StudyPage
			slug='course-authoring'
			title='Course Authoring Platform'
			subtitle='Custom authoring tools built around our curriculum and content model.'
			sections={courseAuthoringSections}>
			<StudySection id='content-model' title='Content Model'>
				<StudyBody>
					MathTrack originally authored curriculum in Canvas, a common application used to create and manage online coursework. Course
					authors are subject matter experts, not designers or LMS administrators, yet Canvas asks them to make decisions about page layout,
					typography, navigation, and integrations alongside writing instructional content. A noticeable share of author time went into
					configuring assignments and designing pages rather than developing curriculum.
				</StudyBody>
				<StudyBody>
					Students and instructors experienced the same inconsistency. When each course could be organized differently, instructors
					repeatedly fielded questions about where to find homework, grades, submissions, and course materials.
				</StudyBody>
				<StudyBody>
					I designed and built a custom authoring platform that separates content creation from presentation. Authors build lessons from
					predefined content items; the platform controls layout, typography, navigation, and student-facing interaction patterns across
					every course.
				</StudyBody>
				<StudyBody>
					The platform has been used to create more than 160 courses. Authors spend less time on layout and tool configuration than they did
					in previous systems, and content looks consistent and intenionally designed with no extra effort on the author's end.
				</StudyBody>
				<StudyGrid>
					<StudyCell size={{ xs: 12, md: 6 }}>
						<StudyBody>
							Courses are composed from reusable content items. Authors work in a structured item editor that supports a consistent
							editing workflow across presentations, assessments, discussions, file uploads, reflections, and announcements.
						</StudyBody>
					</StudyCell>
					<StudyCell size={{ xs: 12, md: 6 }}>
						<StudyImage src='editing_course_navigation.gif' alt='Course navigation editing' />
					</StudyCell>
				</StudyGrid>
				<StudyBody>
					This model also supports the edge cases authors care about. Multiple-choice questions can enforce a checkbox or radio presentation
					even when only one answer is correct, and scramble behavior is controlled with a preview so options can be set confidently before
					students see them. Written responses support both manual grading and AI-assisted suggestions, with the AI grading prompt
					configurable for the specific item. Discussions include required interaction rules, and peer responses can be hidden until
					students have completed the required interactions.
				</StudyBody>
				<StudyGrid>
					<StudyCell size={{ xs: 12, md: 6 }}>
						<StudyImage src='reading_page.gif' alt='Reading page tracking' />
					</StudyCell>
					<StudyCell size={{ xs: 12, md: 6 }}>
						<StudyImage src='fill-in-the-blank.png' alt='Fill in the blank question editor' />
					</StudyCell>
				</StudyGrid>
			</StudySection>

			<StudySection id='course-structure-and-editing' title='Course Structure and Editing'>
				<StudyGrid>
					<StudyCell size={{ xs: 12, md: 6 }}>
						<StudyBody>
							Navigation uses a three-layer model: sections, lessons, and pages. Authors can hide lessons or sections from navigation
							when numbering should skip (for example, introduction pages at the start of a course or feedback pages at the end). This
							keeps student navigation predictable while still letting authors structure courses the way they teach.
						</StudyBody>
						<StudyBody>
							When curriculum changes between terms or across programs, authors reorder content and edit course metadata in the same
							environment. Courses can also be cloned for variants across states and programs, with explicit choices about whether to
							reuse original item IDs or create new IDs.
						</StudyBody>
					</StudyCell>
					<StudyCell size={{ xs: 12, md: 6 }}>
						<StudyImage src='editing_course_navigation.gif' alt='Editing course structure' />
					</StudyCell>
				</StudyGrid>
			</StudySection>

			<StudySection id='linked-content' title='Linked Content'>
				<StudyGrid>
					<StudyCell size={{ xs: 12, md: 6 }}>
						<StudyBody>
							Reusable items can be used across multiple lessons. Stable IDs let the platform update shared content wherever it appears.
							When viewing an item, authors can see where it is used and disconnect it to create a new ID so edits no longer propagate
							to every linked page.
						</StudyBody>
						<StudyBody>
							The same idea applies when cloning a course. If a clone reuses item IDs, updates propagate across linked pages. If a clone
							creates new IDs, authors can edit independently.
						</StudyBody>
					</StudyCell>
					<StudyCell size={{ xs: 12, md: 6 }}>
						<StudyImageRow images={[{ src: 'linked_item.gif' }, { src: 'linked_drawer.gif' }]} />
					</StudyCell>
				</StudyGrid>
			</StudySection>

			<StudySection id='item-versioning' title='Item Versioning'>
				<StudyGrid>
					<StudyCell size={{ xs: 12, md: 6 }}>
						<StudyBody>
							Every content item carries major and minor version numbers. Major and minor changes are designed to match how students
							experience content over time.
						</StudyBody>
						<StudyBody>
							Major changes create a new version for new submissions, while students who already completed an item keep the version they
							originally worked with. Minor changes (typo fixes, formatting adjustments, and answer-key clarifications) propagate to
							items already in use so students see the updated content when they return.
						</StudyBody>
						<StudyBody>
							Authors can override the default classification when the edit intent differs from the platform's auto-detection.
						</StudyBody>
					</StudyCell>
					<StudyCell size={{ xs: 12, md: 6 }}>
						<StudyImage src='versioning.png' alt='Item versioning controls' />
					</StudyCell>
				</StudyGrid>
			</StudySection>
		</StudyPage>
	);
}
