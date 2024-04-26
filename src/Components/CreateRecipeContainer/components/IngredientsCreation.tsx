import Ingredient from "./Ingredient";
import Bouton from "../../ui/Bouton/Bouton";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useFetchGet } from "../../../Hooks/api.hook";
import { useMemo } from "react";
import { getLastId } from "../../../Services/createRecipeFunctions";

type Props = {
  ingredientList: FormIngredient[],
  setIngredientList: (ingredients: FormIngredient[]) => void,
}

const IngredientsCreation = ({ ingredientList, setIngredientList }: Props) => {
  const ingredientData = useFetchGet<IngredientData[]>("/ingredient_datas");

  const itemIds: number[] = useMemo(
    () => ingredientList.map((item) => item.id ? item.id : 1),
    [ingredientList]
  );

  const handleDragEnd = (event: { active: any, over: any }) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = ingredientList.findIndex(
        (item) => item.id === active.id
      );
      const newIndex = ingredientList.findIndex(
        (item) => item.id === over.id
      );

      setIngredientList(arrayMove(ingredientList, oldIndex, newIndex));
    }
  };

  return (
    <>
      <div className="ingredients">
        <Ingredient
          ingredient={ingredientList[0]}
          ingredientList={ingredientList}
          setIngredientList={setIngredientList}
          ingredientData={ingredientData.data}
        ></Ingredient>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} >
          <SortableContext items={itemIds} strategy={verticalListSortingStrategy} >
            {ingredientList.map((x) => x.id !== 1 && x.id && ingredientData.data && (
              <Ingredient
                key={x.id}
                ingredient={x}
                ingredientList={ingredientList}
                setIngredientList={setIngredientList}
                ingredientData={ingredientData.data}
              ></Ingredient>
            )
            )}
          </SortableContext>
        </DndContext>
      </div>
      <Bouton
        type={"normal"}
        btnAction={(e) => {
          e.preventDefault();
          const lastId = getLastId(ingredientList)
          lastId && setIngredientList([
            ...ingredientList,
            {
              unit: null,
              label: "",
              quantity: undefined,
              id: lastId
            },
          ]);
        }}
      >
        <AiOutlinePlusCircle />
        Ajouter un ingrédient
      </Bouton>
    </>
  );
};

export default IngredientsCreation;