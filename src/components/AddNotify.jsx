import React, { useState } from 'react'
import { createNotify, handleEdit } from '../utils/helpingFunctions';

const AddNotify = ({notShow, heading, navigate, setLoader, id, update}) => {
  // heading, updateURL, navigate, setLoader
  const [showAll, setShowAll] = useState(notShow? notShow: false);
  const [thisHeading, thisHetHeading] = useState(heading);

  const handleSubmit = async(e) => {
    setLoader(true);
    try {
      if(!update) await createNotify(e, thisHeading);
      else await handleEdit(e, id, thisHeading);
      navigate(`/${thisHeading.toLowerCase()}`);
    } catch (err) {
      navigate('/');
      window.location.reload();
      console.log(err);
    }
    setLoader(false);
  }

  return (
    <form onSubmit={handleSubmit} method='post'>
        <button type='button' className='close-btn' onClick={() => navigate(-1)}>close</button>
        {
          !notShow?
          <React.Fragment>
            <label htmlFor="thisHeading">What you want to add</label>
            <select name="thisHeading" id="thisHeading" defaultValue='select one' onChange={(e) => {
              setShowAll(true);
              thisHetHeading(e.target.value)
            }}>
              <option value="select one" disabled>Select one</option>
              <option value="Internships">Internships</option>
              <option value="Hackathons">Hackathons</option>
              <option value="Coding-Contests">Coding-Contests</option>
            </select>
        </React.Fragment>: null
      }
      { showAll
          ? 
          <React.Fragment>
            <h2 className='form-thisHeading'>{thisHeading.toLocaleUpperCase()}</h2>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" placeholder='Name'/>
            <label htmlFor="about">About:</label>
            <input type="text" name="about" id="about" placeholder='About'/>
            <label htmlFor="eligibility">Eligiblity:</label>
            <input type="text" name="eligibility" id="eligibility" placeholder='Eligibility'/>
            <label htmlFor="lastDateToApply">Last Date To Apply:</label>
            <input type="date" name="lastDateToApply" id="lastDateToApply" placeholder='Last Date'/>
            <label htmlFor="link">Apply Link: </label>
            <input type="url" name="link" id="link" placeholder='apply link' />
            <input type="file" name="coverImg" id="coverImg" accept='image/*' />
            {/*<textarea name="description" id="description" cols="30" rows="10">
      </textarea>*/}
            <button type='submit' aria-label='Submit'>Submit</button>
          </React.Fragment>
          : null
        }
    </form>
  )
}

export default AddNotify
