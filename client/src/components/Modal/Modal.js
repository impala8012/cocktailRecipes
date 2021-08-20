import React, { useEffect } from "react";
import ReactDom from "react-dom";
import { ModalOverlay, ModalContainer } from "./Modal.element";
import AOS from "aos";

const Modal = ({ toggleModal, children }) => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);
  if (!toggleModal) return null;

  return ReactDom.createPortal(
    <ModalOverlay>
      <ModalContainer data-aos="fade-down">{children}</ModalContainer>
    </ModalOverlay>,
    document.getElementById("portal")
  );
};

export default Modal;
