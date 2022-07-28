import React, { useContext, useRef, useState } from 'react';
import './ListFilter.css';
import { ProductContext } from '../../App.js';
import { SET_NO_PRODUCTS_FOUND, SET_PRODUCTS } from '../../constant/type';

const ListFilter = () => {
  const [showSubList1, setShowSubList1] = useState(false);
  const [showSubList2, setShowSubList2] = useState(false);
  const [showSubList3, setShowSubList3] = useState(false);
  const { productState, productDispatch } = useContext(ProductContext);
  const handleSearch = (type) => {
    const arr = productState.initProducts.filter((item) => item.type === type);
    if (arr.length > 0) {
      productDispatch({ type: SET_PRODUCTS, result: arr });
    } else {
      productDispatch({ type: SET_PRODUCTS, result: [] });
      productDispatch({ type: SET_NO_PRODUCTS_FOUND, result: 'No products.' });
    }
  };
  const handleShowSubList = (subList) => {
    switch (subList) {
      case 1:
        setShowSubList1(!showSubList1);
        break;
      case 2:
        setShowSubList2(!showSubList2);
        break;
      case 3:
        setShowSubList3(!showSubList3);
        break;
      default:
        break;
    }
  };

  return (
    <div className='list-filter'>
      <ul>
        <li onClick={() => handleShowSubList(1)}>
          <svg xmlns='http://www.w3.org/2000/svg' className='icon' viewBox='0 0 20 20' fill='currentColor'>
            <path
              fillRule='evenodd'
              d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
              clipRule='evenodd'
            />
          </svg>
          Applications
        </li>
        {showSubList1 && (
          <ul className='sub-list'>
            <li onClick={() => handleSearch('dishwashers')}>Dishwashers</li>
            <li onClick={() => handleSearch('fans')}>Fans</li>
            <li onClick={() => handleSearch('heaters')}>Heaters</li>
            <li onClick={() => handleSearch('microwares')}>Microwares</li>
          </ul>
        )}
        <li onClick={() => handleShowSubList(2)}>
          <svg xmlns='http://www.w3.org/2000/svg' className='icon' viewBox='0 0 20 20' fill='currentColor'>
            <path
              fillRule='evenodd'
              d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
              clipRule='evenodd'
            />
          </svg>
          Audio
        </li>
        {showSubList2 && (
          <ul className='sub-list'>
            <li onClick={() => handleSearch('home-audio')}>Home Audio</li>
            <li onClick={() => handleSearch('home-audio-accessories')}>Home Audio Accessories</li>
            <li onClick={() => handleSearch('in-home-speakers')}>In-home Speakers</li>
            <li onClick={() => handleSearch('ipod-and-mp3-player')}>iPod and MP3 Player</li>
          </ul>
        )}
        <li onClick={() => handleSearch('cameras-camcorders')}>
          <svg xmlns='http://www.w3.org/2000/svg' className='icon' viewBox='0 0 20 20' fill='currentColor'>
            <path
              fillRule='evenodd'
              d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
              clipRule='evenodd'
            />
          </svg>
          Cameras&amp;Camcorders
        </li>
        <li onClick={() => handleShowSubList(3)}>
          <svg xmlns='http://www.w3.org/2000/svg' className='icon' viewBox='0 0 20 20' fill='currentColor'>
            <path
              fillRule='evenodd'
              d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
              clipRule='evenodd'
            />
          </svg>
          Cell Phones
        </li>
        {showSubList3 && (
          <ul className='sub-list'>
            <li onClick={() => handleSearch('samsung-galaxy')}>Samsung Galaxy</li>
            <li onClick={() => handleSearch('unlocked-cell-phone')}>Unlocked Cell Phone</li>
            <li onClick={() => handleSearch('phone')}>iPhone</li>
            <li onClick={() => handleSearch('prepaid-phone')}>Prepaid Phones</li>
          </ul>
        )}
        <li onClick={() => handleSearch('computer-and-tablets')}>
          <svg xmlns='http://www.w3.org/2000/svg' className='icon' viewBox='0 0 20 20' fill='currentColor'>
            <path
              fillRule='evenodd'
              d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
              clipRule='evenodd'
            />
          </svg>
          Computer&amp; Tablets
        </li>
        <li onClick={() => handleSearch('home-theater')}>
          <svg xmlns='http://www.w3.org/2000/svg' className='icon' viewBox='0 0 20 20' fill='currentColor'>
            <path
              fillRule='evenodd'
              d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
              clipRule='evenodd'
            />
          </svg>
          TV &amp; Home Theater
        </li>
        <li onClick={() => handleSearch('video-games')}>
          <svg xmlns='http://www.w3.org/2000/svg' className='icon' viewBox='0 0 20 20' fill='currentColor'>
            <path
              fillRule='evenodd'
              d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
              clipRule='evenodd'
            />
          </svg>
          Video Games
        </li>
      </ul>
    </div>
  );
};

export default ListFilter;
