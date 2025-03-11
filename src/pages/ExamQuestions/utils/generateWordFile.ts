import { AlignmentType, Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export const generateWordFile = async (content: string[]) => {
 const doc = new Document({
  sections: content.map((question: string) => ({
   properties: {},
   children: [
    new Paragraph({
     alignment: AlignmentType.CENTER,
     children: [
      new TextRun({
       text: "Данный файл содержит вопрос:",
       bold: true,
       size: 24,
      }),
     ],
    }),
    new Paragraph({
     children: [new TextRun({ text: question, size: 24 })],
    }),
    new Paragraph({ children: [] }),
   ],
  })),
 });

 const blob = await Packer.toBlob(doc);
 saveAs(blob, "result.docx");
};
