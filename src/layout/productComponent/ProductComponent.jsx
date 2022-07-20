import React, { useState, useEffect } from 'react';
import SortComponent from './sortComponent/SortComponent';
import './ProductComponent.css';
import ProductCard from '../../components/productCard/ProductCard';

const ProductComponent = ({ products, setProducts, result, setResult, stringResult, setStringResult }) => {
  const [condition, setCondition] = useState('');

  useEffect(() => {
    if (condition === 'featured') {
      return;
    } else if (condition === 'desc') {
      const temp = [...products];
      const arr = temp.sort((pre, next) => next.price - pre.price);
      setResult(arr);
    } else if (condition === 'inc') {
      const temp = [...products];
      const arr = temp.sort((pre, next) => pre.price - next.price);
      setResult(arr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [condition]);
  return (
    <div className='product-component'>
      <SortComponent condition={condition} setCondition={setCondition} />
      {result.length === 0 && (
        <div className='product-container'>
          {products && products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
      {result.length > 0 && (
        <div className='product-container'>
          {result.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductComponent;
