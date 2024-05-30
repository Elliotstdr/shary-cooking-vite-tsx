import { useState } from "react";
import Bouton from "../ui/Bouton";
import ModalLogin from "../Modal/ModalLogin";
import ModalRegister from "../Modal/ModalRegister";
import image from "src/assets/accueilHC.jpg";
import ModalForgotPassword from "../Modal/ModalForgotPassword";

const Login = () => {
  const [visibleModalLogin, setVisibleModalLogin] = useState(false);
  const [visibleModalRegister, setVisibleModalRegister] = useState(false);
  const [visibleModalForgot, setVisibleModalForgot] = useState(false);

  return (
    <div className="flex-center flex-col relative h-screen">
      <img src={image} alt="background home" className="size-full object-cover absolute" />
      <div className="flex-center flex-col z-50 shadow-searchbar bg-fond p-6 rounded-lg mx-4 tablet:mx-0">
        <div className="text-green mb-12">
          <h1 className="font-bold text-4xl my-6">Bienvenue sur Shary Cooking !</h1>
        </div>
        <div className="flex flex-col gap-4 mb-4 w-48">
          <Bouton
            btnAction={() => setVisibleModalLogin(true)}
          >Se connecter</Bouton>
          <Bouton
            btnAction={() => setVisibleModalRegister(true)}
          >Créer un compte</Bouton>
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
