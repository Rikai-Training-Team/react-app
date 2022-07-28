import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../../App';
import { SET_PRODUCTS } from '../../../constant/type';
import './Pagination.css';

const Pagination = () => {
  const limit = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const { productState, productDispatch } = useContext(ProductContext);

  const handleChangeCurrentPage = (item) => {
    setCurrentPage(item);
  };
  const handleSetPrePage = () => {
    if (currentPage === 1) return;
    else setCurrentPage((pre) => pre - 1);
  };
  const handleSetNextPage = () => {
    if (currentPage === pageNumbers.length) return;
    else setCurrentPage((pre) => pre + 1);
  };
  useEffect(() => {
    let arr = [];
    if (productState.initProducts.length > 0) {
      for (let i = 0; i < Math.ceil(productState.initProducts.length / limit); i++) {
        arr = [...arr, i + 1];
      }
    }
    setPageNumbers(arr);
  }, [productState.initProducts]);
  useEffect(() => {
    const indexOfLastPost = currentPage * limit;
    const indexOfFirstPost = indexOfLastPost - limit;
    let currentPosts;
    currentPosts = productState.initProducts.slice(indexOfFirstPost, indexOfLastPost);

    productDispatch({ type: SET_PRODUCTS, result: currentPosts });
  }, [pageNumbers, setPageNumbers, currentPage, productDispatch, productState.initProducts]);
  return (
    <div className='pagination-container'>
      <span className='pagination-item' onClick={() => handleSetPrePage()}>
        <svg xmlns='http://www.w3.org/2000/svg' className='icon' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 19l-7-7 7-7m8 14l-7-7 7-7' />
        </svg>
      </span>
      {pageNumbers.map((item, index) => (
        <span
          onClick={() => handleChangeCurrentPage(item)}
          key={index}
          className={`pagination-item ${item === currentPage ? 'active' : ''} `}
        >
          {item}
        </span>
      ))}
      <span className='pagination-item' onClick={() => handleSetNextPage()}>
        <svg xmlns='http://www.w3.org/2000/svg' className='icon' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 5l7 7-7 7M5 5l7 7-7 7' />
        </svg>
      </span>
    </div>
  );
};

export default Pagination;
