---
title: Evolving a Production Platform
subtitle: Six years of adapting software to an evolving business.
summary: The platform changed because the business changed. Building one production application through three major shifts in direction taught me as much about product design and software engineering as building the original application itself.
years: 2020–Present
hero: /images/platform-evolution.svg
theme: project
order: 1
---

# Designing for a Moving Target

## Overview

When I started building MathTrack's platform, I had just completed a six-month coding bootcamp. I knew the basics of React and REST APIs, and that was about it. Nearly every feature I've built over the last six years required learning something entirely new. I didn't have the traditional computer science background that most software engineers start with, but I was confident I could figure things out, and I genuinely enjoyed doing it.

Before learning to build software, I spent years working as a UX designer. One of the most valuable lessons I carried into engineering is that people often propose solutions without fully understanding the problem they're trying to solve. More commonly, they underestimate what's actually possible.

I don't build anything without understanding the underlying pain point first, and I never dismiss an idea without seriously considering it. Sometimes the proposed solution is exactly the right one. Often there's a simpler approach that achieves the same outcome with far less development effort. Other times, I'll recommend something that's significantly more complex because it solves the underlying problem better or creates a stronger foundation for future changes.

My general work philosophy is simple: make the right thing, even if it's hard.

---

## The Problem

The first version of the platform reflected what I knew at the time.

My focus was getting features built. I wasn't thinking very much about how those features would evolve over the next several years because, honestly, I didn't know enough yet to think that way.

As the business changed, I started running into the consequences of those early decisions.

Some features were difficult to extend. Some parts of the architecture had become tightly coupled. There were places where I had introduced technical debt without even realizing I was doing it.

Completely rewriting the platform was never an option.

People were using it every day, and the business still needed new features. Every improvement had to happen while the application continued moving forward.

---

## What Changed

The biggest change wasn't the technology.

It was the way I approached building software.

Early on, success meant getting the next feature working.

Over time, I found myself thinking much more about what would happen after the feature shipped. If I was already working in part of the application, I'd look for opportunities to simplify it, separate responsibilities, or make the next feature a little easier to build.

I rarely had the opportunity to redesign entire systems.

Instead, the platform improved one small piece at a time.

Reusable patterns slowly replaced one-off implementations. Components became easier to extend. Workflows became more consistent. Some of those improvements were intentional. Others happened simply because I had solved enough similar problems to recognize a better approach.

> **Screenshot:** Example showing how part of the platform evolved over time.

---

The business also forced me to think differently.

Every major shift meant revisiting assumptions I had made months or even years earlier. Features that once fit the product no longer fit the company. New requirements often exposed weaknesses in the existing architecture that I hadn't anticipated.

Those weren't failures.

They were reminders that the software existed to support the business, not the other way around.

Each time the business changed, the platform had to change with it.

> **Screenshot:** Example of a feature that evolved as the business changed.

---

## Outcome

By the end of the project, I wasn't just maintaining the application I had originally built.

I was maintaining a platform that had grown alongside the company through years of changing requirements, new products, and new ways of working.

More importantly, the way I approached software had changed.

I became much more comfortable designing systems instead of individual features, recognizing technical debt before it became a problem, and thinking about how today's decisions would affect tomorrow's work.

Those lessons weren't learned from books or tutorials.

They came from shipping software, maintaining it, and living with the consequences of my own decisions.

---

## Reflection

When I look back at the first version of the platform, there are plenty of things I would do differently.

That's probably the biggest thing this project taught me.

The goal isn't to get everything right the first time.

It's to keep learning, keep improving, and leave the product a little better than it was before.

Over six years, the platform evolved because the business evolved.

I evolved for the same reason.
