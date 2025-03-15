export const readTxtFile = (file: File): Promise<string> => {
 return new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = e => resolve(e.target?.result as string);
  reader.onerror = err => reject(err);
  reader.readAsText(file);
 });
};
