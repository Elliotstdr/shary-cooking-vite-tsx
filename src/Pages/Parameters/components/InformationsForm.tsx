import Loader from "../../../Components/ui/loader";
import Bouton from "../../../Components/ui/Bouton";
import { errorToast, successToast } from "../../../Services/functions";
import { fetchPut } from "../../../Hooks/api.hook";
import ImageUpload from "../../../Components/ui/ImageUpload";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateAuth } from "../../../Store/Reducers/authReducer";
import { Input } from "@/Components/ui/input";

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

    const tempArray = {
      ...auth.userConnected,
      email: data.email,
      name: data.name,
      lastname: data.lastname,
      imageUrl: response.data?.imageUrl || null
    };

    dispatch(updateAuth({ userConnected: tempArray }));
    successToast("Votre profil a bien été mis à jour");
  };

  return (
    <form className="flex-center flex-col m-8 gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center flex-col">
        <h4 className="my-2 font-bold">Photo</h4>
        {auth.userConnected?.imageUrl && (
          <div className="w-60 h-40 overflow-hidden flex-center m-2 rounded-md">
            <img
              src={import.meta.env.VITE_BASE_URL_API + auth.userConnected.imageUrl}
              alt="Fond news"
              className="h-full"
            />
          </div>
        )}
        <ImageUpload
          {...register("image")}
          image={image}
          setImage={setImage}
          headerClassName="w-60 rounded-md border !border-search"
        />
      </div>
      <div className="flex items-center flex-col">
        <h4 className="my-2 font-bold">Prénom</h4>
        <Input
          {...register("name", { required: true })}
          placeholder="Fanny"
          className="w-60"
        ></Input>
        {errors.name && <small className="p-error">Le prénom est obligatoire</small>}
      </div>
      <div className="flex items-center flex-col">
        <h4 className="my-2 font-bold">Nom</h4>
        <Input
          {...register("lastname", { required: true })}
          placeholder="Lefebvre"
          className="w-60"
        ></Input>
        {errors.lastname && <small className="p-error">Le nom est obligatoire</small>}
      </div>
      <div className="flex items-center flex-col mb-4">
        <h4 className="my-2 font-bold">Adresse email</h4>
        <Input
          type="email"
          {...register("email", { required: true })}
          placeholder="Adresse email"
          className="w-60"
        ></Input>
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