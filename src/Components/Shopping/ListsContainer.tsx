import { useState } from "react";
import Lists from "./ListContainer/Lists";
import ListContent from "./ListContainer/ListContent";
import { useSelector } from "react-redux";
import ModalChooseRecipe from "../Modal/ModalChooseRecipe";

const ListsContainer = () => {
  const selectedList = useSelector((state: RootState) => state.shopping.selectedList);
  const [visibleChooseRecipe, setVisibleChooseRecipe] = useState(false);

  return (
    <div className="w-full laptop:w-3/4">
      <button className="flex-center font-bold mb-4 text-lg laptop:ml-4" onClick={() => setVisibleChooseRecipe(true)}>
        <div className="pi pi-plus mr-1"></div> Créer une liste
      </button>
      <div className="flex gap-8 left-0 relative">
        <Lists></Lists>
        {selectedList && <ListContent></ListContent>}
      </div>
      {visibleChooseRecipe &&
        <ModalChooseRecipe
          visible={visibleChooseRecipe}
          setVisible={setVisibleChooseRecipe}
        ></ModalChooseRecipe>
      }
    </div>
  );
};

export default ListsContainer;