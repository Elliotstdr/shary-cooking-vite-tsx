import { regimeTooltips } from "../../../Services/createRecipeFunctions";
import { useSelector } from "react-redux";
import { Input } from "@/Components/ui/input";

type Props = {
  regimeId: number,
  setRegimeId: (id: number) => void,
}

const Regimes = (props: Props) => {
  const secondaryTables = useSelector((state: RootState) => state.secondaryTables);

  return (
    <div className="flex items-center flex-col">
      <h4 className="mb-2 mt-5 font-bold">Régime alimentaire</h4>
      <div className="flex flex-wrap">
        {secondaryTables.regimes && secondaryTables.regimes.map((regime, index) => (
          <div className="flex m-4" key={index}>
            <Input
              type="radio"
              checked={regime.id === props.regimeId}
              onChange={() => props.setRegimeId(regime.id)}
              title={regimeTooltips[index]}
              className="mr-1 size-[22px] accent-orange"
            />
            <label>{regime.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Regimes;