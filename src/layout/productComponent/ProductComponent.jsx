import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../App';
import ProductCard from '../../components/productCard/ProductCard';
import { SET_PRODUCTS } from '../../constant/type';
import Pagination from './pagination/Pagination';
import SortComponent from './sortComponent/SortComponent';
import './ProductComponent.css';

const ProductComponent = () => {
  const [condition, setCondition] = useState('');
  const { productState, productDispatch } = useContext(ProductContext);

  useEffect(() => {
    if (condition === 'featured') {
      return;
    } else {
      let temp;
      if (productState.products.length > 0) {
        temp = productState.products;
      } else {
        temp = productState.initProducts;
      }
      if (condition === 'desc') {
        const arr = temp.sort((pre, next) => next.price - pre.price);
        productDispatch({ type: SET_PRODUCTS, result: arr });
      } else if (condition === 'inc') {
        const arr = temp.sort((pre, next) => pre.price - next.price);
        productDispatch({ type: SET_PRODUCTS, result: arr });
      }
    }
  }, [productState.initProducts, condition, productDispatch, productState.products]);
  return (
    <div className='product-component'>
      <SortComponent condition={condition} setCondition={setCondition} />
      <div className='product-container'>
        {productState.products.length > 0 &&
          productState.products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
      {productState.message && <p>{productState.message}</p>}
      {!productState.message && <Pagination />}
    </div>
  );
};

export default ProductComponent;
