# Building MathTrack

> Six years of building, redesigning, breaking, fixing, and gradually growing a learning platform into something much bigger than I originally expected.

---

## It Started as an LMS. It Didn't Stay One.

When people ask what I built, I usually just say "an LMS."

That's technically true.

It's also kind of misleading.

When I first started working on MathTrack, the goal was pretty straightforward: build a system where students could complete online coursework.

Over the next six years it slowly absorbed everything around it.

Applications.

Course authoring.

Grading.

Evaluations.

Mentorship.

Reporting.

Document management.

Announcements.

Parts of our student information system.

Eventually it became the place where almost everyone at the company spent most of their day.

None of that was planned from the beginning.

The platform just kept growing one problem at a time.

Someone would run into something frustrating.

I'd ask why it worked that way.

Then I'd see if I could remove the problem instead of teaching everyone how to work around it.

Looking back, that's probably the theme of the entire project.

I wasn't trying to build the biggest application possible.

I was trying to remove one small frustration after another until people stopped thinking about the software.

---

## My Role

I was the sole engineer on the project.

That meant I wasn't just responsible for writing code.

I designed the user experience.

Built the React frontend.

Designed the database.

Wrote the backend.

Managed hosting and deployment.

Set up networking.

Maintained integrations.

Answered support questions.

Planned new features.

Fixed bugs.

And occasionally realized that something I'd built three years earlier wasn't actually the right solution anymore.

One of the things I enjoyed most was that there wasn't really a line between design and engineering.

A lot of UX improvements required backend work.

A lot of backend decisions existed because they made the interface easier to use.

After a while I stopped thinking about those as separate disciplines.

---

# I Design in React

People sometimes ask whether I design in Figma.

The honest answer is... not very much.

I've never really enjoyed spending days creating mockups only to discover they don't quite work once they're built.

For MathTrack I designed almost everything directly in React.

That isn't because I dislike design tools.

It's because so many important design decisions don't show up until you're actually interacting with something.

Spacing feels different after you've clicked the same button fifty times.

Animations that seemed clever become annoying.

Loading states suddenly matter.

Keyboard navigation matters.

The way focus moves through a page matters.

Those are all UX decisions.

They're just hard to evaluate in a static mockup.

Designing directly in code meant I could answer those questions immediately instead of trying to predict them ahead of time.

It also made iteration really fast.

If I thought something felt awkward while grading an assignment, I could change it, use it myself, and know within a few minutes whether it was actually better.

That became my design process for almost the entire project.

---

# Most Features Started With Someone Quietly Suffering

One thing I've noticed throughout my career is that people don't always complain when software makes their job harder.

Sometimes they just adapt.

I think of it like pushing a grocery cart with one bad wheel.

At first it's annoying.

Eventually you stop noticing it.

You just unconsciously compensate.

Software is full of those little broken wheels.

Someone clicks through four extra screens every day because they assume that's just how the system works.

Someone copies information into three different places because "that's how we've always done it."

Nobody complains because they don't know another option exists.

I try to look for those moments.

Some of my favorite features came from watching someone struggle with something they never would have thought to ask me to improve.

There's a balance, though.

I don't like adding features just because I can.

Every feature makes the product a little more complicated.

Every button is another thing someone has to understand.

So a lot of my design process is deciding which problems deserve a new feature and which ones are better solved by simplifying what's already there.

---

# Teachers Don't Grade by Student

One of the earliest examples of this happened with grading.

Originally the grading queue grouped submissions by student.

That seemed like the obvious way to organize it.

Then I watched instructors actually grade assignments.

Nobody was thinking about students.

They were thinking about assignments.

If you're grading thirty essays, you want to stay in essay mode.

You remember the rubric.

You know what you're looking for.

You build momentum.

Constantly jumping between essays, discussion boards, quizzes, and written reflections forces your brain to reset every few minutes.

So I reorganized the grading queue around assignments instead.

That one decision made grading noticeably faster because instructors could stay focused on one kind of work until they were finished.

Once that was in place I started noticing other little interruptions.

Sometimes guest graders would open an assignment, grade half of it, then leave it open because they had to go teach a class.

Someone else would come along an hour later, open the same assignment, finish grading it, and save.

Then the first grader would come back later and unknowingly overwrite everything.

It didn't happen often.

But when it did, it was frustrating.

So I added live grading indicators.

If someone else has an assignment open, you immediately know.

If they've been idle for a while, the icon changes.

If you try to open the same submission, you get a warning before making changes.

It isn't a complicated feature.

It's just one of those little things that quietly prevents a problem before anyone has to think about it.

The queue also supports priority assignments.

Some submissions block students from progressing through a course until they're graded.

Those always stay pinned to the top regardless of submission time.

Graders can also filter by program or by the courses assigned to them.

Normally they only want to see the handful of courses they're responsible for.

If another grader is out for the day, they can flip one switch and immediately see everything.

Almost every improvement to the grading system came from sitting with instructors and watching where they lost time.

Not because the software was slow.

Because the workflow was.

# AI Needed to Show Its Work

Adding AI grading wasn't actually the difficult part.

Getting people to trust it was.

When AI first started getting good enough to help with grading, I knew people were going to be skeptical—and honestly, I thought they should be.

If the AI just returned a grade and a paragraph of feedback, there wasn't much reason to believe it. Sometimes it would do a great job. Sometimes it would confidently make something up.

That wasn't good enough.

Instead of asking graders to trust the result, I wanted them to verify it as quickly as possible.

Whenever the AI generates feedback, it also highlights the exact portions of the student's response that support what it's saying.

If it says a student demonstrated classroom management strategies, you can immediately see which sentence it pulled that idea from.

If the colors don't line up, or if there's highlighted feedback without highlighted source text, it's immediately obvious that something went wrong.

Interestingly, this didn't just help the people reviewing the grades.

It also made the AI behave better.

Prompting it to explicitly reference the student's writing dramatically reduced hallucinations because it had to justify everything it said.

The goal was never to replace the instructor.

It was to make reviewing fifty written responses feel less like fifty written responses.

---

# One Gradebook Wasn't Enough

For a while I kept trying to make one gradebook work for everyone.

It never quite did.

Eventually I realized I wasn't designing for one kind of user.

Guest instructors only care about the classes they're teaching.

They want to open Biology 101, see twenty students, grade a few assignments, and move on.

Our internal graders work completely differently.

They might spend an afternoon following one student through six different courses because that student suddenly completed three weeks of work and needs everything graded before Monday.

Those are completely different jobs.

Trying to force them into one interface just made both experiences worse.

So I stopped trying.

Now there are two gradebooks.

The course gradebook answers:

> "How are my students doing?"

The student gradebook answers:

> "How is this student doing?"

The data is the same.

The questions are different.

That ended up being one of the bigger UX lessons from the project.

Sometimes flexibility isn't adding another filter.

Sometimes it's admitting people are trying to accomplish different things.

---

# Building a CMS That Didn't Fight Its Users

The course editor probably changed more than any other part of the application.

Every time our content creators built another course they'd discover something awkward.

Eventually patterns started appearing.

One of the first decisions was that everything should be built from reusable blocks.

There are ten different item types.

Rich text.

Multiple choice.

Written responses.

Discussions.

Fill-in-the-blank questions.

Embeds.

Certificates.

File uploads.

True/false.

Date inputs.

Those are the building blocks for every page in every course.

That sounds pretty normal.

The interesting part was making those blocks reusable.

A course feedback question might appear in fifty different courses.

I didn't want someone fixing the wording fifty different times.

So items can be reused anywhere.

Search for one.

Drop it into another course.

Done.

Of course that creates another problem.

What happens when you actually _do_ want to change only one of them?

Every shared item has a disconnect button.

Click it once and it becomes its own independent copy.

No duplicate searching.

No copy and paste.

No wondering whether you just accidentally changed twenty other courses.

It feels like a small thing.

But when you're maintaining curriculum across multiple states, those little conveniences save an enormous amount of time.

---

# Versioning Turned Out to Be Harder Than I Expected

Versioning was one of those problems I didn't really appreciate until I ran into it.

Imagine a student completes an assignment.

Two weeks later the instructor fixes a typo.

That's easy.

The student should probably see the corrected version.

Now imagine the instructor completely rewrites the assignment.

Should the student suddenly see a different question than the one they actually answered?

Definitely not.

So every item has both major and minor versions.

Minor versions are things like formatting changes, typo fixes, or correcting an answer key.

Those update existing content.

Major versions create something entirely new.

Students always see the version they originally completed.

New students get the updated version.

Looking back, I'm still pretty proud of that system.

At the time I had absolutely no idea how versioning was usually implemented.

I just kept asking myself what would feel least surprising if I were the instructor.

---

# Designing Discussions Without Encouraging Copying

Discussion forums turned into one of the more interesting design problems.

The obvious approach is just letting everyone immediately see everyone else's answers.

The problem is... people copy.

Not always intentionally.

Sometimes you read someone else's response first and suddenly your own thoughts aren't really your own anymore.

Hiding every response until the discussion closes wasn't much better because then nobody could actually have a discussion.

The solution ended up being a three-step process.

First you write your own response.

Then you intentionally lock it.

Only after it's locked do you get to see everyone else's responses.

Finally, you complete however many interactions the instructor requires before submitting.

It sounds slightly more complicated than a normal forum.

In practice it feels very natural because it matches the order people would ideally participate anyway.

Think first.

Read second.

Discuss third.

---

# The Fill-in-the-Blank Editor I'm Weirdly Proud Of

One feature I built very early on still makes me smile.

The fill-in-the-blank editor.

Instead of making instructors click through a bunch of tiny form fields, they just type a sentence.

Whenever they type three underscores...

```
The capital of Indiana is ___.
```

...the editor automatically creates a blank.

Then they provide a comma-separated word bank and assign which word belongs in which blank.

That's it.

Looking back there are probably more sophisticated ways to build that editor.

But nobody has ever complained about it.

Which, honestly, is usually the best compliment software can receive.

People just use it.

---

# Little Things Matter More Than Big Things

There are dozens of tiny decisions throughout the application that most people never notice.

Multiple-choice answers don't randomize every time anymore because students kept getting confused when answers moved between attempts.

Instead, authors press a button to shuffle them once and preview exactly what students will see.

Reading pages count as completed after you've spent a few seconds on them because instructors wanted to know whether students were actually reading the material without forcing them to click another button.

Milestones summarize progress through an entire program using key assignments instead of making managers search through every course.

IDs are copyable from almost every editor because they're frequently used elsewhere in the system.

None of those ideas would ever justify a blog post.

Together they make the product feel much easier to use.

That's probably been my favorite part of working on the project.

Almost every month I'd notice one more little broken grocery cart wheel.

Then I'd quietly replace it.
