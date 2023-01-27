import logo from './logo.png'
import {Container, Navbar, Nav} from 'react-bootstrap';
import HelpSection from './HelpSection';
import AboutSection from './AboutSection';

/**
 * Navbar component used for navigation between the course scheduler and the help/about sections.
 * 
 */
export default function NavBar() {
    return ( 
        <>
            <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    />{' '}
                    EasyCRN
                </Navbar.Brand>
                <Nav className="me-auto-justify-content-end"> 
                    <AboutSection />
                    <HelpSection />
                </Nav>
            </Container>
            </Navbar>
        </>
    )
}