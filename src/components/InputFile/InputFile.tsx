import { InputHTMLAttributes } from "react";
import UploadFile from "../../icons/svg/upload.svg";
import "./InputFile.less";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
 id: string;
};

export const InputFile = ({ id, onChange }: InputProps) => {
 return (
  <div className="input-file">
   <input
    id={id}
    type="file"
    multiple
    accept=".doc,.docx,.pdf,.txt"
    onChange={onChange}
   />
   <label htmlFor={id}>
    <UploadFile />
    Загрузить файл
   </label>
  </div>
 );
};
