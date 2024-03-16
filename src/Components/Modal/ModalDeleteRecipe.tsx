import { fetchDelete } from "../../Hooks/api.hook";
import { errorToast } from "../../Services/functions";
import Bouton from "../ui/Bouton/Bouton";
import Modal from "../ui/Modal/Modal";

type Props = {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  recipeId: number,
  setFilteredRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>
}

const ModalDeleteRecipe = (props: Props) => {

  const deleteRecipe = async () => {
    const response = await fetchDelete(`/recipes/${props.recipeId}`);
    if (response.error) {
      errorToast("Une erreur est survenue, la recette n'a pas été supprimée");
      return;
    }
    props.setVisible(false);
    props.setFilteredRecipes((prev) => prev.filter((x) => x.id !== props.recipeId));
  };

  return (
    <Modal
      visible={props.visible}
      setVisible={props.setVisible}
      header={"Suppression de recette"}
    >
      <div>
        <div className="my-8">
          Etes vous sur de vouloir supprimer cette recette ?
        </div>
        <div className="flex justify-center">
          <Bouton className="mr-4" type={"normal"} btnAction={() => deleteRecipe()}>
            Oui
          </Bouton>
          <Bouton className="mr-4" type={"normal"} btnAction={() => props.setVisible(false)}>
            Non
          </Bouton>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteRecipe;