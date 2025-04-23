import mammoth from "mammoth";

export const readDocxFiles = async (files: File[]) => {
 const parsedFiles: string[] = [];

 for (const file of files) {
  const arrayBuffer = await file.arrayBuffer();

  const { value: html } = await mammoth.convertToHtml(
   { arrayBuffer },
   {
    convertImage: (mammoth.images as any).inline(async function (image: any) {
     const base64 = await image.read("base64");
     return {
      src: `data:${image.contentType};base64,${base64}`,
     };
    }),
   },
  );

  parsedFiles.push(html);
 }

 return parsedFiles;
};
