import "./Nav.scss";
import { NavLink } from "react-router-dom";

interface Props {
  className: string
}

const Nav = (props: Props) => {
  return (
    <ul className={`menu ${props.className}`}>
      <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
        <li>
          <strong>Accueil</strong>
        </li>
      </NavLink>
      <NavLink
        to="/all"
        className={(nav) => (nav.isActive ? "nav-active" : "")}
      >
        <li>
          <strong>Galerie</strong>
        </li>
      </NavLink>
      <NavLink
        to="/shop"
        className={(nav) => (nav.isActive ? "nav-active" : "")}
      >
        <li>
          <strong>Ma liste de courses</strong>
        </li>
      </NavLink>
      <NavLink
        to="/hf"
        className={(nav) => (nav.isActive ? "nav-active" : "")}
      >
        <li>
          <strong>Hello Fresh</strong>
        </li>
      </NavLink>
    </ul>
  );
};

export default Nav;
