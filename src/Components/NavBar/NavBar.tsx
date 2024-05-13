import Nav from "./components/Nav";
import { useScreenSize } from "../../Hooks/useScreenSize.hook";
import Profil from "./components/Profil";
import NavMobile from "./components/NavMobile";
import Bouton from "../ui/Bouton";
import { GiKnifeFork } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import React from "react";

const NavBar = React.memo(() => {
  const screenSize = useScreenSize()
  const navigate = useNavigate();

  return (
    <div id="navbar" className="font-dilgante flex flex-col items-start justify-around pt-2 pb-4 shadow-home pl-8 tablet:flex-row tablet:items-center tablet:px-0 tablet:py-8">
      {screenSize.width > 990
        ? <Nav className="h-12"></Nav>
        : <NavMobile></NavMobile>
      }
      <div className="flex gap-12">
        <Bouton className="font-dilgante px-4 w-48 my-2 tablet:w-unset tablet:my-0" btnAction={() => navigate("/create")}>
          <GiKnifeFork className="bouton-svg"></GiKnifeFork>Créer une recette
        </Bouton>
        <Profil></Profil>
      </div>
    </div>
  );
});

export default NavBar;
