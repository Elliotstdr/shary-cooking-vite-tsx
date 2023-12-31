import { FileUpload } from "primereact/fileupload";
import React from "react";
import "./ImageUpload.scss";
import { successToast } from "../../../Services/functions";
import Compressor from 'compressorjs';

interface Props {
  image: any,
  setImage: React.Dispatch<React.SetStateAction<any>>,
}

const ImageUpload = (props: Props) => {
  const uploadHandler = ({ files }: any) => {
    const file = files[0];

    new Compressor(file, {
      quality: 0.8,
      success: (res) => {
        const fileReader = new FileReader();

        fileReader.onload = () => {
          props.setImage(fileReader.result);
          successToast("L'image a bien été chargée");
        };
        fileReader.readAsDataURL(res);
      },
    });
  };
  return (
    <FileUpload
      name={"image"}
      className="upload_image"
      customUpload={true}
      uploadHandler={uploadHandler}
      chooseLabel={props.image ? "Modifier l'image" : "Ajouter une image"}
      auto
      maxFileSize={5000000}
      accept="image/*"
    ></FileUpload>
  );
};

export default ImageUpload;
