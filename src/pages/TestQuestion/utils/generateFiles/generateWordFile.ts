import { Question } from "../../types/questionTipe";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export const generateWordFile = async (content: Question[]) => {
 const doc = new Document({
  sections: [
   {
    properties: {},
    children: content.flatMap(({ text, answers }) => [
     new Paragraph({
      children: [new TextRun({ text, bold: true })],
     }),
     ...answers.map(
      (answer, index) => new Paragraph(`${index + 1}. ${answer}`),
     ),
     new Paragraph(""),
    ]),
   },
  ],
 });

 Packer.toBlob(doc).then(blob => {
  saveAs(blob, "questions.docx");
 });
};
