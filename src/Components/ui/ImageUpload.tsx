import React from "react";

type Props = {
  setImage: React.Dispatch<React.SetStateAction<any>>,
  headerClassName?: string
  file: any
  setFile: React.Dispatch<React.SetStateAction<any>>,
}

const ImageUpload = (props: Props) => {
  const handleFileChange = (e: any) => {
    const file = e.target.files[0]
    props.setImage(file);
    props.setFile && props.setFile(file)
  }
  return (
    <div className="bg-white flex-center flex-col gap-4 rounded-md py-2 min-w-60 font-semibold border border-search">
      <div className="flex-center gap-2">
        <div className="pi pi-plus"></div>
        <label htmlFor={"file" + new Date().getTime().toString()} className="cursor-pointer">
          {props.file ? "Modifier l'image" : "Ajouter une image"}
        </label>
        <input
          type="file"
          id={"file" + new Date().getTime().toString()}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      {props.file && <div className="flex gap-4 px-4 items-center text-sm">
        <img src={URL.createObjectURL(props.file)} className="max-w-40 mb-2"></img>
        <label htmlFor="file">{props.file.name}</label>
      </div>}
    </div>
  );
};

export default ImageUpload;

// new Compressor(file, {
//   quality: 0.8,
//   success: (res) => {
//     const fileReader = new FileReader();

//     fileReader.onload = () => {
//       props.setImage(fileReader.result);
//       successToast("L'image a bien été chargée");
//     };
//     fileReader.readAsDataURL(res);
//   },
// });
