/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, Link, Route, Routes } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import AddNotify from './AddNotify';
import { getSpecificNotification } from '../utils/helpingFunctions';

const SpecificItem = ({route, navigate, authorized, heading, setLoader}) => {
    const [data, setData] = useState(null);
    const {id} = useParams();



    useEffect(() => {
        setLoader(true);
        (async function() {
            try {
                const data = await getSpecificNotification(route, id);
                setData(data);
            } catch (err) {
                console.log(err);
            }
        })();
        setLoader(false);
    }, [route, id, setLoader]);

    return (
        <React.Fragment>
        <Routes>
            <Route path='update' element={<AddNotify notShow = {true} heading={heading} navigate={navigate} setLoader={setLoader} id={id} update={true} />} />
        </Routes>
        {
            data
            ? (
                <React.Fragment>
                {
                    authorized
                    ?
                    <div className='card-update-delete'>
                        <Link to='update'><FaEdit /></Link>
                        {/* <Link onClick={() => handleDelete(url, id, setData)}><FaTrash style={{color: "red"}} /></Link> */}
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
