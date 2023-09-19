import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import {FaUserPlus, FaPlus, FaTrash, FaUser} from 'react-icons/fa'
import {FiLogIn, FiLogOut} from 'react-icons/fi'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import AddNotify from './AddNotify';
import DeleteForm from './DeleteForm';
import { handleLogout } from '../helpingFunctions'
import '../css/Nav.css';

const Nav = (props) => {
  return (
    <nav>
      <Routes>
        <Route path='/signup' element={<RegisterForm {...props}/>}></Route>
        <Route path='/login' element={<LoginForm {...props}/>}></Route>
        <Route path='/new-notification' element={<AddNotify {...props}/>} />
        <Route path='/delete-all' element={<DeleteForm {...props}/>} />
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
        {props.loggedIn?<li><Link to='/profile' title='Profile'><p className='user-name'>{props.user.userName}<FaUser /></p></Link></li>:null}
        {props.authorized? <li><Link to='/signup' title='Add User'><FaUserPlus /></Link></li>: null}
        {!props.loggedIn?<li><Link to='/login' title='Login'><FiLogIn /></Link></li>:null}
        {props.loggedIn?<li><Link onClick={() => handleLogout(props.setLoggedIn, props.setAuthorized)} title='Logout'><FiLogOut /></Link></li>:null}
        {props.authorized? <li><Link to='/new-notification' title='Add New Notification'><FaPlus /></Link></li>: null}
        {props.authorized? <li><Link to='/delete-all' title='Delete All Notification'><FaTrash /></Link></li>: null}
      </ul>
    </nav>
  )
}

export default Nav
