import React, { useContext, useEffect, useState } from 'react';
import { instance } from '../../api/axios';
import { FilterContext } from '../../App';
import { SET_BRANDS } from '../../constant/type';

const BrandFilter = () => {
  const [brands, setBrands] = useState([]);
  // const [selectedBrands, setSelectedBrands] = useState([]);
  const { filterDispatch, filterState } = useContext(FilterContext);
  useEffect(() => {
    const fetchBrands = async () => {
      const response = await instance.get('/brands');
      if (response.data) setBrands(response.data);
    };
    fetchBrands();
  }, []);

  const handleAddBrand = (e) => {
    const { value } = e.target;
    const arr = filterState.brands.includes(value)
      ? filterState.brands.filter((item) => item !== value)
      : [...filterState.brands, value];
    // setSelectedBrands((pre) => (pre.includes(value) ? pre.filter((item) => item !== value) : [...pre, e.target.value]));
    filterDispatch({ type: SET_BRANDS, result: arr });
  };
  return (
    <div>
      <h4>Brands</h4>
      {brands.map((brand) => (
        <div key={brand}>
          <input
            type='checkbox'
            checked={filterState.brands.includes(brand)}
            onChange={() => {}}
            name='brand'
            id='brand'
            value={brand}
            onClick={(e) => handleAddBrand(e)}
          />
          <label htmlFor='type'>{brand}</label>
        </div>
      ))}
    </div>
  );
};

export default BrandFilter;
