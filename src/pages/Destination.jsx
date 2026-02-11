import React from 'react';
import Navbar from '../layout/Navbar'; 

const Destination = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-[#2d3436] tracking-tight">
            Destination
          </h1>
          <p className="mt-4 text-gray-500 font-medium text-lg">
            This page is currently under development.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Destination;