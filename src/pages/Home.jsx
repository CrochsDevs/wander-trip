import React, { useState, useEffect } from 'react';
import Navbar from '../../src/layout/Navbar';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80",
      title: "Explore the World",
      desc: "Your journey starts with WanderTrip"
    },
    {
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1920&q=80",
      title: "Discover Hidden Gems",
      desc: "Experience nature like never before"
    },
    {
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80",
      title: "Create Memories",
      desc: "Adventure is calling your name"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full min-h-screen bg-[#f4f4f4]">
      <Navbar />

      <section className="relative w-full h-screen overflow-hidden bg-black">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.url}
              alt={slide.title}
              className="w-full h-full object-cover brightness-[0.6]"
            />
          </div>
        ))}

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 px-4">
          <h1 className="text-4xl md:text-7xl font-bold mb-4 drop-shadow-2xl animate-fadeIn">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg md:text-2xl drop-shadow-lg animate-fadeIn">
            {slides[currentSlide].desc}
          </p>
          <button className="mt-8 px-8 py-3 bg-[#ffcc00] text-[#2d3436] font-bold rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl">
            Get Started
          </button>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 transition-all duration-300 rounded-full ${
                index === currentSlide ? "w-8 bg-[#ffcc00]" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold text-[#5f6a62] mb-4">Welcome to WanderTrip</h2>
        <p className="text-gray-600 leading-relaxed">
          Start scrolling to discover more amazing destinations.
        </p>
      </section>
    </div>
  );
};

export default Home;