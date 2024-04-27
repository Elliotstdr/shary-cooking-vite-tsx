import HelloFCard from "../../../Components/HelloFCard/HelloFCard";
import Loader from "../../../Components/ui/Loader/loader";

type Props = {
  value: string
  data: HFRecipe[]
}

const HelloContainer = (props: Props) => {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {props.data.length > 0 ?
        props.data.map((x) => (
          <HelloFCard
            recipe={x}
            key={x.id}
          ></HelloFCard>
        ))
        : props.value.length === 0
          ? <Loader className="my-24"></Loader>
          : <span className="my-40 text-xl font-bold">
            Malheureusement je ne trouve rien qui corresponde à votre recherche...
          </span>
      }
    </div>
  );
};

export default HelloContainer;