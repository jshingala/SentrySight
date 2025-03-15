import { motion } from 'framer-motion';
import React, { useState } from 'react';
import './global.css';

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

  const styles = {
    mainContent: {
      minHeight: '100vh',
      paddingTop: '96px',
    },
    container: {
      maxWidth: '1200px',
      margin: 'auto',
      padding: '0 20px',
    },
    heading: {
      fontSize: '3.5rem',
      textAlign: 'center',
      marginBottom: '32px',
      color: '#FFFFFF',
      fontFamily: "'Copperplate Gothic', serif"
    },
    tableContainer: {
      padding: '24px',
      backgroundColor: '#333333',
      borderRadius: '15px',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)',
      overflow: 'hidden',
    },
    subHeading: {
      fontSize: '1.5rem',
      color: '#d084f3',
      marginBottom: '16px',
    },
    table: {
      width: '100%',
      textAlign: 'left',
      borderCollapse: 'collapse',
    },
    tableHeader: {
      borderBottom: '2px solid #444',
      padding: '16px',
      color: '#d084f3',
    },
    tableCell: {
      padding: '16px',
      color: '#FFFFFF',
      borderBottom: '1px solid #444',
    },
    tableRow: {
      transition: 'background-color 0.3s ease',
    },
    activeStatus: {
      padding: '16px',
      color: '#4ADE80',
      borderBottom: '1px solid #444',
    },
    inactiveStatus: {
      padding: '16px',
      color: '#EF4444',
      borderBottom: '1px solid #444',
    },
    activateBtn: {
      backgroundColor: '#4ADE80',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.3s ease',
    },
    deactivateBtn: {
      backgroundColor: '#EF4444',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.3s ease',
    }
  };

  return (
    <main style={styles.mainContent}>
      <div style={styles.container}>
        <h1 style={styles.heading}>
          Admin Dashboard
        </h1>
        <motion.div
          className="card"
          style={styles.tableContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 style={styles.subHeading}>User Management</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>ID</th>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Role</th>
                <th style={styles.tableHeader}>Status</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr 
                  key={user.id} 
                  style={styles.tableRow}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#444';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <td style={styles.tableCell}>{user.id}</td>
                  <td style={styles.tableCell}>{user.name}</td>
                  <td style={styles.tableCell}>{user.role}</td>
                  <td style={user.status === 'Active' ? styles.activeStatus : styles.inactiveStatus}>
                    {user.status}
                  </td>
                  <td style={styles.tableCell}>
                    <button
                      onClick={() => toggleStatus(user.id)}
                      style={user.status === 'Active' ? styles.deactivateBtn : styles.activateBtn}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.backgroundColor = user.status === 'Active' ? '#DC2626' : '#16A34A';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.backgroundColor = user.status === 'Active' ? '#EF4444' : '#4ADE80';
                      }}
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