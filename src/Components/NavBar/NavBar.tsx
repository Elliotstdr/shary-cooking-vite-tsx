import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.scss";
import { GiKnifeFork } from "react-icons/gi";
import { useSelector } from "react-redux";
import { GiCook } from "react-icons/gi";
import Bouton from "../ui/Bouton/Bouton";
import Nav from "./Nav/Nav";
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
    <div className="navigation">
      {screenSize.width > 990
        ? <Nav className="desktop"></Nav>
        : <div className="navigation__mobile" ref={menuRef}>
          <div
            className="navigation__mobile__header"
            onClick={() => setVisibleMobile(!visibleMobile)}
          >
            <div className="pi pi-bars"></div>
            Menu
          </div>
          <Nav className={`mobile ${visibleMobile ? "visible" : "hidden"}`}></Nav>
        </div>
      }
      <Bouton className="first" btnAction={() => navigate("/create")}>
        <GiKnifeFork></GiKnifeFork>Créer une recette
      </Bouton>
      <div className="navigation_parameters" ref={wrapperRef}>
        {auth.userConnected?.imageUrl ? (
          <img
            src={
              import.meta.env.VITE_BASE_URL_API + auth.userConnected.imageUrl
            }
            alt="ma pp"
            onClick={() => setShowParamMenu(!showParamMenu)}
          ></img>
        ) : (
          <GiCook
            className="cooker"
            onClick={() => setShowParamMenu(!showParamMenu)}
          ></GiCook>
        )}
        <div
          className={`navigation_parameters_menu ${showParamMenu && "visible"}`}
        >
          <span onClick={() => navigate("/param")}>Mon profil</span>
          <span
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
