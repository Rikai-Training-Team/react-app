import React from 'react';
import SolidStar from '../SolidStar';
import OutlineStar from '../OutlineStar';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className='product-card'>
      <img src={product.imageUrl} alt={product.imageUrl} />
      <h3>{product.name}</h3>
      <div>
        <div className='rating'>
          <span style={{ display: 'flex' }}>
            {new Array(product.rating).fill(undefined).map((index) => (
              <SolidStar key={index} />
            ))}
          </span>
          <span style={{ display: 'flex' }}>
            {new Array(5 - product.rating).fill(undefined).map((index) => (
              <OutlineStar key={index} />
            ))}
          </span>
        </div>
        <span>${product.price}</span>
      </div>
    </div>
  );
};

export default ProductCard;
