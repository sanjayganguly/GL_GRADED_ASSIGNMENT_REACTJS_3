import { Nav, Navbar, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FAVOURITE_MOVIES, MOVIES_COMING, MOVIES_IN_THEATERS, TOP_RATED_MOVIES, TOP_RATED_MOVIES_INDIA } from '../constants/constants';

const NavigationBar = () => {

    return (
        <>
                        <Navbar collapseOnSelect bg='primary' variant='dark' expand="lg">
                <Container>

                    <Navbar.Brand to="/" as={NavLink} exact>
                        {/* <FontAwesomeIcon icon={faVideoCamera} className="me-2" /> */}
                        Home
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="main-links" />

                    <Nav className="me-auto">
                        <Nav.Link to={MOVIES_IN_THEATERS} as={NavLink}>Movies in theater</Nav.Link>
                        <Nav.Link to={MOVIES_COMING} as={NavLink}>Comming soon</Nav.Link>
                        <Nav.Link to={TOP_RATED_MOVIES_INDIA} as={NavLink}>Top rated indian</Nav.Link>
                        <Nav.Link to={TOP_RATED_MOVIES} as={NavLink}>Top rated</Nav.Link>
                        <Nav.Link to={FAVOURITE_MOVIES} as={NavLink}>Favourites</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

        </>
    );
}

export default NavigationBar;