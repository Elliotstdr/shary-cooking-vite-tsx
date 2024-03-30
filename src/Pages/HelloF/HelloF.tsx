import axios from "axios";
import "./HelloF.scss"
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";
import { useEffect, useState } from "react";
import Bouton from "../../Components/ui/Bouton/Bouton";
import { InputText } from "primereact/inputtext";
import CreateRecipe from "../CreateRecipe/CreateRecipe";
import Modal from "../../Components/Modal/Modal";
import HelloFCard from "./HelloFCard";
import { useFetchGet } from "../../Hooks/api.hook";

const HelloF = () => {
  const externalToken = useFetchGet("/external_tokens")

  const [token, setToken] = useState("")
  const [value, setValue] = useState("")
  const [data, setData] = useState<HFRecipe[]>([])
  const [visibleRecipeForm, setVisibleRecipeForm] = useState(false)
  const [filledRecipe, setFilledRecipe] = useState<HFFillRecipe | null>(null)

  useEffect(() => {
    if (externalToken.loaded && externalToken.data) {
      setToken(Array.isArray(externalToken.data)
        ? externalToken.data[0].value
        : (externalToken.data as any).value)
    }
    // eslint-disable-next-line
  }, [externalToken.loaded])

  useEffect(() => {
    if (token) search()
    // eslint-disable-next-line
  }, [token])

  const search = () => {
    axios
      .get(`${import.meta.env.VITE_BASE_HF_URL}&limit=20&order=-date&order=-rating&q=${value}`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        }
      })
      .then((response) => {
        let unique: HFRecipe[] = [
          ...new Map((response.data.items as HFRecipe[]).map((item: any) => [item['name'], item])).values()
        ]
        unique = unique.filter((x) => x.prepTime !== "PT0S")
        setData(unique.sort((a: HFRecipe, b: HFRecipe) => b.averageRating - a.averageRating));
      })
      .catch((error) => console.log(error.message))
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
              ? <span className="empty">Indiquez un nom de recette pour trouver votre bonheur !</span>
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