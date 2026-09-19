import React from 'react';

export const FoundryLogo = ({ className = "w-16 h-16", color = "currentColor" }) => {
  return (
    <svg 
      viewBox="0 0 100 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Top angled ribbon */}
      <path 
        d="M 32 40 L 88 12 C 92 10 96 14 94 18 L 78 52 C 77 54 74 55 72 55 L 28 55 Z" 
        fill={color} 
      />
      {/* Middle angled ribbon */}
      <path 
        d="M 12 75 L 68 47 C 72 45 76 49 74 53 L 58 87 C 57 89 54 90 52 90 L 8 90 Z" 
        fill={color} 
      />
      {/* Bottom vertical stem */}
      <path 
        d="M 32 68 L 52 68 C 55 68 57 70 57 73 L 57 110 C 57 114 52 116 48 113 L 34 102 C 32 100 32 97 32 94 Z" 
        fill={color} 
      />
    </svg>
  );
};

export default FoundryLogo;
