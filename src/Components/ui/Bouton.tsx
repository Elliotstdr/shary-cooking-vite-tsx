import React from "react";

interface Props {
  className?: string,
  type?: "slide" | "normal",
  btnAction?: React.MouseEventHandler<HTMLButtonElement>,
  children?: any,
  btnTexte?: string
  afterClassName?: string
  beforeClassName?: string
}

const Bouton = (props: Props) => {
  return (
    <button
      className={`
        group cursor-pointer overflow-hidden whitespace-nowrap border-2 border-green flex-center px-6 rounded-full text-green duration-300 transition-all 
        relative z-1 font-bold min-w-fit h-10 text-sm tablet:h-12 tablet:text-base hover:text-fond hover:border-fond
        ${props.type === "normal" ? "bg-transparent duration-500 hover:bg-green hover:text-white" : ""}
        ${props.className} 
      `}
      onClick={props.btnAction}
    >
      <div className={`
        ${props.beforeClassName || ""} 
        ${props.type === "slide" ? "absolute bottom-0 left-0 w-0 h-full bg-green duration-500 transition-all rounded-full -z-1 group-hover:!w-full" : ""}
      `}></div>
      {props.children}
      {props.btnTexte}
      <div className={`
        ${props.afterClassName || ""}
        ${props.type === "slide" ? "absolute bottom-0 left-0 size-full bg-transparent rounded-full -z-2" : ""}
      `}></div>
    </button>
  );
};

Bouton.defaultProps = {
  type: "slide",
  className: "",
};

export default Bouton;
