import React, { useContext, useState } from 'react';
import { FilterContext } from '../../App';
import { SET_PRICE } from '../../constant/type';
import './PriceFilter.css';

const PriceFilter = () => {
  const [assignValue, setAssignValue] = useState({ min: 0, max: 0 });

  //Context
  const { filterState, filterDispatch } = useContext(FilterContext);

  const handleChangePrice = (min, max) => {
    filterDispatch({ type: SET_PRICE, result: { min, max } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!assignValue.min && !assignValue.max) return;
    else {
      if (assignValue.min && assignValue.max) {
        filterDispatch({ type: SET_PRICE, result: assignValue });
      } else if (assignValue.min && !assignValue.max) {
        filterDispatch({ type: SET_PRICE, result: { min: assignValue.min, max: 50000000 } });
      } else if (!assignValue.min && assignValue.max) {
        filterDispatch({ type: SET_PRICE, result: { max: assignValue.max, min: 0 } });
      }
    }
  };

  return (
    <div>
      <h4>Prices</h4>
      <ul>
        <li>
          <input
            type='radio'
            checked={filterState.price.min === 0 && filterState.price.max === 1}
            name='price'
            id=''
            onChange={() => handleChangePrice(0, 1)}
          />
          &le;1
        </li>
        <li>
          <input
            type='radio'
            checked={filterState.price.min === 1 && filterState.price.max === 80}
            name='price'
            id=''
            onChange={() => handleChangePrice(1, 80)}
          />
          $1 - 80
        </li>
        <li>
          <input
            type='radio'
            checked={filterState.price.min === 80 && filterState.price.max === 160}
            name='price'
            id=''
            onChange={() => handleChangePrice(80, 160)}
          />
          $80 - 160
        </li>
        <li>
          <input
            type='radio'
            checked={filterState.price.min === 160 && filterState.price.max === 240}
            name='price'
            id=''
            onChange={() => handleChangePrice(160, 240)}
          />
          $160 - 240
        </li>
        <li>
          <input
            type='radio'
            checked={filterState.price.min === 240 && filterState.price.max === 1820}
            name='price'
            id=''
            onChange={() => handleChangePrice(240, 1820)}
          />
          $240 - 1820
        </li>
        <li>
          <form onSubmit={(e) => handleSubmit(e)} className='price-form'>
            <div>
              <label htmlFor='min' style={{ display: 'block' }}>
                From:
              </label>
              <input
                type='number'
                value={assignValue.min}
                onChange={(e) => setAssignValue({ ...assignValue, min: e.target.value })}
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
  );
};

export default PriceFilter;
