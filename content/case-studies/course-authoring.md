---
title: Course Authoring Platform
subtitle: Custom authoring tools built around our curriculum and content model.
summary: I designed and built the platform MathTrack uses to author every course, replacing Canvas with a structured workflow for content authors, instructors, and students.
years: 2020–Present
hero: /images/course-structure.jpg
order: 2
---

## Context

MathTrack originally authored curriculum in Canvas, a widely used learning management system built to support many kinds of institutions. That flexibility means course authors inherit decisions about page layout, typography, navigation, and third-party integrations alongside the work of writing instructional content. Our authors are subject matter experts, not designers or LMS administrators, and a noticeable share of their time went into configuring the tool rather than developing curriculum.

Students and instructors felt the same inconsistency on the other side. When each course could be organized differently, instructors regularly fielded questions about where to find homework, grades, submissions, and course materials.

I designed and built a custom authoring platform that separates content creation from presentation. Authors assemble lessons from predefined content items while the platform controls layout, typography, navigation, and the student-facing interaction patterns used across every course.

The platform has supported course authoring since 2020 and is used for more than 160 courses today. Authors spend less time on page layout and tool configuration than they did in Canvas, instructors report fewer repetitive navigation questions, and new content types continue to ship on the same underlying model without requiring authors to relearn the workflow.

## Content Model

Lessons are composed of discrete content items rather than a single rich text document. Each item corresponds to a specific learning activity and has its own editor, validation rules, and runtime behavior, but all items follow the same authoring workflow at the course and lesson level.

Item types include display content (text, equations, images, video, tables, code, and accordions), assessments (question types, rubrics, attempts, due dates, scoring, and AI-assisted grading), discussions (threading, participation tracking, and moderation), file uploads (submission requirements, accepted formats, and grading), reflections (long-form written responses with instructor feedback), and announcements (scheduled delivery to students). Each editor exposes only the settings relevant to that activity, which helped keep the interface approachable as we added more item types over time.

## Course Structure and Editing

Authors can edit course metadata (title, course number, image, description, availability, and related settings) and lesson content from the same environment. Sections, lessons, and items can be reordered with drag-and-drop when curriculum changes between terms or cohorts, and entire courses can be cloned to create variations without rebuilding structure from scratch.

## Linked Content

Items can be inserted into multiple lessons as linked references or as independent copies. A linked item points back to a single source, so an update to the original propagates to every lesson that references it. That pattern works well for shared explanations, assessments, or other content that should stay aligned across courses. When a lesson needs its own version, the author unlinks the item and the platform creates a standalone copy that can be edited without affecting other references.

## Item Versioning

Every content item carries major and minor version numbers. When an author saves changes, the platform infers whether the edit should be treated as minor or major, though that classification can be overridden on a per-item basis when the default does not match the author's intent. Minor changes, such as typo fixes, formatting adjustments, or corrections to an answer key, propagate everywhere and update what students see regardless of whether they have already viewed or submitted the item. Major changes, such as rewriting a prompt or restructuring an assessment, apply only on new submissions; students who already completed the item continue to see the version they originally worked with.

## Gallery

:::gallery
course-structure.jpg
item-creation-1.jpg
item-creation.jpg
test-creation.jpg
section-overviews.jpg
:::
