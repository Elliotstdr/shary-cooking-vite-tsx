import { Divider } from "primereact/divider";

type Props = {
  steps: Step[]
}

const RecipeDetailSteps = ({ steps }: Props) => {
  return (
    <>
      {[...steps]
        .sort((a: Step, b: Step) => a.stepIndex - b.stepIndex)
        .map((step: Step, index: number) => (
          <div className="cardDetail_container_block" key={index}>
            <div className="cardDetail_container_block_index">
              {index + 1}
            </div>
            <Divider></Divider>
            <div className="cardDetail_container_block_step" key={index}>
              {step.description}
            </div>
          </div>
        ))}
    </>
  );
};

export default RecipeDetailSteps;