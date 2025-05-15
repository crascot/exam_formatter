import { createPortal } from "react-dom";
import "./LoaderModal.less";

export const LoaderModal = () => {
 const modal = () => (
  <div
   className="loader-modal"
   style={{
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
   }}
  >
   <h1>Загрузка...</h1>
  </div>
 );

 return createPortal(modal(), document.body);
};
