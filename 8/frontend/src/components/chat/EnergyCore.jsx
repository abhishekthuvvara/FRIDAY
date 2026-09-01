import React from 'react';
export const EnergyCore = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-5">
    <div className="relative w-[30rem] h-[30rem] flex items-center justify-center">
      <div className="absolute inset-0 rounded-full border border-friday-accent/40 animate-[spin_30s_linear_infinite] border-dashed"></div>
      <div className="absolute inset-8 rounded-full border border-friday-accent/20 animate-[spin_20s_linear_infinite_reverse]"></div>
      <div className="absolute inset-20 rounded-full border border-white/10 animate-[spin_15s_linear_infinite]"></div>
      <div className="w-32 h-32 rounded-full bg-friday-accent/20 blur-2xl animate-pulse"></div>
    </div>
  </div>
);