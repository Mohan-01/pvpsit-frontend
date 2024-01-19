import React from 'react'
import {handleLogin} from '../utils/helpingFunctions';

function LoginForm({setLoader, setUser, setAuthorized, setLoggedIn, navigate}) {

    const hanldeSubmit = async (e) => {
        setLoader(true);
        try {
            const user = await handleLogin(e);
            setUser(user)
            window.localStorage.setItem('userId', user._id);
            if(user.role === 'admin' || user.role === 'staff') setAuthorized(true);
            setLoggedIn(true);
        } catch (err) {
            setUser(false);
            setAuthorized(false);
            setLoggedIn(false);
            console.log(err);
        }
        setLoader(false);
        navigate('/');
    }
    
    return (
        <form onSubmit={hanldeSubmit}>
        <button type='button' className='close-btn' onClick={() => navigate(-1)}>close</button>
            <label htmlFor="userName">User Name: </label>
            <input type="text" name="userName" id="userName" />
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" />
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm;