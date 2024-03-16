import React, { useState } from "react";
import Modal from "../ui/Modal/Modal";
import { useForm } from "react-hook-form";
import { InputTextarea } from "primereact/inputtextarea";
import Loader from "../ui/Loader/loader";
import Bouton from "../ui/Bouton/Bouton";
import { InputText } from "primereact/inputtext";
import ImageUpload from "../ui/ImageUpload/ImageUpload";
import { errorToast } from "../../Services/functions";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { fetchPost } from "../../Hooks/api.hook";

interface Props {
  reportBugModal: boolean,
  setReportBugModal: React.Dispatch<React.SetStateAction<boolean>>,
}

interface Values {
  title: string,
  message: string,
  file: string | null,
  firstname?: string,
  lastname?: string
}

const BugReport = (props: Props) => {
  const [sending, setSending] = useState(false);
  const [image, setImage] = useState(null);
  const [successView, setSuccessView] = useState(false);

  const auth = useSelector((state: RootState) => state.auth);

  const defaultValues: Values = {
    title: "",
    message: "",
    file: null
  };

  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });

  const onSubmit = async () => {
    setSending(true);
    const data = getValues();
    data.firstname = auth.userConnected?.name;
    data.lastname = auth.userConnected?.lastname;
    if (image) {
      data.file = image;
    }

    const response = await fetchPost(`/users/sendReport`, data);
    setSending(false);
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
      className={"!w-11/12 desktop:!w-[700px]"}
    >
      {!successView ? (
        <form className="flex items-center flex-col p-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full mb-8 tablet:w-2/3">
            <h4 className="font-bold my-2">Intitulé du problème :</h4>
            <InputText
              {...register("title", { required: true })}
              placeholder="Problème quand je clique sur le bouton ..."
              className="w-full"
            />
            {errors.title && <small className="p-error">Le titre est obligatoire</small>}
          </div>
          <div className="w-full mb-8 tablet:w-2/3">
            <h4 className="font-bold my-2">Description :</h4>
            <InputTextarea
              {...register("message", { required: true })}
              placeholder="Où? Quand? Comment?"
              className="!w-full"
              autoResize
            />
            {errors.message && <small className="p-error">La description est obligatoire</small>}
          </div>
          <div className="w-full mb-8 tablet:w-2/3 flex items-center flex-col">
            <h4 className="font-bold my-2">Capture d'écran :</h4>
            <ImageUpload
              {...register("file")}
              image={image}
              setImage={setImage}
            />
          </div>
          <div>
            {sending ? <Loader /> : <Bouton>Envoyer mon rapport</Bouton>}
          </div>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="font-bold text-xl my-8">
            Mail envoyé ! Merci de votre retour !
          </div>
          <BsFillCheckCircleFill className="size-20 text-card-green"></BsFillCheckCircleFill>
        </div>
      )}
    </Modal>
  );
};

export default BugReport;
