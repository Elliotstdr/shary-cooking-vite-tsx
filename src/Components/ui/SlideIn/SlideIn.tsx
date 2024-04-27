import React from "react";
import { Sidebar } from "primereact/sidebar";

interface Props {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  className?: string,
  children?: any
}

const SlideIn = (props: Props) => {
  return (
    <Sidebar
      className={`sidebar ${props.className}`}
      visible={props.visible}
      onHide={() => props.setVisible(false)}
      position="left"
      showCloseIcon
      closeOnEscape
    >
      {props.children}
    </Sidebar>
  );
};

export default SlideIn;
