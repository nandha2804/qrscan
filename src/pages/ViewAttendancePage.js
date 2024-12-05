/*import { useState } from 'react';

function ViewAttendancePage() {
  const [attendance] = useState([
    { id: 1, name: 'John Doe', date: '2024-03-15', status: 'Present', time: '9:00 AM' },
    { id: 2, name: 'Jane Smith', date: '2024-03-15', status: 'Present', time: '9:15 AM' },
    { id: 3, name: 'Mike Johnson', date: '2024-03-15', status: 'Absent', time: '-' },
  ]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Attendance</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attendance.map((record) => (
              <tr key={record.id}>
                <td className="px-6 py-4 whitespace-nowrap">{record.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{record.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{record.time}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    record.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewAttendancePage;*/