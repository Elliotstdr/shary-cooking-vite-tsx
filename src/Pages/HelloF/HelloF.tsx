import { useState } from "react";
import HelloSearch from "./components/HelloSearch";
import HelloContainer from "./components/HelloContainer";

const HelloF = () => {
  const [value, setValue] = useState("")
  const [data, setData] = useState<HFRecipe[]>([])

  return (
    <div className="m-20 flex flex-col items-center gap-8">
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
  );
};

export default HelloF;