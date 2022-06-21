import avatar from "../assets/images/Frame 54.png";
import '../assets/css/Header.css';

export default function Header(): JSX.Element {
  return (
    <header>
      <div className="header-left">
        <form action="">
          <input type="text" placeholder="Search"/>
          <i className="fas fa-search"></i>
        </form>
      </div>
      <div className="header-right">
        <ul>
          <li>
            <a href="">
              <i className="far fa-envelope"></i>
            </a>
            <a href="">
              <i className="far fa-bell"></i>
            </a>
            <a href="">
              <img src={avatar} alt="" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
