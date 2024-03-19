import { NavLink } from "react-router-dom";

interface Props {
  className: string
}

type ItemProps = {
  to: string,
  text: string
}

const Nav = (props: Props) => {
  const NavItem = ({ text, to }: ItemProps) => {
    return (
      <NavLink to={to} className={(nav) => (nav.isActive ? "nav-active" : "") + ` py-2 px-5 w-fit`}>
        <li className={`text-green cursor-pointer duration-200 text-[1.1rem] laptop:text-[1.2rem] w-fit desktop:text-[1.3rem]`}>
          <strong>{text}</strong>
        </li>
      </NavLink>
    );
  };

  return (
    <ul className={`flex ${props.className}`}>
      <NavItem to="/" text="Accueil"></NavItem>
      <NavItem to="/all" text="Galerie"></NavItem>
      <NavItem to="/fav" text="Favoris"></NavItem>
      <NavItem to="/myrecipes" text="Mes recettes"></NavItem>
      <NavItem to="/shop" text="Ma liste de courses"></NavItem>
    </ul>
  );
};

export default Nav;
