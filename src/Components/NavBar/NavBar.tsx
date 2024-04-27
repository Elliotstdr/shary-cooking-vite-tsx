import Nav from "./components/Nav";
import { useScreenSize } from "../../Hooks/useScreenSize.hook";
import Profil from "./components/Profil";
import NavMobile from "./components/NavMobile";

const NavBar = () => {
  const screenSize = useScreenSize()

  return (
    <div id="navbar" className="font-dilgante flex flex-col items-start justify-around pt-2 pb-4 shadow-home pl-8 tablet:flex-row tablet:items-center tablet:px-0 tablet:py-8">
      {screenSize.width > 990
        ? <Nav className="h-12"></Nav>
        : <NavMobile></NavMobile>
      }
      <Profil></Profil>
    </div>
  );
};

export default NavBar;
