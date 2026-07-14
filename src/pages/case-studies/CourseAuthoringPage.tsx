import Typography from '@mui/material/Typography';
import { StudyPage } from '../../components/case-study/StudyPage';
import { StudySection } from '../../components/case-study/StudySection';
import { StudySubsection } from '../../components/case-study/StudySubsection';
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
					</StudyBody>
					<StudyBody size={12}>The authoring system is built around a simple hierarchy:</StudyBody>
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
			<StudySection id='course-configuration' title='Course Configuration' size={12}>
				<StudyCell size={{ xs: 12, md: 5 }}>
					<StudyGrid spacing={2} sx={{ mb: 0 }}>
						<StudyBody size={12}>
							Courses are the top level of the content hierarchy and can be created and configured by MathTrack Institute curriculum
							staff or guest instructors.
						</StudyBody>
						<StudyBody size={12}>
							Each course carries the descriptive information used for publishing and program administration, including:
						</StudyBody>
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
						<StudyBody size={12}>
							Courses can also be reordered within the catalog using drag-and-drop to control how they appear to students.
						</StudyBody>
					</StudyGrid>
				</StudyCell>
				<StudyImage
					size={{ xs: 12, md: 7 }}
					src='course-authoring/course_overview_editing.png'
					alt='Course metadata and overview editing'
					maxWidth={633}
				/>

				<StudySubsection id='departments' title='Departments' size={12} first />
				<StudyBody size={{ xs: 12, md: 6 }}>
					Departments control which programs have enrollment access to a course and can also be configured for automatic enrollment. Colors
					are configurable, while secondary colors and contrast text are generated automatically using APCA-W3.
				</StudyBody>
				<StudyImage size={{ xs: 12, md: 6 }} src='course-authoring/departments.jpg' alt='Department configuration' />

				<StudyCell size={{ xs: 12, md: 6 }}>
					<StudyGrid spacing={2} sx={{ mb: 0 }}>
						<StudyBody size={12}>
							Students in the Bachelors Program only be enrolled in courses assigned to the Bachelor's department.
						</StudyBody>
						<StudyImage
							size={12}
							src='course-authoring/course-enrollment-manual.jpg'
							alt='Enrollment screen filtered to courses available for a department'
						/>
					</StudyGrid>
				</StudyCell>
				<StudyCell size={{ xs: 12, md: 6 }}>
					<StudyGrid spacing={2} sx={{ mb: 0 }}>
						<StudyBody size={12}>
							Transition to Teaching program students are automatically enrolled in every course assigned to the T2T department.
						</StudyBody>
						<StudyImage
							size={12}
							src='course-authoring/course-enrollment-automatic.jpg'
							alt='Auto-enrolled courses for a program based on department assignment'
						/>
					</StudyGrid>
				</StudyCell>
			</StudySection>

			<StudyCell size={12}>
				<StudyGrid spacing={2} columnSpacing={{ xs: 3, md: 5 }} sx={{ mb: 0 }}>
					<StudySection id='course-structure' title='Course Structure' size={{ xs: 12, md: 6 }}>
						<StudyBody size={12}>Every course follows the same hierarchy of Sections, Lessons, and Pages.</StudyBody>
						<StudyBody size={12}>
							Authors create and organize this structure using a drag-and-drop editor while previewing exactly what students will see in
							course navigation.
						</StudyBody>
						<StudyBody size={12}>
							Sections and lessons are numbered automatically. Navigation names and numbering can be hidden to support introductory
							pages, feedback pages, or other content that should not appear in the normal navigation sequence.
						</StudyBody>
					</StudySection>
					<StudySection id='course-cloning' title='Course Cloning' size={{ xs: 12, md: 6 }}>
						<StudyBody size={12}>Courses can be cloned for variants across states and programs.</StudyBody>
						<StudyBody size={12}>
							When cloning a course, authors choose whether Items retain their original IDs or receive new Item IDs.
						</StudyBody>
						<StudyBody size={12}>
							Courses cloned with original Item IDs continue sharing those Items. Courses cloned with new Item IDs can evolve
							independently while starting from the same course structure.
						</StudyBody>
					</StudySection>
				</StudyGrid>
			</StudyCell>
			<StudyImage size={12} src='course-authoring/editing_course_navigation.gif' alt='Structure editor' maxWidth={1280} />

			<StudyCell size={12}>
				<StudyGrid spacing={2} columnSpacing={{ xs: 3, md: 5 }} sx={{ mb: 0 }}>
					<StudySection id='page-authoring' title='Page Authoring' size={{ xs: 12, md: 6 }}>
						<StudyBody size={12}>Pages contain the content students interact with.</StudyBody>
						<StudyBody size={12}>
							In many learning management systems, reading pages, assignments, quizzes, and discussions are separate entities with
							different creation tools and different navigation experiences.
						</StudyBody>
						<StudyBody size={12}>
							The MathTrack app replaces this model with configurable Items. Every page is assembled by dragging Item blocks into place,
							allowing instructional content, questions, discussions, file uploads, certificates, and other Item types to appear
							together on the same page.
						</StudyBody>
						<StudyBody size={12}>
							Because every Item shares the same editing workflow, authors never have to switch authoring tools when building a lesson.
						</StudyBody>
						<StudyBody size={12}>Page-level options include:</StudyBody>
						<StudyBulletList
							size={12}
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
					</StudySection>
					<StudySection id='item-types' title='Item Types' size={{ xs: 12, md: 6 }}>
						<StudyBody size={12}>Pages are built by dragging Item blocks into place.</StudyBody>
						<StudyDetailTitle title='View Only' first />
						<StudyBulletList size={12} items={['Display', 'Embed', 'Certificate']} />
						<StudyDetailTitle title='Automatic Grading' />
						<StudyBulletList size={12} items={['Multiple Choice', 'True / False', 'Fill in the Blank']} />
						<StudyDetailTitle title='Manual Grading' />
						<StudyBulletList size={12} items={['Open Response', 'Date Input', 'File Upload', 'Discussion']} />
					</StudySection>
				</StudyGrid>
			</StudyCell>

			<StudySection id='item-configuration' title='Item Configuration' size={12}>
				<StudyCell size={{ xs: 12, md: 4 }}>
					<StudyGrid spacing={2} sx={{ mb: 0 }}>
						<StudyBody size={12}>Although every Item type behaves differently, configuration happens in the same editor.</StudyBody>
						<StudyBody size={12}>Depending on Item type, authors can configure options such as:</StudyBody>
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
						<StudySubsection id='ai-assisted-grading' title='AI-Assisted Grading' size={12} />
						<StudyBody size={12}>Open Response Items support AI-assisted grading.</StudyBody>
						<StudyBody size={12}>
							The Item question is used as the default grading prompt, but authors can override it with a custom prompt from the Item
							configuration panel.
						</StudyBody>
						<StudyBody size={12}>The prompt is stored with the Item and supplied to the grading platform during grading.</StudyBody>
					</StudyGrid>
				</StudyCell>
				<StudyCell size={{ xs: 12, md: 8 }}>
					<StudyGrid spacing={2} sx={{ mb: 0 }}>
						<StudyImage size={12} src='course-authoring/item_example.png' alt='Item editor' />
						<StudyImage size={12} src='course-authoring/item_example2.png' alt='Item editor' />
						<StudyImage size={12} src='course-authoring/item_example.png' alt='AI prompt configuration' />
					</StudyGrid>
				</StudyCell>
			</StudySection>

			<StudySection id='item-bank' title='Item Bank' size={12}>
				<StudyCell size={{ xs: 12, md: 5 }}>
					<StudyGrid spacing={2} sx={{ mb: 0 }}>
						<StudyBody size={12}>Items can be reused by inserting them from the Item Bank.</StudyBody>
						<StudyBody size={12}>
							Authors can search by title, description, or unique ID. Matching text is highlighted in search results, and hovering over
							an Item displays a preview. Search results also display how many pages currently use an Item, and those pages can be
							viewed directly from the search results.
						</StudyBody>
						<StudyBody size={12}>Items inserted from the Item Bank are always inserted as Linked Items.</StudyBody>
						<StudySubsection id='linked-items' title='Linked Items' size={12} />
						<StudyBody size={12}>
							Linked Items reference the same database record, so updating a Linked Item will affect the item in all locations.
						</StudyBody>
						<StudyBody size={12}>Items can be disconnected at any time to create an independent copy with a new ID.</StudyBody>
						<StudyBody size={12}>
							Because grades are stored using both the Page ID and Item ID, Linked Items can be reused throughout the platform without
							sharing student grades. This is especially useful for Items such as course feedback questions that appear in many courses
							but should record separate responses for each page.
						</StudyBody>
					</StudyGrid>
				</StudyCell>
				<StudyCell size={{ xs: 12, md: 7 }}>
					<StudyGrid spacing={2} sx={{ mb: 0 }}>
						<StudyImage size={12} src='course-authoring/linked_drawer.gif' alt='Usage drawer showing all locations for a linked item' />
						<StudyImage size={12} src='course-authoring/linked_item.gif' alt='Usage drawer showing all locations for a linked item' />
					</StudyGrid>
				</StudyCell>
			</StudySection>

			<StudyCell size={12}>
				<StudyGrid spacing={2} columnSpacing={{ xs: 3, md: 5 }} sx={{ mb: 0 }}>
					<StudySection id='item-versioning' title='Item Versioning' size={{ xs: 12, md: 6 }}>
						<StudyBody size={12}>Every Item carries major and minor version numbers.</StudyBody>
						<StudyBody size={12}>
							The current version number is always visible on the Item card, and editing an Item previews the next version before
							saving.
						</StudyBody>
						<StudyBody size={12}>Minor revisions propagate to every instance of the Item sharing the same major version.</StudyBody>
						<StudyBody size={12}>
							Major revisions create a new database entry for the Item, allowing historical page submissions to continue displaying the
							original version while future submissions use the updated version.
						</StudyBody>
						<StudyBody size={12}>
							The platform automatically classifies edits as major or minor, although authors can override the suggested version type
							before saving.
						</StudyBody>
					</StudySection>
					<StudySection id='locking' title='Locking' size={{ xs: 12, md: 6 }}>
						<StudyBody size={12}>Courses, Sections, Lessons, and Pages can all be locked.</StudyBody>
						<StudyBody size={12}>
							Locks allow authors to select any combination of Courses, Sections, Lessons, or Pages as prerequisites before content
							becomes available.
						</StudyBody>
						<StudyBody size={12}>Locked content displays the remaining requirements needed for access.</StudyBody>
						<StudyBody size={12}>
							Slack notifications warn instructors when a lock may be broken, such as a student surpassing a lock requirement because
							they no longer have access to the required content.
						</StudyBody>
					</StudySection>
				</StudyGrid>
			</StudyCell>
		</StudyPage>
	);
}
