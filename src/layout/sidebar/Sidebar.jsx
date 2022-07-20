import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { instance } from '../../api/axios.js';
import SolidStar from '../../components/SolidStar';
import OutlineStar from '../../components/OutlineStar';
import { toast } from 'react-toastify';

const Sidebar = ({
  products,
  result,
  stringResult,
  selectedBrands,
  selectedType,
  selectedStar,
  setSelectedBrands,
  setSelectedType,
  setSelectedStar,
  setProducts,
  setResult,
  setError,
  setStringResult,
}) => {
  const [types, setTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [value, setValue] = useState({ min: 0, max: 0 });
  const [assignValue, setAssignValue] = useState({ min: 0, max: 0 });

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await instance.get('/types');
      if (response.data) setTypes(response.data);
    };
    fetchTypes();

    return () => {
      setTypes([]);
    };
  }, []);
  useEffect(() => {
    const fetchBrands = async () => {
      const response = await instance.get('/brands');
      if (response.data) setBrands(response.data);
    };
    fetchBrands();
  }, []);
  // useEffect(() => {
  //   const temp = [...products];
  //   const result = temp.filter((item) => item.price >= assignValue.min && item.price <= assignValue.max);
  //   if (result.length === 0) setStringResult('No Product Found');
  //   else setResult(result);
  // }, [assignValue, products, setResult, setStringResult]);
  useEffect(() => {
    const fetchProductByBrand = async () => {
      if (selectedBrands) {
        try {
          const res = await instance.get(`/products/?brand=${selectedBrands}`);
          if (res.data.length > 0) setResult(res.data);
          else toast('No product found', { type: 'info' });
        } catch (error) {
          setError(error);
        }
      }
    };
    fetchProductByBrand();
  }, [selectedBrands, setError, setResult, setStringResult]);

  useEffect(() => {
    if (selectedStar) {
      const result = products.filter((item) => item.rating >= selectedStar);
      if (result.length > 0) setResult(result);
      else toast(`No product has rating greater than ${selectedStar}`, { type: 'infor' });
    }
  }, [selectedStar, setResult, products]);

  useEffect(() => {
    if (selectedType) {
      const arr = products.filter((item) => item.type === selectedType);
      if (arr.length > 0) setResult(arr);
      else toast(`No product`, { type: 'infor' });
    }
  }, [products, selectedType, setResult]);

  useEffect(() => {
    if (value.min && value.max) {
      const temp = [...products];
      let result;

      if (value.min && value.max) {
        result = temp.filter((item) => item.price >= value.min && item.price <= value.max);
      } else if (value.min && !value.max) {
        result = temp.filter((item) => item.price >= value.min);
      } else if (!value.min && value.max) {
        result = temp.filter((item) => item.price <= value.max);
      }
      if (result.length === 0) toast('No Product Found');
      else setResult(result);
    }
  }, [value.max, value.min, setResult, products]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!assignValue.min && !assignValue.max) toast('Enter value', { type: 'warning' });
    else {
      const temp = [...products];
      let result;

      if (assignValue.min && assignValue.max) {
        result = temp.filter((item) => item.price >= assignValue.min && item.price <= assignValue.max);
      } else if (assignValue.min && !assignValue.max) {
        result = temp.filter((item) => item.price >= assignValue.min);
      } else if (!assignValue.min && assignValue.max) {
        result = temp.filter((item) => item.price <= assignValue.max);
      }
      if (result.length === 0) setStringResult('No Product Found');
      else setResult(result);
    }
  };

  const handleFocus = () => {
    if (result.length > 0) {
      setAssignValue({
        min: 0,
        max: 0,
      });
    }
  };

  return (
    <div className='sidebar'>
      <h2>Filter By</h2>
      <div>
        <h4>Types</h4>
        {types.map((type) => (
          <div key={type}>
            <input type='radio' name='type' id='type' value={type} onChange={(e) => setSelectedType(e.target.value)} />
            <label htmlFor='type'>{type}</label>
          </div>
        ))}
      </div>
      <div>
        <h4>Brands</h4>
        {brands.map((brand) => (
          <div key={brand}>
            <input
              type='radio'
              name='brand'
              id='brand'
              value={brand}
              onChange={(e) => setSelectedBrands(e.target.value)}
            />
            <label htmlFor='type'>{brand}</label>
          </div>
        ))}
      </div>
      <div>
        <h4>Rating</h4>
        <div style={{ display: 'flex' }}>
          <input type='radio' name='star' value={1} onChange={(e) => setSelectedStar(e.target.value)} />
          <label style={{ display: 'flex' }}>
            <span style={{ display: 'flex' }}>
              {new Array(1).fill(undefined).map((index) => (
                <SolidStar key={index} />
              ))}
            </span>
            <span style={{ display: 'flex' }}>
              {new Array(4).fill(undefined).map((index) => (
                <OutlineStar key={index} />
              ))}
            </span>
          </label>
        </div>
        <div style={{ display: 'flex' }}>
          <input type='radio' name='star' value={2} onChange={(e) => setSelectedStar(e.target.value)} />
          <label style={{ display: 'flex' }}>
            <span style={{ display: 'flex' }}>
              {new Array(2).fill(undefined).map((index) => (
                <SolidStar key={index} />
              ))}
            </span>
            <span style={{ display: 'flex' }}>
              {new Array(3).fill(undefined).map((index) => (
                <OutlineStar key={index} />
              ))}
            </span>
          </label>
        </div>
        <div style={{ display: 'flex' }}>
          <input type='radio' name='star' value={3} onChange={(e) => setSelectedStar(e.target.value)} />
          <label style={{ display: 'flex' }}>
            <span style={{ display: 'flex' }}>
              {new Array(3).fill(undefined).map((index) => (
                <SolidStar key={index} />
              ))}
            </span>
            <span style={{ display: 'flex' }}>
              {new Array(2).fill(undefined).map((index) => (
                <OutlineStar key={index} />
              ))}
            </span>
          </label>
        </div>
        <div style={{ display: 'flex' }}>
          <input type='radio' name='star' value={4} onChange={(e) => setSelectedStar(e.target.value)} />
          <label style={{ display: 'flex' }}>
            <span style={{ display: 'flex' }}>
              {new Array(4).fill(undefined).map((index) => (
                <SolidStar key={index} />
              ))}
            </span>
            <span style={{ display: 'flex' }}>
              {new Array(1).fill(undefined).map((index) => (
                <OutlineStar key={index} />
              ))}
            </span>
          </label>
        </div>
        <div style={{ display: 'flex' }}>
          <input type='radio' name='star' value={5} onChange={(e) => setSelectedStar(e.target.value)} />
          <label>
            <span style={{ display: 'flex' }}>
              {new Array(5).fill(undefined).map((index) => (
                <SolidStar key={index} />
              ))}
            </span>
          </label>
        </div>
      </div>
      <div>
        <h4>Prices</h4>
        <ul>
          <li>
            <input type='radio' name='price' id='' onChange={() => setValue({ ...assignValue, max: 1 })} />
            &le;1
          </li>
          <li>
            <input type='radio' name='price' id='' onChange={() => setValue({ min: 1, max: 80 })} />
            $1 - 80
          </li>
          <li>
            <input type='radio' name='price' id='' onChange={() => setValue({ min: 80, max: 160 })} />
            $80 - 160
          </li>
          <li>
            <input type='radio' name='price' id='' onChange={() => setValue({ min: 160, max: 240 })} />
            $160 - 240
          </li>
          <li>
            <input type='radio' name='price' id='' onChange={() => setValue({ min: 240, max: 1820 })} />
            $240 - 1820
          </li>
          <li>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div>
                <label htmlFor='min' style={{ display: 'block' }}>
                  From:
                </label>
                <input
                  type='number'
                  value={assignValue.min}
                  onChange={(e) => setAssignValue({ ...assignValue, min: e.target.value })}
                  onFocus={handleFocus}
                />
              </div>
              <div>
                <label htmlFor='max' style={{ display: 'block' }}>
                  To:
                </label>
                <input
                  type='number'
                  value={assignValue.max}
                  onChange={(e) => setAssignValue({ ...assignValue, max: e.target.value })}
                />
              </div>
              <button className='submit-btn' type='submit'>
                Go
              </button>
            </form>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
