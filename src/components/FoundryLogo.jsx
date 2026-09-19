import React from 'react';

export const FoundryLogo = ({ className = "w-16 h-20", color = "#FFFFFF" }) => {
  return (
    <img 
      src="/icon/foundrylogo.svg" 
      alt="FOUNDry Emblem" 
      style={{
        width: 'auto',
        height: '80px',
        objectFit: 'contain',
        display: 'block'
      }}
      className={className} 
    />
  );
};

export default FoundryLogo;
