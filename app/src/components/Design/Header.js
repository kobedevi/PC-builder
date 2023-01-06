import LogoutButton from "../Auth/LogOutButton";

const Header = () => {
  return (
    <header>
      <ul className="headerNav">
        <li>
          <a className="logo" href="/">
            Computer components DB
          </a>
        </li>
        <li className="nav-item text-nowrap">
          <LogoutButton />
        </li>
      </ul>
    </header>
  );
};

export default Header;
