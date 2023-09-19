/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import {Link} from 'react-router-dom';
import '../css/LinkCard.css';

const LinkCard = ({info}) => {
  return (
    <Link to={info.route} className='link-card'> 
      <div className='link-card-div'>
        {/** Change the Link to */}
        <h1 className="link-card-heading">{info.heading}</h1>
        {<img src={info.img} alt={`${info.heading} - image`} />}
      </div>
    </Link>
  )
}

export default LinkCard
