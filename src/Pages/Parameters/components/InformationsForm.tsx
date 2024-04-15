import { InputText } from "primereact/inputtext";
import Loader from "../../../Components/ui/Loader/loader";
import Bouton from "../../../Components/ui/Bouton/Bouton";
import { errorToast, successToast } from "../../../Services/functions";
import { fetchPut } from "../../../Hooks/api.hook";
import ImageUpload from "../../../Components/ui/ImageUpload/ImageUpload";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateAuth } from "../../../Store/Reducers/authReducer";

const InformationsForm = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);

  const defaultValues: any = {
    name: auth.userConnected?.name,
    lastname: auth.userConnected?.lastname,
    email: auth.userConnected?.email,
    image: null,
  };

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    getValues,
  } = useForm({ defaultValues });

  const setFields = () => {
    const data = getValues();
    for (const key in data) {
      if (!data[key] || data[key]?.length === 0) {
        delete data[key];
      }
    }
    if (image) data.image = image;

    return data;
  };

  const onSubmit = async () => {
    if (!auth.userConnected) return;
    const data = setFields();

    const response = await fetchPut(`/users/${auth.userConnected.id}`, data);
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

    const tempArray = { ...auth.userConnected };
    tempArray.email = data.email;
    tempArray.name = data.name;
    tempArray.lastname = data.lastname;
    tempArray.imageUrl = response.data?.imageUrl ?? null;
    dispatch(updateAuth({ userConnected: tempArray }));
    successToast("Votre profil a bien été mis à jour");
  };

  return (
    <form className="param__form" onSubmit={handleSubmit(onSubmit)}>
      <div className="param__form__field">
        <h4>Photo</h4>
        {auth.userConnected?.imageUrl && (
          <div className="param_profile_picture">
            <img
              src={import.meta.env.VITE_BASE_URL_API + auth.userConnected.imageUrl}
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
        />
        {errors.name && <small className="p-error">Le prénom est obligatoire</small>}
      </div>
      <div className="param__form__field">
        <h4>Nom</h4>
        <InputText
          {...register("lastname", { required: true })}
          placeholder="Lefebvre"
        />
        {errors.lastname && <small className="p-error">Le nom est obligatoire</small>}
      </div>
      <div className="param__form__field">
        <h4>Adresse email</h4>
        <InputText
          type="email"
          {...register("email", { required: true })}
          placeholder="Adresse email"
        />
        {errors.email && <small className="p-error">L'email est obligatoire</small>}
      </div>
      {isSubmitting ? (
        <Loader></Loader>
      ) : (
        <Bouton>Valider mes modifications</Bouton>
      )}
    </form>
  );
};

export default InformationsForm;