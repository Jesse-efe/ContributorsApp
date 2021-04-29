import { useLocation, NavLink } from "react-router-dom";
import "./style.scss";

const AppHeader = () => {
  const location = useLocation();
  const orgLogin = sessionStorage.getItem("organisationLogin");

  if (location.pathname === "/") return null;
  return (
    <div className="app-header">
      <ul className="app-header__menu">
        <NavLink to="/" activeClassName="app-header__menu--active">
          <li className="app-header__menu-item">Start</li>
        </NavLink>
        <NavLink
          to={`/${orgLogin}`}
          activeClassName="app-header__menu-item--active"
        >
          <li className="app-header__menu-item">{`${orgLogin} Contributors`}</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default AppHeader;
