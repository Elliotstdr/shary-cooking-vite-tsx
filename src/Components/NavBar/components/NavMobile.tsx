import { useState, useRef } from "react";
import { useOutsideAlerter } from "../../../Hooks/useOutsideAlerter.hook";
import Nav from "./Nav";

const NavMobile = () => {
  const [visibleMobile, setVisibleMobile] = useState(false);

  const menuRef = useRef(null);
  useOutsideAlerter(menuRef, () => setVisibleMobile(false));

  return (
    <div className="w-40 relative" ref={menuRef}>
      <div
        className="flex items-center cursor-pointer p-4 pb-2 text-xl font-bold !font-apple"
        onClick={() => setVisibleMobile(!visibleMobile)}
      >
        <div className="pi pi-bars mr-1"></div>
        Menu
      </div>
      <Nav className={`absolute w-56 z-50 bg-white rounded-md text-left flex flex-col m-0 py-2 transition-300 ${visibleMobile ? "visible-transition" : "hidden-transition"}`}></Nav>
    </div>
  );
};

export default NavMobile;