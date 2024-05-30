import { useState } from "react";
import HelloSearch from "../Components/HelloF/HelloSearch";
import HelloContainer from "../Components/HelloF/HelloContainer";
import { useFetchHellofData } from "../Hooks/fetchHellofData";

const HelloF = () => {
  const [query, setQuery] = useState("")

  const data = useFetchHellofData(query)

  return (
    <div id="hellof" className="m-20 flex flex-col items-center gap-8">
      <HelloSearch setQuery={setQuery}></HelloSearch>
      <HelloContainer isSearchEmpty={query.length === 0} data={data}></HelloContainer>
    </div>
  );
};

export default HelloF;