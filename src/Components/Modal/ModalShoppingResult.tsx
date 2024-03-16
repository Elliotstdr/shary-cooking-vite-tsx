import { InputTextarea } from "primereact/inputtextarea";
import Modal from "../ui/Modal/Modal";
import { useEffect, useState } from "react";

type Props = {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  stringShopping: string,
  setStringShopping: React.Dispatch<React.SetStateAction<string>>
}

const ModalShoppingResult = (props: Props) => {
  const [greenButton, setGreenButton] = useState(false);

  useEffect(() => {
    return setGreenButton(false)
  }, [])

  return (
    <Modal
      visible={props.visible}
      setVisible={props.setVisible}
      header={"Ma liste"}
      width={"90%"}
      className={"laptop:!40%"}
    >
      <div className="flex items-center flex-col">
        <InputTextarea
          className="resize-y"
          autoResize
          value={props.stringShopping}
          onChange={(e) => props.setStringShopping(e.target.value)}
        ></InputTextarea>
        <button
          className={`mt-4 bouton normal ${greenButton && " !text-white !bg-card-green !border-card-green"}`}
          onClick={() => {
            navigator.clipboard.writeText(props.stringShopping);
            setGreenButton(true);
          }}
        >
          {greenButton ? "Copié" : "Copier"}
        </button>
      </div>
    </Modal>
  );
};

export default ModalShoppingResult;