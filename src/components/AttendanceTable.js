/*import React from "react";

function AttendanceTable() {
  const data = [
    { id: 1, student: "Emma Wilson", time: "09:00 AM", date: "2024-03-15", status: "Present" },
  ];

  return (
    <div>
      <h3>Today's Attendance</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>STUDENT</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>TIME</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>DATE</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.id}>
              <td style={{ padding: "10px" }}>{entry.student}</td>
              <td style={{ padding: "10px" }}>{entry.time}</td>
              <td style={{ padding: "10px" }}>{entry.date}</td>
              <td style={{ padding: "10px", color: entry.status === "Present" ? "green" : "red" }}>{entry.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;
*/