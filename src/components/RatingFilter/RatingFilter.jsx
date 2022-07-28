import React, { useContext } from 'react';
import { FilterContext } from '../../App';
import { SET_RATING } from '../../constant/type';
import OutlineStar from '../OutlineStar';
import SolidStar from '../SolidStar';

const RatingFilter = () => {
  const { filterDispatch } = useContext(FilterContext);

  const handleChangeRating = (rating) => {
    filterDispatch({ type: SET_RATING, result: rating });
  };
  return (
    <div>
      <h4>Rating</h4>
      <div style={{ display: 'flex' }} onClick={() => handleChangeRating(1)}>
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
      <div style={{ display: 'flex' }} onClick={() => handleChangeRating(2)}>
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
      <div style={{ display: 'flex' }} onClick={() => handleChangeRating(3)}>
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
      <div style={{ display: 'flex' }} onClick={() => handleChangeRating(4)}>
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
    </div>
  );
};

export default RatingFilter;
