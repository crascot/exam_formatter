import { createPortal } from "react-dom";
import "./Instructions.less";
import { ReactNode, useState } from "react";
import { Modal } from "../Modal/Modal";

type InstructionsType = {
 modalComponent: ReactNode;
};

export const Instructions = ({ modalComponent }: InstructionsType) => {
 const [showModal, setShowModal] = useState(false);

 const openModal = () => {
  setShowModal(true);
 };

 const closeModal = () => {
  setShowModal(false);
 };

 return (
  <div className="instructions">
   <div className="instructions-block" onClick={openModal}>
    <h3>Пример заполнения</h3>
   </div>
   {showModal &&
    createPortal(
     <Modal onClick={closeModal}>{modalComponent}</Modal>,
     document.getElementById("modal-root")!,
    )}
  </div>
 );
};
