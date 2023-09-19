import Nav from './Nav';
import { Link } from 'react-router-dom';
import '../css/Header.css';

function Header(props) {

    return (
        <header>
            <Link to ="https://www.pvpsiddhartha.ac.in/"><img src="/img/banner.jpg" alt="PVPSIT - banner" /></Link>
            <Nav {...props}/>
        </header>
    );
}

export default Header;