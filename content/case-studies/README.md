# MathTrack case studies

Each file in this folder is a **problem/solution deep dive** into the MathTrack learning platform. All studies share the same platform — each one focuses on a different challenge and how it was solved.

## Adding a new study

Drop a markdown file in this folder:

```
content/case-studies/grading-workflow.md  →  /case-studies/grading-workflow
```

Use a slug that describes the problem area (e.g. `course-authoring`, `ai-grading`, `competency-evaluations`).

## Frontmatter

```yaml
---
title: Grading Workflow
subtitle: Grouping submissions by assignment instead of by student
summary: One or two sentences describing the problem and outcome — shown on the landing page card.
years: 2020–Present
hero: /images/grading-queue.svg
order: 2
---
```

| Field      | Required | Description                                          |
| ---------- | -------- | ---------------------------------------------------- |
| `title`    | Yes      | The problem/solution topic (e.g. "Course Authoring") |
| `subtitle` | Yes      | One-line framing shown in the hero and on the card   |
| `summary`  | No       | Card excerpt (falls back to `subtitle`)              |
| `years`    | No       | When this work happened (shown in the hero badge)    |
| `hero`     | No       | Image for the card and study hero (`public/images/`) |
| `order`    | No       | Sort order on the landing page (lower = first)       |

Platform name, role, and site-wide copy live in `src/lib/site.ts` — you don't repeat those in every file.

## Content structure

```markdown
# Grading Workflow

## Grouping submissions by assignment instead of by student

### Overview

Context for this specific problem and solution.

---

## The Problem

What was broken or frustrating?

---

## The Solution

What we built and why.

---

## Outcome

What changed?

---

## Reflection

What I learned.
```

- `#` — matches `title` in frontmatter
- First `##` — matches `subtitle`; overview follows as `### Overview`
- Subsequent `##` blocks — main sections (Problem, Solution, Outcome, etc.)
- `###` — subsections within a section
- `---` — optional dividers between sections

Place images in `public/images/`. Inline screenshots use a block with an optional caption and column span:

```markdown
:::image
file: grading-queue.jpg
columns: 2
:::

:::image-row
columns: 2
course_gradebook.gif
student_gradebook.gif
:::
```

`columns` controls how many chapter grid columns the media spans on desktop (`1` = half width, `2` = full width). Defaults to `1`. On mobile, all media is full width. When `columns: 1`, an image placed after a paragraph renders beside that text.

Screenshot placeholders: `> **Screenshot:** Description` or `<!-- Screenshot: Description -->`
