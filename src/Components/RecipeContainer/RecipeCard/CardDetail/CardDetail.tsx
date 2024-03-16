import React, { Key } from "react";
import { useFetchGet } from "../../../../Hooks/api.hook";
import { timeToString } from "../../../../Services/functions";
import Loader from "../../../ui/Loader/loader";
import default2 from "../../../../assets/default2.jpg";
import { GiKnifeFork } from "react-icons/gi";
import { BsPeople } from "react-icons/bs";
import { BiTimer } from "react-icons/bi";
import { BiAward } from "react-icons/bi";
import { Divider } from "primereact/divider";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";

interface Props {
  id: number,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setVisibleModif: React.Dispatch<React.SetStateAction<boolean>>,
}

const CardDetail = (props: Props) => {
  const auth = useSelector((state: RootState) => state.auth);
  const recipeDetail = useFetchGet<Recipe>(`/recipes/${props.id}`);

  return (
    <div className="flex items-center justify-center flex-col text-xl whitespace-pre-line">
      {recipeDetail.loaded && recipeDetail.data ? (
        <>
          <div className="w-11/12 max-h-[25rem] overflow-hidden flex items-center justify-center rounded-xl m-8">
            <img
              src={
                recipeDetail.data.imageUrl
                  ? import.meta.env.VITE_BASE_URL_API +
                  recipeDetail.data.imageUrl
                  : default2
              }
              alt="Fond news"
              className="w-full"
            />
          </div>
          <h2 className="font-bold my-8 text-3xl flex flex-col w-11/12 items-center laptop:flex-row laptop:text-5xl">
            {recipeDetail.data.title}
            {recipeDetail.data.postedByUser.id === auth.userConnected?.id && (
              <div className="mt-4 ml-0 laptop:mt-0 laptop:ml-8">
                <CiEdit
                  onClick={() => {
                    props.setVisible(false);
                    props.setVisibleModif(true);
                  }}
                ></CiEdit>
              </div>
            )}
          </h2>
          <div className="flex items-center mb-4">
            {recipeDetail.data.postedByUser.imageUrl && (
              <img
                src={
                  import.meta.env.VITE_BASE_URL_API +
                  recipeDetail.data.postedByUser?.imageUrl
                }
                alt="ma pp"
                className="size-6 rounded-full mr-2 object-cover"
              ></img>
            )}
            <span>Créée par {recipeDetail.data.postedByUser?.name}</span>
          </div>
          <div className="flex flex-col self-start ml-8 laptop:m-0 laptop:self-center laptop:flex-row">
            <div className="m-4 flex items-center font-bold">
              <BiTimer className="mr-1"></BiTimer> {timeToString(recipeDetail.data.time)}
            </div>
            <div className="m-4 flex items-center font-bold">
              <BsPeople className="mr-1"></BsPeople> {recipeDetail.data.number} personnes
            </div>
            <div className="m-4 flex items-center font-bold">
              <GiKnifeFork className="mr-1"></GiKnifeFork> {recipeDetail.data.type.label}
            </div>
            <div className="m-4 flex items-center font-bold">
              <BiAward className="mr-1"></BiAward> {recipeDetail.data.regime.label}
            </div>
          </div>
          <ul className="p-4 w-11/12 rounded-xl bg-fond mt-8 mb-16 laptop:p-8 laptop:ml-8">
            <h2 className="font-bold mb-8 w-full">Ingrédients</h2>
            {recipeDetail.data.ingredients
              .map((ingredient: Ingredient, index: Key) => (
                <li className="m-2 ml-8 text-xl text-left" key={index}>
                  {ingredient.unit.label === "unité"
                    ? ingredient.quantity + " "
                    : ingredient.unit.label === "un peu"
                      ? ingredient.unit.label + " de "
                      : ingredient.quantity + " " + ingredient.unit.label + " de "}
                  <strong>{ingredient.label.toLowerCase()}</strong>
                </li>
              ))}
          </ul>
          {recipeDetail.data.steps
            .sort((a: Step, b: Step) => a.stepIndex - b.stepIndex)
            .map((step: Step, index: number) => (
              <div className="flex items-center flex-col mb-8 w-full" key={index}>
                <div className="flex items-center justify-center text-3xl size-16 rounded-full font-bold text-orange border-2 border-solid border-orange">
                  {index + 1}
                </div>
                <Divider className="!w-1/2 !my-5 before:!border-t-orange"></Divider>
                <div className="w-11/12 self-center p-4 bg-fond my-2 rounded-xl text-left laptop:w-1/3" key={index}>
                  {step.description}
                </div>
              </div>
            ))}
        </>
      ) : (
        <Loader></Loader>
      )}
    </div>
  );
};

export default CardDetail;
