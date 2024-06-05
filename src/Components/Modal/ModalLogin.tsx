import React from "react";
import { InputText } from "primereact/inputtext";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Loader from "../ui/loader";
import Bouton from "../ui/Bouton";
import { errorToast } from "../../Services/functions";
import { fetchGet, fetchPost } from "../../Hooks/api.hook";
import { updateAuth } from "../../Store/Reducers/authReducer";
import { PasswordInput } from "../ui/PasswordInput";
import Modal from "../ui/Modal";

interface Props {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setVisibleForgot: React.Dispatch<React.SetStateAction<boolean>>,
  header: string
}

const ModalLogin = (props: Props) => {
  const dispatch = useDispatch();

  const {
    getValues,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = async () => {
    const data = getValues();

    const response = await fetchPost(`/auth/signin`, data, false, true);
    if (response.error || !response.data?.access_token) {
      errorToast("L'authentification a échoué");
      return;
    }

    const subResponse = await fetchGet(
      `/users/me`,
      response.data.access_token
    );
    if (subResponse.error) {
      errorToast("L'authentification a échoué");
      return;
    }
    dispatch(updateAuth({
      isConnected: true,
      token: response.data.access_token,
      userConnected: subResponse.data,
    }));
  };

  return (
    <Modal
      header="Connexion"
      visible={props.visible}
      setVisible={props.setVisible}
      className="w-11/12 tablet:w-80"
    >
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="flex items-center flex-col">
          <h4 className="font-bold mb-2 mt-4">Adresse email</h4>
          <InputText
            type="email"
            {...register("email", { required: true })}
            placeholder="Adresse email"
            className="w-64"
          ></InputText>
          {errors.email && <small className="p-error">L'email est obligatoire</small>}
        </div>
        <div className="flex items-center flex-col">
          <h4 className="font-bold mb-2 mt-4">Mot de passe</h4>
          <PasswordInput
            {...register("password", { required: "Le mot de passe est obligatoire" })}
            placeholder="Mot de passe"
            className="w-64"
          ></PasswordInput>
          {errors.password && <small className="p-error">{errors.password.message}</small>}
        </div>
        <div
          className="cursor-pointer underline text-right text-sm p-2"
          onClick={() => {
            props.setVisible(false);
            props.setVisibleForgot(true);
          }}
        >
          Mot de passe oublié ?
        </div>
        <div className="mt-8 flex justify-center">
          {isSubmitting ? <Loader /> : <Bouton>Se connecter</Bouton>}
        </div>
      </form>
    </Modal>
  );
};

export default ModalLogin;
