import { useEffect, useState } from "react";
import Bouton from "../../Components/ui/Bouton/Bouton";
import Modal from "../../Components/ui/Modal/Modal";
import RecipeContainer from "../../Components/RecipeContainer/RecipeContainer";
import { InputTextarea } from "primereact/inputtextarea";
import { exportRecipe } from "../../Services/functions";
import { useFetchGet } from "../../Hooks/api.hook";
import ShoppingListCard from "./ShoppingListCard/ShoppingListCard";
import { useDispatch, useSelector } from "react-redux";
import image from "../../assets/HCDarkOp.jpg";
import { BiEditAlt } from "react-icons/bi";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import { updateRecipe } from "../../Store/Reducers/recipeReducer";

const ShoppingList = () => {
  const recipeR = useSelector((state: RootState) => state.recipe);
  const dispatch = useDispatch();

  const ingredientData = useFetchGet<IngredientData[]>("/ingredient_datas");

  const [visibleRecipeContainer, setVisibleRecipeContainer] = useState(false);
  const [visibleExport, setVisibleExport] = useState(false);
  const [visibleList, setVisibleList] = useState<boolean>(false);
  const [stringShopping, setStringShopping] = useState("");
  const [greenButton, setGreenButton] = useState(false);

  useEffect(() => {
    dispatch(updateRecipe({ shopping: true }));
    return () => {
      dispatch(updateRecipe({
        chosenRecipes: [],
        shopping: false,
      }));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    !visibleRecipeContainer &&
      setVisibleExport(recipeR.chosenRecipes.length > 0);
  }, [visibleRecipeContainer, recipeR.chosenRecipes.length]);

  const modifyRecipeList = (word: number, recipe: RecipeShopping) => {
    const tempArray: RecipeShopping[] = [...recipeR.chosenRecipes];
    tempArray.forEach((element) => {
      if (element.id === recipe.id) {
        element.multiplyer = word;
      }
    });
    dispatch(updateRecipe({ chosenRecipes: tempArray }));
  };

  return (
    <div>
      <NavBar></NavBar>
      <div className="my-[5%] mx-auto flex items-center justify-center">
        {visibleExport && ingredientData.data ? (
          <div className="flex flex-col mx-2 w-full laptop:mx-0 laptop:w-3/5">
            <div className="flex flex-col justify-center font-bold text-2xl my-4 laptop:flex-row laptop:items-center">
              <h2 className="my-2 laptop:m-0"> Mes recettes pour la liste de course </h2>
              <Bouton
                className="!h-8 ml-4 self-center"
                type={"normal"}
                btnTexte={"Modifier"}
                btnAction={() => setVisibleRecipeContainer(true)}
              >
                <BiEditAlt className="font-bold"></BiEditAlt>
              </Bouton>
            </div>
            <div className="flex flex-col items-center">
              {(recipeR.chosenRecipes as RecipeShopping[]).map((recipe, index) => (
                <ShoppingListCard
                  recipe={recipe}
                  modifyRecipeList={(word, recipe) =>
                    modifyRecipeList(word, recipe)
                  }
                  key={index}
                ></ShoppingListCard>
              ))}
            </div>
            <Bouton
              className="self-center"
              type={"normal"}
              btnTexte={"Créer ma liste de course"}
              btnAction={() => {
                ingredientData.data && setStringShopping(
                  exportRecipe(recipeR.chosenRecipes, ingredientData.data)
                );
                setVisibleList(true);
                setGreenButton(false);
              }}
            ></Bouton>
          </div>
        ) : (
          <div className="w-[40rem] h-[25rem] my-20 flex items-center justify-center relative">
            <img src={image} alt="background shopping" className="absolute size-full object-cover rounded-xl" />
            <Bouton
              className="!text-white !text-xl hover:border-solid hover:border-white after:!bg-green"
              btnTexte={"Choisir mes recettes"}
              btnAction={() => setVisibleRecipeContainer(true)}
            ></Bouton>
          </div>
        )}
      </div>
      <Footer></Footer>
      {visibleRecipeContainer && (
        <Modal
          visible={visibleRecipeContainer}
          setVisible={setVisibleRecipeContainer}
          header={"Je choisis mes recettes"}
          className={"mt-12 !w-full tablet:p-6"}
          contentClassName="flex items-center flex-col !bg-fond !pb-16"
        >
          <>
            <Bouton
              className=" mt-12 !p-6"
              type={"normal"}
              btnTexte={"Valider ma sélection"}
              btnAction={() => setVisibleRecipeContainer(false)}
            ></Bouton>
            <RecipeContainer dataToCall="/recipes" checkboxes></RecipeContainer>
            <Bouton
              className="mt-12 !p-6"
              type={"normal"}
              btnTexte={"Valider ma sélection"}
              btnAction={() => setVisibleRecipeContainer(false)}
            ></Bouton>
          </>
        </Modal>
      )}
      {visibleList && stringShopping.length > 0 && (
        <Modal
          visible={visibleList}
          setVisible={setVisibleList}
          header={"Ma liste"}
          width={"90%"}
          className={"laptop:!40%"}
        >
          <div className="flex items-center flex-col">
            <InputTextarea
              className="resize-y"
              autoResize
              value={stringShopping}
              onChange={(e) => setStringShopping(e.target.value)}
            ></InputTextarea>
            <button
              className={`mt-4 bouton normal ${greenButton && " !text-white !bg-card-green !border-card-green"}`}
              onClick={() => {
                navigator.clipboard.writeText(stringShopping);
                setGreenButton(true);
              }}
            >
              {greenButton ? "Copié" : "Copier"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ShoppingList;
