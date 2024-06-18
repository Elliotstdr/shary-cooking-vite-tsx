import { InputText } from "primereact/inputtext";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedList } from "../../../Store/Reducers/shoppingReducer";
import { useState } from "react";

const ListContentInput = () => {
  const dispatch = useDispatch()
  const selectedList = useSelector((state: RootState) => state.shopping.selectedList) as List;
  const [inputValue, setInputValue] = useState("");

  const addIngredient = () => {
    if (!selectedList || !inputValue || selectedList.content.some((x) => x.name === inputValue)) return;

    const newContent = [...selectedList.content]
    newContent.unshift({
      name: inputValue,
      selected: false,
      fromRecipe: false
    })

    dispatch(updateSelectedList({
      ...selectedList,
      content: newContent
    }))

    setInputValue("")
  }

  return (
    <div className='flex items-center gap-2'>
      <InputText
        value={inputValue}
        className="h-7 w-52 !p-2 !text-sm"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') addIngredient()
        }}
      ></InputText>
      <IoAddCircleOutline
        className="cursor-pointer text-2xl"
        onClick={() => addIngredient()}
      ></IoAddCircleOutline>
    </div>
  );
};

export default ListContentInput;