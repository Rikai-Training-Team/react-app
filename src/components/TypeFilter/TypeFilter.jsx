import React, { useContext, useEffect, useState } from 'react';
import { instance } from '../../api/axios';
import { FilterContext } from '../../App';
import { SET_TYPES } from '../../constant/type';

const TypeFilter = () => {
  const { filterState, filterDispatch } = useContext(FilterContext);
  const [types, setTypes] = useState([]);

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
  const handleAddType = (e) => {
    const { value } = e.target;
    const arr = filterState.types.includes(value)
      ? filterState.types.filter((item) => item !== value)
      : [...filterState.types, value];
    filterDispatch({ type: SET_TYPES, result: arr });
  };
  return (
    <div>
      <h4>Types</h4>
      {types.map((type) => (
        <div key={type}>
          <input
            type='checkbox'
            checked={filterState.types.includes(type)}
            onChange={() => {}}
            name='type'
            id='type'
            value={type}
            onClick={(e) => handleAddType(e)}
          />
          <label htmlFor='type'>{type}</label>
        </div>
      ))}
    </div>
  );
};

export default TypeFilter;
