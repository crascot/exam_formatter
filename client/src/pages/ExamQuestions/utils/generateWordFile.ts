import {
 AlignmentType,
 Document,
 IRunOptions,
 Packer,
 Paragraph,
 TextRun,
} from "docx";
import { saveAs } from "file-saver";
import { ExamType } from "../../../types/ExamTypes";
import { generateTickets } from "../../../utils/generateTickets";
import dayjs from "dayjs";
import { createScaledImageRun } from "../../../utils/createScaledImageRun";

const defaultRunOptions: IRunOptions = {
 font: "Times New Roman",
 size: 28,
};

export const generateWordFile = async (
 content: ExamType,
 desiredTicketsCount?: number,
) => {
 const tickets = generateTickets(
  content.questions,
  content.config,
  desiredTicketsCount,
 );

 const sections = await Promise.all(
  tickets.map(async (ticket, ticketIndex) => {
   const questionParagraphs: Paragraph[] = [];

   for (const [index, question] of ticket.entries()) {
    const imageRuns = await Promise.all(
     question.images.map(imageBase64 => createScaledImageRun(imageBase64)),
    );

    if (imageRuns.length > 0) {
     questionParagraphs.push(
      new Paragraph({
       children: imageRuns,
       alignment: AlignmentType.CENTER,
      }),
     );
    }

    questionParagraphs.push(
     new Paragraph({
      children: [
       new TextRun({
        ...defaultRunOptions,
        text: `Вопрос ${index + 1}: ${question.question}`,
       }),
      ],
      alignment: AlignmentType.LEFT,
     }),
    );

    questionParagraphs.push(
     new Paragraph({
      children: [new TextRun({ text: "" })],
     }),
    );
   }

   return {
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
        text:
         "КЫРГЫЗСКИЙ ГОСУДАРСТВЕННЫЙ ТЕХНИЧЕСКИЙ УНИВЕРСИТЕТ ИМИ РАЗЗАКОВА",
        bold: true,
       }),
      ],
      alignment: "center",
     }),
     new Paragraph({ children: [new TextRun({ text: "" })] }),
     new Paragraph({
      children: [
       new TextRun({
        ...defaultRunOptions,
        text: `Кафедры: ${content.department}`,
       }),
      ],
     }),
     new Paragraph({ children: [new TextRun({ text: "" })] }),
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
     new Paragraph({ children: [new TextRun({ text: "" })] }),
     new Paragraph({
      children: [
       new TextRun({
        ...defaultRunOptions,
        text: `По дисциплине: ${content.lesson}`,
       }),
      ],
     }),
     new Paragraph({
      children: [
       new TextRun({
        ...defaultRunOptions,
        text: `Курс: ${content.course}`,
       }),
      ],
     }),
     new Paragraph({ children: [new TextRun({ text: "" })] }),

     ...questionParagraphs,
    ],
   };
  }),
 );

 const doc = new Document({ sections } as any);

 const blob = await Packer.toBlob(doc);

 saveAs(
  blob,
  `${content.department}_${content.course}_${dayjs(new Date()).format(
   "DD.MM.YYYY",
  )}.docx`,
 );
};
