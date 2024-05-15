import { useState, useRef } from "react";
import { useOutsideAlerter } from "../../../Hooks/useOutsideAlerter.hook";
import Nav from "./Nav";
import SlideIn from "../../ui/SlideIn";

const NavMobile = () => {
  const [visibleMobile, setVisibleMobile] = useState(false);

  const menuRef = useRef(null);
  useOutsideAlerter(menuRef, () => setVisibleMobile(false));

  return (
    <div className="w-40 relative" ref={menuRef}>
      <div
        className="flex items-center cursor-pointer text-xl font-bold !font-apple"
        onClick={() => setVisibleMobile(!visibleMobile)}
      >
        <div className="pi pi-bars mr-1"></div>
        Menu
      </div>
      <SlideIn
        visible={visibleMobile}
        setVisible={setVisibleMobile}
        contentClassName="!w-fit"
      >
        <Nav
          className="flex flex-col mr-4"
          setVisibleMobile={setVisibleMobile}
        ></Nav>
      </SlideIn>
    </div>
  );
};

export default NavMobile;