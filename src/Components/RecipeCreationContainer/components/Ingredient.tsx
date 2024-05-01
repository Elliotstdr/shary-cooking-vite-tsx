import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { AutoComplete, AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BiMoveVertical } from "react-icons/bi";
import { AiOutlineStop } from "react-icons/ai";
import { Input } from "@/Components/ui/input";
import { floatAllowedKey } from "@/Services/createRecipeFunctions";
import Dropdown from "@/Components/ui/Dropdown";

interface Props {
  ingredientList: FormIngredient[],
  setIngredientList: (ingredients: FormIngredient[]) => void,
  ingredientData: Array<IngredientData> | null,
  ingredient: FormIngredient
}

const Ingredient = (props: Props) => {
  const secondaryTables = useSelector((state: RootState) => state.secondaryTables);
  const [autocompleteData, setAutocompleteData] = useState<Array<IngredientData>>([]);

  const modifyIngredientList = (word: string, ingredient: FormIngredient) => {
    props.setIngredientList(props.ingredientList.map((x) => {
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
    <div className="flex relative" ref={setNodeRef} style={style} {...attributes}>
      {props.ingredient.id === 1 ? (
        <AiOutlineStop className="text-2xl self-center cursor-pointer"></AiOutlineStop>
      ) : (
        <BiMoveVertical className="text-2xl self-center cursor-pointer" {...listeners}></BiMoveVertical>
      )}
      <AutoComplete
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
        inputClassName="w-28 tablet:w-60 !m-1"
      ></AutoComplete>
      <Input
        placeholder="3, 2.5..."
        className="w-16 tablet:w-40 !m-1"
        value={props.ingredient.quantity}
        onKeyDown={(e) => {
          if (!floatAllowedKey.includes(e.key)) {
            e.preventDefault()
          }
        }}
        onChange={(e) => {
          props.setIngredientList(props.ingredientList.map((x) => {
            if (x.id === props.ingredient.id) {
              return {
                ...x,
                quantity: e.target.value
              }
            } else return x
          }))
        }}
        title={
          props.ingredient.id === 1
            ? "Pour les décimaux utilisez le point et non la virgule"
            : undefined
        }
      />
      <Dropdown
        items={secondaryTables.units ?? []}
        placeholder="kg, unité..."
        className="w-24 tablet:w-40 !m-1"
        onChange={(e) => {
          props.setIngredientList(props.ingredientList.map((x) => {
            if (x.id === props.ingredient.id) {
              return {
                ...x,
                unit: e,
                quantity: e.label === "un peu" ? "1" : x.quantity
              }
            } else return x
          }))
        }}
      ></Dropdown>
      {props.ingredient.id !== 1 && (
        <RiDeleteBin6Line
          className="text-green size-6 self-center cursor-pointer"
          onClick={(e: any) => {
            e.preventDefault();
            props.setIngredientList(props.ingredientList.filter((x) =>
              x.id !== props.ingredient.id
            ))
          }}
        ></RiDeleteBin6Line>
      )}
    </div>
  );
};

export default Ingredient;
