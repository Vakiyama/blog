import { Elysia } from 'elysia';
import { html } from '@elysiajs/html';

const Head = () => {
  return (
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Hiya</title>
      <script src="https://unpkg.com/htmx.org@1.9.10"></script>
      {/*<link rel="stylesheet" href="style.css" /> */}
    </head>
  );
};

export const indexRouter = new Elysia()
  .use(html())
  .get('/', () => {
    return (
      <html lang="en">
        <Head />
        <body>
          <p>Hiyaaaa!</p>
          <button hx-post="/clicked" hx-swap="outerHTML">
            Click Me
          </button>
        </body>
      </html>
    );
  })
  .post('/clicked', () => {
    return (
      <div>
        <p>We swapped the outerHTML with this div!</p>
      </div>
    );
  });
