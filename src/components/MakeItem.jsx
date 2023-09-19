/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {FaEdit, FaTrash} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { handleDelete } from '../helpingFunctions';
import '../css/MakeItem.css';

const MakeItem = ({data, authorized, route}) => {
    const url = `http://localhost:4000${route}`;
    const [item, setItem] = useState(data);
    const date = String(item?.lastDateToApply).split('T')[0];

    console.log('make item')
    return (
        <React.Fragment>
        { item
            ?
                <div className='make-item'>
                    <div className='item-image'>
                    <img src={item.coverImg? item.coverImg: `/img${route}.png`} alt="item-img" />
                    </div>
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
                                <td>{date}</td>
                            </tr>
                            {
                                /*<tr>
                                <td><Link to={`${item._id}`}>see more...</Link></td>
                                </tr>*/
                            }
                            <tr>
                                <td className='apply-link' colSpan={2}><a href={item.link}>Apply here</a></td>
                            </tr>
                            {
                                authorized
                                ?
                                <tr className='card-update-delete'>
                                    <td><Link to={`${item._id}/update`}><FaEdit /></Link></td>
                                    <td><Link onClick={() => handleDelete(url, item._id, setItem)}><FaTrash className='delete' /></Link></td>
                                </tr>
                                : null
                            }
                        </tbody>
                    </table>
                </div>
            :null
        }
        </React.Fragment>
    )
}

export default MakeItem
