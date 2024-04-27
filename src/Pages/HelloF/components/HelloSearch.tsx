import { InputText } from "primereact/inputtext";
import Bouton from "../../../Components/ui/Bouton/Bouton";
import { useEffect } from "react";
import { fetchPost } from "../../../Hooks/api.hook";

type Props = {
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  setData: React.Dispatch<React.SetStateAction<HFRecipe[]>>,
}

const HelloSearch = (props: Props) => {
  useEffect(() => {
    search()
  }, [])

  const search = async () => {
    const response = await fetchPost("/recipes/hellof", { search: props.value })
    if (response.error) return

    let unique: HFRecipe[] = [
      ...new Map((response.data as HFRecipe[]).map((item: any) => [item['name'], item])).values()
    ]
    unique = unique.filter((x) => x.prepTime !== "PT0S")
    props.setData(unique.sort((a: HFRecipe, b: HFRecipe) => b.averageRating - a.averageRating));
  }

  return (
    <div className="flex gap-4 relative">
      <div className="pi pi-search absolute text-gris left-2 top-1/2 -translate-y-1/2"></div>
      <InputText
        type="text"
        autoFocus
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            search()
          }
        }}
        className="!pl-8"
      />
      <Bouton
        btnAction={() => search()}
        btnTexte="Valider"
        type="normal"
      ></Bouton>
    </div>
  );
};

export default HelloSearch;