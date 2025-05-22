import { ImageRun } from "docx";

export async function createScaledImageRun(
 base64WithPrefix: string,
 maxWidth = 300,
): Promise<ImageRun> {
 return new Promise((resolve, reject) => {
  const img = new Image();

  img.onload = () => {
   const scale = Math.min(1, maxWidth / img.width);
   const width = img.width * scale;
   const height = img.height * scale;

   const base64 = base64WithPrefix.split(",")[1];

   resolve(
    new ImageRun({
     type: "jpg",
     data: base64,
     transformation: {
      width: Math.round(width),
      height: Math.round(height),
     },
    }),
   );
  };

  img.onerror = () => reject(new Error("Failed to load image"));
  img.src = base64WithPrefix;
 });
}
