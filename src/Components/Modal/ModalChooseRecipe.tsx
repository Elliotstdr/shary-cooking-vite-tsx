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
      header={
        <div className="flex-center gap-8">
          {/* <span>Je choisis mes recettes</span> */}
          <Bouton
            className="!bg-white !rounded-xl hover:!text-green"
            type={"normal"}
            btnTexte={"Valider"}
            btnAction={(e) => { e.preventDefault(); props.setVisible(false) }}
          ></Bouton>
        </div>
      }
      className={"!w-full tablet:p-6"}
      contentClassName="flex items-center flex-col !bg-fond !pb-16"
    >
      <>
        <RecipeContainer dataToCall="/recipes" checkboxes></RecipeContainer>
      </>
    </Modal>
  );
};

export default ModalChooseRecipe;