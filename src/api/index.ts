import express from 'express';
import Database from 'better-sqlite3'; // SQLite driver
import { Topic, Question } from '../../type';

const db = new Database('local.db'); // Adjusted for better-sqlite3
const app = express();

app.get('/topics', (req, res) => {
  const sort = req.query.sort as string | undefined;
  let orderBy = '';

  if (sort === 'hk_percent') {
    orderBy = 'ORDER BY avg_hk_percent DESC';
  }

  const stmt = db.prepare(`SELECT * FROM topic_view ${orderBy}`);
  const topics: Topic[] = stmt.all() as Topic[];
  res.json(topics);
});

app.get('/questions', (req, res) => {
  const t_id = req.query.t_id as string | undefined;
  const sort = req.query.sort as string | undefined;
  const year = req.query.year as string | undefined;
  let orderBy = 'year, q_num';
  let whereClauses = [];

  if (sort === 'hk_percent') {
    orderBy = 'hk_percent DESC';
  }

  if (t_id) {
    whereClauses.push(`mc_topic_questions.t_id = ?`);
  }

  if (year) {
    whereClauses.push(`mc_questions.year = ?`);
  }

  let whereClause = '';
  if (whereClauses.length > 0) {
    whereClause = `WHERE ${whereClauses.join(' AND ')}`;
  }

  const query = `
    SELECT mc_questions.*, mc_topic_questions.t_id as t_id
    FROM mc_questions
    LEFT JOIN mc_topic_questions ON mc_questions.q_id = mc_topic_questions.q_id
    ${whereClause}
    ORDER BY ${orderBy}
  `;

  const stmt = db.prepare(query);
  const params = [t_id, year].filter(param => param !== undefined);
  const questions: Question[] = stmt.all(...params) as Question[];
  res.json(questions);
});

app.listen(3000, () => {
  console.log('🚀 Express server is running on http://localhost:3000');
});
