import React from 'react'
import LinkCard from './LinkCard'
import '../css/Home.css';

const Home = ({routes}) => {
  return (
    <div className='home'>
      <h1>Department of CSE - Career Enrichment Activities </h1>
      <div className="links">
        {
          routes.length
          ? routes.map(el => <LinkCard info={el} key={el.heading} />)
          : <p>This site is under maintance. Please visit us later</p>
        }
      </div>
    </div>
  )
}

export default Home
