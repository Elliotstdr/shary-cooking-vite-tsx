import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPost } from "../../../Hooks/api.hook";
import { errorToast } from "../../../Services/functions";
import { addProduct } from "../../../Store/Reducers/shoppingReducer";
import SimpleButton from "../../ui/SimpleButton";

const CreateDefaultProduct = () => {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState("");

  const createDefaultProduct = async (name: string) => {
    const res = await fetchPost('/default_product', { name })
    if (res.error) {
      errorToast('La création du produit n\'a pas pu se faire')
      return
    }

    setInputValue("")
    dispatch(addProduct(res.data))
  }

  return (
    <div className="flex gap-4 relative items-center">
      <InputText
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') createDefaultProduct(inputValue)
        }}
        className="w-48 h-10"
      />
      <SimpleButton
        btnAction={() => createDefaultProduct(inputValue)}
        btnTexte="Créer"
        className="rounded-lg !h-10 !px-3 !text-sm"
      ></SimpleButton>
    </div>
  );
};

export default CreateDefaultProduct;