import React, { useState } from 'react'
import { createNotify, handleEdit } from '../helpingFunctions';

const AddNotify = ({notShow, ...props}) => {
  console.log('add notification', props);
  const [showAll, setShowAll] = useState(notShow? notShow: false);
  const [heading, setHeading] = useState(props.heading);
  const [coverImg, setCoverImg] = useState(heading?`/${heading.toLowerCase()}`: 'internships');

  props = {...props, showAll, heading, coverImg}

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setCoverImg(fileReader.result);
        resolve(fileReader.result);
      }
      fileReader.onerror = error => reject(error);
    })
  }

  const handleFileUpload = async e => {
    const base64Image = await convertToBase64(e.target.files[0]);
    // console.log(typeof base64Image, base64Image);
    setCoverImg(base64Image);
  }

  return (
    <form onSubmit={(e) => {
      if(!props.updateURL) createNotify(e, coverImg, props);
      else handleEdit(e, props.updateURL, props);
    }} method='post'>
        <button type='button' className='close-btn' onClick={() => props.navigate(-1)}>close</button>
        {
          !notShow?
          <React.Fragment>
            <label htmlFor="heading">What you want to add</label>
            <select name="heading" id="heading" defaultValue='select one' onChange={(e) => {
              setShowAll(true);
              setHeading(e.target.value)
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
            <h2 className='form-heading'>{heading.toLocaleUpperCase()}</h2>
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
            <input type="file" name="coverImg" id="coverImg" onChange={e => handleFileUpload(e)} accept='image/*' />
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
