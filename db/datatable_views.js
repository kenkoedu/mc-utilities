// ...existing code...
import Database from 'bun:sqlite';
const db = new Database('local.db');

db.query(`DROP VIEW IF EXISTS topic_views;`).run();

db.query(`
  CREATE VIEW topic_view AS
  SELECT
    mc_topics.*,
    AVG(hk_percent) AS avg_hk_percent,
    COUNT(mc_questions.q_id) AS question_count
  FROM mc_questions JOIN mc_topic_questions ON mc_questions.q_id = mc_topic_questions.q_id
  JOIN mc_topics ON mc_topic_questions.t_id = mc_topics.t_id
  GROUP BY mc_topics.t_id;
`).run();