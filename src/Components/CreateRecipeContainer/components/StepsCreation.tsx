import { InputTextarea } from "primereact/inputtextarea";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Bouton from "../../ui/Bouton/Bouton";

interface Props {
  stepsList: Step[],
  setStepsList: (steps: Step[]) => void
}

const StepsCreation = (props: Props) => {
  return (
    <>
      <div className="steps">
        {props.stepsList.map((step, index) => (
          <div className="step" key={index}>
            <InputTextarea
              autoResize
              placeholder="Description de l'étape"
              className="recipe__form__field-step"
              value={step.description}
              onChange={(e) => {
                props.setStepsList(props.stepsList.map((x) => {
                  if (x.stepIndex === step.stepIndex) {
                    return {
                      ...x,
                      description: e.target.value
                    }
                  } else return x
                }))
              }}
            />
            {step.stepIndex !== 1 && (
              <RiDeleteBin6Line
                className="bin"
                onClick={(e: any) => {
                  e.preventDefault();
                  props.setStepsList(props.stepsList.filter((x) =>
                    x.stepIndex !== step.stepIndex
                  ))
                }}
              ></RiDeleteBin6Line>
            )}
          </div>
        ))}
      </div>
      <Bouton
        type={"normal"}
        btnAction={(e) => {
          e.preventDefault();
          props.setStepsList([
            ...props.stepsList,
            {
              description: "",
              stepIndex:
                props.stepsList[props.stepsList.length - 1].stepIndex + 1,
            },
          ]);
        }}
      >
        <AiOutlinePlusCircle />
        Ajouter une étape
      </Bouton>
    </>
  );
};

export default StepsCreation;
