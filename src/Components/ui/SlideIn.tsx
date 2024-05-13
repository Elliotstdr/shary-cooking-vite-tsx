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
          `flex flex-col relative w-[48%] laptop:w-1/3 bg-white h-full 
          ${props.contentClassName || ""}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="pi pi-times cursor-pointer self-end hover:opacity-75 transition-all font-bold p-4"
          onClick={() => props.setVisible(false)}
        ></div>
        <div className="size-full overflow-y-scroll">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default SlideIn;