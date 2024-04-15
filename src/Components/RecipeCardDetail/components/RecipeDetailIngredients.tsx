import { Key } from "react";

type Props = {
  ingredients: Ingredient[]
}

const RecipeDetailIngredients = ({ ingredients }: Props) => {
  return (
    <ul className="cardDetail_container_ingredients">
      <h2 className="ingredient_title">Ingrédients</h2>
      {ingredients
        .map((ingredient: Ingredient, index: Key) => (
          <li className="cardDetail_container_ingredient" key={index}>
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