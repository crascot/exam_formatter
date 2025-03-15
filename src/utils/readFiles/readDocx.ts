import mammoth from "mammoth";

export const readDocxFile = (file: File): Promise<string> => {
 return new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = e => {
   const arrayBuffer = e.target?.result as ArrayBuffer;
   if (arrayBuffer) {
    mammoth
     .extractRawText({ arrayBuffer })
     .then(result => resolve(result.value))
     .catch(err => reject(err));
   }
  };
  reader.onerror = err => reject(err);
  reader.readAsArrayBuffer(file);
 });
};
