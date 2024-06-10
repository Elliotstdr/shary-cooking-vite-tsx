import { GiKnifeFork } from "react-icons/gi";
import { BsFillCheckCircleFill, BsPeople } from "react-icons/bs";
import { BiTimer } from "react-icons/bi";
import { Dropdown } from "primereact/dropdown";
import { timeToString } from "../../Services/functions";
import RecipePicture from "../Recipe/RecipePicture";
import React, { useState } from "react";
import { arrayUniqueSortedByLabel } from "../../Services/shoppingFunctions";

interface Props {
  recipe: RecipeShopping,
  selectedRecipes: RecipeShopping[]
  setSelectedRecipes: React.Dispatch<React.SetStateAction<RecipeShopping[]>>
}

const ShoppingListCard = (props: Props) => {
  const [multiplyer, setMultiplyer] = useState({
    label: props.recipe.number
  });
  const multiplyerOptions = [
    { label: 1 },
    { label: 2 },
    { label: 3 },
    { label: 4 },
    { label: 6 },
    { label: 8 },
    { label: props.recipe.number }
  ];

  const modifyRecipeList = (multiplyer: number) => {
    const tempArray: RecipeShopping[] = [];
    props.selectedRecipes.forEach((element) => {
      if (element.id === props.recipe.id) {
        tempArray.push({
          ...element,
          multiplyer: multiplyer
        });
      } else {
        tempArray.push({ ...element })
      }
    });
    props.setSelectedRecipes(tempArray);
  };

  const shoppingAction = () => {
    if (window.location.pathname === "/shop") {
      if (
        props.selectedRecipes.length === 0 ||
        !props.selectedRecipes.some(
          (recipe) => recipe.id === props.recipe.id
        )
      ) {
        props.setSelectedRecipes((prev) => [
          ...prev,
          { ...props.recipe, multiplyer: multiplyer.label / props.recipe.number }
        ])
      } else {
        props.setSelectedRecipes((prev) => [...prev].filter((x) => x.id !== props.recipe.id))
      }
    }
  };

  const isSelected = () => {
    return props.selectedRecipes?.length > 0 &&
      props.selectedRecipes.some((recipe) => recipe.id === props.recipe.id)
  }

  return (
    <div
      className={
        `w-80 rounded-lg bg-white flex flex-col
          ${isSelected() ? "border-card-green border-4 relative rounded-[0.65rem]" : ""}
      `}
      onClick={() => {
        shoppingAction();
      }}
    >
      {isSelected() && (
        <BsFillCheckCircleFill className="absolute-centering size-20 text-card-green" />
      )}
      <RecipePicture
        url={props.recipe.imageUrl}
        isFromHellof={props.recipe.fromHellof}
        className="rounded-t-lg w-full h-48 object-cover"
      ></RecipePicture>
      <div className="flex flex-col p-4 grow justify-between">
        <div className="flex flex-col items-center justify-between my-2">
          <div className="text-xl mb-2 font-bold line-clamp-2 text-left">
            {props.recipe.title}
          </div>
          <div>
            Créé par {props.recipe.postedByUser.name}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col text-start">
            <span className="flex items-center p-1">
              <GiKnifeFork className="mr-2"></GiKnifeFork>
              {props.recipe.regime.label}
            </span>
            <span className="flex items-center p-1">
              <BsPeople className="mr-2"></BsPeople>
              {props.recipe.number} personnes
            </span>
            <span className="flex items-center p-1">
              <BiTimer className="mr-2"></BiTimer>
              {timeToString(props.recipe.time)}
            </span>
          </div>
          <Dropdown
            value={multiplyer}
            options={arrayUniqueSortedByLabel(multiplyerOptions)}
            optionLabel="label"
            onChange={(e) => {
              setMultiplyer(e.value)
              isSelected() && modifyRecipeList(e.value.label / props.recipe.number);
            }}
            onClick={(e) => e.stopPropagation()}
          ></Dropdown>
        </div>
      </div>
    </div>
  );
};

export default ShoppingListCard;
