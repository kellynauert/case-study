---
title: Assessment & Grading Platform
subtitle: Queue, gradebooks, scoring options, and AI-assisted review.
summary: Grading is where instructors spend most of their time. I designed assessment and grading workflows that surface what needs review, reduce repetitive work through automatic grading, and use AI as a starting point without taking judgment away from instructors.
years: 2020–Present
hero: /images/grading-queue.jpg
order: 4
---

## Grading Queue

Grading is the most time-consuming part of teaching. At MathTrack, instructors and staff grade multiple courses while balancing other responsibilities, and every extra click compounds over hundreds or thousands of submissions.

Different grading tasks require different entry points. Sometimes the priority is working through everything that needs attention, sometimes it is reviewing one course, and sometimes it is following one student across courses. No single view handled all of those on its own.

I built grading workflows that support these modes, including automated paths for objective question types and an AI-assisted flow that provides suggestions instructors review before anything is final.

The grading queue is for working through all pending submissions without deciding what to open first. Submissions are grouped by assignment rather than by student, so graders can stay in one evaluation mode and build momentum across similar work.

:::image
file: grading-queue.jpg
:::

The default ordering is chronological (oldest submissions first). Starred assignments are always placed at the top of the queue so graders can unblock critical work quickly.

To reduce overwrite risk, the UI shows when another grader is already working. If someone else is grading an assignment, graders see an icon next to the assignment name, and when that grader is idling the entry is grayed out. When a second grader opens the page while another grader is active, a warning banner is displayed to prevent accidental overwrites of unsaved grade data.

The queue can be filtered. A main toggle switches between viewing all courses and viewing only courses assigned to the current grader. A program selector chip lets graders focus on the specific programs they need to grade right now.

## Course and Student Gradebooks

The course gradebook shows all students in a single course with grades and submission status. It is especially helpful for guest instructors who have only one or two classes and want to grade everything in one place.

The student gradebook shows one student's grades and submissions across every enrolled course. It is used when graders need to focus on an individual student across multiple courses, including situations where a student completes a large amount of work at once and requests follow-up before the next deadline.

:::image-row
course_gradebook.gif
student_gradebook.gif
:::

Both gradebooks restrict visibility to courses and students that are relevant to the current staff member, typically limited to assigned access.

## Scoring and Automatic Grading

Authors set how many points each item is worth, supporting weighted grading. Items can also be set to zero points for completion-only behavior. Page-level grading assigns one grade for every question on a page instead of grading each item individually.

Automatically graded question types handle work with clear right and wrong answers. Manual grading remains for responses that benefit from instructor feedback.

:::image
file: test-creation.jpg
:::

## AI-Assisted Grading

For assignments that need manual evaluation, authors configure how the AI should grade at item creation time. When grading, the UI provides a way to generate AI suggestions in bulk and review them alongside the original content.

:::image
file: ai_grading.gif
:::

A Generate All action sends AI-gradable item types to the GPT API along with the AI grading prompt and returns all suggestions in one pass. Graders can also toggle a single item type when they only need to review one part.

AI suggestions include color-coded highlights that show what parts of the original text the AI used and where it responds. This grounding is intentionally included to reduce hallucinations. If you see extra colors or missing colors, it indicates the AI missed something or is adding something that is not supported by the source text.

## Grader Notes

Authors can attach grader notes during authoring. Notes are visible to graders during review but never shown to students, which helps preserve rubric context, edge cases, and information that should not appear to learners.
