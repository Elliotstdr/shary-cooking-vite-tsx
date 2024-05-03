import { InputText } from "primereact/inputtext";
import Bouton from "../../../Components/ui/Bouton";
import { useState } from "react";

type Props = {
  setQuery: React.Dispatch<React.SetStateAction<string>>,
}

const HelloSearch = (props: Props) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex gap-4 relative items-center">
      <div className="pi pi-search absolute text-gris left-2 top-1/2 -translate-y-1/2"></div>
      <InputText
        type="text"
        autoFocus
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            props.setQuery(inputValue)
          }
        }}
        className="w-60 !pl-8 tablet:w-unset"
      />
      <Bouton
        btnAction={() => props.setQuery(inputValue)}
        btnTexte="Valider"
        type="normal"
      ></Bouton>
    </div>
  );
};

export default HelloSearch;