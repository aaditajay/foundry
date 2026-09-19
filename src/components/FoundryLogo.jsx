import React from 'react';

export const FoundryLogo = ({ className = "w-16 h-16", color = "#FFFFFF" }) => {
  return (
    <img 
      src="/icon/foundrylogo.svg" 
      alt="FOUNDry Logo" 
      className={className} 
      style={{
        display: 'block',
        objectFit: 'contain',
        filter: color === '#FFFFFF' || color === 'white' ? 'none' : 'invert(1)'
      }}
    />
  );
};

export default FoundryLogo;
