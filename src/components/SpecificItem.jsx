/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link, Route, Routes } from 'react-router-dom';
import {FaEdit, FaTrash} from 'react-icons/fa';
import AddNotify from './AddNotify';
import { handleDelete } from '../helpingFunctions';

const SpecificItem = (props) => {
    const url = `http://localhost:4000${props.route}`;
    const [data, setData] = useState(null);
    const {id} = useParams();
    const {navigate} = props;

    console.log('specific item')


    useEffect(() => {
        // props.setLoader(true);
        axios.get(`${url}/${id}`).then(res => {
            if(res.status !== 200)  return navigate('/error')
            setData(res.data.data);
        })
        // props.setLoader(false);
    }, [url, id, navigate]);

    return (
        <React.Fragment>
        <Routes>
            <Route path='update' element={<AddNotify {...props} notShow = {true} updateURL = {`${url}/${id}`} />} />
        </Routes>
        {
            data
            ? (
                <React.Fragment>
                {
                    props.authorized
                    ?
                    <div className='card-update-delete'>
                        <Link to='update'><FaEdit /></Link>
                        <Link onClick={() => handleDelete(url, id, setData)}><FaTrash style={{color: "red"}} /></Link>
                    </div>
                    : null
                }
                <table>
                    <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{data.name}</td>
                    </tr>
                    <tr>
                        <td>About</td>
                        <td>{data.about}</td>
                    </tr>
                    <tr>
                        <td>Eligibility</td>
                        <td>{data.eligibility}</td>
                    </tr>
                    <tr>
                        <td>Last Date</td>
                        <td>{data.lastDateToApply}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}><a href={`${data.link}`}>Apply here</a></td>
                    </tr>
                    </tbody>
                </table>
                </React.Fragment>
                
            )
            : null
        }
        </React.Fragment>
    )
}

export default SpecificItem
