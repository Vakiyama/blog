export const Head = ({ title, css }: { title: string; css: string[] }) => {
  return (
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>{title}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet"
      />
      <script src="https://unpkg.com/htmx.org@1.9.10"></script>
      <link rel="stylesheet" href={`/public/css/root.css`} />
      <link rel="stylesheet" href={`/public/css/global.css`} />
      {css.map((path) => {
        console.log(path);
        return <link rel="stylesheet" href={`/public/css/${path}`} />;
      })}
    </head>
  );
};
