import { useDispatch, useSelector } from "react-redux";
import ShoppingListCard from "../Shopping/ShoppingListCard";
import { useEffect, useState } from "react";
import { fetchPost, useFetchGet } from "../../Hooks/api.hook";
import { errorToast } from "../../Services/functions";
import { formatShoppingData } from "../../Services/shoppingFunctions";
import { addList, updateSelectedList } from "../../Store/Reducers/shoppingReducer";
import { updateSecondaryTables } from "../../Store/Reducers/secondaryTablesReducer";
import SimpleButton from "../ui/SimpleButton";
import Modal from "../ui/Modal";

type Props = {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
}

const ModalChooseRecipe = (props: Props) => {
  const dispatch = useDispatch()
  const recipe = useSelector((state: RootState) => state.recipe);
  const [selectedRecipes, setSelectedRecipes] = useState<RecipeShopping[]>([]);
  const ingredientData = useFetchGet<IngredientData[]>("/ingredient_datas");

  useEffect(() => {
    ingredientData.loaded && ingredientData.data &&
      dispatch(updateSecondaryTables({
        ingData: ingredientData.data
      }))
  }, [ingredientData.loaded, ingredientData.data])

  const createList = async () => {
    if (selectedRecipes.length === 0) return

    const content = formatShoppingData(selectedRecipes)

    const recipes = selectedRecipes.map((x) => {
      return {
        id: x.id,
        title: x.title
      }
    })

    const data = {
      name: "Liste",
      content: content,
      selectedRecipes: recipes
    }

    const res = await fetchPost('/list', data)
    if (res.error) {
      errorToast('La liste n\'a pas pu être créée')
      return
    }

    props.setVisible(false)
    dispatch(updateSelectedList(res.data))
    dispatch(addList(res.data))
  }

  return (
    <Modal
      visible={props.visible}
      setVisible={props.setVisible}
      className="w-full !max-h-[94%] laptop:w-11/12"
      contentClassName="items-center !bg-fond !pb-16 !px-2"
      headerClassName="!py-2 px-4"
      header={
        <div className="flex-center">
          <SimpleButton
            btnTexte="Valider"
            btnAction={() => createList()}
            className="!bg-white !rounded-xl hover:!text-green"
          ></SimpleButton>
        </div>
      }
    >
      <div className="flex flex-wrap justify-center gap-8 py-4 tablet:p-12 tablet:gap-x-12">
        {([...recipe.recipes] as Recipe[])
          .sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
          .map((recipe) => (
            <ShoppingListCard
              recipe={recipe}
              selectedRecipes={selectedRecipes}
              setSelectedRecipes={setSelectedRecipes}
              key={recipe.id}
            ></ShoppingListCard>
          ))}
      </div>
    </Modal>
  );
};

export default ModalChooseRecipe;