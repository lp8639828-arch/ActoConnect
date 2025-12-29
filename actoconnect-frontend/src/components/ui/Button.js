import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '' }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;