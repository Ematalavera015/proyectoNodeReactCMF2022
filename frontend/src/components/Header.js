import React from 'react';

import { Navbar, Container, NavDropdown, Nav, Form, FormControl, Button } from 'react-bootstrap';

// get our fontawesome imports
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLog = useSelector((state) => state.userLogger);

    const { user } = userLog;

    const cerrarSesion = () => {
        dispatch(logout());
    }

    const crearProducto = () => {
        navigate('/product/create')
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Tienda Virtual</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets"><FontAwesomeIcon icon={faHome} /> Carrito</Nav.Link>
                        {user?.name ?

                            <NavDropdown title={user.name} id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Mi Perfil</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => crearProducto()}>Crear producto</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => cerrarSesion()} href="/">Logout</NavDropdown.Item>
                            </NavDropdown>
                            :
                            <Nav.Link href="/login"><FontAwesomeIcon icon={faHome} /> Login</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
