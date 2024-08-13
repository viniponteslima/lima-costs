import { Link } from "react-router-dom";
import Container from "./Container";
import './Header.module.css'
import logo from '../../images/costs_logo.png'

export default function Header() {
  return (
    <header>
      <Container>
        <Link to="/">
          <img src={logo} alt="Logo LimaCosts" />
        </Link>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/projetos">Projetos</Link></li>
          <li><Link to="/empresa">Empresa</Link></li>
          <li><Link to="/contato">Contato</Link></li>
          <li><Link to="/novo-projeto">Novo Projeto</Link></li>
        </ul>
      </Container>
        
    </header>
  );
}