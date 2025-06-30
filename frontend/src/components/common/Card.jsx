import React from 'react';

const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;