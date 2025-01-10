import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// import { LinkContainer } from 'react-router-bootstrap'
import { Link } from "react-router-dom";
import { logout } from "../slices/authSlice";

const Header = () => {
  const { cartItem } = useSelector((state) => state.cart);
  // logout function

  const diapatch = useDispatch()
  const logoutHndler = () => {
    diapatch(logout())
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          {/* <LinkContainer>
          
          </LinkContainer> */}
          <Navbar.Brand as={Link} to={"/"}>
            ProShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to={"/cart"}>
                <FaShoppingCart /> Cart
                <Badge pill bg="sucess" style={{ marginLeft: "5px" }}>
                  {cartItem.reduce((acc, item) => acc + Number(item.qty), 0)}
                </Badge>
              </Nav.Link>
              <Nav.Link as={Link} to={"/"}>
                <FaUser /> Sign In
              </Nav.Link>
              {/* logout */}
              <Nav.Link as={Link} to={"/"}
              onClick={logoutHndler}>
                <FaUser /> LogOut
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
