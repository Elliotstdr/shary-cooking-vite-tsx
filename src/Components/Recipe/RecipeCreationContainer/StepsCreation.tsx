import { InputTextarea } from "primereact/inputtextarea";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlinePlusCircle } from "react-icons/ai";
import SimpleButton from "../../ui/SimpleButton";

interface Props {
  stepsList: Step[],
  setStepsList: (steps: Step[]) => void
}

const StepsCreation = (props: Props) => {
  return (
    <>
      <div className="flex flex-col w-11/12 laptop:w-150 gap-4">
        {props.stepsList.map((step, index) => (
          <div className="flex w-full relative" key={index}>
            <InputTextarea
              autoResize
              placeholder="Description de l'étape"
              className="!w-full"
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
            {step.stepIndex !== 1 ? (
              <RiDeleteBin6Line
                className="ml-2 cursor-pointer size-6 text-green self-center"
                onClick={(e: any) => {
                  e.preventDefault();
                  props.setStepsList(props.stepsList.filter((x) =>
                    x.stepIndex !== step.stepIndex
                  ))
                }}
              ></RiDeleteBin6Line>
            ) : (
              props.stepsList.length > 1 && <div className="ml-2 size-6 self-center"></div>
            )}
          </div>
        ))}
      </div>
      <SimpleButton
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
        className="!border-0 my-6"
      >
        <AiOutlinePlusCircle className="bouton-svg" />
        Ajouter une étape
      </SimpleButton>
    </>
  );
};

export default StepsCreation;
