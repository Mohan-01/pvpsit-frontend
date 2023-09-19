/* eslint-disable no-unused-vars */
import React from 'react'
import { handleDeleteAll } from '../helpingFunctions';

const DeleteForm = ({navigate}) => {
  
  return (
    <form onSubmit={e => handleDeleteAll(e, navigate)} method='post'>
      <button type='button' className='close-btn' onClick={() => navigate(-1)}>close</button>
        <label htmlFor="name">Which one you want to delete</label>
        <select name="name" id="name" defaultValue={'internships'}>
            <option value="internships">Internships</option>
            <option value="hackathons">Hackathons</option>
            <option value="coding-constests">Coding-constests</option>
        </select>
        <button type='submit'>Submit</button>
    </form>
  )
}

export default DeleteForm
