import db from "../db";
import {
 ExamRow,
 QuestionRow,
 QuestionImageRow,
 AnswerRow,
 SubmissionRow,
} from "../models/dbTypes";
import {
 ExamType,
 Question,
 Answer,
 StudentExamPayload,
 StudentExamMeta,
 StudentResult,
} from "../models/exam";

export const getExamById = (examId: number): ExamType | null => {
 const exam = db
  .prepare(
   `
      SELECT id, department, course, lesson, startAt, endAt, name, password
      FROM exams
      WHERE id = ?
    `,
  )
  .get(examId) as ExamRow | null;

 if (!exam) return null;

 const questionRows = db
  .prepare(
   `
      SELECT id, question FROM questions WHERE exam_id = ?
    `,
  )
  .all(examId) as Pick<QuestionRow, "id" | "question">[];

 const questions: Question[] = questionRows.map(q => {
  const imageRows = db
   .prepare(
    `
        SELECT url FROM question_images WHERE question_id = ?
      `,
   )
   .all(q.id) as Pick<QuestionImageRow, "url">[];

  const images: string[] = imageRows.map(img => img.url);

  const answerRows = db
   .prepare(
    `
        SELECT text FROM answers WHERE question_id = ?
      `,
   )
   .all(q.id) as Pick<AnswerRow, "text">[];

  const answers: Answer[] = answerRows.map(a => ({
   text: a.text,
   isCurrect: false,
  }));

  return {
   id: q.id,
   question: q.question,
   images,
   answers,
  };
 });

 return {
  department: exam.department,
  course: exam.course,
  lesson: exam.lesson,
  startAt: exam.startAt,
  endAt: exam.endAt,
  name: exam.name ?? undefined,
  password: exam.password ?? undefined,
  questions,
 };
};

export const getExamResults = (examId: number) => {
 const submissions = db
  .prepare(
   `
      SELECT id, student_name, submitted_at
      FROM submissions
      WHERE exam_id = ?
    `,
  )
  .all(examId) as SubmissionRow[];

 if (!submissions.length) return [];

 return submissions.map(submission => {
  // получаем все ответы по submission_id
  const rawAnswers = db
   .prepare(
    `
        SELECT 
          q.id as question_id,
          q.question, 
          sa.answer_text, 
          sa.isCurrect
        FROM submission_answers sa
        JOIN questions q ON q.id = sa.question_id
        WHERE sa.submission_id = ?
      `,
   )
   .all(submission.id) as Array<{
   question_id: number;
   question: string;
   answer_text: string;
   isCurrect: number;
  }>;

  const groupedAnswers: Record<
   number,
   {
    question: string;
    answers: string[];
    correctFlags: number[];
   }
  > = {};

  for (const answer of rawAnswers) {
   const group = groupedAnswers[answer.question_id] ?? {
    question: answer.question,
    answers: [],
    correctFlags: [],
   };

   group.answers.push(answer.answer_text);
   group.correctFlags.push(answer.isCurrect);

   groupedAnswers[answer.question_id] = group;
  }

  const answers = Object.values(groupedAnswers).map(group => ({
   question: group.question,
   userAnswers: group.answers,
   isCorrect: group.correctFlags.every(flag => flag === 1),
  }));

  return {
   studentName: submission.student_name,
   submittedAt: submission.submitted_at,
   answers,
  };
 });
};

export const getExamForStudents = (
 examId: number,
): StudentExamPayload | null => {
 const exam = db
  .prepare(
   `SELECT id, department, course, lesson, startAt, endAt, name FROM exams WHERE id = ?`,
  )
  .get(examId) as StudentExamMeta | null;

 if (!exam) {
  return null;
 }

 const questions = db
  .prepare(`SELECT id, question FROM questions WHERE exam_id = ?`)
  .all(examId) as QuestionRow[];

 const fullQuestions = questions.map(question => {
  const answers = db
   .prepare(`SELECT id, text, isCurrect FROM answers WHERE question_id = ?`)
   .all(question.id) as AnswerRow[];

  const correctCount = answers.filter(answer => answer.isCurrect === 1).length;

  const images = db
   .prepare(`SELECT url FROM question_images WHERE question_id = ?`)
   .all(question.id) as QuestionImageRow[];

  const imagesResult = images.map(img => img.url);

  return {
   id: question.id,
   question: question.question,
   answers,
   isManyCorrectAnswers: correctCount > 1,
   images: imagesResult,
  };
 });

 return {
  exam,
  questions: fullQuestions,
 };
};

export const getExamTime = (examId: number) => {
 const time = db
  .prepare(`SELECT startAt, endAt FROM exams WHERE id = ?`)
  .get(examId) as { startAt: string; endAt: string } | null;

 if (!time) {
  return null;
 }

 return { startAt: time.startAt, endAt: time.endAt };
};

export const createExam = (exam: ExamType): number => {
 const result = db
  .prepare(
   `
      INSERT INTO exams (department, course, lesson, startAt, endAt, name, password)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
  )
  .run(
   exam.department,
   exam.course,
   exam.lesson,
   exam.startAt,
   exam.endAt,
   exam.name ?? null,
   exam.password ?? null,
  );

 const examId = result.lastInsertRowid as number;

 const insertQuestion = db.prepare(`
    INSERT INTO questions (exam_id, question)
    VALUES (?, ?)
  `);
 const insertImage = db.prepare(`
    INSERT INTO question_images (question_id, url)
    VALUES (?, ?)
  `);
 const insertAnswer = db.prepare(`
    INSERT INTO answers (question_id, text, isCurrect)
    VALUES (?, ?, ?)
  `);

 for (const q of exam.questions) {
  const qResult = insertQuestion.run(examId, q.question);
  const questionId = qResult.lastInsertRowid as number;

  for (const image of q.images) {
   insertImage.run(questionId, image);
  }

  for (const a of q.answers) {
   insertAnswer.run(questionId, a.text, a.isCurrect ? 1 : 0);
  }
 }

 return examId;
};

export const submitExamAnswers = ({
 examId,
 studentName,
 answers,
}: StudentResult) => {
 const submissionResult = db
  .prepare(
   `
      INSERT INTO submissions (exam_id, student_name)
      VALUES (?, ?)
    `,
  )
  .run(examId, studentName);

 const submissionId = submissionResult.lastInsertRowid as number;

 const insertAnswer = db.prepare(`
    INSERT INTO submission_answers (submission_id, question_id, answer_text, isCurrect)
    VALUES (?, ?, ?, ?)
  `);

 const getCorrectAnswers = db.prepare(`
    SELECT text, isCurrect FROM answers WHERE question_id = ?
  `);

 const groupedByQuestion = new Map<number, string[]>();
 for (const { questionId, answerText } of answers) {
  if (!groupedByQuestion.has(questionId)) {
   groupedByQuestion.set(questionId, []);
  }
  groupedByQuestion.get(questionId)!.push(answerText);
 }

 for (const [questionId, userAnswers] of groupedByQuestion.entries()) {
  const correctAnswers = getCorrectAnswers.all(questionId) as AnswerRow[];

  const correctTexts = correctAnswers
   .filter(a => a.isCurrect === 1)
   .map(a => normalize(a.text))
   .sort();

  const userTexts = userAnswers.map(normalize).sort();

  const isAllCorrect =
   JSON.stringify(userTexts) === JSON.stringify(correctTexts);

  for (const answerText of userAnswers) {
   const isCorrect =
    isAllCorrect && correctTexts.includes(normalize(answerText));
   insertAnswer.run(submissionId, questionId, answerText, isCorrect ? 1 : 0);
  }
 }

 return submissionId;

 function normalize(s: string) {
  return s.trim().replace(/\s+/g, " ").toLowerCase();
 }
};
