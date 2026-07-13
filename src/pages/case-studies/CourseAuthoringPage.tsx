import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
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
import { tokens } from '../../theme/theme';

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

function SectionLink({ to, children }: { to: string; children: ReactNode }) {
	return (
		<Link href={`#${to}`} underline='hover' sx={{ color: tokens.accent, fontWeight: 500 }}>
			{children}
		</Link>
	);
}

function PageLink({ to, children }: { to: string; children: ReactNode }) {
	return (
		<Link component={RouterLink} to={to} underline='hover' sx={{ color: tokens.accent, fontWeight: 500 }}>
			{children}
		</Link>
	);
}

export function CourseAuthoringPage() {
	return (
		<StudyPage
			slug='course-authoring'
			title='Course Authoring'
			subtitle='The app contains an integrated curriculum authoring system for creating, organizing, and maintaining college-credit courses.'
			intro={
				<Split
					left={
						<Typography variant='body1'>
							MathTrack Institute prepares aspiring teachers to earn their teaching license and bachelor's degree through a series of
							online, college-credit courses delivered within the MathTrack platform. Rather than relying on a separate curriculum
							authoring application, every course is created and maintained directly within the platform through an integrated
							curriculum authoring system.
						</Typography>
					}
					right={
						<>
							<Typography variant='body1' sx={{ mb: 2 }}>
								Authors organize course structure, build lessons, configure assessments, publish curriculum, and maintain reusable
								content from a single workflow. The same course hierarchy powers student navigation, progress tracking, and grading,
								allowing curriculum to evolve without duplicating content or rebuilding course layouts.
							</Typography>
							<Typography variant='body1'>
								Unlike traditional LMS platforms that rely on external authoring tools, curriculum creation is built directly into the
								platform, allowing authoring, delivery, grading, and administration to share the same data model and workflows.
							</Typography>
						</>
					}
				/>
			}>
			<StudySection id='course-configuration' title='Course Configuration'>
				<Col cols={6}>
					<StudyBody>
						Courses are the top-level of the content hierarchy and can be created and configured by MathTrack Institute curriculum staff
						or guest instructors.
					</StudyBody>
				</Col>

				<StudySubsection id='course-creation' title='Course Creation' first />
				<Col cols={6}>
					<StudyBody>
						New courses are created from the catalog and can be drag-and-dropped to reorder how they appear in the catalog for students.
					</StudyBody>
				</Col>
				<StudyImage src='course-authoring/courses-editor.jpg' alt='Course catalog with creation and drag-and-drop reordering' />
				<Split
					left={
						<>
							<StudyBody>Each course carries the descriptive fields used for publishing and program administration.</StudyBody>
							<StudyBulletList
								items={[
									'Title, course number, overview description, and header image',
									<>
										<SectionLink to='departments'>Department</SectionLink>
									</>,
									'Assigned professor',
									<>
										Credit hours and professional development hours (affects the{' '}
										<SectionLink to='item-types'>Certificate Item</SectionLink> and Transcripts)
									</>,
									<>
										<SectionLink to='companion-guide'>Companion guide</SectionLink>
									</>,
									<>
										<SectionLink to='syllabus'>Syllabus</SectionLink>
									</>,
									'Search tags',
									<>
										<SectionLink to='locking'>Locks</SectionLink>
									</>,
									'Publication status',
								]}
							/>
						</>
					}
					right={
						<StudyImage src='course-authoring/course_overview_editing.png' alt='Course metadata and overview editing' maxWidth={633} />
					}
				/>

				<StudySubsection id='departments' title='Departments' />
				<Split
					left={
						<>
							<StudyBody>
								Departments control which programs have enrollment access to a course, and can be configured for course
								auto-enrollment.
							</StudyBody>
							<StudyBulletList
								items={[
									'Example 1: Students in the T2T program will only have courses from the T2T department available in their enrollment screen.',
									'Example 2: Bachelors program students are auto-enrolled in every course assigned to the Bachelors department.',
								]}
							/>
							<StudyBody>
								Base department color is customizable, and secondary colors and contrast text are automatically generated using
								APCA-w3.
							</StudyBody>
							<StudyBody>
								WCAG 2 is the current ADA recommended color contrast algorithm and it is extremely flawed. APCA-W3 is a candidate
								replacement for WCAG 3. If you're interested in reading about its problems and how APCA solves them, check out{' '}
								<Link
									href='https://git.apcacontrast.com/documentation/WhyAPCA.html'
									target='_blank'
									rel='noopener noreferrer'
									underline='hover'
									sx={{ color: tokens.accent, fontWeight: 500 }}>
									this webpage
								</Link>
								.
							</StudyBody>
						</>
					}
					right={<StudyImage src='course-authoring/departments.jpg' alt='Department configuration' />}
				/>

				<StudySubsection id='course-cloning' title='Course Cloning' />
				<Col cols={6}>
					<StudyBody>
						Courses can be cloned for variants across states and programs. When cloning a course you have the option of keeping original
						item IDs or creating new item IDs. Cloned IDs are discussed more in the{' '}
						<SectionLink to='linked-items'>Linked Items</SectionLink> section.
					</StudyBody>
				</Col>
			</StudySection>

			<StudySection id='course-structure' title='Course Structure'>
				<Split
					left={
						<StudyBody>
							Every course uses the same structure of sections, lessons, and pages. Authors create and arrange these using containers in
							the structure editor. The navigation preview allows authors to see exactly what students will see, and page editing is
							done by selecting the page from this preview.
						</StudyBody>
					}
					right={
						<StudyBody>
							Sections and lessons are numbered automatically. Name and numbering can be hidden from the navigation to allow pages and
							lessons outside of the normal navigation structure. Numbering is adjusted automatically to account for this.
						</StudyBody>
					}
				/>
				<StudyImage src='course-authoring/editing_course_navigation.gif' alt='Drag-and-drop editor for sections, lessons, and pages' />

				<StudySubsection id='syllabus' title='Syllabus' first />
				<Split
					left={
						<StudyBody>
							The course syllabus is displayed at the bottom of the course overview screen, and is also downloadable from the course
							header.
						</StudyBody>
					}
					right={
						<StudyBody>
							Syllabi can be created directly in the app with the same rich text editor used for Companion Guide creation and Display
							Item creation.
						</StudyBody>
					}
				/>

				<StudySubsection id='companion-guide' title='Companion Guide' />
				<Col cols={6}>
					<StudyBody>
						Companion guides allow instructors to view instructional content next to course content, but outside of course navigation.
						Companion guides can be created directly in the app with the same rich text editor used for Syllabus creation and Display Item
						creation.
					</StudyBody>
				</Col>
			</StudySection>

			<StudySection id='page-authoring' title='Page Authoring'>
				<Col cols={6}>
					<StudyBody>
						Pages contain the actual content that students interact with. In other LMSs, it is common to have reading pages, assignments,
						and quizzes as completely separate entities with different creation tools and different access locations for users. This
						separation has been removed in the MathTrack app, and replaced with a building block system where pages are made up of items
						and can represent any type of traditional learning content.
					</StudyBody>
				</Col>

				<StudySubsection id='page-options' title='Page Options' first />
				<Split
					left={
						<>
							<StudyBody>
								Page options control how a page behaves for students and graders. They can be edited from the page itself or from the
								structure editor.
							</StudyBody>
							<StudyBulletList
								items={[
									'Page narration upload',
									'Anonymous grading toggle',
									'Page-level grading toggle',
									'Rubric (created with the integrated rich text editor)',
									"'Important' toggle, to put the page at the top of the grading queue",
								]}
							/>
						</>
					}
					right={
						<StudyBulletList
							items={[
								'Page icon selection',
								<>
									<SectionLink to='locking'>Locking</SectionLink>
								</>,
								'Due date, based on an input number of weeks and individualized per student based on their program start date.',
								'Resubmission type (disabled, keep newest, keep highest)',
								'Time estimate',
							]}
						/>
					}
				/>
			</StudySection>

			<StudySection id='items' title='Items'>
				<Col cols={6}>
					<StudyBody>
						Pages are built by dragging and dropping Item blocks of different types. Every Item type has a dedicated configuration editor
						with both item specific inputs and general inputs.
					</StudyBody>
				</Col>
				<StudySubsection id='item-types' title='Item Types' first />
				<DetailTitle title='View Only' first />
				<Col cols={6}>
					<StudyBulletList
						items={[
							'Display — an integrated rich text editor',
							'Embed - allows pasting an embed link to display content from external websites',
							<>
								Certificate — relies on <SectionLink to='locking'>locks</SectionLink>. Automatically issues a downloadable certificate
								with course information and program name. Also shows up on the Documents page, which is a top-level app page that
								houses all documents in one place.
							</>,
						]}
					/>
				</Col>
				<DetailTitle title='Automatic Grading' first />
				<Split
					left={
						<>
							<StudyBulletList
								items={[
									'Multiple choice — radio or checkbox selections with answer scrambling',
									'True / false',
									'Fill in the blank — text selected from a list matched to author-configured answer keys',
								]}
							/>
						</>
					}
					right={
						<>
							<DetailTitle title='Manual Grading' first />
							<StudyBulletList
								items={[
									'Open response',
									'Date Input',
									'File upload — Type restrictions, size limits, and optional multiple uploads',
									'Discussion — a forum that allows students to post and respond to cohort peers. A number of interactions can be specified to lock students out of seeing peer responses until they have submitted their own response.',
								]}
							/>
						</>
					}
				/>
				<Split
					left={<StudyImage src='course-authoring/fill-in-the-blank.png' alt='Fill-in-the-blank assessment configuration' maxWidth={544} />}
					right={<StudyImage src='course-authoring/item-creation.jpg' alt='Adding and configuring content items on a page' />}
				/>
				<StudySubsection id='points' title='Points' />
				<Split
					left={
						<>
							<StudyBody>
								Items are graded individually and overall page grades are calculated by comparing the total points earned against the
								total points available on the page through all the items on that page. If Page Grading is turned on at the page level,
								points are disabled for all items on the page and an overall page grade must be manually entered during grading
								instead.
							</StudyBody>
							<StudyBody>
								The <PageLink to='/case-studies/grading'>Grading</PageLink> page goes into more detail about page grades.
							</StudyBody>
							<StudyBody>
								All interactive item types start with a value of 1 point contributing to the overall page grade. Point values can be
								adjusted, allowing different overall page values and weighted grading between items.
							</StudyBody>
						</>
					}
					right={
						<>
							<StudyBody>
								If points are set to 0, the item is scored as a 100% 0/0 upon completion. Manually graded item types will be treated
								as automatic grading types when point value is set to 0.
							</StudyBody>
							<StudyBody>
								Multiple-choice items with several correct answers have an additional point configuration option, where the point
								value can be divided among all options and partial points are awarded per correct option, or an overall point value
								that is only awarded when the entire question is correctly answered.
							</StudyBody>
						</>
					}
				/>
				<StudySubsection id='grader-notes' title='Grader Notes' />
				<Col cols={6}>
					<StudyBody>
						Manually graded items can have Grader's Notes, which are special messages displayed next to the item that only graders can
						see. These function as a hint or reminder system for graders on how an individual item should be graded.
					</StudyBody>
				</Col>
				<StudySubsection id='feedback' title='Feedback' />
				<Col cols={6}>
					<StudyBody>
						Automatic Grading items have the option to provide feedback to students for both incorrect and correct answers. These special
						messages display next to the item after the page has been graded and can be seen by the student.
					</StudyBody>
				</Col>
				<StudySubsection id='ai-assisted-grading' title='AI-Assisted Grading' />
				<Split
					left={
						<StudyBody>
							Manually graded items have an AI grading option built into them to increase grading speed. The AI grader can be triggered
							per item or for the entire page during grading. The prompt used for the AI is the item question by default, but it can be
							overridden with a custom prompt from the item configuration box.
						</StudyBody>
					}
					right={
						<StudyBody>
							The <PageLink to='/case-studies/grading'>Grading</PageLink> section goes into more detail about the AI Grader.
						</StudyBody>
					}
				/>
				<StudySubsection id='item-bank' title='Item Bank' />
				<Col cols={6}>
					<StudyBody>
						Items can be reused by inserting them from the Item Bank. Items can be found in the Item Bank by searching for title and
						description keywords, or by pasting in the unique ID. Matching text is highlighted in the search results, and hovering over an
						item will pull up a preview of the item. The search result also displays the number of pages an item is used in, and those
						pages can be seen by hovering over the link icon. Items are always inserted from the Item Bank onto the current page as Linked
						Items.
					</StudyBody>
				</Col>
				<StudySubsection id='linked-items' title='Linked Items' />
				<Split
					left={
						<>
							<StudyBody>
								Items that are reused on multiple pages will have a link icon that displays the number of copies there are, and a list
								of those pages on hover. All Linked Items point to the same database entry, so updating a Linked Item will update it
								everywhere.
							</StudyBody>
							<StudyBody>
								Items can be disconnected from their link from the link menu. This clones the item and gives it a unique ID so that it
								can be changed without affecting all copies.
							</StudyBody>
						</>
					}
					right={
						<>
							<StudyBody>
								Items are graded by both page ID and item ID, so linked items do not share grades across pages. This is especially
								useful for things like feedback questions, where an open response that asks “What did you think of this course?” can
								be used on every course.
							</StudyBody>
							<StudyBody>
								The <PageLink to='/case-studies/grading'>Grading</PageLink> page goes into more detail about how grades are saved in
								the database.
							</StudyBody>
						</>
					}
				/>
				<Split
					left={<StudyImage src='course-authoring/linked_item.gif' alt='Linked item indicator in the lesson editor' />}
					right={<StudyImage src='course-authoring/linked_drawer.gif' alt='Usage drawer showing all locations for a linked item' />}
				/>
				<StudySubsection id='item-versioning' title='Item Versioning' />
				<Split
					left={
						<>
							<StudyBody>
								Every item carries major and minor version numbers. The current version number is always visible in the bottom right
								of an item card. When an item is edited, a preview of the new version number will be displayed.
							</StudyBody>
							<StudyBody>
								Minor changes propagate to every instance of that item with a matching major version number. This means the changes
								will appear even on pages that have already been graded.
							</StudyBody>
							<StudyBody>
								Major changes create a new database entry for that item and will be used on new page submissions going forward. This
								means that viewing a previous submission of a page will show the item as it was when submitted, but all new
								submissions will show the updated version of the item.
							</StudyBody>
						</>
					}
					right={
						<>
							<StudyBody>
								The platform automatically classifies edits as major or minor depending on what has been edited, but this can be
								overridden by selecting a specific version type in the version preview.
							</StudyBody>
							<StudyBody>
								The <PageLink to='/case-studies/grading'>Grading</PageLink> page goes into more detail about how item versions and
								responses are related and implemented in the database.
							</StudyBody>
							<StudyImage src='course-authoring/versioning.png' alt='Major and minor version classification on save' maxWidth={317} />
						</>
					}
				/>
			</StudySection>

			<StudySection id='locking' title='Locking'>
				<Split
					left={
						<StudyBody>
							Courses, sections, lessons, and pages can all be locked. Locks allow you to select any number of other courses, sections,
							lessons, and pages as a pre-requisite for access. Locked content provides a list of the content locks required for access.
						</StudyBody>
					}
					right={
						<StudyBody>
							Slack notifications have been set up to warn instructors when a lock may be broken, such as a student surpassing a lock
							requirement due to not having access to the content.
						</StudyBody>
					}
				/>
			</StudySection>
		</StudyPage>
	);
}
