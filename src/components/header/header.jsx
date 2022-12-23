import './header.css'
import Logo from '../../assets/images/Logo.png'
import { NavLink } from 'react-router-dom'

const Header = () => (
  <header className="header-container">
    <img className="header-logo" src={Logo} alt="logo" />
    <h1 className="header-title">HRnet</h1>
    <nav>
      <NavLink to="/" activeclassname="active" end>
        Home
      </NavLink>
      <NavLink to="/employees-list" activeclassname="active" end>
        Employees list
      </NavLink>
    </nav>
  </header>
)

export default Header
