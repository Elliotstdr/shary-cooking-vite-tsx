import React from "react";

interface Props {
  className?: string,
  btnAction?: React.MouseEventHandler<HTMLButtonElement>,
  children?: any,
  btnTexte?: string
}

const SimpleButton = ({ className = "", btnAction, children, btnTexte }: Props) => {
  return (
    <button
      className={`
        min-w-fit h-10 flex-center px-6 font-bold text-sm text-green bg-transparent 
        rounded-full border-2 border-green transition-all duration-500
        tablet:h-12 tablet:text-base hover:text-fond hover:bg-green
        ${className} 
      `}
      onClick={btnAction}
    >
      {children}
      {btnTexte}
    </button>
  );
};

export default SimpleButton;
