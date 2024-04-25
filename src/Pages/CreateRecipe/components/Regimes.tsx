import { RadioButton } from "primereact/radiobutton";
import { regimeTooltips } from "../../../Services/createRecipeFunctions";
import { useSelector } from "react-redux";

type Props = {
  regimeId: number,
  setRegimeId: (id: number) => void,
}

const Regimes = (props: Props) => {
  const secondaryTables = useSelector((state: RootState) => state.secondaryTables);

  return (
    <div className="recipe__form__field">
      <h4>Régime alimentaire</h4>
      <div className="checkboxes">
        {secondaryTables.regimes && secondaryTables.regimes.map((regime, index) => (
          <div className="checkbox" key={index}>
            <RadioButton
              checked={regime.id === props.regimeId}
              onChange={() => props.setRegimeId(regime.id)}
              tooltip={regimeTooltips[index]}
              tooltipOptions={{ position: "bottom" }}
            />
            <label>{regime.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Regimes;