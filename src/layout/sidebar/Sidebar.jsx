import React, { useContext, useEffect } from 'react';
import { FilterContext, ProductContext } from '../../App';
import BrandFilter from '../../components/BrandFilter/BrandFilter';
import ListFilter from '../../components/ListFilter/ListFilter';
import PriceFilter from '../../components/PriceFilter/PriceFilter';
import RatingFilter from '../../components/RatingFilter/RatingFilter';
import TypeFilter from '../../components/TypeFilter/TypeFilter';
import { RESET_FILTER, SET_NO_PRODUCTS_FOUND, SET_PRODUCTS } from '../../constant/type';
import './Sidebar.css';

const Sidebar = ({ products }) => {
  //Context
  const { filterState, filterDispatch } = useContext(FilterContext);
  const { productState, productDispatch } = useContext(ProductContext);

  const handleResetFilter = () => {
    filterDispatch({
      type: RESET_FILTER,
      result: {
        types: [],
        brands: [],
        price: {
          min: 0,
          max: 0,
        },
        rating: null,
      },
    });
  };

  //Function filter arr products with one option
  const filterProductsByType = (arr, typeArr) => {
    return arr.filter((item) => {
      return filterState.types.find((type) => item.type === type);
    });
  };

  const filterProductsByBrand = (arr, brandArr) => {
    return arr.filter((item) => {
      return filterState.brands.find((brand) => item.brand === brand);
    });
  };
  const filterProductByPrice = (arr, price) => {
    return arr.filter((item) => item.price >= price.min && item.price <= price.max);
  };
  const filterProductByRating = (arr, rating) => {
    return arr.filter((item) => item.rating >= rating);
  };

  //Effect filter products arr with multi options
  useEffect(() => {
    productDispatch({ type: SET_NO_PRODUCTS_FOUND, result: '' });
    let result = productState.initProducts;
    if (filterState.types.length > 0) {
      result = filterProductsByType(result, filterState.types);
    }
    if (filterState.brands.length > 0) {
      result = filterProductsByBrand(result, filterState.brands);
    }
    if (filterState.price.max !== filterState.price.min) {
      result = filterProductByPrice(result, filterState.price);
    }
    if (filterState.rating) {
      result = filterProductByRating(result, filterState.rating);
    }
    if (result.length > 0) productDispatch({ type: SET_PRODUCTS, result });
    else {
      productDispatch({ type: SET_PRODUCTS, result });
      productDispatch({ type: SET_NO_PRODUCTS_FOUND, result: 'No Products Found.' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productState.initProducts, filterState.types, filterState.brands, filterState.price, filterState.rating]);

  return (
    <div className='sidebar'>
      {filterState.showBtn && (
        <button onClick={handleResetFilter} style={{ display: 'flex', alignItems: 'center', padding: '.2rem .5rem' }}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='icon'
            style={{ padding: 0 }}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          Clear All Filter
        </button>
      )}
      <h2>Show Result For</h2>
      <ListFilter />
      <h2>Filter By</h2>
      <TypeFilter />
      <BrandFilter />
      <RatingFilter />
      <PriceFilter />
    </div>
  );
};

export default Sidebar;
