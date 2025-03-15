import "./Instructions.less";
import { downloadFile } from "../../utils/download";

export const Instructions = () => {
 return (
  <div className="instructions">
   <div className="instructions-block" onClick={downloadFile}>
    <h3>Скачать шаблон</h3>
   </div>
  </div>
 );
};
