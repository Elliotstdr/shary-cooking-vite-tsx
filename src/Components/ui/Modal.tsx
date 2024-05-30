import React from "react";
import ReactDOM from "react-dom";

type Props = {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  children?: any,
  header?: any
  className?: string
  contentClassName?: string
  headerClassName?: string
}

const Modal = (props: Props) => {
  return ReactDOM.createPortal(
    <div
      className={`flex-center z-[1101] fixed top-0 left-0 size-full bg-black bg-opacity-40 animate-bg-black`}
      onClick={() => props.setVisible(false)}
    >
      <div
        className={`flex flex-col max-h-[90%] animate-scale ${props.className || ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex items-center bg-green p-6 rounded-t-md uppercase text-white font-bold ${props.headerClassName || ""}`}>
          <div className="flex-grow text-lg">
            {props.header}
          </div>
          <div
            className="pi pi-times size-4 cursor-pointer opacity-50 transition-all hover:opacity-100"
            onClick={() => props.setVisible(false)}
          ></div>
        </div>
        <div className={`flex flex-col pb-8 px-6 relative bg-white rounded-b-md resize-y overflow-y-auto flex-grow ${props.contentClassName || ""}`}>
          {props.children}
        </div>
      </div>
    </div>,
    document.getElementById("root") as Element
  );
};

export default Modal;