import axios from 'axios';
import React, { useState, useEffect } from 'react';
import MakeItem from './MakeItem';
import Paginate from './Paginate';
import Search from './Search';
import '../css/Item.css'

const Items = (props) => {
    const [data, setData] = useState([]);
    const [showData, setShowData] = useState([]);
    const [page, setPage] = useState(1);
    const url = `https://pvpsit-backend.onrender.com${props.route}`;
    // const url = `http://localhost:4000${props.route}/?page=${page}`;
    useEffect(() => {
        // props.setLoader(true);
        axios.get(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://pvpsit.onrender.com'
            },
            withCredentials: true,
        })
        .then(data => {
            // props.setLoader(false);
            if(data.status >= 200 && data.status < 300) {
                setData(data.data.data);
                setShowData(data.data.data);
            } else {
                console.log(data.data);
            }
        })
        .catch(err => console.log(err))
    }, [url])

    const handleSearch = e => {
        setShowData(data.filter(el => el.name.toLowerCase().includes(e.target.value?.toLowerCase())))
    }

    console.log('items')

  return (
    <React.Fragment>
    <div className='items'>
        <div className='heading-search'>
            <Search handleSearch={handleSearch} />
            <h1 className='main-heading'>{props.heading}</h1>
        </div>
        {/*<Paginate page={page} setPage={setPage} {...props} />*/}
        <div className='all-notify'>
        {
            showData.length
            ? showData.map(el =><MakeItem key={el._id} data={el} {...props} url={url}/>)
            : <p>There are no {props.heading} available!</p>
        }
        </div>
        <Paginate page={page} setPage={setPage} {...props} />
    </div>
    </React.Fragment>
  )
}

export default Items;