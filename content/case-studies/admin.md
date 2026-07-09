---
title: Administrative Platform
subtitle: Admin tools for admissions, enrollment, transcripts, and reporting.
summary: As the platform grew, more operational work landed on me. I built admin interfaces alongside new features so staff could manage admissions, enrollment, transcripts, reporting, and student records without spreadsheets or hard-coded fixes.
years: 2020–Present
hero: /images/departments.jpg
order: 5
---

## Admin With Each Feature

As MathTrack grew, operational work scaled faster than tooling. Admissions, enrollment, transcript requests, and reporting obligations introduced repeated manual processes. Without an interface for staff, the work either stayed in spreadsheets or required engineering changes.

Administrative staff handle applications, enrollment, cohort moves, transcripts, and state reporting. Information flows through multiple systems, but the key constraint was always the same: staff needed a way to manage operational tasks without waiting for code changes.

The pattern was consistent: when a student feature created operational work that had to be handled repeatedly, the admin interface shipped alongside it.

User management started with a practical request: managers needed different table layouts for different programs. The solution was a set of program-specific tables with default columns tailored to each use case, plus local column presets saved per user so managers could adjust views without affecting everyone else.

:::image
file: studentgradebook.jpg
:::

Documents were another recurring need. The documents flow lets staff upload required files, name them, and organize them into groups that can be created on the fly. Students can then view or download documents directly from their documents page, reducing the number of one-off file requests sent to teachers.

Support and debugging also drove tooling. The workflow area includes an activity report that shows each user's path through the app. This makes it possible to validate whether a student interacted with the system as reported and to reconstruct routing steps when a bug report is filed.

For organization, the departments page groups roles and programs into department-level units. Departments can automatically enroll relevant roles or programs into standard courses, which reduces manual updates when programs change. Departments also support accessible color grouping so staff can quickly visually identify related program variants.

:::image
file: ada_colors.gif
:::

Enrollment tools let staff manage cohort moves and course assignments without engineering changes.

:::image
file: course-enrollment-manual.jpg
:::

Operational data ingestion became part of the admin toolset as well. Import tooling creates and updates schools and districts from source spreadsheets, syncs with HubSpot, and provides district/school grouping that can be used as cohorts for analytics.

Finally, announcements centralize time-sensitive messaging. Staff can create banner-style notifications or longer dashboard messages, target specific roles or cohorts, and (for banners) optionally replace the close button with a link to ensure users take the requested action.

:::image
file: notifications.gif
:::

Course and program editing tools grew alongside student-facing features as operational needs appeared.

:::image
file: courses-editor.jpg
:::

## What Accumulated Over Time

The result is a collection of admin tools shaped by the features they support rather than a single unified suite designed upfront. Related interfaces share patterns where it made sense, but the collection was built incrementally based on operational problems as they appeared.

:::image
file: grading-queue.jpg
:::
