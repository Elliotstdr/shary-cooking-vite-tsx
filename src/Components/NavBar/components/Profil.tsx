import { logOut } from "../../../Store/Reducers/authReducer";
import { GiKnifeFork, GiCook } from "react-icons/gi";
import Bouton from "../../ui/Bouton/Bouton";
import { useRef, useState } from "react";
import { useOutsideAlerter } from "../../../Hooks/useOutsideAlerter.hook";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Profil = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const auth = useSelector((state: RootState) => state.auth);

  const [showParamMenu, setShowParamMenu] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => setShowParamMenu(false));

  return (
    <>
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
        <div className={`absolute -right-14 top-12 w-40 bg-white text-green rounded-xl z-50 ${showParamMenu ? "flex flex-col" : "hidden"}`}>
          <span onClick={() => navigate("/param")} className="p-2 rounded-xl text-lg hover:bg-orange hover:text-white">Mon profil</span>
          <span
            className="p-2 rounded-xl text-lg hover:bg-orange hover:text-white"
            onClick={() => {
              dispatch(logOut())
              navigate("/");
            }}
          >
            Se déconnecter
          </span>
        </div>
      </div>
    </>
  );
};

export default Profil;