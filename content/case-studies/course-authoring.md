---
title: Course Authoring Platform
subtitle: Streamlining the course creation experience.
summary: Canvas gave educators almost unlimited flexibility, but that flexibility came at the cost of consistency. I designed a course authoring platform that standardized presentation, simplified course creation, and let instructors focus on teaching instead of formatting.
years: 2020–Present
hero: /images/section-overviews.jpg
order: 2
---

# Course Authoring

## Designing a platform educators actually enjoy using

### Overview

Over six years, I designed and built the course authoring platform that powers every course at MathTrack. Rather than extending an existing LMS, we developed a platform tailored to the way our instructors create and deliver content.

My responsibilities spanned product design, information architecture, interaction design, front-end development, back-end architecture, and long-term product evolution. As the sole design engineer, I worked directly with course authors, instructors, and students to continuously refine both the authoring experience and the learning platform itself.

The result is a system that educators consistently prefer over Canvas, while giving students a more predictable and intuitive learning experience.

## The Problem

When the project began, our curriculum was authored in Canvas.

Canvas is designed to support virtually any educational institution, which makes it extremely flexible. That same flexibility also creates inconsistency. Every course can have a different navigation structure, organization, and workflow depending on who built it.

For students, this meant every course required relearning the interface. Assignments, grades, and course resources were scattered across independently managed courses, making simple tasks harder than they needed to be.

For course authors, creating content often felt like configuring software rather than writing educational material. The platform imposed workflows that didn't match how our instructors thought about building courses.

Because every course at MathTrack was developed internally, we weren't constrained by the same requirements as a general-purpose LMS. Rather than optimizing for every possible teaching style, we could optimize for one consistent authoring workflow and one consistent student experience.

That became the foundation for every design decision that followed.

> **Screenshot:** Comparison of Canvas authoring vs. MathTrack authoring (optional)

---

## Design Principles

Instead of recreating Canvas with a different visual design, I established several principles that guided the product.

### Consistency over unlimited customization

Authors should be able to customize educational content without reinventing the interface.

Every course follows the same structural conventions, navigation patterns, and organizational hierarchy. Students learn the platform once instead of learning every individual course.

:::image
file: course-structure.jpg
caption: Navigation structure
alt: Course Structure
:::

### The platform should disappear

Creating educational content should feel like writing a lesson, not configuring software.

Administrative tasks, navigation, publishing, and organization should require as little cognitive effort as possible so authors can focus on teaching.

:::image
file: item-creation-1.jpg
caption: An example of different item types
alt: Item Creation Example
:::

### Build for subject matter experts

Our users were professors, K–12 educators, and curriculum specialists—not software experts.

Whenever possible, the interface should expose educational concepts rather than technical ones. Features were designed around how instructors naturally organize lessons instead of how data happens to be stored internally.

---

## Designing the Authoring Experience

One of the earliest decisions I made was to separate content from presentation.

Traditional rich text editors give authors complete control over typography. They can choose fonts, change font sizes, adjust spacing, and create whatever visual hierarchy they want. That flexibility sounds useful, but in practice it meant every course looked different depending on who created it.

Our instructors weren't designers—they were educators. There was no reason to expect every course author to make good typographic decisions, and there was even less reason for students to experience a different visual language in every course.

Instead, I removed most formatting controls. Authors write using semantic elements like headings, paragraphs, lists, and equations while the platform owns the presentation. When content is pasted from Word or Google Docs, the editor preserves the document's structure but rebuilds it using the platform's typography and spacing.

That decision traded flexibility for consistency, but it also made authoring faster. Instructors stopped thinking about formatting and focused on writing lessons instead.

---

I eventually realized that lessons weren't really documents—they were sequences of learning activities.

Sometimes an instructor wants to explain a concept. Sometimes they want students to answer a question, upload a file, participate in a discussion, or watch a video. Treating an entire lesson as one rich text document made those transitions awkward.

I redesigned the editor around modular content items instead. The most common is a **Display Item**, which handles instructional content like text, equations, images, tables, videos, accordions, and code snippets. Interactive elements such as multiple-choice questions, discussions, file uploads, and true/false questions exist alongside those Display Items rather than inside them.

This made lessons feel more like assembled learning experiences than formatted documents. It also had an unexpected benefit: because Display Items are independent pieces of content, they can be reused throughout the curriculum. A single explanation can appear in multiple lessons while remaining a single source of truth.

> **Screenshot:** Lesson editor showing Display Items mixed with assessments and interactive activities.

---

The modular approach extended beyond lesson content.

Rather than creating a different workflow for every activity type, authors build every lesson using the same editing experience. New content types become additional building blocks instead of entirely new authoring tools, allowing the platform to grow without increasing complexity for instructors.

> **Screenshot:** Item picker showing the available lesson components.
> :::image
> file: item-creation.jpg
> caption: Display item creation
> alt: Display Item Creation
> :::

---

Because Display Items are reusable, common instructional content can be maintained from a single location instead of being copied throughout the curriculum. This reduced duplication, simplified maintenance, and made large-scale curriculum updates significantly easier.

> **Screenshot:** Reusing an existing Display Item from the content library.

---

## Designing for Scale

One of the biggest architectural decisions was separating the educational content from the presentation of that content.

Instead of designing isolated pages, I designed reusable content components that could be combined into complete lessons. This allowed course authors to build rich instructional experiences while maintaining visual and behavioral consistency throughout the platform.

That consistency also made future improvements significantly easier. As new capabilities were introduced, they became available across the platform without requiring every course to be redesigned individually.

The product evolved as a coherent system instead of a collection of independent pages.

> **Screenshot:** Course hierarchy showing reusable content and lesson organization.

---

## Outcome

Today, every course at MathTrack is authored within this platform.

The most meaningful measure of success wasn't a quantitative metric—it was a change in the conversations instructors had with students.

Under Canvas, instructors regularly answered questions about navigation:

- Where is my homework?
- Where do I find my grades?
- Where is this assignment?

After moving to the new platform, those questions largely disappeared. Student questions shifted from navigating the software to engaging with the course material itself.

Course authors also consistently report preferring the authoring experience over Canvas, allowing them to spend more time developing curriculum instead of working around the limitations of the platform.

> **Screenshot:** Completed lesson as seen by a student.

---

## Reflection

Looking back, the most important design decision wasn't adding features. It was recognizing that we didn't need to build another general-purpose learning management system.

By designing around the specific workflows of our educators and enforcing a consistent interaction model across every course, we created a platform that is easier to author, easier to teach with, and easier to learn from.

That principle continued to influence every major feature added over the following six years.
