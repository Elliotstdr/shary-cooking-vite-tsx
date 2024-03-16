import React from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { AutoComplete, AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BiMoveVertical } from "react-icons/bi";
import { AiOutlineStop } from "react-icons/ai";

interface Props {
  id: number,
  ingredientList: Array<FormIngredient>,
  setIngredientList: React.Dispatch<React.SetStateAction<Array<FormIngredient>>>,
  autocompleteData: Array<IngredientData>,
  setAutocompleteData: React.Dispatch<React.SetStateAction<Array<IngredientData>>>,
  activeIndex: number,
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>,
  ingredientData: Array<IngredientData>,
  ingredient: FormIngredient
}

const IngredientsCreation = (props: Props) => {
  const secondaryTables = useSelector((state: RootState) => state.secondaryTables);

  const modifyIngredientList = (word: string, ingredient: FormIngredient) => {
    const tempArray = [...props.ingredientList];
    tempArray.forEach((element) => {
      if (element.id === ingredient.id) {
        element.label = word;
      }
    });
    props.setIngredientList(tempArray);
  };
  const findIngredient = (word: AutoCompleteCompleteEvent) => {
    const filteredData = props.ingredientData
      .filter((element) =>
        element.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(
            word.query
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          )
      )
      .sort((a, b) => {
        if (a.frequency === null && b.frequency === null) { return 0 }
        if (a.frequency === null) { return 1 }
        if (b.frequency === null) { return -1 }
        return b.frequency - a.frequency;
      });
    props.setAutocompleteData(filteredData);
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div className="flex relative" ref={setNodeRef} style={style} {...attributes}>
      {props.id === 1 ? (
        <AiOutlineStop className="cursor-pointer self-center text-2xl"></AiOutlineStop>
      ) : (
        <BiMoveVertical className="cursor-pointer self-center text-2xl" {...listeners}></BiMoveVertical>
      )}
      <div id="ingredient_name">
        <AutoComplete
          className="!m-1"
          inputClassName="w-28 tablet:w-unset"
          value={props.ingredient.label}
          suggestions={props.autocompleteData}
          completeMethod={findIngredient}
          field="name"
          placeholder="Tomates, Boeuf, ..."
          onChange={(e) =>
            modifyIngredientList(e.target.value, props.ingredient)
          }
          onClick={() => props.setActiveIndex(props.id)}
          onSelect={(e) => modifyIngredientList(e.value.name, props.ingredient)}
          tooltip={
            props.id === 1
              ? "Privilégiez la sélection des ingrédients proposés pour une meilleure performance du site"
              : undefined
          }
          tooltipOptions={{ position: "top" }}
        ></AutoComplete>
      </div>
      <InputText
        placeholder="3, 2.5..."
        className="!m-1 w-16 tablet:w-unset"
        value={props.ingredient.quantity}
        keyfilter="num"
        onChange={(e) => {
          const tempArray = [...props.ingredientList];
          tempArray.forEach((element) => {
            if (element.id === props.id) {
              element.quantity = e.target.value;
            }
          });
          props.setIngredientList(tempArray);
        }}
        tooltip={
          props.id === 1
            ? "Pour les décimaux utilisez le point et non la virgule"
            : undefined
        }
        tooltipOptions={{ position: "top" }}
      />
      <Dropdown
        value={props.ingredient.unit}
        options={secondaryTables.units ?? []}
        optionLabel="label"
        placeholder="kg, unité..."
        className="!m-1 w-24 tablet:w-unset"
        onChange={(e) => {
          const tempArray = [...props.ingredientList];
          tempArray.forEach((element) => {
            if (element.id === props.id) {
              element.unit = e.target.value;
              if ((e.target.value as Unit).label === "un peu") {
                element.quantity = "1"
              }
            }
          });
          props.setIngredientList(tempArray);
        }}
      ></Dropdown>
      {props.id !== 1 && (
        <RiDeleteBin6Line
          className="cursor-pointer text-green size-6 self-center"
          onClick={(e: any) => {
            e.preventDefault();
            let tempArray = [...props.ingredientList];
            tempArray = tempArray.filter((element) => element.id !== props.id);
            props.setIngredientList(tempArray);
          }}
        ></RiDeleteBin6Line>
      )}
    </div>
  );
};

export default IngredientsCreation;
