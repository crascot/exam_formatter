export interface ExamRow {
 id: number;
 department: string;
 course: number;
 lesson: string;
 startAt: string;
 endAt: string;
 name: string;
 password: string;
}

export interface QuestionRow {
 id: number;
 exam_id: number;
 question: string;
}

export interface QuestionImageRow {
 id: number;
 question_id: number;
 url: string;
}

export interface AnswerRow {
 id: number;
 //  question_id: number;
 text: string;
 isCurrect?: number;
}

export interface SubmissionRow {
 id: number;
 exam_id: number;
 student_name: string;
 submitted_at: string;
}

export interface SubmissionAnswerRow {
 id: number;
 submission_id: number;
 question_id: number;
 answer_text: number;
 isCurrect: number;
}
