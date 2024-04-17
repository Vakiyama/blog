import { db } from './client';
import { blogs } from './schema/blogs';
// import { faker } from '@faker-js/faker';

await db.delete(blogs);

await db.insert(blogs).values([
  {
    name: 'Friction, Flow, Workflows and You.md',
    contents: `# Friction, Flow, Workflows and You

I think a lot about the concept of friction.

Not in a physics sense, but in a more conceptual way. My concept of
friction is that of a feeling. It's an awful feeling once you start
noticing it.

You've definitely noticed it too. Friction is a feeling that has many
names. Friction is often found in words like difficult, boring,
frustrating, unintuitive, slow and clunky. It's that feeling you get when
there's a goal or task you want to accomplish, but something external to
that goal stands in your way.

Any beginner guitarist will know of the finger pain that comes with first
playing a guitar. It's a major point of friction that will slow down even
the most motivated beginner. It's there, it's annoying, and it's barely
related to the goal. If guitar was all about hurting your fingers, it
probably wouldn't as popular of a hobby. Just maybe.

Or maybe you want to go out and have lunch with some friends, but you live
an hour away. Is it really worth the commute? These are the kinds of
questions friction will lead you to.

At worst, you have to do some high friction task, regardless of the costs.

When I worked in retail, we had unorganized inventory that would sometimes
take minutes to sift through, while customers wanted to know if we had
some shoe in their size. 

It was a point of frustration that I, and the rest of our coworkers, just
had to deal with most of the time. It got in the way of our actual goal,
which was to help and serve customers.

Friction can cause more than annoyance. It can worsen how engaged,
fulfilled and committed we are to our goals. 

## Flow

Flow is something you've definitely also noticed, and it's not so much
a feeling, but a state of mind.

It's often called being "in the zone". It involves total focus and
immersion into an activity. Here is a definition ChatGPT kindly gave me
that I think fits quite well.

"You might have experienced flow while engaging in a hobby, playing
a sport, or even during intense work sessions where everything else seems
to fade away. The activity doesn't need to be physically demanding—it
could be anything from painting to coding—what matters is that it's
challenging enough to engage you completely, but not so difficult that it
becomes frustrating." - ChatGPT 4.0

If you have experienced the flow state before, you know it's something to
be desired. This is especially true for things we do every day. If we can
more easily flow through our tasks, hobbies and work, we'll be more
productive, happier and fulfilled.

## Friction and flow

Friction is the antagonist to flow. If you're focused on a task, but
something distracts you, or takes your mind away from what you're trying
to achieve, you can snap out of flow instantly, or never enter it in the
first place. 

We should strive to minimize friction in the tasks that we do the most in
our lives, but we should specially focus on those related to our work and
hobbies. 

This is what I've found has helped improve my motivation for programming,
writing and building software. Being able to enter this flow state
consistently and easily while working on the projects has made me a more
fulfilled person.

## How to reduce friction in your workflow

First, work on awareness. The moment something annoys you, don't ignore it
and move on, as is often a way for us to deal with these moments. Think
about what happened, how we got here and how it could be solved. Do this
especially when it happens frequently during a work session. When you
notice this, write down what happened as a short note, so that you can
continue what you were working on.

Next, find some time where you can channel the frustration of this daily
friction into a problem solving mindset. Look at your list of pain points
and think about how you could improve those processes.

Finally, when you improve something about your workflow, appreciate the
work that previous you did to make your life a bit better. Feel the
friction lessen. See if this is something that actually has provided you
value. 

I noticed that using git version control when working on software was
a major point of friction. Merge conflicts, branches, unstaged and
unpulled changes just seemed like a bunch of annoyances that got in the

way of what I wanted, which was to build software. This happened often
enough that I had to address it.

My git workflow has drastically changed over time as I found better ways
to interact with git. I stopped using Github Desktop and VSCode git
tooling and starting using the command line. I read some articles about
the way confusing parts of git work. I integrated better git related tools
into my editor.


Git is less of a friction point in my workflow now. As a result, I can
think and focus more on the apps I'm building and not the tools I use to
manage them, helping me stay in flow.

The more you focus on your awareness, problem solving and appreciation of
your solutions, the better you will become at this repeating process. It
will be easier to notice friction, you will solve your problem faster and
you will feel better about your solutions.

Eventually, these things will add up and change the way you work, and how
you think about work.

I think that's valuable. I hope you do too, and I hope you find some
success in this approach.
`,
  },
]);

console.log('Database seeded!');
