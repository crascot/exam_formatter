import mammoth from "mammoth";
import React from "react";

export const handleFileUpload = (
 event: React.ChangeEvent<HTMLInputElement>,
 setContent: React.Dispatch<React.SetStateAction<string[]>>,
) => {
 const file = event.target.files?.[0];
 if (!file) return;

 const reader = new FileReader();
 reader.onload = async e => {
  const arrayBuffer = e.target?.result as ArrayBuffer;
  const result = await mammoth.extractRawText({ arrayBuffer });
  const lines = result.value.split("\n\n").filter(v => v.length > 0);

  if (lines.length > 40) {
   alert("Максимум 40 вопросов");
   setContent([]);
  }

  setContent(lines);
 };

 reader.readAsArrayBuffer(file);
};
