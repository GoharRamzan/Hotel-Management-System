// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const Dashboard = () => {
  const [stats, setStats] = useState({
    rooms: 0,
    bookings: 0,
    staff: 0,
    customers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Rooms
        const roomsCollection = collection(db, 'rooms');
        const roomsSnapshot = await getDocs(roomsCollection);
        const roomsCount = roomsSnapshot.size;

        // Bookings
        const bookingsCollection = collection(db, 'bookings');
        const bookingsSnapshot = await getDocs(bookingsCollection);
        const bookingsCount = bookingsSnapshot.size;

        // Staff
        const staffQuery = query(collection(db, 'users'), where('role', '==', 'staff'));
        const staffSnapshot = await getDocs(staffQuery);
        const staffCount = staffSnapshot.size;

        // Customers
        const customersQuery = query(collection(db, 'users'), where('role', '==', 'user'));
        const customersSnapshot = await getDocs(customersQuery);
        const customersCount = customersSnapshot.size;

        // Update state with fetched data
        setStats({
          rooms: roomsCount,
          bookings: bookingsCount,
          staff: staffCount,
          customers: customersCount,
        });
      } catch (error) {
        console.error("Error fetching statistics: ", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Rooms Widget */}
        <div className="bg-gray-800 text-white shadow-lg rounded p-4 flex flex-col items-center">
          <h2 className="text-xl font-semibold">Rooms</h2>
          <p className="text-2xl">{stats.rooms} Available</p>
        </div>

        {/* Bookings Widget */}
        <div className="bg-gray-800 text-white shadow-lg rounded p-4 flex flex-col items-center">
          <h2 className="text-xl font-semibold">Bookings</h2>
          <p className="text-2xl">{stats.bookings} This Month</p>
        </div>

        {/* Staff Widget */}
        <div className="bg-gray-800 text-white shadow-lg rounded p-4 flex flex-col items-center">
          <h2 className="text-xl font-semibold">Staff</h2>
          <p className="text-2xl">{stats.staff} Active</p>
        </div>

        {/* Customers Widget */}
        <div className="bg-gray-800 text-white shadow-lg rounded p-4 flex flex-col items-center">
          <h2 className="text-xl font-semibold">Customers</h2>
          <p className="text-2xl">{stats.customers} Registered</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent Bookings */}
        <div className="bg-gray-700 text-white shadow-lg rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
          {/* Add booking details or a list */}
          <p>No recent bookings to display</p>
        </div>

        {/* Notifications or Updates */}
        <div className="bg-gray-700 text-white shadow-lg rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          {/* Add notification or update content */}
          <p>No new notifications</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
