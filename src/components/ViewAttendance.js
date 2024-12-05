import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch attendance data from backend
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get('https://qrscan-latest.onrender.com/admin/attendance/all');
        setAttendanceData(response.data); // Set fetched data
        setLoading(false); // Mark loading as false
      } catch (err) {
        console.error('Error fetching attendance data:', err);
        setError('Failed to load attendance data.');
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  if (loading) return <p style={{ textAlign: 'center', color: '#555', fontSize: '18px' }}>Loading attendance data...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red', fontSize: '18px' }}>{error}</p>;

  return (
    <div style={{ backgroundColor: '#f7f7f7', padding: '30px', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', color: '#333' }}>
        View Attendance
      </h1>
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#4caf50', color: 'white' }}>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>User ID</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Login Option</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Institute ID</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((attendance, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                  {attendance.user ? attendance.user.id : 'N/A'}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                  {attendance.user ? attendance.user.name || 'No Name' : 'N/A'}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>{attendance.loginOption}</td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                  {attendance.instituteId || 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAttendance;
