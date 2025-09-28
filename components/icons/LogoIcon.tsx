import React from 'react';

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 52 48" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path 
      d="M45.1333 0H6.86667C3.07462 0 0 3.07462 0 6.86667V34.3333C0 38.1254 3.07462 41.2 6.86667 41.2H13.7333L20.6 48V41.2H45.1333C48.9254 41.2 52 38.1254 52 34.3333V6.86667C52 3.07462 48.9254 0 45.1333 0Z" 
      fill="#F97316"
    />
    <rect x="12" y="10" width="28" height="5" rx="2.5" fill="white"/>
    <rect x="12" y="21.5" width="28" height="5" rx="2.5" fill="white"/>
    <rect x="12" y="33" width="28" height="5" rx="2.5" fill="white"/>
  </svg>
);