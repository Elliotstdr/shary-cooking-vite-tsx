import { timeToString } from "../../../Services/functions";
import { GiKnifeFork } from "react-icons/gi";
import { BiTimer } from "react-icons/bi";
import { BiAward } from "react-icons/bi";
import { Dropdown } from "primereact/dropdown";

type Props = {
  recipeDetail: Recipe,
  multiplyer: number,
  setMultiplyer: React.Dispatch<React.SetStateAction<number>>
}

const RecipeDetailRecap = ({ recipeDetail, multiplyer, setMultiplyer }: Props) => {
  const multiplyerOptions = Array.from(
    new Set([1, 2, 3, 4, 6, 8, recipeDetail.number])
  ).sort((a, b) => a - b)

  return (
    <>
      <div className="flex items-center">
        {recipeDetail.postedByUser?.imageUrl && (
          <img
            src={import.meta.env.VITE_BASE_URL_API + recipeDetail.postedByUser?.imageUrl}
            alt="ma pp"
            className=" size-6 rounded-full mr-2 object-cover"
          ></img>
        )}
        <span>Créée par {recipeDetail.postedByUser?.name}</span>
      </div>
      <div className="flex flex-col self-start ml-4 gap-1 laptop:gap-8 laptop:flex-row laptop:self-center laptop:ml-0">
        <div className="flex items-center font-bold">
          <BiTimer className="mr-1"></BiTimer> {timeToString(recipeDetail.time)}
        </div>
        <Dropdown
          value={multiplyer}
          options={multiplyerOptions}
          onChange={(e) => setMultiplyer(e.value)}
          className="!border-0"
          itemTemplate={(e) =>
            <div className="text-lg">
              {`${e} personne${e !== 1 ? "s" : ""}`}
            </div>
          }
          valueTemplate={(e) =>
            <div className="font-bold text-lg">
              {`${e} personne${e !== 1 ? "s" : ""}`}
            </div>
          }
        ></Dropdown>
        <div className="flex items-center font-bold">
          <GiKnifeFork className="mr-1"></GiKnifeFork> {recipeDetail.type?.label}
        </div>
        <div className="flex items-center font-bold">
          <BiAward className="mr-1"></BiAward> {recipeDetail.regime?.label}
        </div>
      </div>
    </>
  );
};

export default RecipeDetailRecap;