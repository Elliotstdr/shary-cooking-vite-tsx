import React from "react";
import "./Bouton.css";

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
      className={`bouton ${props.className} ${props.type}`}
      onClick={props.btnAction}
    >
      <div className={`before ${props.beforeClassName || ""}`}></div>
      {props.children}
      {props.btnTexte}
      <div className={`after ${props.afterClassName || ""}`}></div>
    </button>
  );
};

Bouton.defaultProps = {
  type: "slide",
  className: "",
};

export default Bouton;
