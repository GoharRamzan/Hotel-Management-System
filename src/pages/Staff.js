// src/pages/Staff.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Staff = () => {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const staffCollection = collection(db, 'users'); // Assuming staff info is stored in 'users' collection
        const staffQuery = query(staffCollection, where('role', '==', 'staff'));
        const staffSnapshot = await getDocs(staffQuery);
        const staffList = staffSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setStaff(staffList);
      } catch (error) {
        console.error("Error fetching staff: ", error);
      }
    };

    fetchStaff();
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-4">Manage Staff</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {staff.map(member => (
          <div key={member.id} className="p-4 bg-gray-800 text-white shadow rounded">
            <h2 className="text-xl font-bold mb-2">{member.name || 'No Name'}</h2>
            <p className="text-gray-400"><strong>Role:</strong> {member.role || 'N/A'}</p>
            <p className="text-gray-400"><strong>Email:</strong> {member.email || 'N/A'}</p>
            <p className="text-gray-400"><strong>Phone:</strong> {member.phone || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Staff;
