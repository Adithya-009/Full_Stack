import React, { useState } from 'react';
import OneCountryDisplay from './OneCountryDisplay';

const Results = ({ result }) => {
  const [show, setShow] = useState(false);

  const handleShowClick = () => {
    setShow((prevShow) => !prevShow); // Cleaner toggle logic
  };

  return (
    <li>
      {result.name.common} <button onClick={handleShowClick}>Show</button>
      {show && <OneCountryDisplay result={result} />} {/* Conditional rendering */}
    </li>
  );
};

export default Results;
