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
  header: string
}

interface Values {
  name: string,
  lastname: string,
  email: string,
  password: string,
  confirmpassword: string,
  secretKey: string,
}

const ModalLogin = (props: Props) => {
  const dispatch = useDispatch();
  const [isloging, setIsLoging] = useState(false);
  const [isEqualPassword, setIsEqualPassword] = useState(false);

  const defaultValues: Values = {
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    secretKey: "",
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

    const response = await fetchPost(`/users/createAccount`, data);
    if (response.error) {
      setIsLoging(false);
      errorToast(response.error?.response?.data?.detail ?? "");
      return;
    }
    const dataForToken = {
      email: data.email,
      password: data.password,
    };
    const subResponse = await fetchPost(`/auth`, dataForToken);
    setIsLoging(false);
    if (subResponse.error) {
      errorToast("Une erreur est survenue");
      return;
    }
    dispatch(updateAuth({
      isConnected: true,
      userConnected: response.data,
      token: subResponse.data.token,
      refreshToken: subResponse.data.refresh_token,
    }));
  };

  return (
    <Modal
      header="Création de compte"
      visible={props.visible}
      setVisible={props.setVisible}
      className="!w-11/12 tablet:!w-[30rem]"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center">
          <h4 className="font-bold mt-4 mb-2">Prénom</h4>
          <InputText
            {...register("name", { required: true })}
            placeholder="Prénom"
            className="w-64"
          />
          {errors.name && <small className="p-error">Le prénom est obligatoire</small>}
        </div>
        <div className="flex flex-col items-center">
          <h4 className="font-bold mt-4 mb-2">Nom</h4>
          <InputText
            {...register("lastname", { required: true })}
            placeholder="Nom"
            className="w-64"
          />
          {errors.lastname && <small className="p-error">Le nom est obligatoire</small>}
        </div>
        <div className="flex flex-col items-center">
          <h4 className="font-bold mt-4 mb-2">Adresse email</h4>
          <InputText
            type="email"
            {...register("email", { required: true })}
            placeholder="Adresse email"
            className="w-64"
          />
          {errors.email && <small className="p-error">L'email est obligatoire</small>}
        </div>
        <div className="flex flex-col items-center">
          <h4 className="font-bold mt-4 mb-2">Mot de passe</h4>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Le mot de passe est obligatoire",
              minLength: {
                value: 4,
                message: "Le mot de passe doit faire au moins 4 caractères",
              },
            }}
            render={({ field }) => (
              <Password
                {...field}
                toggleMask
                placeholder="Mot de passe"
                inputClassName="w-64"
                onChange={(e) => {
                  field.onChange(e.target.value);
                  setIsEqualPassword(
                    getValues("confirmpassword").length > 0 &&
                    e.target.value === getValues("confirmpassword")
                  );
                }}
              />
            )}
          />
          {errors.password && <small className="p-error">{errors.password.message}</small>}
        </div>
        <div className="flex flex-col items-center">
          <h4 className="font-bold mt-4 mb-2">Confirmer le mot de passe</h4>
          <Controller
            name="confirmpassword"
            control={control}
            rules={{
              required: "Veuillez confirmer le mot de passe",
              validate: (value) => {
                return value === getValues("password");
              },
            }}
            render={({ field }) => (
              <Password
                {...field}
                toggleMask
                placeholder={"Mot de passe"}
                className={isEqualPassword ? "equal" : "nonequal"}
                inputClassName="w-64"
                feedback={false}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  setIsEqualPassword(
                    getValues("password").length > 0 &&
                    e.target.value === getValues("password")
                  );
                }}
              />
            )}
          />
          {errors.confirmpassword && <small className="p-error">{errors.confirmpassword.message}</small>}
        </div>
        <div className="flex flex-col items-center">
          <h4 className="font-bold mt-4 mb-2">{"Clé secrète"}</h4>
          <Controller
            name="secretKey"
            control={control}
            rules={{
              required: "La clé secrète est obligatoire",
            }}
            render={({ field }) => (
              <Password
                {...field}
                toggleMask
                placeholder={"Clé secrète"}
                inputClassName="w-64"
                feedback={false}
                tooltip={
                  "Cette clé doit vous être fournie par le créateur du site."
                }
                tooltipOptions={{ position: "top" }}
              />
            )}
          />
          {errors.secretKey && <small className="p-error">{errors.secretKey.message}</small>}
        </div>
        <div className="mt-8 flex justify-center">
          {isloging ? <Loader size="2rem" className="p-0 flex items-center justify-center" /> : <Bouton>Créer un compte</Bouton>}
        </div>
      </form>
    </Modal>
  );
};

export default ModalLogin;
