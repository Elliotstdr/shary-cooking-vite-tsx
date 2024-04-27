import { InputTextarea } from "primereact/inputtextarea";
import Modal from "../../../Components/Modal/Modal";
import { useState } from "react";
import { exportRecipe } from "../../../Services/functions";
import { useSelector } from "react-redux";
import Bouton from "../../../Components/ui/Bouton/Bouton";

type Props = {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
}

const ModalShoppingResult = (props: Props) => {
  const recipe = useSelector((state: RootState) => state.recipe);
  const [greenButton, setGreenButton] = useState(false);
  const [stringShopping, setStringShopping] = useState(exportRecipe(recipe.chosenRecipes));

  return (
    <Modal
      visible={props.visible}
      setVisible={props.setVisible}
      header={"Ma liste"}
      className={"w-11/12 tablet:w-unset tablet:min-w-[40%]"}
    >
      <div className="flex items-center flex-col">
        <InputTextarea
          autoResize
          value={stringShopping}
          onChange={(e) => setStringShopping(e.target.value)}
          className="resize-y !my-2 w-10/12"
        ></InputTextarea>
        <Bouton
          className={`mt-4 ${greenButton && "!border-card-green !bg-card-green !text-white"}`}
          btnAction={() => {
            navigator.clipboard.writeText(stringShopping);
            setGreenButton(true);
          }}
          type="normal"
        >
          {greenButton ? "Copié" : "Copier"}
        </Bouton>
      </div>
    </Modal>
  );
};

export default ModalShoppingResult;