import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "redux/Actions/UserActions";
import SearchBox from "./SearchBox";

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header>
      <Navbar bg="primary" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Yan Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Trang Chủ</Nav.Link>
              <NavDropdown title="Áo Nam" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Áo Sơ Mi</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Áo Thun</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Quần Nam" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Quần Jean
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Quần Kaki
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#home">Giới Thiệu</Nav.Link>
              <Nav.Link href="#home">Liên Hệ</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse
            className="justify-content-end"
            id="basic-navbar-nav"
          >
            {!(userInfo === undefined || userInfo.length === 0) ? (
              <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                <NavDropdown.Item href="/profile">
                  Trang Cá Nhân
                </NavDropdown.Item>
                <NavDropdown.Item href="#" onClick={logoutHandler}>Đăng Xuất</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i> Đăng Nhập
                </Nav.Link>
              </LinkContainer>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>
            <img
              src="http://yan.somee.com/ecommerce-html-template/img/logo_app.png"
              alt="LOGO"
              style={{ height: "40px" }}
            />
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-center">
            <SearchBox />
          </Navbar.Collapse>

          <Navbar.Collapse
            className="justify-content-end"
            id="basic-navbar-nav"
          >
            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="fa-solid fa-cart-plus"></i>
              </Nav.Link>
            </LinkContainer>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
