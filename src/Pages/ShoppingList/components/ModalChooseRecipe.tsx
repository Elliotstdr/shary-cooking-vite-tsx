import Modal from "../../../Components/Modal/Modal";
import RecipeContainer from "../../../Components/RecipeContainer/RecipeContainer";
import Bouton from "../../../Components/ui/Bouton/Bouton";

type Props = {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
}

const ModalChooseRecipe = (props: Props) => {
  return (
    <Modal
      visible={props.visible}
      setVisible={props.setVisible}
      header={
        <div className="header-button">
          <Bouton
            type={"normal"}
            btnTexte={"Valider"}
            btnAction={() => props.setVisible(false)}
          ></Bouton>
        </div>
      }
      className={"choose_recipe"}
    >
      <>
        <RecipeContainer></RecipeContainer>
      </>
    </Modal>
  );
};

export default ModalChooseRecipe;