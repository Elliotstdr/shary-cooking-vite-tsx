import { RadioButton } from "primereact/radiobutton";
import { useSelector } from "react-redux";

type Props = {
  typeId: number,
  setTypeId: (id: number) => void,
}

const Types = (props: Props) => {
  const secondaryTables = useSelector((state: RootState) => state.secondaryTables);

  return (
    <div className="flex items-center flex-col">
      <h4 className="mb-2 mt-5 font-bold">Type de plat</h4>
      <div className="flex flex-wrap">
        {secondaryTables.types && secondaryTables.types.map((type, index) => (
          <div className="m-4" key={index}>
            <RadioButton
              checked={type.id === props.typeId}
              onChange={() => props.setTypeId(type.id)}
              className="mr-1"
            />
            <label>{type.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Types;