import { InputTextarea } from "primereact/inputtextarea";
import Modal from "../../../Components/Modal/Modal";
import { useState } from "react";
import { exportRecipe } from "../../../Services/functions";
import { useSelector } from "react-redux";

type Props = {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
}

const ModalShoppingResult = (props: Props) => {
  const recipeR = useSelector((state: RootState) => state.recipe);
  const [greenButton, setGreenButton] = useState(false);
  const [stringShopping, setStringShopping] = useState(exportRecipe(recipeR.chosenRecipes));

  return (
    <Modal
      visible={props.visible}
      setVisible={props.setVisible}
      header={"Ma liste"}
      width={"40%"}
      className={"modal_liste_courses_modal"}
    >
      <div className="modal_liste_courses">
        <InputTextarea
          autoResize
          value={stringShopping}
          onChange={(e) => setStringShopping(e.target.value)}
        ></InputTextarea>
        <button
          className={`bouton normal ${greenButton && "copied"}`}
          onClick={() => {
            navigator.clipboard.writeText(stringShopping);
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