import "./ShoppingListCard.scss";
import { GiKnifeFork } from "react-icons/gi";
import { BsPeople } from "react-icons/bs";
import { BiTimer } from "react-icons/bi";
import { Dropdown } from "primereact/dropdown";
import { timeToString } from "../../Services/functions";
import RecipePicture from "../RecipePicture/RecipePicture";

interface Props {
  recipe: RecipeShopping,
  modifyRecipeList: (word: number, recipe: RecipeShopping) => void
}

const ShoppingListCard = (props: Props) => {
  return (
    <div className="shoppingList_container_export_recipes_recipe">
      <RecipePicture
        url={props.recipe.imageUrl}
        isFromHellof={props.recipe.fromHellof}
      ></RecipePicture>
      <div className="infos">
        <div className="infos_top">
          <div className="infos_top_title">{props.recipe.title}</div>
          <div className="infos_top_author">
            Créé par {props.recipe.postedByUser.name}
          </div>
        </div>
        <div className="infos_bottom">
          <div className="infos_bottom_left">
            <div className="infos_bottom_left_regime">
              <span>
                <GiKnifeFork></GiKnifeFork>
                {props.recipe.regime.label}
              </span>
            </div>
            <div className="infos_bottom_left_number">
              <span>
                <BsPeople></BsPeople>
                {props.recipe.number} personnes
              </span>
            </div>
            <div className="infos_bottom_left_time">
              <span>
                <BiTimer></BiTimer>
                {timeToString(props.recipe.time)}
              </span>
            </div>
          </div>
          <div className="infos_bottom_right">
            <Dropdown
              value={
                props.recipe.multiplyer
                  ? {
                    label: props.recipe.number * props.recipe.multiplyer,
                    multiplyer: 1 * props.recipe.multiplyer,
                  }
                  : { label: props.recipe.number, multiplyer: 1 }
              }
              options={[
                { label: props.recipe.number, multiplyer: 1 },
                { label: props.recipe.number * 2, multiplyer: 2 },
                { label: props.recipe.number * 3, multiplyer: 3 },
                { label: props.recipe.number * 4, multiplyer: 4 },
              ]}
              optionLabel="label"
              className="recipe__form__field-number"
              onChange={(e) => {
                props.modifyRecipeList(e.value.multiplyer, props.recipe);
              }}
            ></Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingListCard;
