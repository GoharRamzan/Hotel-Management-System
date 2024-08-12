// src/pages/Reports.js
import React from 'react';

const Reports = () => {
  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-4">Reports</h1>
      <div className="bg-gray-800 p-4 shadow-lg rounded">
        <h2 className="text-xl text-white mb-2">Monthly Revenue</h2>
        <p className="text-gray-300">$10,000</p>
      </div>
      <div className="bg-gray-800 p-4 shadow-lg rounded mt-4">
        <h2 className="text-xl text-white mb-2">Occupancy Rate</h2>
        <p className="text-gray-300">85%</p>
      </div>
    </div>
  );
};

export default Reports;
