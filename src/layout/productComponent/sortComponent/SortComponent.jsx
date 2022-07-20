import React from 'react';
import './SortComponent.css';

const SortComponent = ({ condition, setCondition }) => {
  return (
    <div className='sort-component'>
      Sort By:
      <select value={condition} onChange={(e) => setCondition(e.target.value)}>
        <option value='featured'>Featured</option>
        <option value='desc'>Price Desc</option>
        <option value='inc'>Price Inc</option>
      </select>
    </div>
  );
};

export default SortComponent;
