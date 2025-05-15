import { FileTypeEnum } from "../types/FileTypeEnum";

export function base64ToFile(
 base64: string,
 filename: string,
 mime = FileTypeEnum.DOCX,
): File {
 const cleanedBase64 = base64.includes(",") ? base64.split(",")[1] : base64;

 const binary = atob(cleanedBase64);
 const len = binary.length;
 const buffer = new Uint8Array(len);
 for (let i = 0; i < len; i++) {
  buffer[i] = binary.charCodeAt(i);
 }

 return new File([buffer], filename, { type: mime });
}
