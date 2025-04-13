import "./Instructions.less";

type InstructionsType = {
 downloadFile: () => Promise<void>;
};

export const Instructions = ({ downloadFile }: InstructionsType) => {
 return (
  <div className="instructions">
   <div className="instructions-block" onClick={downloadFile}>
    <h3>Скачать шаблон</h3>
   </div>
  </div>
 );
};
