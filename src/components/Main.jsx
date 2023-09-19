/* eslint-disable no-unused-vars */
import React from 'react'
import { Routes, Route} from 'react-router-dom';
import Items from './Items';
import Home from './Home';
import Profile from './Profile';
import ErrorPage from './ErrorPage';
import SpecificItem from './SpecificItem';
import AddNotify from './AddNotify';
import Loader from './Loader';
import '../css/Main.css';
/**
 * Routes
 * 
 * /internships // get all internships (Items, makeItem)
 *    /:id      // get a specific internship (SpecificItem)
 *        /update // update a specific internship ()
 *        /delete // delete a specific internship ()
 * 
 * @param {*} props
 * @return {*} 
 */
function Main(props) {
  console.log('main');
  
    return (
      <main>
      {
        props.loader
        ? <Loader message={'Error loading'} />
        : <Routes>
        <Route path='*' element={<Home {...props} />} />
        <Route path='/profile' element={<Profile user={props.user}/>} />
          {
                // Creating all main routes
                props.routes.map(item =>
                  <Route key={item.route} path={`${item.route}/*`}>
                  <Route path='*' element={
                    <Items
                    route={item.route}
                    heading={item.heading}
                    {...props} />
                  } />
                  <Route path=':id/*'>
                  <Route path='*' element={<SpecificItem route={item.route} {...props} heading={item.heading} />}>
                  <Route path='update' element={<AddNotify/>} />
                  </Route>
                  </Route>
                  </Route>
                  )}
              <Route path='*' Component={ErrorPage}/>
            </Routes>
          }
      </main>
    );
}

export default Main;