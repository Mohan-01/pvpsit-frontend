import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.css';
import './css/Form.css';
import { getUser } from './utils/helpingFunctions';

function App() {
  const [authorized, setAuthorized] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const id = window.localStorage.getItem('userId');
    (async function() {

      if(id) {
        const user = await getUser(id, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          withCredentials: true,
        });
        setUser(user);
        setLoggedIn(true);
        console.log(user);
        const {role} = user;
        if(role === 'admin' || role ==='staff') setAuthorized(true);
      }
    })();
  }, []);

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
