# workflow

## Intro

How much time have you spent thinking about your workflow? If you're
a developer, I've found that there's a significant amount of variance when
it comes to how much one thinks about their work environment.

I've met developers who've been using PowerShell or CMD to run their
scripts because it was the fastest way to run a program at the time.
They're likely on Windows or Mac running the default VSCode configuration
with practical, no bullshit plugins.

These people scare me a bit, but their dedication to getting shit done has
to be respected. I'd probably recommend installing Git bash or some bash
emulator if you're on Windows.

Then there's those who have a nicely themed VSCode. They likely have some
of the same plugins as the last user, but theres definitely some more to
their environments.

Maybe their file tree has moved around. Terminal splitting panes, prettier
typescript errors and a beautiful code screenshotting utility. Perhaps
even some commands for jumping around their codebase. Nice.

Then there's the psychopaths. Probably running arch btw, Emacs or Vim,
Linux, splitting window managers, so on.

Who knew I'd be one of them. I'll talk about my journey into insanity and
how it could happen to you. Let it be a cautionary tale about
productivity, efficiency, tragedy and an ridiculously fun hobby.

## Notepad++

Started off doing notepad++ programming simple HTML pages in highschool.
To be fair, those were pretty early days.

## VSCode

Coming back to programming for the first time, I realized I needed
a "real" editor, so I went to the standard and most popular thing I could
find, VSCode.

At this point, I'm really mostly focused on learning a bit of javascript,
and so I'm not actively thinking about my workflow.

## Linux

I remember trying Linux and swapping back to Windows pretty quickly.
I swapped in order to have a nice looking "riced" Linux experience, but
I barely understood what that meant, or what I was looking for out of
Linux.

I've seen this happen before, where new developers hear that Linux is what
they should be using, or see it mentioned often. They then try to switch
to it, but when asked why, they reply with "I'm switching to Linux to
learn Linux."

This is a horrible way to use something, and it's a backwards minset that
is likely going to lead to failure. You should learn a tool or system in
order to solve some real problem.

I used Linux Mint as it was the most familiar thing to Windows, but
swapped back quickly. We'll come back to Linux later, when I'm more set on
what my workflow goals are.

## Vim motions

Somewhere around this time I started watching popular programming youtuber
Primeagen. Prime gives a lot of opinions about programming that shaped
many of my growing views as I learn more about this field. One of the
things he loved to preach was using Vim.

After some time watching my new favorite youtuber, I was convinced.
I watched Primes intro to Vim playlist and introduction 2 to 3 times and
jumped right in.

I installed the Vim motions plugin as recommended and started trying to
program. The first week was predictably painful. I had a friend trying it
with me, which helped a lot, as we got to share in the struggles and
lessons learned together.

After the first week, I knew there was no going back. Even using the built
in features of VSCode for file navigation and whatever default motions the
Vim plugin offered, I already felt like I was having much more fun
programming.

After this experience, and two to three months of using the Vim plugin,
the next step was obvious.

## WSL and Neovim

Okay, now we're cooking. WSL because I'm not quite ready to jump ship on
Windows, but I knew at this point I was probably dead set on that
trajectory.

Getting Neovim installed on WSL was relatively easy. I spent a good amount
of time customizing the look of my terminal and getting a nice color
scheme and look going in Neovim. This is a pattern that marks the rest of
my workflow journey, as I found that the look of my workflow and
environment was of high importance to me.

I followed the rest of the guide Primagen uploaded to guide the rest of my
journey, and followed his Vimrc video to get my editor up to speed with
what I could do in VSCode.

I think if I knew better, I'd have used kickstart.nvim, as I'm using
a package manager and lspsetup that probably needs some modernization. I'm
not sure where kickstart was as a project at the time but I highly
recommend it to anyone getting started with Neovim.

Either way, I was beginning to get familiar with configuring and using my
new editor, and it's been amazing all the way through. The level of
enjoyment I get out of programming after setting things up has been
a major highlight in my early career.

Still, at this point the WSL input lag was getting to me. My friend had
already jumped ship to Linux, and I remember tiling window managers to be
a fun time when I used Linux before. Plus, I never really liked Microsoft
anyways.

## NixOS

I was originally going to jump to old familiar Linux mint, but my friend
had been raving about this new distro NixOS for a while now. It promised
a reproducible and consistent system setup experience with its declarative
configuration approach, which did sound quite interesting.

The ability to install programs through a configuration file and having
containerized environments for my project dependencies sold me on it.

Stil, I was pretty skeptical that I should jump into such a complicated
distro as my first real shot at Linux, but it really has paid off. I love
NixOS for the simple reason that I know what my system configuration looks
like, always, as well as any programs I have installed. Using apt-get
install will never match the experience I've had with Nix, even if it has
had a bit of a learning curve.

Jumping into Linux for the second time, I realize why it was never going
to work out the first time. This time, I had goals and problems that Linux
was aiming to solve for me. Using Neovim in a native environment, getting
better support for the tools I use while programming and trying out a new
way to do system configs made me stay.

Neovim made me realize that I love tweaking and editing every part of my
workflow to my hearts content, even if it's sometimes not the best use of
my time. I love making tiny optimizations that will save me time or
prevent a headache, and now I get to do that at a system level with my
operating system.

I realize too, now, after all this time tweaking and customizing things,
that I do it for one simple reason. It's super fun. I remember reading
this analogy about Linux that really resonated with me. People build
custom computers, and sure, they'll understand their computer better and
all that, but they could probably get away with a prebuilt. If you ask
most people why they actually do it, if they're honest with you, they'll
tell you it's just good old fashioned fun to do. Customizing my Linux
environment is like my version of building a computer, just at the
software level.

Something was missing still. Prime raved on and on about split keyboards,
and I've had chronic shoulder pain for years at this point. It was time to
give the harware side of things some love.

## Keyboards

Bridge: write about the benefits of split keyboards, ortholinear and all,
but bring up the connection with customization of the software. I've
realized that most of this workflow stuff boils down to that idea of
customizing things for fun and "profit", so refine the article into that,
maybe rewrite it with the same ideas?
