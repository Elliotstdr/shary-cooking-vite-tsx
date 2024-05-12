import React from "react";

type Props = {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  children?: any,
  contentClassName?: string
}

const SlideIn = (props: Props) => {
  return (
    <div
      className={`z-[1100] fixed top-0 left-0 h-full w-[200%] transition-300 ${props.visible ? 'visible-slide' : 'hidden-slide'}`}
      onClick={() => props.setVisible(false)}
    >
      <div
        className={
          `flex flex-col py-4 relative w-[48%] laptop:w-1/3 bg-white overflow-y-scroll h-full 
          ${props.contentClassName || ""}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="pi pi-times cursor-pointer absolute top-4 right-4 hover:opacity-75 transition-all font-bold"
          onClick={() => props.setVisible(false)}
        ></div>
        {props.children}
      </div>
    </div>
  );
};

export default SlideIn;