import React, { useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Loader from "../ui/loader";
import { useState } from "react";
import Bouton from "../ui/Bouton";
import { errorToast, successToast } from "../../Services/functions";
import { fetchPost } from "../../Hooks/api.hook";
import { updateAuth } from "../../Store/Reducers/authReducer";
import { PasswordInput } from "../ui/PasswordInput";
import { Dialog } from "primereact/dialog";

interface Props {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
}

interface Values {
  email: string
  resetKey: string,
  newPassword: string
}

const ModalForgotPassword = (props: Props) => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [isloging, setIsLoging] = useState(false);
  const [isSendingMail, setIsSendingMail] = useState(true);
  const [oldValues, setOldValues] = useState<Partial<Values> | null>(null);

  const defaultValues: Values = {
    email: "",
    resetKey: "",
    newPassword: "",
  };

  useEffect(() => {
    !props.visible && setIsLoging(false);
  }, [props.visible]);
  // variables du formulaire
  const { getValues, handleSubmit, register, reset } = useForm({
    defaultValues,
  });

  const onSubmit = () => {
    const data = getValues();

    if (isSendingMail && data.email !== "") {
      setIsLoging(true);
      const sendMailData = {
        email: data.email,
      };
      sendMail(sendMailData);
      setError("");
    } else if (
      !isSendingMail &&
      oldValues &&
      data.resetKey !== "" &&
      data.newPassword !== ""
    ) {
      setIsLoging(true);
      const dataForReset = {
        resetKey: data.resetKey,
        newPassword: data.newPassword,
        email: oldValues.email,
      };
      resetPassword(dataForReset);
      setError("");
    } else {
      setError("Certaines informations ne sont pas remplies");
    }
  };

  const sendMail = async (data: Partial<Values>) => {
    const response = await fetchPost(`/mail/mailReset`, data);
    setIsLoging(false);
    if (response.error) {
      errorToast("Une erreur est survenue");
      return;
    }
    setOldValues(data);
    reset();
    setIsSendingMail(false);
    successToast(response.data ?? "");
  };

  const resetPassword = async (data: Partial<Values>) => {
    const resetedUser = await fetchPost(`/users/resetPassword`, data);
    if (resetedUser.error) {
      setIsLoging(false);
      errorToast("La clé de réinitialisation est mauvaise");
      return
    }

    const response = await fetchPost('/auth/signin', {
      email: data.email,
      password: data.newPassword
    })
    setIsLoging(false);
    if (response.error || !response.data) {
      errorToast(response.error?.response?.data?.detail ?? "");
      return;
    }
    reset();
    setIsSendingMail(true);
    props.setVisible(false);
    dispatch(updateAuth({
      isConnected: true,
      token: response.data.access_token ?? null,
      refreshToken: response.data.refresh_token ?? null,
      userConnected: resetedUser.data ?? null,
    }));
  };

  return (
    <Dialog
      header="Connexion"
      visible={props.visible}
      onHide={() => props.setVisible(false)}
      className="w-11/12 tablet:w-80"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {isSendingMail ? (
          <>
            <div className="flex items-center flex-col">
              <h4 className="font-bold mb-2 mt-4">Adresse email</h4>
              <InputText
                type="email"
                {...register("email")}
                placeholder="Adresse email"
                className="w-64"
              />
            </div>
            <h5 className="font-bold my-4 text-sm">
              Renseignez l'email de votre compte, un email avec la clé de
              réinitialisation de votre mot de passe va vous être envoyé
            </h5>
            <div className="mt-8 flex justify-center">
              {isloging ? <Loader /> : <Bouton>Envoyer</Bouton>}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center flex-col">
              <h4 className="font-bold mb-2 mt-4">Clé de réinitialisation</h4>
              <PasswordInput
                {...register("resetKey")}
                placeholder="Clé de réinitialisation"
                className="w-64"
              ></PasswordInput>
            </div>
            <div className="flex items-center flex-col">
              <h4 className="font-bold mb-2 mt-4">Nouveau mot de passe</h4>
              <PasswordInput
                {...register("newPassword")}
                placeholder="Mot de passe"
                className="w-64"
              ></PasswordInput>
            </div>
            <div
              className="cursor-pointer underline text-right text-sm p-2"
              onClick={() => oldValues && sendMail(oldValues)}
            >
              Renvoyer le mail
            </div>
            {error && <small className="p-error">{error}</small>}
            <div className="mt-8 flex justify-center">
              {isloging ? <Loader /> : <Bouton>Changer de mot de passe</Bouton>}
            </div>
          </>
        )}
      </form>
    </Dialog>
  );
};

export default ModalForgotPassword;
