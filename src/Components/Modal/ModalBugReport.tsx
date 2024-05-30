import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputTextarea } from "primereact/inputtextarea";
import Loader from "../ui/loader";
import Bouton from "../ui/Bouton";
import { InputText } from "primereact/inputtext";
import ImageUpload from "../ui/ImageUpload";
import { errorToast } from "../../Services/functions";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { fetchPost } from "../../Hooks/api.hook";
import { Dialog } from "primereact/dialog";

type Props = {
  reportBugModal: boolean,
  setReportBugModal: React.Dispatch<React.SetStateAction<boolean>>,
}

const ModalBugReport = (props: Props) => {
  const [file, setFile] = useState<any>(null);
  const [successView, setSuccessView] = useState(false);

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
    const data = new FormData()
    data.append('image', getValues('image') as any)
    data.append('message', getValues('message'))
    data.append('title', getValues('title'))

    const response = await fetchPost(`/mail/sendReport`, data, null, true);
    if (response.error) {
      errorToast("Une erreur est survenue lors de l'envoi du mail");
      return;
    }
    setFile(null)
    setSuccessView(true);
  };

  return (
    <Dialog
      header="Report de bug"
      visible={props.reportBugModal}
      onHide={() => props.setReportBugModal(false)}
      className="w-11/12 tablet:w-160"
    >
      {!successView ? (
        <form className="flex items-center flex-col p-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full mb-8 tablet:w-2/3">
            <h4 className="font-bold my-2">Intitulé du problème :</h4>
            <InputText
              {...register("title", { required: true })}
              placeholder="Problème quand je clique sur le bouton ..."
              className="!w-full"
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
              {...register("image")}
              file={file}
              setFile={setFile}
              setImage={(image) => setValue('image', image)}
              id='bugUpld'
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
    </Dialog>
  );
};

export default ModalBugReport;
