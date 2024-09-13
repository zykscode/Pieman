import React from 'react';

const HeroComponent: React.FC = () => {
  return (
    <div className="bg-primary text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
          Welcome to Our Trading Platform
        </h1>
        <p className="mt-3 text-xl sm:mt-4">
          Discover the power of smart trading with our advanced tools and
          insights.
        </p>
        <div className="mt-8 flex justify-center">
          <button className="bg-white text-primary font-bold py-2 px-4 rounded hover:bg-gray-100 transition duration-300">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;
