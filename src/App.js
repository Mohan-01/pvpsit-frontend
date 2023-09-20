import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.css';
import './css/Form.css';

function App() {
  const [authorized, setAuthorized] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState({});
  const url = `https://pvpsit-backend.onrender.com/users/login-status`;
  // const url = `http://localhost:4000/users/login-status`;

  useEffect(() => {
    // setLoader(true);
    axios.get(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      withCredentials: true,
    }).then(data => {
      if(data.status !== 200) return ;
      setLoggedIn(true);
      setUser(data.data.data);
      // setLoader(false);
      if(user.role === 'admin' || user.role === 'staff') setAuthorized(true);
    }).catch(err => {})
  }, [url, user.role]);

  const routes = [
    {
      route: '/internships',
      heading: 'Internships',
      img: '/img/internships.png',
    },
    {
      route: '/hackathons',
      heading: 'Hackathons',
      img: `/img/hackathons.png`
    },
    {
      route: '/coding-contests',
      heading: 'Coding Contests',
      img: '/img/coding-contests.png'
    }
  ]

  const navigate = useNavigate();

  return (
    <div className="App">
        <Header 
          authorized={authorized} 
          setAuthorized={setAuthorized} // loginForm
          loggedIn={loggedIn} // To show logout button
          setLoggedIn={setLoggedIn} // loginForm
          navigate={navigate} // after signup or login
          user={user} // user name
          setUser={setUser} // loginForm
          loader={loader} 
          setLoader={setLoader}
          />
          <Main 
          user={user}
          authorized={authorized} // to show edit and delete buttons over notifications
          routes={routes} // main routes for notifications
          navigate={navigate} // navigation
          loader={loader} 
          setLoader={setLoader}
        />
        <Footer />
    </div>
  );
}

export default App;
