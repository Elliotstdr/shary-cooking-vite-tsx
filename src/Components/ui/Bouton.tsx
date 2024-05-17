import React from "react";

interface Props {
  className?: string,
  type?: "slide" | "normal" | "nav",
  btnAction?: React.MouseEventHandler<HTMLButtonElement>,
  children?: any,
  btnTexte?: string
  afterClassName?: string
  beforeClassName?: string
}

const Bouton = ({ className = "", type = "slide", btnAction, children, btnTexte, afterClassName = "", beforeClassName = "" }: Props) => {
  return (
    <button
      className={`
        group cursor-pointer overflow-hidden whitespace-nowrap border-2 border-green flex-center px-6 rounded-full duration-300 transition-all 
        relative z-1 font-bold min-w-fit h-10 text-sm tablet:h-12 tablet:text-base
        ${type === "nav" ? "text-white hover:text-green shadow-btn" : "text-green hover:text-fond"}
        ${type === "normal" ? "bg-transparent duration-500 hover:bg-green" : ""}
        ${className} 
      `}
      onClick={btnAction}
    >
      <div className={`
        ${beforeClassName} 
        ${type !== "normal" ? "absolute bottom-0 left-0 w-0 h-full duration-500 transition-all rounded-full -z-1 group-hover:!w-full" : ""}
        ${type === "slide" ? "bg-green" : type === "nav" ? "bg-fond" : ""}
      `}></div>
      {children}
      {btnTexte}
      <div className={`
        ${afterClassName}
        ${type !== "normal" ? "absolute bottom-0 left-0 size-full rounded-full -z-2" : ""}
        ${type === "slide" ? "bg-transparent" : type === "nav" ? "bg-green" : ""}
      `}></div>
    </button>
  );
};

export default Bouton;
