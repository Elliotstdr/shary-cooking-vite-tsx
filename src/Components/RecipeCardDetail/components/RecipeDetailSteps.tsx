import { Separator } from "../../ui/Separator";

type Props = {
  steps: Step[]
}

const RecipeDetailSteps = ({ steps }: Props) => {
  return (
    <div className="flex flex-col gap-8 my-8">
      {[...steps]
        .sort((a: Step, b: Step) => a.stepIndex - b.stepIndex)
        .map((step: Step, index: number) => (
          <div className="flex items-center flex-col w-full" key={index}>
            <div className="flex-center text-3xl size-16 rounded-full font-bold text-orange border-2 border-orange">
              {index + 1}
            </div>
            <Separator className="border-t-orange"></Separator>
            <div className="self-center bg-fond p-4 rounded-lg text-left w-11/12 laptop:w-150" key={index}>
              {step.description}
            </div>
          </div>
        ))}
    </div>
  );
};

export default RecipeDetailSteps;