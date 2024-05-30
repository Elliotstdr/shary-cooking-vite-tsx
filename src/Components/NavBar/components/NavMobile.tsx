import { useState } from "react";
import Nav from "./Nav";
import SlideIn from "../../ui/SlideIn";

const NavMobile = () => {
  const [visibleMobile, setVisibleMobile] = useState(false);

  return (
    <div className="w-40 relative">
      <div
        className="flex items-center cursor-pointer text-xl font-bold !font-apple"
        onClick={() => setVisibleMobile(!visibleMobile)}
      >
        <div className="pi pi-bars mr-1"></div>
        Menu
      </div>
      {visibleMobile && <SlideIn
        visible={visibleMobile}
        setVisible={setVisibleMobile}
        contentClassName="!w-fit"
      >
        <Nav
          className="flex flex-col mr-4 font-dilgante"
          setVisibleMobile={setVisibleMobile}
        ></Nav>
      </SlideIn>}
    </div>
  );
};

export default NavMobile;