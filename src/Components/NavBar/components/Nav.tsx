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
      <NavLink to={to} className={(nav) => (nav.isActive ? "nav-active" : "") + ` my-2 mx-5 w-fit`}>
        <li className={`text-green cursor-pointer duration-200 text-[1.1rem] w-fit nav:text-[1.4rem]`}>
          <strong>{text}</strong>
        </li>
      </NavLink>
    );
  };

  return (
    <ul className={`flex ${props.className}`}>
      <NavItem to="/" text="Accueil"></NavItem>
      <NavItem to="/all" text="Galerie"></NavItem>
      <NavItem to="/shop" text="Ma liste de courses"></NavItem>
      <NavItem to="/hf" text="Hello Fresh"></NavItem>
    </ul>
  );
};

export default Nav;
