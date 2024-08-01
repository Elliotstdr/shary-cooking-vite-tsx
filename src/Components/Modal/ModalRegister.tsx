import React, { useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Loader from "../ui/loader";
import { useState } from "react";
import Bouton from "../ui/Bouton";
import { errorToast } from "../../Services/functions";
import { fetchGet, fetchPost } from "../../Hooks/api.hook";
import { updateAuth } from "../../Store/Reducers/authReducer";
import { PasswordInput } from "../ui/PasswordInput";
import Modal from "../ui/Modal";

interface Props {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  header: string
}

const ModalLogin = (props: Props) => {
  const dispatch = useDispatch();
  const [isEqualPassword, setIsEqualPassword] = useState(false);

  const {
    watch,
    getValues,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
      // secretKey: "",
    }
  });

  const onSubmit = async () => {
    const data = getValues();

    const response = await fetchPost(`/auth/signup`, data, false, true);
    if (response.error) {
      errorToast(response.error?.response?.data?.detail ?? "");
      return;
    }

    const subResponse = await fetchGet(`/users/me`, response.data.access_token);

    dispatch(updateAuth({
      isConnected: true,
      userConnected: subResponse.data,
      token: response.data.access_token,
    }));
  };

  useEffect(() => {
    setIsEqualPassword(
      getValues("password").length > 0 &&
      getValues("confirmpassword").length > 0 &&
      getValues("password") === getValues("confirmpassword")
    );
  }, [watch('password'), watch('confirmpassword')]);

  return (
    <Modal
      header="Création de compte"
      visible={props.visible}
      setVisible={props.setVisible}
      className="w-11/12 tablet:w-120"
    >
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="flex items-center flex-col">
          <h4 className="font-bold mb-2 mt-4">Prénom</h4>
          <InputText
            {...register("name", { required: true })}
            placeholder="Prénom"
            className="w-64"
          />
          {errors.name && <small className="p-error">Le prénom est obligatoire</small>}
        </div>
        <div className="flex items-center flex-col">
          <h4 className="font-bold mb-2 mt-4">Nom</h4>
          <InputText
            {...register("lastname", { required: true })}
            placeholder="Nom"
            className="w-64"
          />
          {errors.lastname && <small className="p-error">Le nom est obligatoire</small>}
        </div>
        <div className="flex items-center flex-col">
          <h4 className="font-bold mb-2 mt-4">Adresse email</h4>
          <InputText
            type="email"
            {...register("email", { required: true })}
            placeholder="Adresse email"
            className="w-64"
          />
          {errors.email && <small className="p-error">L'email est obligatoire</small>}
        </div>
        <div className="flex items-center flex-col">
          <h4 className="font-bold mb-2 mt-4">Mot de passe</h4>
          <PasswordInput
            {...register("password", {
              required: "Le mot de passe est obligatoire",
              minLength: {
                value: 4,
                message: "Le mot de passe doit faire au moins 4 caractères",
              },
            })}
            placeholder="Mot de passe"
            className="w-64"
          ></PasswordInput>
          {errors.password && <small className="p-error">{errors.password.message}</small>}
        </div>
        <div className="flex items-center flex-col">
          <h4 className="font-bold mb-2 mt-4">Confirmer le mot de passe</h4>
          <PasswordInput
            {...register("confirmpassword", {
              required: "Veuillez confirmer le mot de passe",
              validate: (value) => value === getValues("password")
            })}
            placeholder="Mot de passe"
            className={`w-64 border rounded-md ${isEqualPassword ? "!border-card-green" : "!border-card-red"}`}
          ></PasswordInput>
          {errors.confirmpassword && <small className="p-error">{errors.confirmpassword.message}</small>}
        </div>
        {/* <div className="flex items-center flex-col">
          <h4 className="font-bold mb-2 mt-4">{"Clé secrète"}</h4>
          <PasswordInput
            {...register("secretKey", { required: "La clé secrète est obligatoire" })}
            placeholder="Clé secrète"
            className="w-64"
            tooltip={"Cette clé doit vous être fournie par le créateur du site."}
            tooltipOptions={{ position: "top" }}
          ></PasswordInput>
          {errors.secretKey && <small className="p-error">{errors.secretKey.message}</small>}
        </div> */}
        <div className="mt-8 flex justify-center">
          {isSubmitting ? <Loader /> : <Bouton>Créer un compte</Bouton>}
        </div>
      </form>
    </Modal>
  );
};

export default ModalLogin;
