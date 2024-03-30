import "./HelloF.scss"
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";
import { useEffect, useState } from "react";
import Bouton from "../../Components/ui/Bouton/Bouton";
import { InputText } from "primereact/inputtext";
import CreateRecipe from "../CreateRecipe/CreateRecipe";
import Modal from "../../Components/Modal/Modal";
import HelloFCard from "./HelloFCard";
import { fetchPost } from "../../Hooks/api.hook";
import Loader from "../../Components/ui/Loader/loader";

const HelloF = () => {
  const [value, setValue] = useState("")
  const [data, setData] = useState<HFRecipe[]>([])
  const [visibleRecipeForm, setVisibleRecipeForm] = useState(false)
  const [filledRecipe, setFilledRecipe] = useState<HFFillRecipe | null>(null)

  useEffect(() => {
    search()
    // eslint-disable-next-line
  }, [])

  const search = async () => {
    const response = await fetchPost("/recipes/hellof", { search: value })

    if (response.error) return

    let unique: HFRecipe[] = [
      ...new Map((response.data as HFRecipe[]).map((item: any) => [item['name'], item])).values()
    ]
    unique = unique.filter((x) => x.prepTime !== "PT0S")
    setData(unique.sort((a: HFRecipe, b: HFRecipe) => b.averageRating - a.averageRating));
  }

  return (
    <div className="HF">
      <NavBar></NavBar>
      <div className="HF__container">
        <div className="HF__container__search">
          <div className="pi pi-search"></div>
          <InputText
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                search()
              }
            }}
          />
          <Bouton
            btnAction={() => search()}
            btnTexte="Valider"
            type="normal"
          ></Bouton>
        </div>
        <div className="HF__container__items">
          {data.length > 0 ?
            data.map((x) => (
              <HelloFCard
                setFilledRecipe={setFilledRecipe}
                setVisibleRecipeForm={setVisibleRecipeForm}
                recipe={x}
                key={x.id}
              ></HelloFCard>
            ))
            : value.length === 0
              ? <Loader></Loader>
              : <span className="empty">Malheureusement je ne trouve rien qui corresponde à votre recherche...</span>
          }
        </div>
      </div>
      {visibleRecipeForm && filledRecipe && (
        <Modal
          visible={visibleRecipeForm}
          setVisible={setVisibleRecipeForm}
          className={"modify_recipe_modal"}
        >
          <CreateRecipe
            HFFillRecipe={filledRecipe}
            setVisibleModif={setVisibleRecipeForm}
          ></CreateRecipe>
        </Modal>
      )}
      <Footer></Footer>
    </div>
  );
};

export default HelloF;