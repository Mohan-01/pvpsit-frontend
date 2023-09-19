import React from 'react'
import '../css/Loader.css';

const Loader = ({message}) => {
  return (
    <div className="loader">
      <h1>
        {message}
      </h1>
    </div>
  )
}

export default Loader;