import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import { useSelector } from "react-redux";
import { GiCook } from "react-icons/gi";
import Bouton from "../ui/Bouton/Bouton";
import Nav from "./Nav";
import { logOut } from "../../Hooks/useAxiosInterceptor.hook";
import { useScreenSize } from "../../Hooks/useScreenSize.hook";
import { useOutsideAlerter } from "../../Hooks/useOutsideAlerter.hook";

const NavBar = () => {
  const screenSize = useScreenSize()
  const auth = useSelector((state: RootState) => state.auth);
  const [showParamMenu, setShowParamMenu] = useState(false);
  const [visibleMobile, setVisibleMobile] = useState(false);
  const navigate = useNavigate();

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => setShowParamMenu(false));

  const menuRef = useRef(null);
  useOutsideAlerter(menuRef, () => setVisibleMobile(false));

  return (
    <div className="font-dilgante flex flex-col items-start justify-around pt-2 pb-4 shadow-home pl-8 tablet:flex-row tablet:items-center tablet:px-0 tablet:py-8">
      {screenSize.width > 990
        ? <Nav className="h-12"></Nav>
        : <div className="w-40 relative" ref={menuRef}>
          <div
            className="flex items-center cursor-pointer p-4 pb-2 text-xl font-bold !font-apple"
            onClick={() => setVisibleMobile(!visibleMobile)}
          >
            <div className="pi pi-bars mr-1"></div>
            Menu
          </div>
          <Nav className={`absolute w-56 z-50 bg-white rounded-md text-left flex flex-col m-0 py-2 transition-300 ${visibleMobile ? "visible-transition" : "hidden-transition"}`}></Nav>
        </div>
      }
      <Bouton className="font-dilgante px-4 w-48 my-2 tablet:w-unset tablet:my-0 desktop:px-0" btnAction={() => navigate("/create")}>
        <GiKnifeFork></GiKnifeFork>Créer une recette
      </Bouton>
      <div
        className="cursor-pointer absolute top-8 right-8 flex tablet:relative tablet:right-0 tablet:top-0"
        ref={wrapperRef}
        onMouseEnter={() => setShowParamMenu(true)}
        onMouseLeave={() => setShowParamMenu(false)}
      >
        {auth.userConnected?.imageUrl ? (
          <img
            src={
              import.meta.env.VITE_BASE_URL_API + auth.userConnected.imageUrl
            }
            alt="ma pp"
            onClick={() => setShowParamMenu(!showParamMenu)}
            className="object-cover size-12 rounded-full"
          ></img>
        ) : (
          <GiCook
            className="size-12 text-green"
            onClick={() => setShowParamMenu(!showParamMenu)}
          ></GiCook>
        )}
        <div
          className={`absolute -right-14 top-12 w-40 bg-white text-green rounded-xl z-50 ${showParamMenu ? "flex flex-col" : "hidden"}`}
        >
          <span onClick={() => navigate("/param")} className="p-2 rounded-xl text-base hover:bg-orange hover:text-white">Mon profil</span>
          <span
            className="p-2 rounded-xl text-base hover:bg-orange hover:text-white"
            onClick={() => {
              logOut()
              navigate("/");
            }}
          >
            Se déconnecter
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
