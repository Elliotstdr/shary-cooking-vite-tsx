import { ReactNode, useEffect, useState } from "react";
import "./Parameters.scss";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import Bouton from "../../Components/ui/Bouton/Bouton";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import ImageUpload from "../../Components/FormElements/ImageUpload/ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { errorToast, successToast } from "../../Services/functions";
import Loader from "../../Components/ui/Loader/loader";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import { fetchPut } from "../../Hooks/api.hook";
import { updateAuth } from "../../Store/Reducers/authReducer";

const Parameters = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [isModifying, setIsModifying] = useState(false);
  const [showMDP, setShowMDP] = useState(false);
  const [isEqualPassword, setIsEqualPassword] = useState(false);
  const [image, setImage] = useState(null);

  const defaultValues: any = {
    name: auth.userConnected?.name,
    lastname: auth.userConnected?.lastname,
    email: auth.userConnected?.email,
    password: "",
    confirmPassword: "",
    oldPassword: "",
    image: null,
  };

  const {
    control,
    register,
    formState: { errors },
    reset,
    handleSubmit,
    getValues,
  } = useForm({ defaultValues });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getFormErrorMessage = (name: string) => {
    return (
      errors[name] && <small className="p-error">{errors[name]?.message as ReactNode}</small>
    );
  };

  const setFields = () => {
    const data = getValues();
    for (const key in data) {
      if (!data[key] || data[key]?.length === 0) {
        delete data[key];
      }
    }
    if (getValues("password") === "") {
      delete data.oldPassword;
    }
    delete data.confirmPassword;

    if (image) {
      data.image = image;
    }

    return data;
  };

  const onSubmit = async () => {
    if (!auth.userConnected) return;
    setIsModifying(true);
    const data = setFields();

    const response = await fetchPut(`/users/${auth.userConnected.id}`, data);
    setIsModifying(false);
    if (response.error || !response.data) {
      errorToast(
        response.error?.response?.data?.detail?.includes("visiteur")
          ? response.error.response.data.detail
          : "Une erreur est survenue lors de la modification de votre profil"
      );
      return;
    }
    if (response.data?.token) {
      dispatch(updateAuth({ token: response.data.token }));
    }
    setShowMDP(false);
    reset()
    const tempArray = { ...auth.userConnected };
    tempArray.email = data.email;
    tempArray.name = data.name;
    tempArray.lastname = data.lastname;
    tempArray.imageUrl = response.data?.imageUrl ?? null;
    dispatch(updateAuth({ userConnected: tempArray }));
    successToast("Votre profil a bien été mis à jour");
  };

  return (
    <div className="parameters">
      <NavBar></NavBar>
      <form className="param__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="param__form__field">
          <h4>Photo</h4>
          {auth.userConnected?.imageUrl && (
            <div className="param_profile_picture">
              <img
                src={
                  import.meta.env.VITE_BASE_URL_API +
                  auth.userConnected.imageUrl
                }
                alt="Fond news"
              />
            </div>
          )}
          <ImageUpload
            {...register("image")}
            image={image}
            setImage={setImage}
          />
        </div>
        <div className="param__form__field">
          <h4>Prénom</h4>
          <InputText
            {...register("name", { required: true })}
            placeholder="Fanny"
            className="param__form__field-name"
          />
          {errors.name && <small className="p-error">Le prénom est obligatoire</small>}
        </div>
        <div className="param__form__field">
          <h4>Nom</h4>
          <InputText
            {...register("lastname", { required: true })}
            placeholder="Lefebvre"
            className="param__form__field-lastname"
          />
          {errors.lastname && <small className="p-error">Le nom est obligatoire</small>}
        </div>
        <div className="param__form__field">
          <h4>Adresse email</h4>
          <InputText
            type="email"
            {...register("email", { required: true })}
            placeholder="Adresse email"
            className="param__form__field-email"
          />
          {errors.email && <small className="p-error">L'email est obligatoire</small>}
        </div>
        <Bouton
          type="normal"
          btnAction={(e) => {
            e.preventDefault();
            setShowMDP(!showMDP);
          }}
        >
          Modifier le mot de passe
        </Bouton>
        {showMDP && (
          <div>
            <Divider></Divider>
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
                    className="param__form__field-oldPassword"
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
                    className="param__form__field-password"
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
                    className={
                      isEqualPassword
                        ? "param__form__field-confirmpassword equal"
                        : "param__form__field-confirmpassword nonequal"
                    }
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
          </div>
        )}
        <Divider></Divider>
        {isModifying ? (
          <Loader></Loader>
        ) : (
          <Bouton>Valider mes modifications</Bouton>
        )}
      </form>
      <Footer></Footer>
    </div>
  );
};

export default Parameters;
