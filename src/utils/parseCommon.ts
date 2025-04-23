import { Difficulty, Question } from "../types/ExamTypes";
import { ImageData } from "../types/imageData";
import { ParsedItem } from "../types/parsedItem";

type Input =
 | { lines: string[]; images?: ImageData[]; isSequence?: false }
 | { sequence: ParsedItem[]; isSequence: true };

export function parseCommon(input: Input, difficulty: Difficulty): Question[] {
 const questions: Question[] = [];
 let currentQuestion: Question | null = null;
 let questionCounter = 1;

 if (input.isSequence) {
  for (const item of input.sequence) {
   if (item.type === "text") {
    const line = item.value.trim();

    if (line.match(/^\d+\..+/)) {
     if (currentQuestion) questions.push(currentQuestion);
     currentQuestion = {
      question: line.replace(/^\d+\.\s*/, "").trim(),
      answers: [],
      difficulty,
      images: [],
     };
    } else if (line.startsWith("- ")) {
     currentQuestion?.answers.push(line.replace("- ", "").trim());
    }
   } else if (item.type === "image") {
    currentQuestion?.images.push(item.id);
   }
  }
 } else {
  const lines = input.lines;
  const images = input.images || [];

  for (const line of lines) {
   if (line.match(/^\d+\..+/)) {
    const questionText = line.replace(/^\d+\.\s*/, "").trim();
    const attachedImages = images
     .filter(img =>
      img.name
       .toLowerCase()
       .match(new RegExp(`(q${questionCounter}|${questionCounter})`, "i")),
     )
     .map(img => img.base64);

    questions.push({
     question: questionText,
     answers: [],
     difficulty,
     images: attachedImages,
    });

    questionCounter++;
   } else if (line.startsWith("- ")) {
    if (questions.length > 0) {
     questions[questions.length - 1].answers.push(
      line.replace("- ", "").trim(),
     );
    }
   }
  }
 }

 if (currentQuestion) questions.push(currentQuestion);

 return [...questions];
}
