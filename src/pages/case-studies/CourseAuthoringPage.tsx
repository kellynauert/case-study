import Typography from '@mui/material/Typography';
import { StudyPage } from '../../components/case-study/StudyPage';
import { StudySection, StudySectionTitle } from '../../components/case-study/StudySection';
import { StudyBody } from '../../components/case-study/StudyBody';
import { StudyBulletList } from '../../components/case-study/StudyBulletList';
import { StudyImage } from '../../components/case-study/StudyImage';
import { StudyDetailTitle } from '../../components/case-study/StudyLayout';
import { StudyCell } from '../../components/case-study/StudyCell';
import { StudyGrid } from '../../components/case-study/StudyGrid';

export function CourseAuthoringPage() {
	return (
		<StudyPage
			slug='course-authoring'
			title='Course Authoring'
			subtitle='The app contains an integrated curriculum authoring system for creating, organizing, and maintaining college-credit courses.'
			intro={
				<>
					<StudyBody size={12}>
						MathTrack Institute prepares aspiring teachers to earn their teaching license and bachelor's degree through a series of online
						courses delivered through the MathTrack app. Rather than relying on a separate curriculum authoring application, every course
						is created and maintained directly within the platform.
						<br />
						<br />
						The authoring system is built around a simple hierarchy:
					</StudyBody>
					<StudyCell size={12}>
						<Typography
							variant='body1'
							sx={{
								m: 0,
								fontFamily: 'monospace',
								letterSpacing: '0.02em',
							}}>
							Course → Section → Lesson → Page → Item
						</Typography>
					</StudyCell>
					<StudyBody size={12}>
						Pages are the primary unit of learning, and every page is assembled from configurable Items. Rather than treating reading
						pages, quizzes, assignments, discussions, and file uploads as separate entities with different editors, every learning
						activity is built by combining Item types on a single page. This allows instructional content and student interaction to exist
						together within the same editing workflow.
					</StudyBody>
				</>
			}>
			<StudySection id='course-configuration' size={12}>
				<StudySectionTitle id='course-configuration' title='Course Configuration' />

				<StudyBody size={5}>
					Courses are the top level of the content hierarchy and can be created and configured by MathTrack Institute curriculum staff or
					guest instructors.
					<br />
					<br />
					Each course carries the descriptive information used for publishing and program administration, including:
					<StudyBulletList
						size={12}
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
					Courses can also be reordered within the catalog using drag-and-drop to control how they appear to students.
				</StudyBody>

				<StudyImage
					size={{ xs: 12, md: 7 }}
					src='course-authoring/course_overview_editing.png'
					alt='Course metadata and overview editing'
					maxWidth={633}
				/>
			</StudySection>

			<StudySection id='departments' size={12}>
				<StudySectionTitle id='departments' title='Departments' />
				<StudyBody size={12}>
					Departments control which programs have enrollment access to a course and can also be configured for automatic enrollment. Colors
					are configurable, while secondary colors and contrast text are generated automatically using APCA-W3.
				</StudyBody>
				<StudyImage size={{ xs: 12, md: 12 }} src='course-authoring/departments.jpg' alt='Department configuration' />

				<StudyCell size={{ xs: 12, md: 6 }}>
					<StudyGrid spacing={2} sx={{ mb: 0, mt: 2 }}>
						<StudyBody size={12}>
							Transition to Teaching program students are automatically enrolled in every course assigned to the T2T department.
						</StudyBody>
						<StudyImage
							size={12}
							src='course-authoring/course-enrollment-automatic.png'
							alt='Auto-enrolled courses for a program based on department assignment'
						/>
					</StudyGrid>
				</StudyCell>
				<StudyCell size={{ xs: 12, md: 6 }}>
					<StudyGrid spacing={2} sx={{ mb: 0, mt: 2 }}>
						<StudyBody size={12}>
							Bachelor's program students can only be enrolled in courses assigned to the Bachelor's department.
						</StudyBody>
						<StudyImage
							size={12}
							src='course-authoring/course-enrollment-manual.png'
							alt='Manual enrollment for a program based on department assignment'
						/>
					</StudyGrid>
				</StudyCell>
			</StudySection>

			<StudyCell size={12}>
				<StudyGrid spacing={2} columnSpacing={{ xs: 3, md: 5 }} sx={{ mb: 0 }}>
					<StudySection id='course-structure' size={{ xs: 12, md: 6 }}>
						<StudySectionTitle id='course-structure' title='Course Structure' />
						<StudyBody size={12}>
							Every course follows the same hierarchy of Sections, Lessons, and Pages.
							<br />
							<br />
							Authors create and organize this structure using a drag-and-drop editor while previewing exactly what students will see in
							course navigation.
							<br />
							<br />
							Sections and lessons are numbered automatically. Navigation names and numbering can be hidden to support introductory
							pages, feedback pages, or other content that should not appear in the normal navigation sequence.
						</StudyBody>
					</StudySection>
					<StudySection id='course-cloning' size={{ xs: 12, md: 6 }}>
						<StudySectionTitle id='course-cloning' title='Course Cloning' />
						<StudyBody size={12}>
							Courses can be cloned for variants across states and programs.
							<br />
							<br />
							When cloning a course, authors choose whether Items retain their original IDs or receive new Item IDs.
							<br />
							<br />
							Courses cloned with original Item IDs continue sharing those Items. Courses cloned with new Item IDs can evolve
							independently while starting from the same course structure.
						</StudyBody>
					</StudySection>
				</StudyGrid>
			</StudyCell>
			<StudyImage size={12} src='course-authoring/editing_course_navigation.gif' alt='Structure editor' maxWidth={1280} />

			<StudySection id='page-authoring' size={12}>
				<StudySectionTitle id='page-authoring' title='Page Authoring' />
				<StudyBody size={12}>
					Pages contain the content students interact with and are assembled by dragging Item blocks into place, allowing instructional
					content, questions, discussions, file uploads, certificates, and other Item types to appear together on the same page.
				</StudyBody>
				<StudyBody size={4}>
					Page-level options include:
					<StudyBulletList
						size={12}
						items={[
							'Narration upload',
							'Anonymous grading toggle',
							'Page Level grading toggle',
							'Rubric (integrated rich text editor)',
							'Marking as important (star icon)',
							'Page icon (choice of icons)',
							'Locking',
							'Due date (in weeks from users program start date)',
							'Resubmission behavior (none, keep highest, keep newest)',
							'Time estimate (minutes)',
						]}
					/>
				</StudyBody>
				<StudyImage size={8} src='course-authoring/page-level-options.gif' alt='Page level options' />
			</StudySection>

			<StudySection id='item-types' size={12} sx={{ alignItems: 'flex-start' }}>
				<StudySectionTitle id='item-types' title='Item Types' />
				<StudyBody size={12}>
					Items are the smallest unit of content and are the building blocks of pages. The types of items used on a page determine how that
					page will be graded and displayed to students.
				</StudyBody>
				<StudyBody size={4}>
					<StudyDetailTitle title='View Only' first />
					<StudyBody size={12}>
						When all items on a page are view only the page content is full width and gets marked as read after three seconds.
						<br />
						<br />
						There are three types of view only items:
					</StudyBody>
					<StudyBulletList size={12} items={['Display', 'Embed', 'Certificate']} />
				</StudyBody>
				<StudyBody size={4}>
					<StudyDetailTitle title='Automatic Grading' first />
					<StudyBody size={12}>
						Some item types have set answers and are graded automatically on page submission.
						<br />
						<br />
						There are three types of automatic grading items:
						<br />
					</StudyBody>
					<StudyBulletList size={12} items={['Multiple Choice', 'True / False', 'Fill in the Blank']} />
				</StudyBody>
				<StudyBody size={4}>
					<StudyDetailTitle title='Manual Grading' first />
					<StudyBody size={12}>
						If any items on a page are manualy graded the entire page will be sent to the grading queue on submission.
					</StudyBody>
					<br />
					There are four types of manual grading items:
					<StudyBulletList size={12} items={['Open Response', 'Date Input', 'File Upload', 'Discussion']} />
				</StudyBody>
			</StudySection>

			<StudySection id='item-configuration' size={12}>
				<StudySectionTitle id='item-configuration' title='Item Configuration' />
				<StudyCell size={{ xs: 12, md: 4 }}>
					<StudyGrid spacing={2} sx={{ mb: 0 }}>
						<StudyBody size={12}>
							Although every Item type behaves differently, configuration happens in the same editor.
							<br />
							<br />
							Depending on Item type, authors can configure options such as:
						</StudyBody>
						<StudyBulletList
							size={12}
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
						<StudyBody size={12}>
							Because these settings belong to individual Items rather than pages, different Item types can exist together on the same
							page while maintaining their own behavior.
						</StudyBody>

						<StudySection id='item-versioning' size={12}>
							<StudySectionTitle id='item-versioning' title='Item Versioning' />
							<StudyBody size={12}>
								Every Item carries major and minor version numbers.
								<br />
								<br />
								The current version number is always visible on the Item card, and editing an Item previews the next version before
								saving.
								<br />
								<br />
								Minor revisions propagate to every instance of the Item sharing the same major version.
								<br />
								<br />
								Major revisions create a new database entry for the Item, allowing historical page submissions to continue displaying
								the original version while future submissions use the updated version.
								<br />
								<br />
								The platform automatically classifies edits as major or minor, although authors can override the suggested version
								type before saving.
							</StudyBody>
						</StudySection>
					</StudyGrid>
				</StudyCell>
				<StudyCell size={{ xs: 12, md: 8 }} sx={{ height: 'fill-available' }}>
					<StudyGrid spacing={2} sx={{ mb: 0, height: '100%', justifyContent: 'space-between' }}>
						<StudyImage size={12} src='course-authoring/item_example.png' alt='Item editor' />
						<StudyImage size={12} src='course-authoring/item_example2.png' alt='Item editor' />
						<StudyImage size={12} src='course-authoring/item_example.png' alt='AI prompt configuration' />
					</StudyGrid>
				</StudyCell>
			</StudySection>

			<StudySection id='linked-items' size={12}>
				<StudyImage size={5} src='course-authoring/linked_item.gif' alt='Usage drawer showing all locations for a linked item' />

				<StudyBody size={7}>
					<StudySectionTitle id='linked-items' title='Linked Items' size={8} />
					Linked Items reference the same database record, so updating a Linked Item will affect the item in all locations. Items can be
					disconnected at any time to create an independent copy with a new ID.
					<br />
					<br />
					Because grades are stored using both the Page ID and Item ID, Linked Items can be reused throughout the platform without sharing
					student grades. This is especially useful for Items such as course feedback questions that appear in many courses but should
					record separate responses for each page.
				</StudyBody>
			</StudySection>

			<StudySection id='item-bank' size={12}>
				<StudySectionTitle id='item-bank' title='Item Bank' />
				<StudyBody size={6}>
					Items can be reused by inserting them from the Item Bank.
					<br />
					<br />
					Authors can search by title, description, or unique ID. Matching text is highlighted in search results, and hovering over an Item
					displays a preview. Search results also display how many pages currently use an Item, and those pages can be viewed directly from
					the search results.
					<br />
					<br />
					Items inserted from the Item Bank are always inserted as Linked Items.
				</StudyBody>
				<StudyImage size={6} src='course-authoring/linked_drawer.gif' alt='Usage drawer showing all locations for a linked item' />
			</StudySection>

			<StudySection id='locking' size={{ xs: 12, md: 12 }}>
				<StudySectionTitle id='locking' title='Locking' />
				<StudyBody size={6}>
					Courses, Sections, Lessons, and Pages can all be locked.
					<br />
					<br />
					Locks allow authors to select any combination of Courses, Sections, Lessons, or Pages as prerequisites before content becomes
					available.
					<br />
					<br />
					Locked content displays the remaining requirements needed for access.
					<br />
					<br />
					Slack notifications warn instructors when a lock may be broken, such as a student surpassing a lock requirement because they are
					not enrolled in the prerequisite course. <br />
					<br />
					<StudyImage size={10} src='course-authoring/locked_course.png' alt='Locked course' />
				</StudyBody>
				<StudyImage size={3} src='course-authoring/locked_nav.png' alt='Locked course' />
			</StudySection>
		</StudyPage>
	);
}
