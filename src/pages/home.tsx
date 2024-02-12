import { Head } from '../components/head';
import { HtmlLayout } from '../components/htmlLayout';

export const Home = () => {
  return (
    <HtmlLayout css={['home.css']} title="Home">
      <main>
        <h1>Welcome to my blog!</h1>
        <p>This website is barebones and always work in progress.</p>
        <p>Below are some of my blogs:</p>
        <li>
          <ul>
            <a href="/blogs/distill">Distill</a>
          </ul>
        </li>
      </main>
    </HtmlLayout>
  );
};
