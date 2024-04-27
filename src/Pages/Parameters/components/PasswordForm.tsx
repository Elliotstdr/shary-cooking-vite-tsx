import { Controller, useForm } from "react-hook-form";
import Loader from "../../../Components/ui/Loader/loader";
import Bouton from "../../../Components/ui/Bouton/Bouton";
import { errorToast, successToast } from "../../../Services/functions";
import { fetchPost } from "../../../Hooks/api.hook";
import { useSelector } from "react-redux";
import { ReactNode, useState } from "react";
import { Password } from "primereact/password";

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
    control,
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
    <form className="flex-center flex-col m-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center flex-col mb-4">
        <h4 className="my-2 font-bold">Précédent mot de passe</h4>
        <Controller
          name="oldPassword"
          control={control}
          rules={{
            required:
              getValues("password").length > 0
                ? "L'ancien mot de passe est obligatoire"
                : false,
          }}
          render={({ field }) => (
            <Password
              toggleMask
              autoComplete="new-password"
              {...field}
              placeholder={"Ancien mot de passe"}
              feedback={false}
              inputClassName="w-60"
            />
          )}
        />
        {getFormErrorMessage("oldPassword")}
      </div>
      <div className="flex items-center flex-col mb-4">
        <h4 className="my-2 font-bold">Nouveau mot de passe</h4>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Password
              toggleMask
              autoComplete="new-password"
              {...field}
              placeholder={"Mot de passe"}
              onChange={(e) => {
                field.onChange(e.target.value);
                setIsEqualPassword(
                  getValues("confirmPassword").length > 0 &&
                  e.target.value === getValues("confirmPassword")
                );
              }}
              inputClassName="w-60"
            />
          )}
        />
      </div>
      <div className="flex items-center flex-col mb-4">
        <h4 className="my-2 font-bold">Confirmer le mot de passe</h4>
        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required:
              getValues("password").length > 0
                ? "Veuillez confirmer le nouveau mot de passe"
                : false,
            validate: (value) =>
              value === getValues("password") ||
              getValues("password") === "" ||
              "Les mots de passe ne sont pas identiques",
          }}
          render={({ field }) => (
            <Password
              toggleMask
              autoComplete="new-password"
              {...field}
              placeholder={"Mot de passe"}
              className={isEqualPassword ? "equal" : "nonequal"}
              feedback={false}
              onChange={(e) => {
                field.onChange(e.target.value);
                setIsEqualPassword(
                  getValues("password").length > 0 &&
                  e.target.value === getValues("password")
                );
              }}
              inputClassName="w-60"
            />
          )}
        />
        {getFormErrorMessage("confirmPassword")}
      </div>
      {isSubmitting ? (
        <Loader></Loader>
      ) : (
        <Bouton className="w-40 self-center mt-8">Valider mes modifications</Bouton>
      )}
    </form>
  );
};

export default PasswordForm;