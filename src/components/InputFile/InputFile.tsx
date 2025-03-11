import React, { InputHTMLAttributes } from "react";
import UploadFile from "../../icons/svg/upload.svg";
import "./InputFile.less";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const InputFile = ({ onChange }: InputProps) => {
 return (
  <div className="input-file">
   <input type="file" accept=".docx" id="imageInput" onChange={onChange} />
   <label htmlFor="imageInput">
    <UploadFile />
    Загрузить файл
   </label>
  </div>
 );
};
