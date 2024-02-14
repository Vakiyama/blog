# blog-design

## markdown-parser

For this project, I wanted to write a custom markdown parser.

Implemented this mostly working off of a stack: Special chars add to the
stack, closing or repeat chars will close it. Not all implemented, need to
add:

We'll just have to parse an md file into html. Let's make this parser
custom:

Symbols:

- \# for titles, with the number of consecutive hashes representing the
  title size
- - for lists
- one \_ for italics, two \* for bold

### Todo:

- [ ] Image and video embeddings
- [ ] Todo item rendering (like this one)
- [ ] \`\`\` code blocks, with some basic syntax highlighting? (don't
      necessarily want to handroll every single language I use)
- [ ] Lists, numbered and bulleted

## design

UI/UX Inspired by my favorite neovim plugin, [nvim/telescope](https://github.com/nvim-telescope/telescope.nvim)
Color pallete from my favorite theme, [catppuccin](https://github.com/catppuccin/catppuccin)

Blogs are just markdown files, for ease of writing. Then, I can convert my
notes almost directly into blogs, which is cool.

## Homepage design:

_Terminal based blog_; emulate the _look, feel of a terminal_, and make the
user interact with it as if it were a terminal, all with catppuccin colors

Or, just emulate the _feeling of a code editor_

Things a code editor can do:

- hover over types, _(lsp windows for links)_
- show _line numbers_ on the left
- show current _file name and path_
- could potentialy _group related blogs by "folder"_
- _telescope name (emulate telescope window)_, can also pgrep!
- could even implement harpoon into the site for bookmarking based on
  session, we can just keep it in the localstore

Landing page is something like (press pf to search), or scroll down to
browse.

[reddit-homepage-design-screenshot](https://cdn.discordapp.com/attachments/378070098465914883/1206768817389174875/image.png?ex=65dd360a&is=65cac10a&hm=0dee6d474db704a07e37788107b183f85d2150e9bef821644aa65d18882750bc&)
[initial-design](https://www.figma.com/file/c4DCIBXyWS4QuhSgugLPU4/Blog?type=design&node-id=0-1&mode=design&t=SCxZ3WdRZN8wkIVu-0)

## Feedback on UI

Michael: skipped the search, wasn't obvious

Parsa notes:
didn't use search because: keybind is weird, would just use mouse buttons
have some refence to how to open the menu from any other page

reading diff (people probably won't read)

Add scrollbar

Max:

