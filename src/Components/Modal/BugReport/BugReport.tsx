import React, { useState } from "react";
import "./BugReport.scss";
import Modal from "../Modal";
import { useForm } from "react-hook-form";
import { InputTextarea } from "primereact/inputtextarea";
import Loader from "../../ui/Loader/loader";
import Bouton from "../../ui/Bouton/Bouton";
import { InputText } from "primereact/inputtext";
import ImageUpload from "../../ui/ImageUpload/ImageUpload";
import { errorToast } from "../../../Services/functions";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { fetchPost } from "../../../Hooks/api.hook";

type Props = {
  reportBugModal: boolean,
  setReportBugModal: React.Dispatch<React.SetStateAction<boolean>>,
}

const BugReport = (props: Props) => {
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
      className={"modal modal-bug"}
    >
      {!successView ? (
        <form className="bug__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="bug__form__field">
            <h4>Intitulé du problème :</h4>
            <InputText
              {...register("title", { required: true })}
              placeholder="Problème quand je clique sur le bouton ..."
              className="bug__form__field-title"
            />
            {errors.title && <small className="p-error">Le titre est obligatoire</small>}
          </div>
          <div className="bug__form__field">
            <h4>Description :</h4>
            <InputTextarea
              {...register("message", { required: true })}
              placeholder="Où? Quand? Comment?"
              className="bug__form__field-message"
              autoResize
            />
            {errors.message && <small className="p-error">La description est obligatoire</small>}
          </div>
          <div className="bug__form__field file">
            <h4>Capture d'écran :</h4>
            <ImageUpload
              {...register("image")}
              image={getValues('image')}
              setImage={(image) => setValue('image', image)}
            />
          </div>
          <div className="bug__form__button">
            {isSubmitting ? <Loader /> : <Bouton>Envoyer mon rapport</Bouton>}
          </div>
        </form>
      ) : (
        <div className="success_view">
          <div className="success_message">
            Mail envoyé ! Merci de votre retour !
          </div>
          <BsFillCheckCircleFill className="chosen_check"></BsFillCheckCircleFill>
        </div>
      )}
    </Modal>
  );
};

export default BugReport;
