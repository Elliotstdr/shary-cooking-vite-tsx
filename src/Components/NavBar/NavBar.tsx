import Nav from "./components/Nav";
import { useScreenSize } from "../../Hooks/useScreenSize.hook";
import Profil from "./components/Profil";
import NavMobile from "./components/NavMobile";
import Bouton from "../ui/Bouton";
import { GiKnifeFork } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import React from "react";
import { NAV, TABLET } from "../../Services/mediaQueries";

const NavBar = React.memo(() => {
  const screenSize = useScreenSize()
  const navigate = useNavigate();

  return (
    <div id="navbar" className="font-dilgante flex items-center justify-between py-4 px-8 shadow-home tablet:py-8 tablet:px-12 nav:px-0 nav:justify-around">
      {screenSize.width > NAV
        ? <Nav className="h-12"></Nav>
        : <NavMobile></NavMobile>
      }
      <div className="flex gap-12">
        {screenSize.width > TABLET && <Bouton type="nav" btnAction={() => navigate("/create")}>
          <GiKnifeFork className="bouton-svg"></GiKnifeFork>Créer une recette
        </Bouton>}
        <Profil></Profil>
      </div>
    </div>
  );
});

export default NavBar;
