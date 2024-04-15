import React, { useState } from "react";
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
  ingredientList: Array<FormIngredient>,
  setIngredientList: React.Dispatch<React.SetStateAction<Array<FormIngredient>>>,
  ingredientData: Array<IngredientData> | null,
  ingredient: FormIngredient
}

const IngredientsCreation = (props: Props) => {
  const secondaryTables = useSelector((state: RootState) => state.secondaryTables);
  const [autocompleteData, setAutocompleteData] = useState<Array<IngredientData>>([]);

  const modifyIngredientList = (word: string, ingredient: FormIngredient) => {
    props.setIngredientList((prev) => prev.map((x) => {
      if (x.id === ingredient.id) {
        return {
          ...x,
          label: word
        }
      } else return x
    }))
  };
  const findIngredient = (word: AutoCompleteCompleteEvent) => {
    if (!props.ingredientData) {
      setAutocompleteData([])
      return
    }
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
    setAutocompleteData(filteredData);
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.ingredient.id || 1 });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div className="ingredient" ref={setNodeRef} style={style} {...attributes}>
      {props.ingredient.id === 1 ? (
        <AiOutlineStop className="move_ing"></AiOutlineStop>
      ) : (
        <BiMoveVertical className="move_ing" {...listeners}></BiMoveVertical>
      )}
      <div className="ingredient_name" id="ingredient_name">
        <AutoComplete
          className="recipe__form__field-ingname"
          value={props.ingredient.label}
          suggestions={autocompleteData}
          completeMethod={findIngredient}
          field="name"
          placeholder="Tomates, Boeuf, ..."
          onChange={(e) =>
            modifyIngredientList(e.target.value, props.ingredient)
          }
          onSelect={(e) => modifyIngredientList(e.value.name, props.ingredient)}
          tooltip={
            props.ingredient.id === 1
              ? "Privilégiez la sélection des ingrédients proposés pour une meilleure performance du site"
              : undefined
          }
          tooltipOptions={{ position: "top" }}
        ></AutoComplete>
      </div>
      <InputText
        placeholder="3, 2.5..."
        className="recipe__form__field-quantity"
        value={props.ingredient.quantity}
        keyfilter="num"
        onChange={(e) => {
          props.setIngredientList((prev) => prev.map((x) => {
            if (x.id === props.ingredient.id) {
              return {
                ...x,
                quantity: e.target.value
              }
            } else return x
          }))
        }}
        tooltip={
          props.ingredient.id === 1
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
        className="recipe__form__field-unit"
        onChange={(e) => {
          props.setIngredientList((prev) => prev.map((x) => {
            if (x.id === props.ingredient.id) {
              return {
                ...x,
                unit: e.target.value,
                quantity: (e.target.value as Unit).label === "un peu" ? "1" : x.quantity
              }
            } else return x
          }))
        }}
      ></Dropdown>
      {props.ingredient.id !== 1 && (
        <RiDeleteBin6Line
          className="bin"
          onClick={(e: any) => {
            e.preventDefault();
            props.setIngredientList((prev) => prev.filter((x) =>
              x.id !== props.ingredient.id
            ))
          }}
        ></RiDeleteBin6Line>
      )}
    </div>
  );
};

export default IngredientsCreation;
