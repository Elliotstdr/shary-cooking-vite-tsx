import React from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Bouton from "../../ui/Bouton/Bouton";

interface Props {
  stepsList: Array<Step>,
  setStepsList: React.Dispatch<React.SetStateAction<Array<Step>>>
}

const StepsCreation = (props: Props) => {
  return (
    <>
      <div className="w-11/12 max-w-[800px]">
        {props.stepsList.map((step, index) => (
          <div className="flex justify-center w-full relative" key={index}>
            <InputTextarea
              autoResize
              placeholder="Description de l'étape"
              className="flex items-center flex-col my-4 w-full"
              value={step.description}
              onChange={(e) => {
                const tempArray = [...props.stepsList];
                tempArray.forEach((element) => {
                  if (element.stepIndex === step.stepIndex) {
                    element.description = e.target.value;
                  }
                });
                props.setStepsList(tempArray);
              }}
            />
            {step.stepIndex !== 1 && (
              <RiDeleteBin6Line
                className="absolute cursor-pointer -right-12 w-6 h-6 self-center text-green"
                onClick={(e: any) => {
                  e.preventDefault();
                  let tempArray = [...props.stepsList];
                  tempArray = tempArray.filter(
                    (element) => element.stepIndex !== step.stepIndex
                  );
                  props.setStepsList(tempArray);
                }}
              ></RiDeleteBin6Line>
            )}
          </div>
        ))}
      </div>
      <Bouton
        className="!border-none my-8 self-center"
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
