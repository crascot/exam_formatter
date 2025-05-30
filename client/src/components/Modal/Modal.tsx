import { ReactNode } from "react";
import "./Modal.less";
import { createPortal } from "react-dom";

type ModalType = {
 children: ReactNode;
 onClick?: () => void;
};

export const Modal = ({ children, onClick }: ModalType) => {
 const modal = () => (
  <div
   className="modal"
   onClick={onClick}
   style={{
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
   }}
  >
   <div className="modal-inner" onClick={event => event.stopPropagation()}>
    {children}
   </div>
  </div>
 );

 return createPortal(modal(), document.body);
};
