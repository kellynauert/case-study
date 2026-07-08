---
title: Student Learning Experience
subtitle: One student interface for course navigation, progress, and grades.
summary: Traditional learning management systems organize around courses with inconsistent structure. I designed a consistent student experience where progress, grades, and course content are visible at a glance without relearning the interface for every class.
years: 2020–Present
hero: /images/section-overviews.jpg
order: 3
---

## Context

Most learning management systems treat each course as its own destination with separate navigation, organization, and terminology. Students move between isolated course sites, and even small differences compound into repeated questions about where homework, grades, submissions, and the next action live.

In systems like Canvas, reading pages, assignments, and downloadable resources often sit in different areas. That separation makes it harder to answer the most common workflow questions: what to do next, and where to find it.

I designed MathTrack so every course uses one consistent structure, typography, and layout. Progress and status are visible from the courses page, and in-course navigation reflects the full structure without changing between courses.

## Courses Page and Navigation

The courses page surfaces progress and grades for each enrollment. A Continue card returns students to their learning path without requiring them to remember which course or lesson they left off.

Reading pages are tracked without grading them. If a student stays on a reading page for at least three seconds, the page is marked as read so progress can still reflect what they reviewed. This also makes it easy to spot suspicious patterns where learners skip reading and move straight to quizzes.

Progress is also communicated through milestones. Milestones are keystone assignments that gate what a student can do next. Assignments can be locked behind other courses or behind specific completion requirements, and managers can configure milestone triggers based on page completion, item completion, or other completion signals using trigger IDs.

Because students do not start on the exact same date, due dates are calculated relative to each student's program start date. This produces personalized timelines even when the overall program schedule stays consistent.

Inside a course, the navigation bar shows the full structure at once: pending assignments, locked items, failed work, and where the student left off.

## Presentation and Course Structure

Typography and layout are consistent across courses because the authoring platform controls presentation. Course content is organized in the order students work through it, not split across separate areas for pages, assignments, and downloads. An assignment appears in context with the lesson it belongs to.

The student navigation follows the same section/lesson/page model. When lessons or sections are hidden from navigation by the author, numbering skips in a predictable way so introductions and feedback pages do not disrupt the course flow.

## Gallery

:::gallery
section-overviews.jpg
quiz-submission.jpg
studentgradebook.jpg
announcement.jpg
passed-quiz.jpg
:::
