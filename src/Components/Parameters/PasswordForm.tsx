import { Controller, useForm } from "react-hook-form";
import Loader from "../ui/Loader/loader";
import Bouton from "../ui/Bouton/Bouton";
import { errorToast, successToast } from "../../Services/functions";
import { fetchPost } from "../../Hooks/api.hook";
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
    <form className="param__form" onSubmit={handleSubmit(onSubmit)}>
      <div className="param__form__field">
        <h4>Précédent mot de passe</h4>
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
            />
          )}
        />
        {getFormErrorMessage("oldPassword")}
      </div>
      <div className="param__form__field">
        <h4>Nouveau mot de passe</h4>
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
            />
          )}
        />
      </div>
      <div className="param__form__field">
        <h4>Confirmer le mot de passe</h4>
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
            />
          )}
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