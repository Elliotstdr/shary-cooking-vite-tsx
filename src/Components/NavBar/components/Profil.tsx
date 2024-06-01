import { logOut } from "../../../Store/Reducers/authReducer";
import { GiCook } from "react-icons/gi";
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
      <div
        className="cursor-pointer flex relative"
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
        <div className={`absolute -right-10 top-12 w-40 bg-white text-green rounded-xl z-50 ${showParamMenu ? "flex flex-col" : "hidden"}`}>
          <span
            onClick={() => {
              setShowParamMenu(!showParamMenu)
              navigate("/param")
            }}
            className="p-2 rounded-xl text-lg hover:bg-orange hover:text-white"
          >Mon profil</span>
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