---
title: Apprentice Evaluation & Reflection System
subtitle: Configurable evaluations, reflections, and mentor progress tracking.
summary: As the organization expanded into teacher apprenticeship programs, mentors needed a structured way to observe apprentices, document progress, and verify state-required competencies. I designed evaluations, reflections, and progress tracking as one connected workflow.
years: 2022–Present
hero: /images/evaluation.jpg
order: 6
---

## Context

As MathTrack expanded into teacher apprenticeship programs, mentors needed a structured way to observe apprentices, document progress, provide feedback, and verify state-required competencies. Programs differed in competencies, evaluation schedules, scoring methods, and documentation, and the platform had to support those variations without custom builds per program.

Mentors also needed an experience with minimal friction. The evaluation page was designed mobile-first so mentors can complete observations and scoring easily from phones or iPads. Where login is not convenient, mentors can access evaluation pages via unique links with an optional-auth flow that includes clear warnings and an audit trail.

## Configurable Evaluation Forms

Competencies are configured in a competency table that administrators maintain. Each competency can include codes (when relevant to standardized lists) and is organized through groups that control what mentors see on the evaluation page.

Groups also customize language so the experience matches each organization. If a program uses different terminology (for example, calling mentors something other than "mentor"), the UI adapts to keep the workflow consistent.

Evaluation scales support multiple rating levels and can be enabled or disabled per competency so programs only show what they need.

## Reflection Journals

Reflections are scheduled across the program. Prompts and instructions can be configured by administrators, and responses are attached to each apprentice's record for mentor review.

The system supports both daily and weekly reflections. Weekly reflections can use micro-narratives: short entries made a few times per week that are then included in the weekly comment flow. To keep the daily reflection simple without complex automatic detection, mentors see an unlock button reminding them to complete micro-narratives.

To handle holidays and scheduling realities, "weeks to run" limits how many reflections a learner can submit based on the number of reflection entries rather than exact calendar weeks.

## Progress Tracker

Each apprentice has a centralized progress dashboard that aggregates evaluations, reflections, required observations, coursework, and outstanding requirements. It also includes evaluation history so mentors and administrators can see who rated changes and when ratings moved from one level to another.

## Mentor Workflow

Mentors follow a guided workflow: select an apprentice, complete observation forms, leave written feedback, score competencies, save drafts, and submit finalized evaluations. Historical evaluations remain accessible for growth review.

For optional-auth access via unique links, the authorization flow can still run without login. When a mentor is not signed in, the front end shows a clear private-information warning and requires entering their name so rating history can be tied to the correct reviewer.

## Gallery

:::gallery
evaluation.jpg
section-overviews.jpg
courses-editor.jpg
grading.jpg
:::
