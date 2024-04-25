import React from "react";
import { InputText } from "primereact/inputtext";
import Modal from "../Modal";
import { useDispatch } from "react-redux";
import { Password } from "primereact/password";
import "./ModalLogin.scss";
import { Controller, useForm } from "react-hook-form";
import Loader from "../../ui/Loader/loader";
import Bouton from "../../ui/Bouton/Bouton";
import { errorToast } from "../../../Services/functions";
import { fetchPost } from "../../../Hooks/api.hook";
import { updateAuth } from "../../../Store/Reducers/authReducer";

interface Props {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setVisibleForgot: React.Dispatch<React.SetStateAction<boolean>>,
  header: string
}

const ModalLogin = (props: Props) => {
  const dispatch = useDispatch();

  const {
    control,
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

    const response = await fetchPost(`/auth`, data);
    if (response.error || !response.data?.token) {
      errorToast("L'authentification a échoué");
      return;
    }

    const subResponse = await fetchPost(
      `/users/by_email`,
      {},
      response.data.token
    );
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
      className={"modal modal-login"}
      width={"20rem"}
    >
      <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="login__form__field">
          <h4>Adresse email</h4>
          <InputText
            type="email"
            {...register("email", { required: true })}
            placeholder="Adresse email"
            className="login__form__field-email"
          ></InputText>
          {errors.email && <small className="p-error">L'email est obligatoire</small>}
        </div>
        <div className="login__form__field">
          <h4>Mot de passe</h4>
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
                className="login__form__field-password"
                feedback={false}
              />
            )}
          />
          {errors.password && <small className="p-error">{errors.password.message}</small>}
        </div>
        <div
          className="forgot_password"
          onClick={() => {
            props.setVisible(false);
            props.setVisibleForgot(true);
          }}
        >
          Mot de passe oublié ?
        </div>
        <div className="login__form__button">
          {isSubmitting ? <Loader /> : <Bouton>Se connecter</Bouton>}
        </div>
      </form>
    </Modal>
  );
};

export default ModalLogin;
