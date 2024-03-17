import { client } from '../client';
import { parseTable, type OmitMultiple } from '../tableParser';

interface Table {
  id: number;
}

export interface Blog extends Table {
  title: string;
  body: string;
  timestamp: number;
}

export async function createBlogTable(): Promise<void> {
  const query = `
  CREATE TABLE blogs (
    id integer primary key autoincrement not null,
    title text not null,
    body text not null,
    timestamp datetime not null
  );
  `;
  await client.execute(query);
}

export async function getBlogs(): Promise<Blog[]> {
  console.log('Getting blogs');
  const query = `
  select id, title, body, timestamp from blogs;
  `;
  const result = await client.execute(query);
  return parseTable<Blog>(result);
}

export async function getBlogById(id: number): Promise<Blog> {
  console.log(`Getting blog id: ${id}`);
  const query = `
  select id, title, body, timestamp from blogs where id = ?;
  `;
  const result = await client.execute({
    sql: query,
    args: [id],
  });
  if (result.rows.length !== 1) throw new Error('No blog found');
  const blogs = parseTable<Blog>(result);
  return blogs[0] as Blog;
}

export async function addBlog({
  title,
  body,
}: OmitMultiple<Blog, 'id' | 'timestamp'>): Promise<bigint> {
  console.log('Adding blog');
  const query = `insert into blogs
  (title, body, timestamp) 
  values 
  (?, ?, Date());`;
  const result = await client.execute({
    sql: query,
    args: [title, body],
  });

  const id = result.lastInsertRowid;

  return id as bigint;
}
