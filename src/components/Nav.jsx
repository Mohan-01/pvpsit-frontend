import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import {FaUserPlus, FaPlus, FaTrash, FaUser} from 'react-icons/fa'
import {FiLogIn, FiLogOut} from 'react-icons/fi'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import AddNotify from './AddNotify';
import DeleteForm from './DeleteForm';
import { handleLogout } from '../utils/helpingFunctions'
import '../css/Nav.css';

const Nav = ({loggedIn, notShow, heading, updateURL, authorized, setUser, user, setAuthorized, setLoggedIn, setLoader, navigate}) => {
  //setLoader, navigate
  return (
    <nav>
      <Routes>
        <Route path='/signup' element={<RegisterForm setLoader={setLoader} navigate={navigate} />}></Route>
        <Route path='/login' element={<LoginForm setLoader={setLoader} setUser={setUser} setAuthorized={setAuthorized} setLoggedIn={setLoggedIn} navigate={navigate} />}></Route>
        <Route path='/new-notification' element={<AddNotify notShow={notShow} heading={heading} updateURL={updateURL} navigate={navigate} setLoader={setLoader}/>} />
        <Route path='/delete-all' element={<DeleteForm navigate={navigate}/>} />
      </Routes>
      {
      
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='internships'>Internships</Link></li>
          <li><Link to='hackathons'>Hackathons</Link></li>
          <li><Link to='coding-contests'>Coding contests</Link></li>
        </ul>
      
    }
      <ul className='right'>
        {loggedIn?<li><Link to='/profile' title='Profile'><p className='user-name'>{user.userName}<FaUser /></p></Link></li>:null}
        {authorized? <li><Link to='/signup' title='Add User'><FaUserPlus /></Link></li>: null}
        {!loggedIn?<li><Link to='/login' title='Login'><FiLogIn /></Link></li>:null}
        {loggedIn?<li><Link onClick={() => handleLogout(setLoggedIn, setAuthorized)} title='Logout'><FiLogOut /></Link></li>:null}
        {authorized? <li><Link to='/new-notification' title='Add New Notification'><FaPlus /></Link></li>: null}
        {authorized? <li><Link to='/delete-all' title='Delete All Notification'><FaTrash /></Link></li>: null}
      </ul>
    </nav>
  )
}

// 

export default Nav
