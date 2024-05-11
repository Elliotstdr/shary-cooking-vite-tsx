import React from "react";

type Props = {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  children?: any
}

const SlideIn = (props: Props) => {
  return (
    <div
      className={`z-[1100] bg-[black]/50 fixed top-0 left-0 size-full ${props.visible ? 'flex' : 'hidden'}`}
      onClick={() => props.setVisible(false)}
    >
      <div
        className="flex flex-col py-4 relative w-[95%] laptop:w-2/3 bg-white overflow-y-scroll h-full animate-sidebar"
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