import React, { useContext, useState } from 'react';
import './SearchBox.css';
import { ProductContext } from '../../../App.js';
import { SET_NO_PRODUCTS_FOUND, SET_PRODUCTS } from '../../../constant/type';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const { productState, productDispatch } = useContext(ProductContext);
  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      const arr = productState.initProducts.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
      if (arr.length > 0) productDispatch({ type: SET_PRODUCTS, result: arr });
      else {
        productDispatch({ type: SET_PRODUCTS, result: [] });
        productDispatch({ type: SET_NO_PRODUCTS_FOUND, result: `No product found for '${query}'` });
      }
    }
  };
  return (
    <div className='search-box'>
      <form onSubmit={(e) => handleSearch(e)}>
        <input type='text' onChange={(e) => setQuery(e.target.value)} placeholder='Search A Product...' />
        <button type='submit'>
          <svg xmlns='http://www.w3.org/2000/svg' className='icon' fill='none' viewBox='0 0 24 24' stroke='black'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
