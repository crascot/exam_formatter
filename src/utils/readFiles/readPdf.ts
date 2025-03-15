import { getDocument } from "pdfjs-dist";

export const readPdfFile = async (file: File): Promise<string> => {
 const data = await file.arrayBuffer();
 const pdfDoc = await getDocument(data as any).promise;
 let textContent = "";

 for (let i = 0; i < pdfDoc.numPages; i++) {
  const page = await pdfDoc.getPage(i + 1);
  const textContentPage = await page.getTextContent();

  let lastY = 0;

  textContentPage.items.forEach((item: any) => {
   const { str, transform } = item;
   const y = transform[5];

   if (Math.abs(lastY - y) > 5) {
    textContent += "\n";
   }

   textContent += str + " ";
   lastY = y;
  });

  textContent += "\n\n";
 }

 return textContent.trim();
};
