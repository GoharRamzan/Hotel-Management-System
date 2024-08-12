// src/pages/Payments.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Payments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const paymentsCollection = collection(db, 'payments');
        const paymentsSnapshot = await getDocs(paymentsCollection);
        const paymentsList = paymentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPayments(paymentsList);
      } catch (error) {
        console.error("Error fetching payments: ", error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-4">Manage Payments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {payments.map(payment => (
          <div key={payment.id} className="p-4 bg-gray-800 text-white shadow rounded">
            <h2 className="text-xl font-bold mb-2">Payment ID: {payment.id}</h2>
            <p className="text-gray-400"><strong>Amount:</strong> ${payment.amount}</p>
            <p className="text-gray-400"><strong>Status:</strong> {payment.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payments;
