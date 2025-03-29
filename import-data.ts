import Database from 'bun:sqlite';
import * as fs from 'node:fs';
import { parse } from 'csv-parse';

const db = new Database('local.db');

db.exec(`DROP TABLE IF EXISTS mc_topics`);
db.exec(`DROP TABLE IF EXISTS mc_questions`);
db.exec(`DROP TABLE IF EXISTS mc_topic_questions`);

// Define your table creation functions based on your CSV structure
async function createMcTopicsTable() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS mc_topics (
      t_id INTEGER PRIMARY KEY,
      t_title TEXT NOT NULL,
      t_title_c TEXT,
      is_junior INTEGER,
      mia_e2 INTEGER
    )
  `);
}

async function createMcQuestionsTable() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS mc_questions (
      q_id INTEGER PRIMARY KEY,
      year INTEGER,
      q_num INTEGER,
      ans TEXT,
      hk_percent INTEGER
    )
  `);
}

async function createMcTopicQuestionsTable() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS mc_topic_questions (
      t_id INTEGER,
      q_id INTEGER,
      PRIMARY KEY (t_id, q_id),
      FOREIGN KEY (t_id) REFERENCES mc_topics(t_id),
      FOREIGN KEY (q_id) REFERENCES mc_questions(q_id)
    )
  `);
}

// Function to import CSV data into a table
async function importCsvData(csvFilePath: string, tableName: string, columnNames: string[], transform?: (record: any) => any) {
  const parser = parse(fs.readFileSync(csvFilePath), {
    columns: true,
    skip_empty_lines: true
  });

  for await (const record of parser) {
    const transformedRecord = transform ? transform(record) : record;
    const values = columnNames.map(column => transformedRecord[column]);
    const placeholders = columnNames.map(() => '?').join(', ');
    const sql = `INSERT OR REPLACE INTO ${tableName} (${columnNames.join(', ')}) VALUES (${placeholders})`;
    try {
      db.prepare(sql).run(...values);
    } catch (error) {
      console.error(`Error inserting record: ${JSON.stringify(record)}`, error);
    }
  }
  console.log(`Imported data into ${tableName}`);
}

async function main() {
  await createMcTopicsTable();
  await createMcQuestionsTable();
  await createMcTopicQuestionsTable();

  // Adjust file paths and column names to match your CSV files
  await importCsvData('mc_topics.csv', 'mc_topics', ['t_id', 't_title', 't_title_c', 'is_junior', 'mia_e2']);
  // await importCsvData('mc_questions.csv', 'mc_questions', ['id', 'year', 'q_num', 'ans', 'hk_percent']);

  // Import mc_questions data and populate mc_topic_questions
  const parser = parse(fs.readFileSync('mc_questions.csv'), {
    columns: true,
    skip_empty_lines: true
  });

  for await (const record of parser) {
    try {
      // Insert into mc_questions
      db.prepare(`INSERT OR REPLACE INTO mc_questions (q_id, year, q_num, ans, hk_percent) VALUES (?, ?, ?, ?, ?)`).run(
        record.q_id, record.year, record.q_num, record.ans, record.hk_percent
      );

      // Insert into mc_topic_questions
      db.prepare(`INSERT OR REPLACE INTO mc_topic_questions (t_id, q_id) VALUES (?, ?)`).run(record.t_id, record.q_id);

    } catch (error) {
      console.error(`Error inserting record: ${JSON.stringify(record)}`, error);
    }
  }
  console.log(`Imported data into mc_questions and mc_topic_questions`);

  db.close();
}

main().catch(err => console.error(err));
