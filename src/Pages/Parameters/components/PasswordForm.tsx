import { useForm } from "react-hook-form";
import Loader from "../../../Components/ui/Loader";
import Bouton from "../../../Components/ui/Bouton";
import { errorToast, successToast } from "../../../Services/functions";
import { fetchPost } from "../../../Hooks/api.hook";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { PasswordInput } from "../../../Components/ui/PasswordInput";

type FormProps = {
  password: string,
  confirmPassword: string,
  oldPassword: string
}

const PasswordForm = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const [isEqualPassword, setIsEqualPassword] = useState(false);

  const defaultValues: FormProps = {
    password: "",
    confirmPassword: "",
    oldPassword: "",
  };

  const {
    register,
    watch,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
    getValues,
  } = useForm({ defaultValues });

  const onSubmit = async () => {
    const data = getValues();

    if (!auth.userConnected || !data.password || !data.oldPassword || !data.confirmPassword || !isEqualPassword) return;

    const response = await fetchPost(`/users/edit_password/${auth.userConnected.id}`, data);
    if (response.error || !response.data) {
      errorToast(
        response.error?.response?.data?.detail?.includes("visiteur")
          ? response.error.response.data.detail
          : "Une erreur est survenue lors de la modification de votre mot de passe"
      );
      return;
    }

    reset()
    successToast("Votre mot de passe a bien été mis à jour");
  };

  useEffect(() => {
    setIsEqualPassword(
      getValues("password").length > 0 &&
      getValues("confirmPassword").length > 0 &&
      getValues("password") === getValues("confirmPassword")
    );
  }, [watch('password'), watch('confirmPassword')]);

  useEffect(() => {
    console.log(isEqualPassword)
  }, [isEqualPassword]);

  return (
    <form className="flex-center flex-col m-8 gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center flex-col">
        <h4 className="my-2 font-bold">Précédent mot de passe</h4>
        <PasswordInput
          {...register("oldPassword", { required: "L'ancien mot de passe est obligatoire" })}
          placeholder="Ancien mot de passe"
          className="w-60"
        ></PasswordInput>
        {errors.oldPassword && <small className="p-error">{errors.oldPassword.message}</small>}
      </div>
      <div className="flex items-center flex-col">
        <h4 className="my-2 font-bold">Nouveau mot de passe</h4>
        <PasswordInput
          {...register("password", { required: "Le nouveau mot de passe est obligatoire" })}
          placeholder="Mot de passe"
          className="w-60"
        ></PasswordInput>
        {errors.password && <small className="p-error">{errors.password.message}</small>}
      </div>
      <div className="flex items-center flex-col mb-4">
        <h4 className="my-2 font-bold">Confirmer le mot de passe</h4>
        <PasswordInput
          {...register("confirmPassword", {
            required: "Veuillez confirmer le nouveau mot de passe",
            validate: (value) => value === getValues("password")
          })}
          placeholder="Mot de passe"
          className={`w-60 border rounded-md ${isEqualPassword ? "!border-card-green" : "!border-card-red"}`}
        ></PasswordInput>
        {errors.confirmPassword && <small className="p-error">{errors.confirmPassword.message}</small>}
      </div>
      {isSubmitting ? (
        <Loader></Loader>
      ) : (
        <Bouton>Valider mes modifications</Bouton>
      )}
    </form>
  );
};

export default PasswordForm;