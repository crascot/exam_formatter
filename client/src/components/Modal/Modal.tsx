import { ReactNode } from "react";
import "./Modal.less";

type ModalType = {
 children: ReactNode;
 onClick?: () => void;
};

export const Modal = ({ children, onClick }: ModalType) => {
 return (
  <div className="modal" onClick={onClick}>
   <div className="modal-inner" onClick={event => event.stopPropagation()}>
    {children}
   </div>
  </div>
 );
};
