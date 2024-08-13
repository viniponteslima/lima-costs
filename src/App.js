import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/pages/Home";
import Contato from "./components/pages/Contato";
import Empresa from "./components/pages/Empresa";
import NovoProjeto from "./components/pages/NovoProjeto";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";
import Projetos from "./components/pages/Projetos";
import Projeto from "./components/pages/Projeto";

function App() {
  return (
    <Router>
      <Header />

      <Container customClass="min-height">
        <Routes>
          <Route exact path="/" element={<Home /> } />
          <Route path="/projetos" element={<Projetos /> } />
          <Route path="/empresa" element={<Empresa /> } />
          <Route path="/contato" element={<Contato /> } />
          <Route path="/novo-projeto" element={<NovoProjeto /> } />
          <Route path="/projeto/:id" element={<Projeto /> } />
          </Routes>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;
