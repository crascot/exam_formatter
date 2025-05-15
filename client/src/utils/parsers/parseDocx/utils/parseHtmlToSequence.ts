import { ParsedItem } from "../../../../types/parsedItem";

export function parseHtmlToSequence(html: string): ParsedItem[] {
 const parser = new DOMParser();
 const doc = parser.parseFromString(html, "text/html");
 const body = doc.body;

 const sequence: ParsedItem[] = [];
 let questionCounter = 1;

 const walk = (node: HTMLElement) => {
  // Для PDF структуры: <ol><li>ВОПРОС<ul><li>ответ</li></ul></li>
  if (node.tagName === "OL") {
   const questionNodes = node.children;
   for (const li of Array.from(questionNodes)) {
    if (li.tagName === "LI") {
     const questionText = li.firstChild?.textContent?.trim();
     if (questionText) {
      sequence.push({
       type: "text",
       value: `${questionCounter}. ${questionText}`,
      });
      questionCounter++;
     }

     const sublist = li.querySelector("ul");
     if (sublist) {
      for (const subLi of Array.from(sublist.children)) {
       if (subLi.tagName === "LI") {
        const answerText = subLi.textContent?.trim();
        if (answerText) {
         sequence.push({
          type: "text",
          value: `- ${answerText}`,
         });
        }
       }
      }
     }
    }
   }
   return;
  }

  // Старый подход для p
  if (node.tagName === "P") {
   const text = node.textContent?.trim();
   if (text) sequence.push({ type: "text", value: text });
  }

  // Добавим универсальную обработку IMG
  if (node.tagName === "IMG") {
   const src = node.getAttribute("src");
   if (src?.startsWith("data:image")) {
    sequence.push({ type: "image", id: src });
   }
  }

  // Рекурсивный проход
  for (const child of Array.from(node.children)) {
   walk(child as HTMLElement);
  }
 };

 walk(body);
 return sequence;
}
