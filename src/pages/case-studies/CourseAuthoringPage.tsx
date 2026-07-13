import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { StudyPage } from '../../components/case-study/StudyPage';
import { StudySection } from '../../components/case-study/StudySection';
import { StudySubsection } from '../../components/case-study/StudySubsection';
import { StudyBody } from '../../components/case-study/StudyBody';
import { StudyBulletList } from '../../components/case-study/StudyBulletList';
import { StudyGrid } from '../../components/case-study/StudyGrid';
import { StudyCell } from '../../components/case-study/StudyCell';
import { StudyImage } from '../../components/case-study/StudyImage';
import { scrollMarginTop } from '../../lib/styles';

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

/**
 * Manual two-column split. Pass `leftCols` / `rightCols` (1–12) to set widths.
 * Put text, lists, or `<StudyImage maxWidth={…} />` in either side.
 */
function Split({ left, right, leftCols = 6, rightCols = 6 }: { left: ReactNode; right: ReactNode; leftCols?: Cols; rightCols?: Cols }) {
	return (
		<StudyGrid spacing={3} sx={{ mb: 2 }}>
			<StudyCell size={{ xs: 12, md: leftCols }}>{left}</StudyCell>
			<StudyCell size={{ xs: 12, md: rightCols }}>{right}</StudyCell>
		</StudyGrid>
	);
}

function DetailTitle({ title, first = false }: { title: string; first?: boolean }) {
	return (
		<Typography
			variant='detailHeading'
			sx={{
				m: 0,
				mt: first ? 0 : { xs: 2, md: 2.5 },
				mb: 1,
				scrollMarginTop,
			}}>
			{title}
		</Typography>
	);
}

export function CourseAuthoringPage() {
	return (
		<StudyPage
			slug='course-authoring'
			title='Course Authoring'
			subtitle='The app contains an integrated curriculum authoring system for creating, organizing, and maintaining college-credit courses.'
			intro={
				<>
					<Col cols={8}>
						<StudyBody>
							MathTrack Institute prepares aspiring teachers to earn their teaching license and bachelor's degree through a series of
							online courses delivered through the MathTrack app. Rather than relying on a separate curriculum authoring application,
							every course is created and maintained directly within the platform.
						</StudyBody>
						<StudyBody>The authoring system is built around a simple hierarchy:</StudyBody>
						<Typography
							variant='body1'
							sx={{
								m: 0,
								mb: 2,
								fontFamily: 'monospace',
								letterSpacing: '0.02em',
							}}>
							Course → Section → Lesson → Page → Item
						</Typography>
						<StudyBody>
							Pages are the primary unit of learning, and every page is assembled from configurable Items. Rather than treating reading
							pages, quizzes, assignments, discussions, and file uploads as separate entities with different editors, every learning
							activity is built by combining Item types on a single page. This allows instructional content and student interaction to
							exist together within the same editing workflow.
						</StudyBody>
					</Col>
				</>
			}>
			<StudySection id='course-configuration' title='Course Configuration'>
				<Col cols={6}>
					<StudyBody>
						Courses are the top level of the content hierarchy and can be created and configured by MathTrack Institute curriculum staff
						or guest instructors.
					</StudyBody>
					<StudyBody>Each course carries the descriptive information used for publishing and program administration, including:</StudyBody>
					<StudyBulletList
						items={[
							'Title, course number, overview description, and header image',
							'Department',
							'Assigned professor',
							'Credit hours and professional development hours',
							'Companion guide',
							'Syllabus',
							'Search tags',
							'Locks',
							'Publication status',
						]}
					/>
					<StudyBody>
						Courses can also be reordered within the catalog using drag-and-drop to control how they appear to students.
					</StudyBody>
				</Col>
				<StudyImage src='course-authoring/course_overview_editing.png' alt='Course metadata and overview editing' maxWidth={633} />

				<StudySubsection id='departments' title='Departments' first />
				<Col cols={6}>
					<StudyBody>
						Departments control which programs have enrollment access to a course and can also be configured for automatic enrollment.
					</StudyBody>
					<StudyBody>For example:</StudyBody>
					<StudyBulletList
						items={[
							'Students in the Transition to Teaching program only see courses assigned to the Transition to Teaching department.',
							"Bachelor's program students are automatically enrolled in every course assigned to the Bachelor's department.",
						]}
					/>
				</Col>
				<Split
					left={
						<StudyImage
							src='course-authoring/course-enrollment-manual.jpg'
							alt='Enrollment screen filtered to courses available for a department'
						/>
					}
					right={
						<StudyImage
							src='course-authoring/course-enrollment-automatic.jpg'
							alt='Auto-enrolled courses for a program based on department assignment'
						/>
					}
				/>
				<Col cols={6}>
					<StudyBody>
						Department colors are configurable, while secondary colors and contrast text are generated automatically using APCA-W3.
					</StudyBody>
				</Col>
				<Split
					left={<StudyImage src='course-authoring/departments.jpg' alt='Department configuration' />}
					right={<StudyImage src='course-authoring/ada_colors.gif' alt='Department colors with auto-enroll toggles' />}
				/>
			</StudySection>

			<StudySection id='course-structure' title='Course Structure'>
				<Col cols={6}>
					<StudyBody>Every course follows the same hierarchy of Sections, Lessons, and Pages.</StudyBody>
					<StudyBody>
						Authors create and organize this structure using a drag-and-drop editor while previewing exactly what students will see in
						course navigation.
					</StudyBody>
					<StudyBody>
						Sections and lessons are numbered automatically. Navigation names and numbering can be hidden to support introductory pages,
						feedback pages, or other content that should not appear in the normal navigation sequence.
					</StudyBody>
				</Col>
				<StudyImage src='course-authoring/editing_course_navigation.gif' alt='Structure editor' />
			</StudySection>

			<StudySection id='course-cloning' title='Course Cloning'>
				<Col cols={6}>
					<StudyBody>Courses can be cloned for variants across states and programs.</StudyBody>
					<StudyBody>When cloning a course, authors choose whether Items retain their original IDs or receive new Item IDs.</StudyBody>
					<StudyBody>
						Courses cloned with original Item IDs continue sharing those Items. Courses cloned with new Item IDs can evolve independently
						while starting from the same course structure.
					</StudyBody>
				</Col>
			</StudySection>

			<StudySection id='page-authoring' title='Page Authoring'>
				<Col cols={8}>
					<StudyBody>Pages contain the content students interact with.</StudyBody>
					<StudyBody>
						In many learning management systems, reading pages, assignments, quizzes, and discussions are separate entities with different
						creation tools and different navigation experiences.
					</StudyBody>
					<StudyBody>
						The MathTrack app replaces this model with configurable Items. Every page is assembled by dragging Item blocks into place,
						allowing instructional content, questions, discussions, file uploads, certificates, and other Item types to appear together on
						the same page.
					</StudyBody>
					<StudyBody>
						Because every Item shares the same editing workflow, authors never have to switch authoring tools when building a lesson.
					</StudyBody>
					<StudyBody>Page-level options include:</StudyBody>
					<StudyBulletList
						items={[
							'Narration upload',
							'Anonymous grading',
							'Page grading',
							'Rubric',
							'Important flag',
							'Page icon',
							'Locking',
							'Due date',
							'Resubmission behavior',
							'Time estimate',
						]}
					/>
				</Col>
				<StudyImage src='course-authoring/rubrics.png' alt='Page editor' />
			</StudySection>

			<StudySection id='item-types' title='Item Types'>
				<Col cols={6}>
					<StudyBody>Pages are built by dragging Item blocks into place.</StudyBody>
					<StudyBody>
						Every Item type has its own configuration editor with both Item-specific settings and shared configuration options.
					</StudyBody>
				</Col>
				<DetailTitle title='View Only' first />
				<Col cols={6}>
					<StudyBulletList items={['Display', 'Embed', 'Certificate']} />
				</Col>
				<DetailTitle title='Automatic Grading' />
				<Col cols={6}>
					<StudyBulletList items={['Multiple Choice', 'True / False', 'Fill in the Blank']} />
				</Col>
				<DetailTitle title='Manual Grading' />
				<Col cols={6}>
					<StudyBulletList items={['Open Response', 'Date Input', 'File Upload', 'Discussion']} />
				</Col>
				<StudyImage src='course-authoring/item_example2.png' alt='Item editor' maxWidth={633} />
			</StudySection>

			<StudySection id='item-configuration' title='Item Configuration'>
				<Col cols={6}>
					<StudyBody>Although every Item type behaves differently, configuration happens in the same editor.</StudyBody>
					<StudyBody>Depending on Item type, authors can configure options such as:</StudyBody>
					<StudyBulletList
						items={[
							'Points',
							'Feedback',
							'Grader Notes',
							'AI grading prompts',
							'Versioning',
							'Completion behavior',
							'Answer scrambling',
							'Partial credit',
							'File restrictions',
							'Multiple uploads',
						]}
					/>
					<StudyBody>
						Because these settings belong to individual Items rather than pages, different Item types can exist together on the same page
						while maintaining their own behavior.
					</StudyBody>
				</Col>
			</StudySection>

			<StudySection id='ai-assisted-grading' title='AI-Assisted Grading'>
				<Col cols={6}>
					<StudyBody>Open Response Items support AI-assisted grading.</StudyBody>
					<StudyBody>
						The Item question is used as the default grading prompt, but authors can override it with a custom prompt from the Item
						configuration panel.
					</StudyBody>
					<StudyBody>The prompt is stored with the Item and supplied to the grading platform during grading.</StudyBody>
				</Col>
				<StudyImage src='course-authoring/item_example.png' alt='AI prompt configuration' maxWidth={633} />
			</StudySection>

			<StudySection id='item-bank' title='Item Bank'>
				<Col cols={6}>
					<StudyBody>Items can be reused by inserting them from the Item Bank.</StudyBody>
					<StudyBody>
						Authors can search by title, description, or unique ID. Matching text is highlighted in search results, and hovering over an
						Item displays a preview. Search results also display how many pages currently use an Item, and those pages can be viewed
						directly from the search results.
					</StudyBody>
					<StudyBody>Items inserted from the Item Bank are always inserted as Linked Items.</StudyBody>
				</Col>
			</StudySection>

			<StudySection id='linked-items' title='Linked Items'>
				<Col cols={6}>
					<StudyBody>Linked Items reference the same database record.</StudyBody>
					<StudyBody>Updating a Linked Item updates every copy automatically.</StudyBody>
					<StudyBody>Items can be disconnected at any time to create an independent copy with a new ID.</StudyBody>
					<StudyBody>
						Because grades are stored using both the Page ID and Item ID, Linked Items can be reused throughout the platform without
						sharing student grades. This is especially useful for Items such as course feedback questions that appear in many courses but
						should record separate responses for each page.
					</StudyBody>
				</Col>
				<Split
					left={<StudyImage src='course-authoring/linked_item.gif' alt='Linked item indicator in the lesson editor' />}
					right={<StudyImage src='course-authoring/linked_drawer.gif' alt='Usage drawer showing all locations for a linked item' />}
				/>
			</StudySection>

			<StudySection id='item-versioning' title='Item Versioning'>
				<Col cols={6}>
					<StudyBody>Every Item carries major and minor version numbers.</StudyBody>
					<StudyBody>
						The current version number is always visible on the Item card, and editing an Item previews the next version before saving.
					</StudyBody>
					<StudyBody>Minor revisions propagate to every instance of the Item sharing the same major version.</StudyBody>
					<StudyBody>
						Major revisions create a new database entry for the Item, allowing historical page submissions to continue displaying the
						original version while future submissions use the updated version.
					</StudyBody>
					<StudyBody>
						The platform automatically classifies edits as major or minor, although authors can override the suggested version type before
						saving.
					</StudyBody>
				</Col>
			</StudySection>

			<StudySection id='locking' title='Locking'>
				<Col cols={6}>
					<StudyBody>Courses, Sections, Lessons, and Pages can all be locked.</StudyBody>
					<StudyBody>
						Locks allow authors to select any combination of Courses, Sections, Lessons, or Pages as prerequisites before content becomes
						available.
					</StudyBody>
					<StudyBody>Locked content displays the remaining requirements needed for access.</StudyBody>
					<StudyBody>
						Slack notifications warn instructors when a lock may be broken, such as a student surpassing a lock requirement because they
						no longer have access to the required content.
					</StudyBody>
				</Col>
			</StudySection>
		</StudyPage>
	);
}
