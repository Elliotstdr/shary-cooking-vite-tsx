import { useState } from "react";
import Bouton from "../ui/Bouton/Bouton";
import ModalLogin from "../Modal/ModalLogin/ModalLogin";
import ModalRegister from "../Modal/ModalRegister/ModalRegister";
import image from "../../assets/accueilHC.jpg";
import ModalForgotPassword from "../Modal/ModalForgotPassword/ModalForgotPassword";

const Login = () => {
  const [visibleModalLogin, setVisibleModalLogin] = useState(false);
  const [visibleModalRegister, setVisibleModalRegister] = useState(false);
  const [visibleModalForgot, setVisibleModalForgot] = useState(false);

  return (
    <div className="h-screen flex items-center justify-center flex-col relative">
      <img src={image} alt="background home" className="w-full h-full object-cover absolute" />
      <div className="bg-fond p-6 rounded-xl flex items-center justify-center flex-col z-50 shadow-2xl mx-4 tablet:mx-0">
        <div className="text-green mb-12">
          <h1 className="text-[2rem] font-bold my-4">Bienvenue sur Shary Cooking !</h1>
        </div>
        <div className="flex flex-col">
          <Bouton
            className="w-48 mb-4"
            btnTexte={"Se connecter"}
            btnAction={() => setVisibleModalLogin(true)}
          ></Bouton>
          <Bouton
            className="w-48 mb-4"
            btnTexte={"Créer un compte"}
            btnAction={() => setVisibleModalRegister(true)}
          ></Bouton>
        </div>
      </div>

      {visibleModalLogin && (
        <ModalLogin
          visible={visibleModalLogin}
          setVisible={setVisibleModalLogin}
          setVisibleForgot={setVisibleModalForgot}
          header={"Se connecter"}
        ></ModalLogin>
      )}
      {visibleModalRegister && (
        <ModalRegister
          visible={visibleModalRegister}
          setVisible={setVisibleModalRegister}
          header={"Créer un compte"}
        ></ModalRegister>
      )}
      {visibleModalForgot && (
        <ModalForgotPassword
          visible={visibleModalForgot}
          setVisible={setVisibleModalForgot}
        ></ModalForgotPassword>
      )}
    </div>
  );
};

export default Login;
