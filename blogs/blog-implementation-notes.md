# implementation

Need to figure out a way to embed metadata into my md articles.

Start each article with a json blob {} of some shape?

Parse it out? I mean, it would be better to have an actual data structure for each article...

My blogs don't have to just be md files. I could have it be an actual data
structure... or have the contents be in md, in a folder, with some
metadata in json or some equivalent, along with images and assets for that
blog...

something like:

```arduino
blogs/
└── blog-1/
    ├── blog-1.md
    ├── blog-1.json
    └── assets/
        ├── image1.png
        └── image2.png
```

But then my metadata won't be typed, and will crash at runtime... It could
be a .ts file with some stuff filled out, it just feels wrong, it's just
metadata, why bother with it being ts?

I guess if I want my tsc to complain at the right times, it's kind of the
only solution.

```arduino
blogs/
└── blog-1/
    ├── blog-1.md
    ├── blog-1.ts // metadata here, such as title, creation date
    └── assets/
        ├── image1.png
        └── image2.png
```

But then again, this whole thing could just be a database call. Honestly,
it should be a database call. Look into turso and set it up there, and
then I just need a web portal to upload, edit and delete blogs.

Maybe I can open blog creation to be public or something? idk.
