import { Separator } from "../../ui/Separator";

type Props = {
  steps: Step[]
}

const RecipeDetailSteps = ({ steps }: Props) => {
  return (
    <div className="my-8">
      {[...steps]
        .sort((a: Step, b: Step) => a.stepIndex - b.stepIndex)
        .map((step: Step, index: number) => (
          <div className="flex items-center flex-col mb-8 w-full" key={index}>
            <div className="flex-center text-3xl size-16 rounded-full font-bold text-orange border-2 border-orange">
              {index + 1}
            </div>
            <Separator className="border-t-orange"></Separator>
            <div className="w-11/12 self-center bg-fond p-4 my-2 rounded-lg text-left" key={index}>
              {step.description}
            </div>
          </div>
        ))}
    </div>
  );
};

export default RecipeDetailSteps;