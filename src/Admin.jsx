import { motion } from 'framer-motion';
import React, { useState } from 'react';

function Admin() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Mock Name 1', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Mock Name 2', role: 'Moderator', status: 'Inactive' },
    { id: 3, name: 'Mock Name 3', role: 'User', status: 'Active' }
  ]);

  const toggleStatus = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user
    ));
  };

  return (
    <main className="min-h-screen bg-[#1A1A1A] pt-24">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-6xl text-white text-center mb-8" style={{ fontFamily: "'Copperplate Gothic', serif" }}>
          Admin Dashboard
        </h1>

        <motion.div
          className="bg-white rounded-lg shadow-lg overflow-hidden p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl text-gray-800 mb-4">User Management</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 p-4 text-black">ID</th>
                <th className="border-b-2 p-4 text-black">Name</th>
                <th className="border-b-2 p-4 text-black">Role</th>
                <th className="border-b-2 p-4 text-black">Status</th>
                <th className="border-b-2 p-4 text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="p-4 text-black">{user.id}</td>
                  <td className="p-4 text-black">{user.name}</td>
                  <td className="p-4 text-black">{user.role}</td>
                  <td className={`p-4 ${user.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>{user.status}</td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleStatus(user.id)}
                      className={`px-4 py-2 rounded-lg text-white ${user.status === 'Active' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                    >
                      {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </main>
  );
}

export default Admin;

