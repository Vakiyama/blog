import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const blogs = sqliteTable('blogs', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  contents: text('contents').notNull(),
});
