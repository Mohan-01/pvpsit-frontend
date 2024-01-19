/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {FaEdit, FaTrash} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { handleDelete } from '../utils/helpingFunctions';
import '../css/MakeItem.css';

const MakeItem = ({data, authorized, route}) => {
    const [item, setItem] = useState(data);
    const date = (new Date(item.lastDateToApply)).toLocaleDateString();
    const time = (new Date(item.lastDateToApply)).toLocaleTimeString();

    return (
        <div className='make-item'>
        { item
            ?   <React.Fragment>
                    <div className='item-image'>
                        <img src={item.coverImg ||  `/img${route}.png`} alt="item-img" />
                    </div>
                    <div className="box">
                    <table>
                        <tbody>
                            <tr>
                                <td>Name: </td>
                                <td>{item.name}</td>
                            </tr>
                            <tr>
                                <td>About: </td>
                                <td>{item.about}</td>
                            </tr>
                            <tr>
                                <td>Eligibility: </td>
                                <td>{item.eligibility}</td>
                                </tr>
                                <tr>
                                <td>Last Date To Apply: </td>
                                <td>{date} {time}</td>
                            </tr>
                            {
                                /*<tr>
                                <td><Link to={`${item._id}`}>see more...</Link></td>
                                </tr>*/
                            }
                            {
                                authorized
                                ?
                                <tr className='card-update-delete'>
                                    <td><Link to={`${item._id}/update`}><FaEdit /></Link></td>
                                    <td><Link onClick={() => handleDelete(route, item._id, setItem)}><FaTrash className='delete' /></Link></td>
                                </tr>
                                : null
                            }
                        </tbody>
                    </table>
                    <a href={item.link} className='apply-link'>Apply here</a>
                    </div>
            </React.Fragment>
            :null
        }
        </div>
    )
}

export default MakeItem
