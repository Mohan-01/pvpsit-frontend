import React from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import '../css/Paginate.css';

const Paginate = ({page, setPage}) => {
    const handleLeftClick = () => {
        if(page > 1) {
            setPage(page - 1);
            
        }
        else console.log('pages cannot be negative');
    }
    
    const handleRightClick = () => {
        setPage(page + 1);
    }
  return (
    <div className='paginate'>
        <p className='prev' onClick={handleLeftClick}><FaArrowLeft /></p>
        <div className='page-numbers'>
            <p className='page-number'>{page}</p>
        </div>
        <p className='next' onClick={handleRightClick}><FaArrowRight /></p>
    </div>
  )
}

export default Paginate
