import React from 'react';

const ReturningUserDashboard: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome back, Trader!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-semibold mb-2">Portfolio Value</h3>
          <p className="text-2xl font-bold">$10,234.56</p>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-semibold mb-2">Today's Profit/Loss</h3>
          <p className="text-2xl font-bold text-green-600">+$123.45</p>
        </div>
      </div>
      <button className="mt-4 bg-primary text-white font-bold py-2 px-4 rounded hover:bg-primary-dark transition duration-300">
        View Detailed Analytics
      </button>
    </div>
  );
};

export default ReturningUserDashboard;
