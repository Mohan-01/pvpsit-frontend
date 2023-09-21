import React from 'react'
import { handleRegister } from '../helpingFunctions';

const RegisterForm = (props) => {
  
  return (
    <form onSubmit={e => handleRegister(e, props)}>
        <button type='button' className='close-btn' onClick={() => props.navigate(-1)}>close</button>
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
