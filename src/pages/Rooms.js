// src/pages/Rooms.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({ name: '', description: '', availability: true, price: 0 });
  const [editRoom, setEditRoom] = useState(null);

  const fetchRooms = async () => {
    const querySnapshot = await getDocs(collection(db, 'rooms'));
    setRooms(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleAddRoom = async () => {
    try {
      await addDoc(collection(db, 'rooms'), newRoom);
      setNewRoom({ name: '', description: '', availability: true, price: 0 });
      await fetchRooms();
    } catch (error) {
      console.error("Error adding room: ", error);
    }
  };

  const handleUpdateRoom = async () => {
    try {
      const roomRef = doc(db, 'rooms', editRoom.id);
      await updateDoc(roomRef, editRoom);
      setEditRoom(null);
      await fetchRooms();
    } catch (error) {
      console.error("Error updating room: ", error);
    }
  };

  const handleDeleteRoom = async (id) => {
    try {
      await deleteDoc(doc(db, 'rooms', id));
      await fetchRooms();
    } catch (error) {
      console.error("Error deleting room: ", error);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white text-center mb-6">Rooms Management</h1>

      {/* Add Room Section */}
      <div className="bg-gray-800 shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Add New Room</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newRoom.name}
            onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
            className="border border-gray-600 rounded-md p-2 bg-gray-700 text-white w-full"
          />
          <input
            type="text"
            placeholder="Description"
            value={newRoom.description}
            onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
            className="border border-gray-600 rounded-md p-2 bg-gray-700 text-white w-full"
          />
          <input
            type="number"
            placeholder="Price"
            value={newRoom.price}
            onChange={(e) => setNewRoom({ ...newRoom, price: parseFloat(e.target.value) })}
            className="border border-gray-600 rounded-md p-2 bg-gray-700 text-white w-full"
          />
          <button
            onClick={handleAddRoom}
            className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 transition-colors"
          >
            Add Room
          </button>
        </div>
      </div>

      {/* Room List Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map(room => (
          <div key={room.id} className="bg-gray-800 text-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">{room.name}</h3>
            <p className="text-gray-400 mb-2">{room.description}</p>
            <p className="text-gray-200 font-semibold mb-4">Price: ${room.price}</p>
            <div className="flex space-x-4">
              <button
                onClick={() => setEditRoom(room)}
                className="bg-yellow-600 text-white rounded-md p-2 hover:bg-yellow-700 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteRoom(room.id)}
                className="bg-red-600 text-white rounded-md p-2 hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Room Section */}
      {editRoom && (
        <div className="bg-gray-800 shadow-md rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Edit Room</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              value={editRoom.name}
              onChange={(e) => setEditRoom({ ...editRoom, name: e.target.value })}
              className="border border-gray-600 rounded-md p-2 bg-gray-700 text-white w-full"
            />
            <input
              type="text"
              value={editRoom.description}
              onChange={(e) => setEditRoom({ ...editRoom, description: e.target.value })}
              className="border border-gray-600 rounded-md p-2 bg-gray-700 text-white w-full"
            />
            <input
              type="number"
              value={editRoom.price}
              onChange={(e) => setEditRoom({ ...editRoom, price: parseFloat(e.target.value) })}
              className="border border-gray-600 rounded-md p-2 bg-gray-700 text-white w-full"
            />
            <button
              onClick={handleUpdateRoom}
              className="bg-green-600 text-white rounded-md p-2 hover:bg-green-700 transition-colors"
            >
              Update Room
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;
