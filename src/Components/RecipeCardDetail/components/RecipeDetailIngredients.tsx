import { Key } from "react";

type Props = {
  ingredients: Ingredient[]
}

const RecipeDetailIngredients = ({ ingredients }: Props) => {
  return (
    <ul className="w-full p-4 bg-fond rounded-lg text-3xl laptop:p-8">
      <h2 className="font-bold mb-8 w-full">Ingrédients</h2>
      {ingredients
        .map((ingredient: Ingredient, index: Key) => (
          <li className="m-2 text-left text-xl laptop:ml-8" key={index}>
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