import { useNavigate } from "react-router-dom";
import Bouton from "../../../Components/ui/Bouton";

type Props = {
  image: string
  to: string
  text: string
  btnText: string
  reverse?: boolean
}

const HomeRedirectBlock = (props: Props) => {
  const navigate = useNavigate()

  return (
    <div className={`flex-center flex-col h-125 tablet:flex-row ${props.reverse ? "tablet:flex-row-reverse" : ""}`}>
      <img
        src={props.image}
        alt="accueil"
        className="w-11/12 h-52 mb-8 rounded-lg object-cover tablet:w-4/6 tablet:h-80 tablet:mx-8 tablet:my-0 laptop:mx-20"
      />
      <div className="flex items-center flex-col mx-12 w-full tablet:w-1/2">
        <span className="w-11/12 mb-6 text-xl tablet:text-2xl">{props.text}</span>
        <Bouton
          btnTexte={props.btnText}
          btnAction={() => navigate(props.to)}
        ></Bouton>
      </div>
    </div>
  );
};

export default HomeRedirectBlock;