import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPut } from "../../../Hooks/api.hook";
import ListContentActions from "./ListContentActions";
import ListContentIngredient from "./ListContentIngredient";
import ListContentRecipes from "./ListContentRecipes";
import { editList } from "../../../Store/Reducers/shoppingReducer";
import ListContentInput from "./ListContentInput";

const ListContent = () => {
  const dispatch = useDispatch()
  const shopping = useSelector((state: RootState) => state.shopping);
  const selectedList = useSelector((state: RootState) => state.shopping.selectedList) as List;
  const [showRecipes, setShowRecipes] = useState(true);

  useEffect(() => {
    const currentShoppingList = shopping.lists.find((x) => x.id === selectedList.id)
    if (JSON.stringify(currentShoppingList?.content) === JSON.stringify(selectedList.content)) {
      return
    }
    const timer = setTimeout(async () => {
      const res = await fetchPut(`/list/${selectedList.id}`, {
        content: selectedList.content,
        selectedRecipes: selectedList.selectedRecipes
      })
      if (res.error) return

      dispatch(editList(res.data))
    }, 2000)
    return () => clearTimeout(timer)
  }, [selectedList.content])

  return (
    <div className="flex flex-col gap-2 w-full">
      <ListContentActions
        showRecipes={showRecipes}
      ></ListContentActions>
      <ListContentRecipes
        showRecipes={showRecipes}
        setShowRecipes={setShowRecipes}
      ></ListContentRecipes>
      <ListContentInput></ListContentInput>
      {[...selectedList.content]
        .sort((a, b) => Number(a.selected) - Number(b.selected))
        .map((x) =>
          <ListContentIngredient item={x} key={x.name}></ListContentIngredient>
        )}
    </div >
  );
};

export default ListContent;