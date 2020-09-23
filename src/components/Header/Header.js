import React, {useState} from "react";
import Logo from "../../fakeData/images/Logo1.png";
import "./Header.css";
import {
    Button,
    Col,
    Container,
    Form,
    FormControl,
    Nav,
    Navbar,
    NavDropdown,
    Row
} from "react-bootstrap";
import fakeData from "../../fakeData/fakeData";
import Home from "../Home/Home";

const Header = () => {
    const [destination, setDestination] = useState(fakeData);

    return (
        <div className="background">
            <Navbar variant="dark" expand="lg">
                <Navbar.Brand href="/home" className="ml-lg-5 mr-auto ">
                    <img className="ml-5" src={Logo} alt="" height="35px"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Form className="ml-auto mr-auto col-xs-9 ">
                        <FormControl
                            type="text"
                            className="Search"
                            placeholder="Search your Destination"/>
                    </Form>
                    <Nav className="ml-auto mr-5">
                        <Nav.Link href="/home" className="mr-4">
                            Home
                        </Nav.Link>
                        <NavDropdown title="Destination" id="basic-nav-dropdown" className="mr-4">
                            <NavDropdown.Item href="/action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="/action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/action/3.3">Something</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/blog" className="mr-4">
                            Blog
                        </Nav.Link>
                        <Nav.Link href="/contact" className="mr-4">
                            Contact
                        </Nav.Link>
                        <Button href="/login" variant="warning" className="mr-5">
                            Login
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Container>
                <Row>
                    <Col>
                        
                          <button>Booking</button>
                        
                    </Col>
                    <Col style={{display:'flex', paddingRight:'20px', justifyContent:'space-between'}}>
                        {destination.map((destination) => (<Home destination={destination}></Home>))}
                    </Col>
                </Row>
            </Container>

        </div>
    );
};

export default Header;
