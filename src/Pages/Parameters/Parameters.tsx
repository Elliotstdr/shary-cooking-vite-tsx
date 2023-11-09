import { ReactNode, useEffect, useState } from "react";
import "./Parameters.scss";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import Bouton from "../../Utils/Bouton/Bouton";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import ImageUpload from "../../Components/FormElements/ImageUpload/ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { errorToast, successToast } from "../../Services/functions";
import Loader from "../../Utils/Loader/loader";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import { UPDATE_AUTH } from "../../Store/Reducers/authReducer";
import { fetchPut } from "../../Services/api";
import { ClassUpdateUserResponse } from "../../Types/class";

const Parameters = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const updateAuth = (value: Partial<AuthState>) => {
    dispatch({ type: UPDATE_AUTH, value });
  };

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

    const response = await fetchPut(`/users/${auth.userConnected.id}`, data, new ClassUpdateUserResponse());
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
      updateAuth({ token: response.data.token });
    }
    setShowMDP(false);
    reset()
    const tempArray = { ...auth.userConnected };
    tempArray.email = data.email;
    tempArray.name = data.name;
    tempArray.lastname = data.lastname;
    tempArray.imageUrl = response.data?.imageUrl ?? null;
    updateAuth({ userConnected: tempArray });
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
          <Controller
            name="image"
            control={control}
            render={() => (
              <ImageUpload image={image} setImage={setImage}></ImageUpload>
            )}
          />
          {getFormErrorMessage("image")}
        </div>
        <div className="param__form__field">
          <h4>Prénom</h4>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Le prénom est obligatoire",
            }}
            render={({ field }) => (
              <InputText
                {...field}
                value={getValues("name")}
                placeholder="Fanny"
                className="param__form__field-name"
              />
            )}
          />
          {getFormErrorMessage("name")}
        </div>
        <div className="param__form__field">
          <h4>Nom</h4>
          <Controller
            name="lastname"
            control={control}
            rules={{
              required: "Le nom est obligatoire",
            }}
            render={({ field }) => (
              <InputText
                {...field}
                value={getValues("lastname")}
                placeholder="Lefebvre"
                className="param__form__field-lastname"
              />
            )}
          />
          {getFormErrorMessage("lastname")}
        </div>
        <div className="param__form__field">
          <h4>Adresse email</h4>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "L'email est obligatoire",
            }}
            render={({ field }) => (
              <InputText
                {...field}
                value={getValues("email")}
                placeholder="Adresse email"
                className="param__form__field-email"
                type="email"
              />
            )}
          />
          {getFormErrorMessage("email")}
        </div>
        <Bouton
          type={"normal"}
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
                    autoComplete="new-password"
                    {...field}
                    placeholder={"Mot de passe"}
                    className="param__form__field-password"
                    feedback={false}
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
              {getFormErrorMessage("password")}
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
