import React, { ReactNode } from "react";
import { Dialog } from "primereact/dialog";

interface Props {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  header?: string | ReactNode,
  className?: string,
  children: any,
  contentClassName?: string
}

const Modal = (props: Props) => {
  return (
    <Dialog
      appendTo={document.getElementById("app")}
      header={props.header}
      visible={props.visible}
      onHide={() => props.setVisible(false)}
      className={props.className + " w-fit h-fit"}
      contentClassName={props.contentClassName}
    >
      {props.children}
    </Dialog>
  );
};

export default Modal;
