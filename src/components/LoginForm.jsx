import React from 'react'
import {handleLogin} from '../helpingFunctions';

function LoginForm(props) {
    
    return (
        <form onSubmit={e => handleLogin(e, props)}>
        <button type='button' onClick={() => props.navigate(-1)}>close</button>
            <label htmlFor="userName">User Name: </label>
            <input type="text" name="userName" id="userName" />
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" />
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm;