import { useNavigate } from "react-router-dom";
import Bouton from "../../../Components/ui/Bouton/Bouton";

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
    <div className={`home__redirect__block ${props.reverse ? "reverse" : ""}`}>
      <img src={props.image} alt="accueil" />
      <div className="home__redirect__block__text">
        <span>{props.text}</span>
        <Bouton
          btnTexte={props.btnText}
          btnAction={() => navigate(props.to)}
        ></Bouton>
      </div>
    </div>
  );
};

export default HomeRedirectBlock;