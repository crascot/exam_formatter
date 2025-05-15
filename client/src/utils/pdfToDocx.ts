import { API_KEY } from "../KEYS";
import { base64ToFile } from "./base64ToFile";
import { readDocxFiles } from "./readers/readDocx";

export const pdfToDocx = async (files: File[]) => {
 const results = await Promise.all(
  files.map(async file => {
   const formData = new FormData();
   formData.append("file", file);
   formData.append("name", "converted.docx");

   const response = await fetch(
    `https://v2.convertapi.com/convert/pdf/to/docx?auth=${API_KEY}`,
    {
     method: "POST",
     body: formData,
    },
   );

   if (!response.ok) {
    console.warn(`Не удалось сконвертировать: ${file.name}`);
    return null;
   }

   const data = await response.json();
   const { FileData, FileName } = data.Files[0];

   const docxFile = base64ToFile(FileData, FileName);
   const [html] = await readDocxFiles([docxFile]);

   return html;
  }),
 );

 return results.filter((html): html is string => Boolean(html));
};
