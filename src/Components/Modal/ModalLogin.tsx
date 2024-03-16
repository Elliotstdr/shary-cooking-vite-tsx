import React, { useEffect } from "react";
import { InputText } from "primereact/inputtext";
import Modal from "../ui/Modal/Modal";
import { useDispatch } from "react-redux";
import { Password } from "primereact/password";
import { Controller, useForm } from "react-hook-form";
import Loader from "../ui/Loader/loader";
import { useState } from "react";
import Bouton from "../ui/Bouton/Bouton";
import { errorToast } from "../../Services/functions";
import { fetchPost } from "../../Hooks/api.hook";
import { updateAuth } from "../../Store/Reducers/authReducer";

interface Props {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setVisibleForgot: React.Dispatch<React.SetStateAction<boolean>>,
  header: string
}

interface Values {
  email: string
  password: string,
}

const ModalLogin = (props: Props) => {
  const dispatch = useDispatch();
  const [isloging, setIsLoging] = useState(false);

  const defaultValues: Values = {
    email: "",
    password: "",
  };

  useEffect(() => {
    !props.visible && setIsLoging(false);
  }, [props.visible]);
  // variables du formulaire
  const {
    control,
    getValues,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });

  const onSubmit = async () => {
    setIsLoging(true);
    const data = getValues();

    const response = await fetchPost(`/auth`, data);
    if (response.error || !response.data?.token) {
      setIsLoging(false);
      errorToast("L'authentification a échoué");
      return;
    }
    const subResponse = await fetchPost(
      `/users/by_email`,
      {},
      response.data.token
    );
    setIsLoging(false);
    if (subResponse.error) {
      errorToast("L'authentification a échoué");
      return;
    }
    dispatch(updateAuth({
      isConnected: true,
      token: response.data.token,
      refreshToken: response.data.refresh_token,
      userConnected: subResponse.data,
    }));
  };

  return (
    <Modal
      header="Connexion"
      visible={props.visible}
      setVisible={props.setVisible}
      className="!w-11/12 tablet:!w-[20rem]"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center">
          <h4 className="font-bold mt-4 mb-2">Adresse email</h4>
          <InputText
            type="email"
            {...register("email", { required: true })}
            placeholder="Adresse email"
            className="w-64"
          ></InputText>
          {errors.email && <small className="p-error">L'email est obligatoire</small>}
        </div>
        <div className="flex flex-col items-center">
          <h4 className="font-bold mt-4 mb-2">Mot de passe</h4>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Le mot de passe est obligatoire",
            }}
            render={({ field }) => (
              <Password
                {...field}
                toggleMask
                placeholder="Mot de passe"
                feedback={false}
                inputClassName="w-64"
              />
            )}
          />
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
          {isloging ? <Loader size="2rem" className="p-0 flex items-center justify-center" /> : <Bouton>Se connecter</Bouton>}
        </div>
      </form>
    </Modal>
  );
};

export default ModalLogin;
