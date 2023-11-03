import { Outlet } from "react-router-dom";
import "../css/layout.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {GiNotebook} from "react-icons/gi"
const Layout = () => {
  return (
    <>
      {/* <nav className="nav">
        <ul>
          <li>
            <a>
              My Note
            </a>
          </li>
          </ul>
          <ul>
          <li>
            <Link to="/">
              <button className="note__button">My Note</button>
            </Link>
          </li>
          <li>
            <Link to="/addnote">
              <button className="note__button">Add Note</button>
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <button className="note__button">Contact</button>
            </Link>
          </li>
        </ul>
      </nav>
      <hr/> */}

      <header>
        <Navbar bg="primary" data-bs-theme="dark">
          <Container>
            <GiNotebook size="2em"/>
            <Navbar.Brand href="/">My Note</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="Addnote">Add Note</Nav.Link>
              {/* <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            </Nav>
          </Container>
        </Navbar>
      </header>

      <Outlet />
    </>
  )
};

export default Layout;