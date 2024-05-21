import { InputSwitch } from "primereact/inputswitch";
import { useSelector } from "react-redux";
import SlideIn from "../../ui/SlideIn";
import RecipeCardDetail from "../../RecipeCardDetail/RecipeCardDetail";
import { useState } from "react";

type Props = {
  showRecipes: boolean,
  setShowRecipes: React.Dispatch<React.SetStateAction<boolean>>,
}

const ListContentRecipes = ({ showRecipes, setShowRecipes }: Props) => {
  const selectedList = useSelector((state: RootState) => state.shopping.selectedList) as List;
  const recipe = useSelector((state: RootState) => state.recipe);
  const [selectedDetail, setSelectedDetail] = useState<Recipe | null>(null);

  return (
    <>
      <div className="flex items-center gap-2">
        <InputSwitch checked={showRecipes} onChange={(e) => setShowRecipes(!!e.value)} inputId="switch" />
        <label htmlFor="switch">{showRecipes ? "Masquer" : "Afficher"} les recettes</label>
      </div>
      <div className={`transition-all ${showRecipes ? 'visible-transition mb-4' : 'hidden-transition'}`}>
        {selectedList.selectedRecipes.map((x) =>
          <div
            key={x.id}
            className="text-left cursor-pointer line-clamp-1 my-1 hover:underline"
            onClick={() => setSelectedDetail(recipe.recipes.find((y) => y.id === x.id) || null)}
            title={x.title}
          >{x.title}</div>
        )}
      </div>
      <SlideIn visible={!!selectedDetail} setVisible={() => setSelectedDetail(null)}>
        {selectedDetail && <RecipeCardDetail recipeDetail={selectedDetail}></RecipeCardDetail>}
      </SlideIn>
    </>
  );
};

export default ListContentRecipes;