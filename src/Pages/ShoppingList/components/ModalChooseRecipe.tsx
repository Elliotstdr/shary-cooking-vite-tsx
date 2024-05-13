import Modal from "../../../Components/Modal/Modal";
import RecipeContainer from "../../../Components/RecipeContainer/RecipeContainer";
import Bouton from "../../../Components/ui/Bouton";

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
        <div className="flex-center">
          <Bouton
            type="normal"
            btnTexte="Valider"
            btnAction={() => props.setVisible(false)}
            className="!bg-white !rounded-xl hover:!text-green"
          ></Bouton>
        </div>
      }
      className="!w-full !max-h-[94%]"
      contentClassName="flex items-center flex-col !bg-fond !pb-16 !px-2"
      headerClassName="!p-2"
    >
      <>
        <RecipeContainer></RecipeContainer>
      </>
    </Modal>
  );
};

export default ModalChooseRecipe;