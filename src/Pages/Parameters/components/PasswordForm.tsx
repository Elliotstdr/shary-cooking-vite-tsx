import { useForm } from "react-hook-form";
import Loader from "../../../Components/ui/loader";
import Bouton from "../../../Components/ui/Bouton";
import { errorToast, successToast } from "../../../Services/functions";
import { fetchPost } from "../../../Hooks/api.hook";
import { useSelector } from "react-redux";
import { ReactNode, useState } from "react";
import { PasswordInput } from "@/Components/ui/PasswordInput";

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
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
    getValues,
  } = useForm({ defaultValues });

  const getFormErrorMessage = (name: keyof FormProps) => {
    return (
      errors[name] && <small className="p-error">{errors[name]?.message as ReactNode}</small>
    );
  };

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

  return (
    <form className="flex-center flex-col m-8 gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center flex-col">
        <h4 className="my-2 font-bold">Précédent mot de passe</h4>
        <PasswordInput
          {...register("oldPassword", {
            required: getValues("password").length > 0
              ? "L'ancien mot de passe est obligatoire"
              : false,
          })}
          placeholder="Ancien mot de passe"
          className="w-60"
        />
        {getFormErrorMessage("oldPassword")}
      </div>
      <div className="flex items-center flex-col">
        <h4 className="my-2 font-bold">Nouveau mot de passe</h4>
        <PasswordInput
          {...register("password")}
          placeholder="Mot de passe"
          onChange={(e) => {
            setIsEqualPassword(
              getValues("confirmPassword").length > 0 &&
              e.target.value === getValues("confirmPassword")
            );
          }}
          className="w-60"
        />
      </div>
      <div className="flex items-center flex-col mb-4">
        <h4 className="my-2 font-bold">Confirmer le mot de passe</h4>
        <PasswordInput
          {...register("oldPassword", {
            required: getValues("password").length > 0
              ? "Veuillez confirmer le nouveau mot de passe"
              : false,
            validate: (value) =>
              value === getValues("password") ||
              getValues("password") === "" ||
              "Les mots de passe ne sont pas identiques",
          })}
          placeholder="Mot de passe"
          className={`w-60 border rounded-md ${isEqualPassword ? "border-card-green" : "border-card-red"}`}
          onChange={(e) => {
            setIsEqualPassword(
              getValues("password").length > 0 &&
              e.target.value === getValues("password")
            );
          }}
        />
        {getFormErrorMessage("confirmPassword")}
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