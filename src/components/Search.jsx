import React from 'react'
import { FaSearch } from 'react-icons/fa'
import '../css/Search.css';

const Search = ({handleSearch}) => {
  return (
    <div className="search">
        <input type="text" name="text" id="text" spellCheck='false' onChange={e => handleSearch(e)} placeholder='Type here to search...' />
        <FaSearch id='search-icon'/>
    </div>
  )
}

export default Search
