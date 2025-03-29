import { Elysia, t } from "elysia";
import Database from 'bun:sqlite';
import { Topic, Question } from '../../type';

const db = new Database('local.db');

const app = new Elysia()
  // .get("/tables", (): Table[] => {
  //   const tableNames = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
  //   const tables: Table[] = [];

  //   for (const tableName of tableNames) {
  //     const name = tableName.name;
  //     if (name === 'sqlite_sequence') continue; // Skip sqlite internal table

  //     const data = db.prepare(`SELECT * FROM ${name}`).all();
  //     const fields = Object.keys(data[0] || {});

  //     tables.push({
  //       name: name,
  //       data: data,
  //       fields: fields
  //     });
  //   }

  //   return tables;
  // })
  .get("/topics", (context): Topic[] => {
    const sort = context.query.sort as string | undefined;
    let orderBy = '';

    if (sort === 'hk_percent') {
      orderBy = 'ORDER BY avg_hk_percent DESC';
    }

    const topics: Topic[] = db.prepare(`SELECT * FROM topic_view ${orderBy}`).all() as Topic[];
    return topics;
  }, {
    query: t.Object({
      sort: t.Optional(t.String())
    })
  })
  .get("/questions", (context): Question[] => {
    const t_id = context.query.t_id as string | undefined;
    const sort = context.query.sort as string | undefined;
    const year = context.query.year as string | undefined;
    let questions: Question[];
    let orderBy = 'year, q_num';
    let whereClauses = [];

    if (sort === 'hk_percent') {
      orderBy = 'hk_percent DESC';
    }

    if (t_id) {
      whereClauses.push(`mc_topic_questions.t_id = ${t_id}`);
    }

    if (year) {
      whereClauses.push(`mc_questions.year = ${year}`);
    }

    let whereClause = '';
    if (whereClauses.length > 0) {
      whereClause = `WHERE ${whereClauses.join(' AND ')}`;
    }

    questions = db.query(`
      SELECT mc_questions.*, mc_topic_questions.t_id as t_id
      FROM mc_questions
      LEFT JOIN mc_topic_questions ON mc_questions.q_id = mc_topic_questions.q_id
      ${whereClause}
      ORDER BY ${orderBy}
    `).all() as Question[];

    return questions;
  }, {
    query: t.Object({
      t_id: t.Optional(t.String()),
      sort: t.Optional(t.String()),
      year: t.Optional(t.String())
    })
  })
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

export type App = typeof app;
