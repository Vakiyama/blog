import { Head } from './head';
import { Navbar } from './navbar';

export const HtmlLayout = ({
  title,
  css,
  children,
}: {
  title: string;
  css: string[];
  children: JSX.Element;
}) => {
  return (
    <html lang="en">
      <Head title={title} css={css} />
      <body>{children}</body>
    </html>
  );
};
