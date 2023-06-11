import React, { useState } from 'react';
import './StarRating.css'; 

const StarRating = ({ value, onChange }) => {
  const [hoverValue, setHoverValue] = useState(0);

  const handleMouseEnter = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  const handleClick = (value) => {
    onChange(value);
    
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= (hoverValue || value) ? 'filled' : ''}`}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;