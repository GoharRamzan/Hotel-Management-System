// src/pages/Customers.js
import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const usersCollection = collection(db, 'users');
          const usersQuery = query(usersCollection, where('role', '==', 'user'));
          const usersSnapshot = await getDocs(usersQuery);
          const customersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setCustomers(customersList);
        } else {
          setError('User not authenticated');
        }
      } catch (error) {
        setError('Error fetching customers: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [auth]);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-4">Manage Customers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map(customer => (
          <div key={customer.id} className="p-4 bg-gray-800 text-white shadow rounded">
            <h2 className="text-xl font-bold mb-2">{customer.name || 'No Name'}</h2>
            <p className="text-gray-400"><strong>Customer ID:</strong> {customer.id}</p>
            <p className="text-gray-400"><strong>Email:</strong> {customer.email}</p>
            <p className="text-gray-400"><strong>Phone:</strong> {customer.phone || 'N/A'}</p>
            <p className="text-gray-400"><strong>Address:</strong> {customer.address || 'N/A'}</p>
            <div className="mt-2">
              <strong>Booking History:</strong>
              <ul className="list-disc pl-5">
                {customer.bookingHistory && customer.bookingHistory.length > 0 ? (
                  customer.bookingHistory.map((booking, index) => (
                    <li key={index} className="text-gray-300">
                      {booking}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-300">No bookings found</li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
