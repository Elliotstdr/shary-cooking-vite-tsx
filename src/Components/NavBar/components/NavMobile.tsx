import { useState } from "react";
import Nav from "./Nav";
import SlideIn from "../../ui/SlideIn";
import Bouton from "../../ui/Bouton";
import { GiKnifeFork } from "react-icons/gi";
import { useScreenSize } from "../../../Hooks/useScreenSize.hook";
import { useNavigate } from "react-router-dom";
import { TABLET } from "../../../Services/mediaQueries";

const NavMobile = () => {
  const [visibleMobile, setVisibleMobile] = useState(false);
  const screenSize = useScreenSize()
  const navigate = useNavigate();

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
        <>
          <Nav
            className="flex flex-col mr-4 font-dilgante"
            setVisibleMobile={setVisibleMobile}
          ></Nav>
          {screenSize.width <= TABLET &&
            <Bouton
              type="nav"
              btnAction={() => {
                navigate("/create")
                setVisibleMobile(false)
              }}
              className="ml-4 font-dilgante h-12 mt-4 !text-base"
            >
              <GiKnifeFork className="bouton-svg"></GiKnifeFork>Créer une recette
            </Bouton>
          }
        </>
      </SlideIn>}
    </div>
  );
};

export default NavMobile;