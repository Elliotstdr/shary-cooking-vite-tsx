import { RadioButton } from "primereact/radiobutton";
import { useSelector } from "react-redux";

type Props = {
  typeId: number,
  setTypeId: (id: number) => void,
}

const Types = (props: Props) => {
  const secondaryTables = useSelector((state: RootState) => state.secondaryTables);

  return (
    <div className="recipe__form__field">
      <h4>Type de plat</h4>
      <div className="checkboxes">
        {secondaryTables.types && secondaryTables.types.map((type, index) => (
          <div className="checkbox" key={index}>
            <RadioButton
              checked={type.id === props.typeId}
              onChange={() => props.setTypeId(type.id)}
            />
            <label>{type.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Types;