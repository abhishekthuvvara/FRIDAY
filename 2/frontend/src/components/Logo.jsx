import React from 'react';

const Logo = ({ className = "w-10 h-10" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]`}
    >
      {/* Outer rotating ring */}
      <circle cx="50" cy="50" r="46" stroke="#00E5FF" strokeWidth="2" strokeDasharray="60 20" opacity="0.6" className="origin-center animate-[spin_10s_linear_infinite]" />
      {/* Inner stable ring */}
      <circle cx="50" cy="50" r="38" stroke="#00E5FF" strokeWidth="1" opacity="0.3" />
      {/* Geometric Core */}
      <path d="M50 20 L75 75 L25 75 Z" stroke="#00E5FF" strokeWidth="2" fill="rgba(0, 229, 255, 0.1)" strokeLinejoin="round" />
      <path d="M50 80 L25 25 L75 25 Z" stroke="#00E5FF" strokeWidth="2" fill="rgba(0, 229, 255, 0.1)" strokeLinejoin="round" />
      {/* Center energy point */}
      <circle cx="50" cy="50" r="8" fill="#00E5FF" className="animate-pulse" />
    </svg>
  );
};

export default Logo;
