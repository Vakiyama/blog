# Personal blog project

## WIP

Site live @ https://blog-hv43.onrender.com/

UI/UX Inspired (copied) by my favorite neovim plugin, [nvim/telescope](https://github.com/nvim-telescope/telescope.nvim)

Color pallete from my favorite theme, [catppuccin](https://github.com/catppuccin/catppuccin) - Frappe flavored

stack: [beth-stack](https://github.com/Vakiyama/beth-stack)

## Todo:

- [x] Implement search by blog
- [x] Parse markdown
- [x] Parsing images for blog posts
- [x] Improve blog data structure to contain metadata (move to Turso?)
- [x] Resizing of telescope UI for mobile
- [x] Figure out mobile solution for commands
- [x] Migrate to tailwind
- [ ] Add date published
- [ ] Edit history, version history
- [ ] Add search by content (ripgrep style telescope)
- [ ] Env variables are a bit strange rn
- [ ] Admin dashboard for blog crud operations

## Development

Make sure to fill out the .env from the .env.example provided

To start the development server run:

```bash
# push database schema
bun run drizzle-push

# seed database
bun run drizzle-seed

# run tailwindcss watcher
bun run tailwind-watch

# run server, in a different terminal
bun run dev

```
Should be live at http://localhost:3000
