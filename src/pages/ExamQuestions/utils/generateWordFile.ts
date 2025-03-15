import {
 AlignmentType,
 Document,
 IRunOptions,
 Packer,
 Paragraph,
 TextRun,
} from "docx";
import { saveAs } from "file-saver";
import { Difficulty, ExamType, Question } from "../../../types/ExamTypes";

const defaultRunOptions: IRunOptions = {
 font: "Times New Roman",
 size: 28,
};

export const generateWordFile = async (
 content: ExamType,
 difficult: Difficulty,
 count: number = 2,
) => {
 const filteredQuestions = content.questions.filter(
  q => q.difficulty === difficult,
 );

 const generateTickets = (
  questions: Question[],
  questionsPerTicket: number,
 ) => {
  const tickets: Question[][] = [];
  for (let i = 0; i < questions.length; i += questionsPerTicket) {
   tickets.push(questions.slice(i, i + questionsPerTicket));
  }
  return tickets;
 };

 const tickets = generateTickets(filteredQuestions, count);

 const doc = new Document({
  sections: tickets.map((ticket, ticketIndex) => ({
   properties: {
    page: {
     size: {
      orientation: "landscape",
     },
    },
   },
   children: [
    new Paragraph({
     children: [
      new TextRun({
       ...defaultRunOptions,
       text: "И. РАЗЗАКОВ АТЫНДАГЫ",
       bold: true,
      }),
      new TextRun({
       ...defaultRunOptions,
       text: " КЫРГЫЗ МАМЛЕКЕТТИК ТЕХНИКАЛЫК УНИВЕРСИТЕТИ",
       bold: true,
      }),
     ],
     alignment: "center",
    }),
    new Paragraph({
     children: [
      new TextRun({
       ...defaultRunOptions,
       text: "КЫРГЫЗСКИЙ ГОСУДАРСТВЕННЫЙ ТЕХНИЧЕСКИЙ УНИВЕРСИТЕТ ИМИ РАЗЗАКОВА",
       bold: true,
      }),
     ],
     alignment: "center",
    }),
    new Paragraph({
     children: [
      new TextRun({
       ...defaultRunOptions,
       text: "",
      }),
     ],
    }),
    new Paragraph({
     children: [
      new TextRun({
       ...defaultRunOptions,
       text: `Кафедры: ${content.department}`,
      }),
     ],
    }),
    new Paragraph({
     children: [
      new TextRun({
       ...defaultRunOptions,
       text: "",
      }),
     ],
    }),
    new Paragraph({
     children: [
      new TextRun({
       ...defaultRunOptions,
       text: `ЫМТЫКАНДЫК БЕЛЕТ №${ticketIndex + 1}`,
       bold: true,
      }),
     ],
     alignment: "center",
    }),
    new Paragraph({
     children: [
      new TextRun({
       ...defaultRunOptions,
       text: `ЭКЗАМЕНЦИОННЫЙ БИЛЕТ №${ticketIndex + 1}`,
       bold: true,
      }),
     ],
     alignment: "center",
    }),
    new Paragraph({
     children: [
      new TextRun({
       ...defaultRunOptions,
       text: "",
      }),
     ],
    }),
    new Paragraph({
     children: [
      new TextRun({
       ...defaultRunOptions,
       text: `По курсу: ${content.lesson}`,
      }),
     ],
    }),
    ...ticket.map(question => {
     return new Paragraph({
      children: [
       new TextRun({
        ...defaultRunOptions,
        text: `${question.question}`,
       }),
      ],
      alignment: AlignmentType.LEFT,
     });
    }),
   ],
  })),
 });

 Packer.toBlob(doc).then(blob => {
  saveAs(
   blob,
   `${content.department}_${content.course}_exam_${difficult}.docx`,
  );
 });
};
