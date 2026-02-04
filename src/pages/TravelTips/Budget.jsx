import React from 'react';
import Navbar from '../../layout/Navbar';

const Badget = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center">
        <h1 className="text-5xl font-bold text-[#2d3436] tracking-tight">
          Budget Tips
        </h1>
      </main>
    </div>
  );
};

export default Badget ;