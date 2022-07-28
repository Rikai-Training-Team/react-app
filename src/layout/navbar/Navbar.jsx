import React, { useState } from 'react';
import './Navbar.css';
import { toast } from 'react-toastify';
import SearchBox from './SearchBox/SearchBox';

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
      <SearchBox />
    </div>
  );
};

export default Navbar;
