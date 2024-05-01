import React, { useState } from "react";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import Loader from "../ui/loader";
import Bouton from "../ui/Bouton";
import ImageUpload from "../ui/ImageUpload";
import { errorToast } from "../../Services/functions";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { fetchPost } from "../../Hooks/api.hook";
import { Input } from "../ui/input";
// import { Textarea } from "../ui/textarea";
import { AutosizeTextarea } from "../ui/AutosizeTextarea";

type Props = {
  reportBugModal: boolean,
  setReportBugModal: React.Dispatch<React.SetStateAction<boolean>>,
}

const ModalBugReport = (props: Props) => {
  const [successView, setSuccessView] = useState(false);
  const auth = useSelector((state: RootState) => state.auth);

  const {
    register,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: "",
      message: "",
      image: null
    }
  });

  const onSubmit = async () => {
    const response = await fetchPost(`/users/sendReport`, {
      ...getValues(),
      firstname: auth.userConnected?.name,
      lastname: auth.userConnected?.lastname
    });
    if (response.error) {
      errorToast("Une erreur est survenue lors de l'envoi du mail");
      return;
    }
    setSuccessView(true);
  };

  return (
    <Modal
      header="Report de bug"
      visible={props.reportBugModal}
      setVisible={props.setReportBugModal}
      className={"!w-11/12 tablet:!w-160"}
    >
      {!successView ? (
        <form className="flex items-center flex-col p-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full mb-8 tablet:w-2/3">
            <h4 className="font-bold my-2">Intitulé du problème :</h4>
            <Input
              {...register("title", { required: true })}
              placeholder="Problème quand je clique sur le bouton ..."
              className="!w-full"
            />
            {errors.title && <small className="p-error">Le titre est obligatoire</small>}
          </div>
          <div className="w-full mb-8 tablet:w-2/3">
            <h4 className="font-bold my-2">Description :</h4>
            <AutosizeTextarea
              {...register("message", { required: true })}
              placeholder="Où? Quand? Comment?"
              className="!w-full"
            />
            {errors.message && <small className="p-error">La description est obligatoire</small>}
          </div>
          <div className="w-full mb-8 tablet:w-2/3 flex items-center flex-col">
            <h4 className="font-bold my-2">Capture d'écran :</h4>
            <ImageUpload
              {...register("image")}
              image={getValues('image')}
              setImage={(image) => setValue('image', image)}
            />
          </div>
          <div>
            {isSubmitting ? <Loader /> : <Bouton>Envoyer mon rapport</Bouton>}
          </div>
        </form>
      ) : (
        <div className="flex-center flex-col">
          <div className="font-bold text-xl my-8">
            Mail envoyé ! Merci de votre retour !
          </div>
          <BsFillCheckCircleFill className="size-20 text-card-green"></BsFillCheckCircleFill>
        </div>
      )}
    </Modal>
  );
};

export default ModalBugReport;
