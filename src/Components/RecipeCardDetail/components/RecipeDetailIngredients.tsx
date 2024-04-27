import { Key } from "react";

type Props = {
  ingredients: Ingredient[]
}

const RecipeDetailIngredients = ({ ingredients }: Props) => {
  return (
    <ul className="p-4 bg-fond w-11/12 rounded-lg text-3xl laptop:p-8 laptop:ml-8">
      <h2 className="font-bold mb-8 w-full">Ingrédients</h2>
      {ingredients
        .map((ingredient: Ingredient, index: Key) => (
          <li className="m-2 ml-8 text-left text-xl" key={index}>
            {ingredient.unit.label === "unité"
              ? ingredient.quantity + " "
              : ingredient.unit.label === "un peu"
                ? ingredient.unit.label + " de "
                : ingredient.quantity + " " + ingredient.unit.label + " de "}
            <strong>{ingredient.label.toLowerCase()}</strong>
          </li>
        ))}
    </ul>
  );
};

export default RecipeDetailIngredients;