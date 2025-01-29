import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const closeModal = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, setOpenName, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens }) {
  const { setOpenName } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => setOpenName(opens),
  });
}

function Window({ children, name }) {
  const { openName, closeModal } = useContext(ModalContext);

  const ref = useOutsideClick(closeModal);

  if (openName !== name) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={closeModal}>
          <HiXMark />
        </Button>{" "}
        <div>
          {cloneElement(children, {
            onCancel: () => closeModal(),
          })}
        </div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

// Old code
// function Modal({ children, onCLose }) {
//   return (
//     <Overlay>
//       <StyledModal>
//         <Button onClick={onCLose}>
//           <HiXMark />
//         </Button>{" "}
//         <div>{children}</div>
//       </StyledModal>
//     </Overlay>
//   );
// }
