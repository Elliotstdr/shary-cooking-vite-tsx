import React from "react";

interface Props {
  className?: string,
  type?: "slide" | "nav",
  btnAction?: React.MouseEventHandler<HTMLButtonElement>,
  children?: any,
}

const Bouton = ({ className = "", type = "slide", btnAction, children }: Props) => {
  return (
    <button
      className={`
        group flex-center relative min-w-fit h-10 px-6 font-bold text-sm border-2 border-green rounded-full 
        overflow-hidden whitespace-nowrap z-1 transition-300 tablet:h-12 tablet:text-base
        ${type === "nav"
          ? "text-white hover:text-green shadow-btn px-4 w-48 my-2 tablet:w-unset tablet:my-0"
          : "text-green hover:text-fond"
        }
        ${className} 
      `}
      onClick={btnAction}
    >
      <div className={`absolute bottom-0 left-0 w-0 h-full duration-500 transition-all rounded-full -z-1 group-hover:!w-full ${type === "nav" ? "bg-fond" : "bg-green"}`}></div>
      {children}
      <div className={`absolute bottom-0 left-0 size-full rounded-full -z-2 ${type === "slide" ? "bg-transparent" : "bg-green"}`}></div>
    </button>
  );
};

export default Bouton;
