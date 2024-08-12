// src/pages/Bookings.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [newBooking, setNewBooking] = useState({ customerName: '', roomName: '', checkInDate: '', checkOutDate: '', roomPrice: '' });
  const [editBooking, setEditBooking] = useState(null);

  const fetchBookings = async () => {
    try {
      const bookingCollection = collection(db, 'bookings');
      const bookingSnapshot = await getDocs(bookingCollection);
      const bookingData = bookingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(bookingData);
    } catch (error) {
      console.error("Error fetching bookings: ", error);
    }
  };

  const fetchRooms = async () => {
    try {
      const roomCollection = collection(db, 'rooms');
      const roomSnapshot = await getDocs(roomCollection);
      const roomData = roomSnapshot.docs.map(doc => ({
        name: doc.data().name,
        price: doc.data().price
      }));
      setRooms(roomData);
    } catch (error) {
      console.error("Error fetching rooms: ", error);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchRooms();
  }, []);

  const handleAddBooking = async () => {
    try {
      await addDoc(collection(db, 'bookings'), newBooking);
      setNewBooking({ customerName: '', roomName: '', checkInDate: '', checkOutDate: '', roomPrice: '' });
      fetchBookings(); // Refresh booking list
    } catch (error) {
      console.error("Error adding booking: ", error);
    }
  };

  const handleUpdateBooking = async () => {
    try {
      const bookingRef = doc(db, 'bookings', editBooking.id);
      await updateDoc(bookingRef, editBooking);
      setEditBooking(null);
      fetchBookings(); // Refresh booking list
    } catch (error) {
      console.error("Error updating booking: ", error);
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      await deleteDoc(doc(db, 'bookings', id));
      fetchBookings(); // Refresh booking list
    } catch (error) {
      console.error("Error deleting booking: ", error);
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-4 text-center">Manage Bookings</h1>

      {/* Booking Form */}
      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold text-white mb-4">{editBooking ? 'Edit Booking' : 'Add New Booking'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="customerName" className="text-sm font-medium text-white mb-1">Customer Name</label>
            <input
              id="customerName"
              type="text"
              placeholder="Enter customer name"
              value={editBooking ? editBooking.customerName : newBooking.customerName}
              onChange={(e) => (editBooking ? setEditBooking({ ...editBooking, customerName: e.target.value }) : setNewBooking({ ...newBooking, customerName: e.target.value }))}
              className="border border-gray-600 rounded-md p-2 bg-gray-700 text-white w-full"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="roomName" className="text-sm font-medium text-white mb-1">Room</label>
            <select
              id="roomName"
              value={editBooking ? editBooking.roomName : newBooking.roomName}
              onChange={(e) => {
                const selectedRoom = rooms.find(room => room.name === e.target.value);
                (editBooking ? setEditBooking : setNewBooking)({
                  ...((editBooking) ? editBooking : newBooking),
                  roomName: e.target.value,
                  roomPrice: selectedRoom ? selectedRoom.price : ''
                });
              }}
              className="border border-gray-600 rounded-md p-2 bg-gray-700 text-white w-full"
            >
              <option value="">Select Room</option>
              {rooms.map((room, index) => (
                <option key={index} value={room.name}>
                  {room.name} (${room.price})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="checkInDate" className="text-sm font-medium text-white mb-1">Check-in Date</label>
            <input
              id="checkInDate"
              type="date"
              value={editBooking ? editBooking.checkInDate : newBooking.checkInDate}
              onChange={(e) => (editBooking ? setEditBooking({ ...editBooking, checkInDate: e.target.value }) : setNewBooking({ ...newBooking, checkInDate: e.target.value }))}
              className="border border-gray-600 rounded-md p-2 bg-gray-700 text-white w-full"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="checkOutDate" className="text-sm font-medium text-white mb-1">Check-out Date</label>
            <input
              id="checkOutDate"
              type="date"
              value={editBooking ? editBooking.checkOutDate : newBooking.checkOutDate}
              onChange={(e) => (editBooking ? setEditBooking({ ...editBooking, checkOutDate: e.target.value }) : setNewBooking({ ...newBooking, checkOutDate: e.target.value }))}
              className="border border-gray-600 rounded-md p-2 bg-gray-700 text-white w-full"
            />
          </div>
        </div>

        <button
          onClick={editBooking ? handleUpdateBooking : handleAddBooking}
          className={`mt-4 ${editBooking ? 'bg-green-600' : 'bg-blue-600'} text-white rounded-md p-2 hover:${editBooking ? 'bg-green-700' : 'bg-blue-700'} transition-colors`}
        >
          {editBooking ? 'Update Booking' : 'Add Booking'}
        </button>
      </div>

      {/* Display Bookings */}
      <h2 className="text-2xl font-bold text-white mb-4 text-center">Current Bookings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="p-4 bg-gray-800 text-white shadow rounded">
            <p className="text-xl font-bold mb-2">Customer Name: {booking.customerName}</p>
            <p><strong>Room:</strong> {booking.roomName}</p>
            <p><strong>Price:</strong> ${booking.roomPrice}</p>
            <p><strong>Check-in:</strong> {booking.checkInDate}</p>
            <p><strong>Check-out:</strong> {booking.checkOutDate}</p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => setEditBooking(booking)}
                className="bg-yellow-600 text-white rounded-md p-2 hover:bg-yellow-700 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteBooking(booking.id)}
                className="bg-red-600 text-white rounded-md p-2 hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
