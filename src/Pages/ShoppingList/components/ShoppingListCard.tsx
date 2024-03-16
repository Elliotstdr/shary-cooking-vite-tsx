import { GiKnifeFork } from "react-icons/gi";
import { BsPeople } from "react-icons/bs";
import { BiTimer } from "react-icons/bi";
import default2 from "src/assets/default2.jpg";
import { Dropdown } from "primereact/dropdown";
import { timeToString } from "../../../Services/functions";

interface Props {
  recipe: RecipeShopping,
  modifyRecipeList: (word: number, recipe: RecipeShopping) => void
}

const ShoppingListCard = (props: Props) => {
  return (
    <div className="rounded-lg bg-white my-4 flex flex-col w-80 laptop:flex-row laptop:w-full laptop:h-48">
      <img
        src={
          props.recipe.imageUrl
            ? import.meta.env.VITE_BASE_URL_API + props.recipe.imageUrl
            : default2
        }
        alt="Fond news"
        className="rounded-tr-xl rounded-tl-xl w-full h-64 object-cover laptop:h-48 laptop:w-72 laptop:rounded-bl-xl laptop:rounded-tr-none"
      />
      <div className="flex flex-col p-6 grow justify-between laptop:py-8">
        <div className="flex items-center justify-between mt-2 mb-8 laptop:m-0">
          <div className="mb-4 text-xl font-bold h-fit text-left max-w-[70%] line-clamp-2 laptop:line-clamp-1 laptop:mb-0">{props.recipe.title}</div>
          <div>
            Créé par {props.recipe.postedByUser.name}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col text-start">
            <div>
              <span className="flex items-center px-1">
                <GiKnifeFork className="mr-2"></GiKnifeFork>
                {props.recipe.regime.label}
              </span>
            </div>
            <div>
              <span className="flex items-center px-1">
                <BsPeople className="mr-2"></BsPeople>
                {props.recipe.number} personnes
              </span>
            </div>
            <div>
              <span className="flex items-center px-1">
                <BiTimer className="mr-2"></BiTimer>
                {timeToString(props.recipe.time)}
              </span>
            </div>
          </div>
          <div>
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
