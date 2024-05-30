import { RadioButton } from "primereact/radiobutton";
import { regimeTooltips } from "../../../Services/recipeFunctions";
import { useSelector } from "react-redux";

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
          <div className="m-4" key={index}>
            <RadioButton
              checked={regime.id === props.regimeId}
              onChange={() => props.setRegimeId(regime.id)}
              tooltip={regimeTooltips[index]}
              tooltipOptions={{ position: "bottom" }}
              className="mr-1"
            />
            <label>{regime.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Regimes;