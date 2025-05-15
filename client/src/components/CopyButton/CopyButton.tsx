import "./CopyButton.less";

type CopyButtonType = {
 textToCopy: string;
};

export const CopyButton = ({ textToCopy }: CopyButtonType) => {
 const handleCopy = async () => {
  try {
   await navigator.clipboard.writeText(textToCopy);
   alert("Текст скопирован!");
  } catch (err) {
   console.error("Ошибка при копировании:", err);
  }
 };

 return (
  <button className="copy-button" onClick={handleCopy}>
   Скопировать
  </button>
 );
};
