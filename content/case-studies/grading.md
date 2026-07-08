---
title: Assessment & Grading Platform
subtitle: Queue, gradebooks, scoring options, and AI-assisted review.
summary: Grading is where instructors spend most of their time. I designed assessment and grading workflows that surface what needs review, reduce repetitive work through automatic grading, and use AI as a starting point without taking judgment away from instructors.
years: 2020–Present
hero: /images/grading-queue.jpg
order: 4
---

## Context

For many instructors, grading is the most time-consuming part of teaching. It is repetitive, mentally demanding, and often takes more time than course preparation or classroom instruction. At MathTrack, instructors teach multiple courses at once while balancing other responsibilities, and every extra click or page transition compounds over hundreds or thousands of submissions.

Different grading tasks call for different starting points. Sometimes the priority is working through everything that needs attention, sometimes it is reviewing one course, and sometimes it is following one student across several courses. No single view handled all of those well on its own.

I built three grading workflows graders can switch between depending on what they need that day, supported automatically graded question types where manual review is unnecessary, and integrated AI-assisted grading that suggests scores and feedback instructors can accept, change, or ignore before submitting a final grade.

Instructors now spend less time figuring out where to start and more time on evaluation and feedback. Automatic grading handles work that does not need manual review, and AI assistance speeds up written responses without removing instructor oversight.

## Grading Queue

The grading queue is for working through everything that needs attention without deciding what to open first. Submissions are organized by assignment rather than by student, so graders can stay in one mode of evaluation and build momentum on similar work. By default, the queue is chronological so older submissions are graded first, and assignments can be starred or prioritized when they block students from progressing through a course.

Graders can also filter the queue by program or by the courses assigned to them, and expand that view when covering for someone else. Live indicators show when another grader already has an assignment open, which helps prevent conflicting saves when multiple people are working through the same submission pool.

## Course and Student Gradebooks

The course gradebook shows all students in a single course with their grades and submission status. Graders use it when they want to focus on one class.

The student gradebook shows one student's grades and submissions across every course they are enrolled in. Graders use it when they need to review or grade multiple assignments for the same student at once.

Both views use the same underlying data and open into the same grading interface.

## Scoring and Automatic Grading

Authors set how many points each item is worth, which supports weighted grading across an assignment. Any item can be set to zero points so it counts as submission-only: the student passes as long as they complete it. Page-level grading can also be enabled when instructors want to assign a single grade for every question on a page instead of grading each item individually.

The assessment authoring tools also support automatically graded question types for work that has clear right and wrong answers, reserving manual grading for responses that benefit from instructor feedback.

## AI-Assisted Grading

For assignments that still need manual evaluation, AI-assisted grading is integrated into the same workflow. Authors configure a prompt when creating the item that defines how the AI should evaluate responses. The prompt can be rewritten entirely or extended with additional context specific to that assignment. During grading, the system generates suggested scores and feedback based on that prompt, and instructors can accept, modify, or discard those suggestions before assigning the final grade.

## Grader Notes

Authors can add grader notes to an item during authoring. Those notes are visible to graders while they review submissions but are never shown to students, which is useful for rubric reminders, edge cases, or context that should not appear in the assignment itself.

## Gallery

:::gallery
grading-queue.jpg
grading.jpg
studentgradebook.jpg
evaluation.jpg
test-creation.jpg
:::
