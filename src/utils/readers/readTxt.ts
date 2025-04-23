export const readTxtFiles = (files: File[]): Promise<string[]> => {
 const readers = files.map(file => {
  return new Promise<string>((resolve, reject) => {
   const reader = new FileReader();
   reader.onload = e => resolve(e.target?.result as string);
   reader.onerror = err => reject(err);
   reader.readAsText(file);
  });
 });

 return Promise.all(readers);
};
