import { Key } from "react";
import { getIngredientFullName } from "../../../Services/pluralService";

type Props = {
  ingredients: Ingredient[],
  ratio: number
}

const RecipeDetailIngredients = ({ ingredients, ratio }: Props) => {
  return (
    <ul className="w-full p-4 bg-fond rounded-lg text-3xl laptop:p-8">
      <h2 className="font-bold mb-8 w-full">Ingrédients</h2>
      {ingredients
        .map((ingredient: Ingredient, index: Key) => {
          const ingredientFullName = getIngredientFullName(ingredient, ratio)

          return (
            <li className="m-2 text-left text-xl laptop:ml-8" key={index}>
              {ingredientFullName.quantity}<b>{ingredientFullName.name}</b>
            </li>
          )
        })}
    </ul>
  );
};

export default RecipeDetailIngredients;