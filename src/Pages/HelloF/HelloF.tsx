import "./HelloF.scss"
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";
import { useState } from "react";
import HelloSearch from "./components/HelloSearch";
import HelloContainer from "./components/HelloContainer";

const HelloF = () => {
  const [value, setValue] = useState("")
  const [data, setData] = useState<HFRecipe[]>([])

  return (
    <div className="HF">
      <NavBar></NavBar>
      <div className="HF__container">
        <HelloSearch
          value={value}
          setValue={setValue}
          setData={setData}
        ></HelloSearch>
        <HelloContainer
          value={value}
          data={data}
        ></HelloContainer>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default HelloF;