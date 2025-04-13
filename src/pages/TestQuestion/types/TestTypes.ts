import { ExamType } from "../../../types/ExamTypes";

export type TestType = ExamType & {
 createdAt: string;
 startTime: string;
 endTime: string;
};
