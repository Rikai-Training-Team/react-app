import React, { useState } from 'react';
import './Navbar.css';
import { toast } from 'react-toastify';

const Navbar = ({ products, result, setResult }) => {
  const [text, setText] = useState('');
  const handleSearch = (e) => {
    e.preventDefault();
    if (text) {
      const result = products.filter((product) => product.name.toLowerCase().includes(text.toLowerCase()));
      if (result.length > 0) setResult(result);
      else toast(`No Product match '${text}'`);
    }
  };
  return (
    <div className='navbar'>
      <div className='logo'>E-cormerce</div>
      <div>
        <form onSubmit={(e) => handleSearch(e)} className='search-box'>
          <input type='text' value={text} onChange={(e) => setText(e.target.value)} placeholder='Enter search text' />
          <button type='submit'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
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
    </div>
  );
};

export default Navbar;
