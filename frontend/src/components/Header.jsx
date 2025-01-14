import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// import { LinkContainer } from 'react-router-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { reserCart } from "../slices/cartSlice";
import { useLogoutUserMutation } from "../slices/authApiSlice";

const Header = () => {
  const [logoutApiCall] = useLogoutUserMutation();
  const { cartItem } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  // console.log(userInfo);
  const navigate = useNavigate();
  // logout function

  const diapatch = useDispatch();

  const logoutHndler = async () => {
    await logoutApiCall().unwrap();

    diapatch(logout());
    diapatch(reserCart());
    navigate("/");
  };

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
              {userInfo ? (
                <NavDropdown
                  title={userInfo?.name}
                  id="username"
                  style={{ margin: "" }}
                >
         
                    <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
         
                  <NavDropdown.Item onClick={logoutHndler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to={"/login"}>
                  <FaUser /> Sign In
                </Nav.Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <NavDropdown.Item as={Link} to="/admin/productlist">Products</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/orderlist">Orders</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/userlist">Users</NavDropdown.Item>
                  
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
