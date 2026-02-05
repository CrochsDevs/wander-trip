import React from 'react';
import Navbar from '../../src/layout/Navbar';

const Guide = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center">
        <h1 className="text-5xl font-bold text-[#2d3436] tracking-tight">
          Guide
        </h1>
      </main> 
    </div>
  );
};

export default Guide;