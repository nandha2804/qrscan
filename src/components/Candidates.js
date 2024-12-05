import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [filteredCandidates, setFilteredCandidates] = useState([]);

  useEffect(() => {
    // Fetching the data from the backend
    axios
      .get('http://localhost:8080/admin/users') // Update with the correct URL if necessary
      .then(response => {
        console.log('API response:', response.data); // Debugging API response
        setCandidates(response.data);
        setFilteredCandidates(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchEmail(value);
    if (value) {
      // Filtering candidates based on email
      const filtered = candidates.filter(candidate =>
        candidate.email.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCandidates(filtered);
    } else {
      setFilteredCandidates(candidates);
    }
  };

  return (
    <div
      style={{
        padding: '30px',
        backgroundColor: '#f2f2f2', // Soft gray background
        minHeight: '100vh', // Full viewport height
        fontFamily: 'Arial, sans-serif', // Modern font
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          color: '#333',
          fontSize: '28px',
          marginBottom: '20px',
        }}
      >
        Candidates Report
      </h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <input
          type="text"
          placeholder="Search by email"
          value={searchEmail}
          onChange={handleSearch}
          style={{
            padding: '10px',
            width: '300px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            outline: 'none',
            transition: 'all 0.3s ease',
          }}
        />
      </div>
      <div
        style={{
          overflowX: 'auto',
          borderRadius: '8px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <table
          style={{
            width: '100%',
            textAlign: 'left',
            borderCollapse: 'collapse',
            fontSize: '16px',
          }}
        >
          <thead
            style={{
              backgroundColor: '#4CAF50', // Subtle green background for the header
              color: '#fff',
            }}
          >
            <tr>
              <th style={{ padding: '10px' }}>ID</th>
              <th style={{ padding: '10px' }}>Name</th>
              <th style={{ padding: '10px' }}>Email</th>
              <th style={{ padding: '10px' }}>Role</th>
              <th style={{ padding: '10px' }}>Course</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map(candidate => (
                <tr
                  key={candidate.id}
                  style={{
                    backgroundColor: '#fafafa', // Light gray background for rows
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#e0e0e0')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = '#fafafa')}
                >
                  <td style={{ padding: '10px' }}>{candidate.id}</td>
                  <td style={{ padding: '10px' }}>{candidate.name}</td>
                  <td style={{ padding: '10px' }}>{candidate.email}</td>
                  <td style={{ padding: '10px' }}>{candidate.role}</td>
                  <td style={{ padding: '10px' }}>{candidate.course}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                  No candidates found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Candidates;
