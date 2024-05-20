import { InputText } from "primereact/inputtext";
import Bouton from "../../ui/Bouton";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPost } from "../../../Hooks/api.hook";
import { errorToast } from "../../../Services/functions";
import { addProduct } from "../../../Store/Reducers/shoppingReducer";

const CreateDefaultProduct = () => {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState("");

  const createDefaultProduct = async (name: string) => {
    const res = await fetchPost('/default_product', { name })
    if (res.error) {
      errorToast('La création du produit n\'a pas pu se faire')
      return
    }

    dispatch(addProduct(res.data))
  }

  return (
    <div className="flex gap-4 relative items-center">
      <InputText
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            createDefaultProduct(inputValue)
            setInputValue("")
          }
        }}
        className="w-48 h-10"
      />
      <Bouton
        btnAction={() => {
          createDefaultProduct(inputValue)
          setInputValue("")
        }}
        btnTexte="Créer"
        type="normal"
        className="rounded-lg !h-10 !px-3 !text-sm"
      ></Bouton>
    </div>
  );
};

export default CreateDefaultProduct;