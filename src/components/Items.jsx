/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import MakeItem from './MakeItem';
import Paginate from './Paginate';
import Search from './Search';
import '../css/Item.css'
import { getNotifications } from '../utils/helpingFunctions';

const Items = ({authorized, route, heading}) => {
    const [data, setData] = useState(null);
    const [showData, setShowData] = useState(null);
    const [page, setPage] = useState(1);
    
    useEffect(() => {
        
        (async function(){
            try {
                const data = await getNotifications(route);
                setData(data);
                setShowData(data);
            } catch (e) {
                console.log(e);
            }
        })()
    }, [])

    const handleSearch = e => {
        setShowData(data.filter(el => el.name.toLowerCase().includes(e.target.value?.toLowerCase())))
    }

  return (
    <React.Fragment>
    <div className='heading-search'>
        <Search handleSearch={handleSearch} />
        <h1 className='main-heading'>{heading}</h1>
    </div>
    <div className='items'>
        {/*<Paginate page={page} setPage={setPage} {...props} />*/}
        {/* <div className='all-notify'> */}
            {
                showData
                ? showData.map(el =><MakeItem key={el._id} data={el} authorized={authorized} route={route} />)
                : <p>There are no {heading} available!</p>
            }
        {/* </div> */}
    </div>
    <Paginate page={page} setPage={setPage} />
    </React.Fragment>
  )
}

export default Items;