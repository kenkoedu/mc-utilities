// Define the structure of a question
interface Question {
  q_id: number;
  t_id: number[];
  year: number;
  q_num: number;
  ans: string;
  hk_percent: number;
}

// Load the questions JSON file
import questions from '../assets/db/questions.json';

// Calculate the average hk_percent grouped by flattened t_id
function calculateAverageByTID(questions: Question[]): Record<number, number> {
  const tIdMap: Record<number, { sum: number; count: number }> = {};

  questions.forEach((question) => {
    question.t_id.forEach((tId) => {
      if (!tIdMap[tId]) {
        tIdMap[tId] = { sum: 0, count: 0 };
      }
      tIdMap[tId].sum += question.hk_percent;
      tIdMap[tId].count += 1;
    });
  });

  // Calculate the average for each t_id
  const averages: Record<number, number> = {};
  for (const tId in tIdMap) {
    averages[Number(tId)] = tIdMap[tId].sum / tIdMap[tId].count;
  }

  return averages;
}

// Count the number of occurrences of each t_id in q_id
function countOccurrencesByTID(questions: Question[]): Record<number, number> {
  const tIdCountMap: Record<number, number> = {};

  questions.forEach((question) => {
    question.t_id.forEach((tId) => {
      if (!tIdCountMap[tId]) {
        tIdCountMap[tId] = 0;
      }
      tIdCountMap[tId] += 1;
    });
  });

  return tIdCountMap;
}

// Combine the results into an array of objects
function combineResults(
  averages: Record<number, number>,
  occurrences: Record<number, number>
): { t_id: number; average_hk_percent: number; count: number }[] {
  const combinedResults: { t_id: number; average_hk_percent: number; count: number }[] = [];

  for (const tId in averages) {
    combinedResults.push({
      t_id: Number(tId),
      average_hk_percent: averages[Number(tId)],
      count: occurrences[Number(tId)] || 0,
    });
  }

  return combinedResults;
}

// Exported function to calculate and return the combined results
export function getCombinedResults(): { t_id: number; average_hk_percent: number; count: number }[] {
  const averages = calculateAverageByTID(questions);
  const occurrences = countOccurrencesByTID(questions);
  return combineResults(averages, occurrences);
}