/* eslint-disable no-unused-vars */
import React from 'react'
import { handleRegister } from '../utils/helpingFunctions';

const RegisterForm = ({setLoader, navigate}) => {

  const handleSubmit = async (e) => {
    setLoader(true)
    const user = await handleRegister(e, setLoader, navigate);
    alert(`User Signup successfully: ${user.userName}`)
    setLoader(false);
    navigate('/')
  }
  
  return (
    <form onSubmit={handleSubmit}>
        <button type='button' className='close-btn' onClick={() => navigate('/')}>close</button>
        <label htmlFor="userName">User Name: </label>
        <input type="text" name="userName" id="userName" required/>
        <label htmlFor="role">Role: </label>
        <select name="role" id="role">
            <option value="user" defaultValue={'user'}>User</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
        </select>
        <label htmlFor="department">Department: </label>
        <input type="text" name="department" id="department" />
        <label htmlFor="phone">Phone: </label>
        <input type="text" name="phone" id="phone" />
        <label htmlFor="mail">Email: </label>
        <input type="email" name="mail" id="mail" />
        <label htmlFor="password">Password: </label>
        <input type="password" name='password' id='password' minLength={8} required/>
        <label htmlFor="passwordConfirm">Confirm Password: </label>
        <input type="password" name='passwordConfirm' id='passwordConfirm' minLength={8} required/>
        <button type="submit">Submit</button>
    </form>
  )
}

export default RegisterForm
