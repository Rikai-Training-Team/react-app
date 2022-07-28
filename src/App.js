import Navbar from './layout/navbar/Navbar.jsx';
import ProductComponent from './layout/productComponent/ProductComponent.jsx';
import Sidebar from './layout/sidebar/Sidebar.jsx';
import './App.css';
import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { instance } from './api/axios.js';
import ToastComponent from './layout/toast/ToastComponent.jsx';
import { productReducer } from './context/productContext/productReducer.js';
import { searchReducer } from './context/seachContext/searchReducer.js';
import { filterReducer } from './context/filterContext/filterReducer.js';
import { SET_INIT_PRODUCTS, SET_PRODUCTS } from './constant/type.js';

//Create Context
export const SearchContext = createContext();
export const ProductContext = createContext();
export const FilterContext = createContext();

function App() {
  //Context
  const [productState, productDispatch] = useReducer(productReducer, {
    initProducts: [],
    products: [],
    message: '',
  });
  const [searchState, searchDispatch] = useReducer(searchReducer, {
    search: '',
  });
  const [filterState, filterDispatch] = useReducer(filterReducer, {
    brands: [],
    types: [],
    rating: null,
    price: {
      min: 0,
      max: 0,
    },
    showBtn: false,
  });

  //Component State
  const [error, setError] = useState('');

  //Effect
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await instance.get('/products');
        if (response.data.length > 0) {
          productDispatch({ type: SET_INIT_PRODUCTS, result: response.data });
          productDispatch({ type: SET_PRODUCTS, result: response.data });
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchProducts();
  }, [setError]);
  return (
    <FilterContext.Provider value={{ filterState, filterDispatch }}>
      <ProductContext.Provider value={{ productState, productDispatch }}>
        <SearchContext.Provider value={{ searchState, searchDispatch }}>
          <Navbar />
          <div style={{ display: 'flex', alignItems: 'stretch' }}>
            <Sidebar setError={setError} />
            <ProductComponent />
          </div>
          {error && <ToastComponent />}
        </SearchContext.Provider>
      </ProductContext.Provider>
    </FilterContext.Provider>
  );
}

export default App;
