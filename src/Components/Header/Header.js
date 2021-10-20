import "./Header.css"
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../Contexts/Auth'
import { Button, Container, Nav, Navbar, NavDropdown, Row, Col } from "react-bootstrap";

export function Header(){

    const { user, signOut } = useAuth()
    const history = useHistory()
  
    async function handleSignOut() {
      await signOut()
  
      history.push('/signin')
    }

    return (
        <Row>
        <Navbar bg="light" expand="lg" className="mb-3">
            <Container>
                <Navbar.Brand href="/">Senior Comps</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    {user ?
                    <span className="nav-items">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/users">Other Players</Nav.Link>
                        <NavDropdown title="More Options" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/">Action</NavDropdown.Item>
                            <NavDropdown.Item href="/">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="/">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/" onClick={handleSignOut}>Log Out</NavDropdown.Item>
                        </NavDropdown>
                    </span>
                        :
                        ""
                    }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </Row>
    )
}

