import { useNavigate } from "react-router-dom";
import Bouton from "../../../Components/ui/Bouton/Bouton";

type Props = {
  image: string,
  redirect: string,
  text: string,
  btnText: string,
  reverse?: boolean
}

const SimpleBlock = (props: Props) => {
  const navigate = useNavigate()

  return (
    <div className={`flex flex-col items-center justify-center h-[500px] tablet:flex-row ${props.reverse ? "flex-row-reverse" : ""}`}>
      <img
        src={props.image}
        alt="accueil"
        className="mx-8 mb-8 rounded-xl h-[200px] w-2/3 object-cover tablet:h-[350px] desktop:mx-20 tablet:mb-0"
      />
      <div className="flex items-center flex-col mx-12 my-0 w-full tablet:w-1/2">
        <span className="w-11/12 text-2xl mb-6">{props.text}</span>
        <Bouton
          btnTexte={props.btnText}
          btnAction={() => navigate(props.redirect)}
        ></Bouton>
      </div>
    </div>
  );
};

export default SimpleBlock;