import RecipeContainer from "../RecipeContainer/RecipeContainer";
import Bouton from "../ui/Bouton/Bouton";
import Modal from "../ui/Modal/Modal";

type Props = {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalChooseRecipe = (props: Props) => {
  return (
    <Modal
      visible={props.visible}
      setVisible={props.setVisible}
      header={"Je choisis mes recettes"}
      className={"mt-12 !w-full tablet:p-6"}
      contentClassName="flex items-center flex-col !bg-fond !pb-16"
    >
      <>
        <Bouton
          className=" mt-12 !p-6"
          type={"normal"}
          btnTexte={"Valider ma sélection"}
          btnAction={() => props.setVisible(false)}
        ></Bouton>
        <RecipeContainer dataToCall="/recipes" checkboxes></RecipeContainer>
        <Bouton
          className="mt-12 !p-6"
          type={"normal"}
          btnTexte={"Valider ma sélection"}
          btnAction={() => props.setVisible(false)}
        ></Bouton>
      </>
    </Modal>
  );
};

export default ModalChooseRecipe;